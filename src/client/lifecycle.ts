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

import { GelatoClient } from './gelato-client';
import { Client, ClientOptions } from './core';
import { ClientErrorCode, GelatoClientError } from '../utils/error';
import { isNonEmptyString } from '../utils/validator';

const DEFAULT_CLIENT_NAME = '[DEFAULT]';

export class ClientStore {
  private readonly clientStore = new Map<string, GelatoClient>();

  initializeClient(options?: ClientOptions, clientName: string = DEFAULT_CLIENT_NAME) {
    if (typeof clientName !== 'string' || clientName === '') {
      throw new GelatoClientError(
        ClientErrorCode.INVALID_CLIENT_NAME,
        `Invalid Gelato client name "${clientName}" provided. Client name must be a non-empty string.`,
      );
    } else if (this.clientStore.has(clientName)) {
      if (clientName === DEFAULT_CLIENT_NAME) {
        throw new GelatoClientError(
          ClientErrorCode.DUPLICATE_CLIENT,
          'The default Gelato client already exists. This means you called initializeClient() ' +
            'more than once without providing an app name as the second argument. In most cases ' +
            'you only need to call initializeClient() once. But if you do want to initialize ' +
            'multiple clients, pass a second argument to initializeClient() to give each client a unique ' +
            'name.',
        );
      } else {
        throw new GelatoClientError(
          ClientErrorCode.DUPLICATE_CLIENT,
          `Gelato client named "${clientName}" already exists. This means you called initializeClient() ` +
            'more than once with the same client name as the second argument. Make sure you provide a ' +
            'unique name every time you call initializeClient().',
        );
      }
    }

    if (typeof options === 'undefined') {
      options = {};
    }

    // Attempt getting options from environment variable.
    // Right now only the `apiKey` is required.
    options.apiKey = options.apiKey ?? process.env[GELATO_API_KEY_VAR];

    if (!isNonEmptyString(options.apiKey)) {
      throw new GelatoClientError(ClientErrorCode.NO_API_KEY, `Invalid API_KEY`);
    }

    const client = new GelatoClient(options, clientName);
    this.clientStore.set(clientName, client);
    return client;
  }

  getClient(clientName: string = DEFAULT_CLIENT_NAME): Client {
    if (typeof clientName !== 'string' || clientName === '') {
      throw new GelatoClientError(
        ClientErrorCode.INVALID_CLIENT_NAME,
        `Invalid Gelato client name "${clientName}" provided. Client name must be a non-empty string.`,
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
 * Constant holding the environment variable name with the default `apiKey`.
 */
export const GELATO_API_KEY_VAR = 'GELATO_API_KEY';
