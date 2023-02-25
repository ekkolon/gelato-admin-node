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

import { ClientOptions } from '../../src/client';
import { GelatoClient } from '../../src/client/gelato-client';

export const clientName = 'mock-client-name';

const apiKey = 'mock-client-options-api-key';

export const clientOptions: ClientOptions = { apiKey };

export const clientOptionsNoApiKey: ClientOptions = {};

export function client() {
  return new GelatoClient(clientOptions, clientName);
}

export function clientWithOptions(options: ClientOptions) {
  return new GelatoClient(clientOptions, clientName);
}

export function clientProvidingUndefinedApiKey(): GelatoClient {
  return new GelatoClient({ apiKey: undefined }, clientName);
}

export function clientProvidingEmptyApiKey(): GelatoClient {
  return new GelatoClient({ apiKey: undefined }, clientName);
}
