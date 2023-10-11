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
import { ShipmentAPI } from './shipment-api';

/**
 * Get a reference to the {@link ShipmentAPI} service for the default client or a
 * given client.
 *
 * `getShipmentAPI()` can be called with no arguments to access the default client's
 * {@link ShipmentAPI} service or as `getShipmentAPI(client)` to access the
 * {@link ShipmentAPI} service associated with a specific client.
 *
 * @example
 * ```javascript
 * // Get the ShipmentAPI service for the default client
 * const defaultShipmentAPI = getShipmentAPI();
 * ```
 *
 * @example
 * ```javascript
 * // Get the ShipmentAPI service for a given client
 * const otherShipmentAPI = getShipmentAPI(otherClient);
 * ```
 *
 */
export function getShipmentAPI(client?: Client): ShipmentAPI {
  if (typeof client === 'undefined') {
    client = getClient();
  }

  const gelatoClient: GelatoClient = client as GelatoClient;
  return gelatoClient.getOrInitService('shipment', (client) => new ShipmentAPI(client));
}

export {
  GetShipmentMethodsQueryParams,
  GetShipmentMethodsResponse,
  ShipmentMethod,
  ShipmentMethodType,
} from './shipment';
export { ShipmentAPI } from './shipment-api';
