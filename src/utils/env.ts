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

import { ClientErrorCode, GelatoClientError } from './error';

/**
 * Constant holding the environment variable name with the default `apiKey`.
 *
 * @internal
 */
export const GELATO_API_KEY_VAR = 'GELATO_API_KEY';

/**
 * Constant holding the header key for making authenticated requests
 * to the Gelato API.
 *
 * @internal
 */
export const GELATO_API_HEADER_KEY = 'X-API-KEY';

/**
 * Interface representing the configuration options for the Gelato client.
 */
export interface GelatoEnvConfig {
  apiKey: string;
}

/**
 * Loads the configuration options for the Gelato client from the environment.
 * If no `apiKey` is found, an error is thrown.
 * @param throwIfNoApiKey Whether to throw an error if no `apiKey` is found.
 * @returns The configuration options for the Gelato client.
 * @internal
 */
export function loadEnvConfig(): GelatoEnvConfig;
export function loadEnvConfig(throwIfNoApiKey?: true): GelatoEnvConfig;
export function loadEnvConfig(throwIfNoApiKey?: false): Partial<GelatoEnvConfig>;
export function loadEnvConfig(throwIfNoApiKey = true): Partial<GelatoEnvConfig> {
  const apiKey = process.env[GELATO_API_KEY_VAR];

  if (!apiKey && throwIfNoApiKey) {
    const errMessage =
      `Failed to load environment configuration: No API key found. ` +
      `Make sure to set the ${GELATO_API_KEY_VAR} environment variable.`;
    throw new GelatoClientError(ClientErrorCode.NO_API_KEY, errMessage);
  }

  return { apiKey };
}
