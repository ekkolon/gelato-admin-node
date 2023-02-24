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
 * Gets the {@link Auth} service for the default app or a
 * given app.
 *
 * `getAuth()` can be called with no arguments to access the default app's
 * {@link Auth} service or as `getAuth(app)` to access the
 * {@link Auth} service associated with a specific app.
 *
 * @example
 * ```javascript
 * // Get the Auth service for the default app
 * const defaultAuth = getAuth();
 * ```
 *
 * @example
 * ```javascript
 * // Get the Auth service for a given app
 * const otherAuth = getAuth(otherApp);
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
