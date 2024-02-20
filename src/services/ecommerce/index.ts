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

import { GelatoClient } from '../../client/gelato-client';
import { Client, getClient } from '../../client/index';
import { EcommerceAPI } from './ecommerce-api';

/**
 * Get a reference to the {@link EcommerceAPI} service for the default client or a
 * given client.
 *
 * `getEcommerceAPI()` can be called with no arguments to access the default client's
 * {@link EcommerceAPI} service or as `getEcommerceAPI(client)` to access the
 * {@link EcommerceAPI} service associated with a specific client.
 *
 * @example
 * ```javascript
 * // Get the EcommerceAPI service for the default client
 * const defaultEcommerceAPI = getEcommerceAPI();
 * ```
 *
 * @example
 * ```javascript
 * // Get the EcommerceAPI service for a given client
 * const otherEcommerceAPI = getEcommerceAPI(otherClient);
 * ```
 *
 */
export function getEcommerceAPI(client?: Client): EcommerceAPI {
  if (typeof client === 'undefined') {
    client = getClient();
  }

  const gelatoClient: GelatoClient = client as GelatoClient;
  return gelatoClient.getOrInitService('ecommerce', (client) => new EcommerceAPI(client));
}

export { EcommerceAPI } from './ecommerce-api';
export * from './products';
export * from './templates';
