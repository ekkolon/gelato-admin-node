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

/**
 * Represents the query parameters for a request with a destination country filter.
 */
export interface GetShipmentMethodsQueryParams {
  /**
   * The ISO code of the destination country to filter by.
   */
  country?: string;
}

export type ShipmentMethodType = 'normal' | 'express' | 'pallet';

/**
 * Represents a shipment method with its details.
 */
export interface ShipmentMethod {
  /**
   * The unique identifier of the shipment method.
   */
  shipmentMethodUid: string;

  /**
   * The type of the shipping service.
   * Can be: normal, express or pallet.
   */
  type: ShipmentMethodType;

  /**
   * The name of the shipment method.
   */
  name: string;

  /**
   * Indicates if the shipment method is suitable for shipping to business addresses.
   */
  isBusiness: boolean;

  /**
   * Indicates if the shipment method is suitable for shipping to residential addresses.
   */
  isPrivate: boolean;

  /**
   * Defines if the shipment method is tracked, i.e. you will receive a tracking code and URL when the order is shipped with the shipment method.
   */
  hasTracking: boolean;

  /**
   * The list of destination country ISO codes where the method is available as a delivery option.
   */
  supportedCountries: string[];
}

/**
 * Represents a collection of shipment methods.
 */
export interface GetShipmentMethodsResponse {
  /**
   * An array of shipment methods.
   */
  shipmentMethods: ShipmentMethod[];
}
