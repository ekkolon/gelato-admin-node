/*!
 * @license
 * Copyright 2023 Nelson Dominguez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ClientErrorCode, ClientErrorMessage, GelatoClientError } from '../utils/error';
import { isNonEmptyString } from '../utils/validator';
import { Client, ClientOptions } from './core';
import { GelatoClient } from './gelato-client';

/** @internal */
export const DEFAULT_CLIENT_NAME = '[DEFAULT]';

export class ClientStore {
  private readonly clientStore = new Map<string, GelatoClient>();

  initializeClient(options?: ClientOptions, clientName: string = DEFAULT_CLIENT_NAME) {
    if (!isNonEmptyString(clientName)) {
      throw new GelatoClientError(
        ClientErrorCode.INVALID_CLIENT_NAME,
        ClientErrorMessage.INVALID_CLIENT_NAME.replace('{{clientName}}', clientName),
      );
    } else if (this.clientStore.has(clientName)) {
      if (clientName === DEFAULT_CLIENT_NAME) {
        throw new GelatoClientError(
          ClientErrorCode.DUPLICATE_CLIENT,
          ClientErrorMessage.DUPLICATE_DEFAULT_CLIENT_NAME,
        );
      } else {
        throw new GelatoClientError(
          ClientErrorCode.DUPLICATE_CLIENT,
          ClientErrorMessage.DUBPLICATE_CLIENT_NAME.replace('{{clientName}}', clientName),
        );
      }
    }

    options = { ...options };

    options.apiKey = options.apiKey ?? loadEnvConfig(false).apiKey;

    if (!isNonEmptyString(options.apiKey)) {
      throw new GelatoClientError(ClientErrorCode.NO_API_KEY, 'Invalid API_KEY');
    }

    const client = new GelatoClient(options, clientName);
    this.clientStore.set(clientName, client);
    return client;
  }

  getClient(clientName: string = DEFAULT_CLIENT_NAME): Client {
    if (!isNonEmptyString(clientName)) {
      throw new GelatoClientError(
        ClientErrorCode.INVALID_CLIENT_NAME,
        ClientErrorMessage.INVALID_CLIENT_NAME.replace('{{clientName}}', clientName),
      );
    } else if (!this.clientStore.has(clientName)) {
      let errorMessage: string =
        clientName === DEFAULT_CLIENT_NAME
          ? 'The default Gelato client does not exist. '
          : `Gelato client named "${clientName}" does not exist. `;
      errorMessage +=
        'Make sure you call initializeClient() before using any of the Gelato API services.';

      throw new GelatoClientError(ClientErrorCode.NO_CLIENT, errorMessage);
    }

     
    return this.clientStore.get(clientName)!;
  }

  getClients(): Client[] {
    // Return a copy so the caller cannot mutate the array
    return Array.from(this.clientStore.values());
  }
}

export const defaultClientStore = new ClientStore();

export function initializeClient(
  options?: ClientOptions,
  clientName: string = DEFAULT_CLIENT_NAME,
): Client {
  return defaultClientStore.initializeClient(options, clientName);
}

export function getClient(clientName: string = DEFAULT_CLIENT_NAME): Client {
  return defaultClientStore.getClient(clientName);
}

export function getClients(): Client[] {
  return defaultClientStore.getClients();
}

/**
 * Interface representing the configuration options for the Gelato client.
 *
 * @internal
 */
export interface GelatoEnvConfig {
  apiKey?: string;
}

/** @internal */
export const GELATO_API_KEY_VAR = 'GELATO_API_KEY';

/**
 * Loads the configuration options for the Gelato client from the environment.
 * If no `apiKey` is found, an error is thrown.
 * @param throwIfNoApiKey Whether to throw an error if no `apiKey` is found.
 * @returns The configuration options for the Gelato client.
 *
 * @internal
 */
export function loadEnvConfig(throwIfNoApiKey = true): Partial<GelatoEnvConfig> {
  const apiKey = process.env[GELATO_API_KEY_VAR];

  if (!apiKey && throwIfNoApiKey) {
    const errMessage =
      'Failed to load environment configuration: No API key found. ' +
      `Make sure to set the ${GELATO_API_KEY_VAR} environment variable.`;
    throw new GelatoClientError(ClientErrorCode.NO_API_KEY, errMessage);
  }

  return { apiKey };
}
