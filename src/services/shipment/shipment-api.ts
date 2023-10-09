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

import { BaseAPI } from '../api-service';
import * as endpoints from './endpoints';
import { GetShipmentMethodsQueryParams, GetShipmentMethodsResponse } from './shipment';

/**
 * @description
 *
 *
 * @resourceVersion `v1`
 * @resourceURI `https://shipment.gelatoapis.com/v1/shipment-methods`
 *
 * @publicApi
 */
export class ShipmentAPI extends BaseAPI {
  /**
   * Get information about each shipment method that Gelato provides.
   * The shipping methods can be filtered on shipment destination country.
   * @param filter Query parameters to filter shipment methods by.
   * @returns A promise resolving with available shipment methods in Gelato.
   */
  getShipmentMethods(
    params: GetShipmentMethodsQueryParams = {},
  ): Promise<GetShipmentMethodsResponse> {
    return this.httpClient.get<GetShipmentMethodsResponse>(endpoints.SHIPMENT_METHODS, { params });
  }
}
