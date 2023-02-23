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
 * Represents price details for a `Product`
 */
export interface Price {
  /**
   * The unique identifier of the product.
   */
  productUid: string;

  /**
   * The ISO code of the country where the product is sold.
   */
  country: string;

  /**
   * The quantity of the product.
   */
  quantity: number;

  /**
   * The price of the product.
   */
  price: number;

  /**
   * The ISO code of the currency in which the product price is expressed.
   */
  currency: string;

  /**
   * The page count for multi-page products.
   */
  pageCount: number | null;
}

export interface GetPricesParams {
  productUid: string;
}

export interface GetPricesQueryParams {
  /**
   * The ISO code of the country where the product is sold.
   * This property is optional.
   */
  country?: string;

  /**
   * The ISO code of the currency in which the product price is expressed.
   * This property is optional.
   */
  currency?: string;

  /**
   * The page count for multi-page products.
   * This property is optional, but it is mandatory for multi-page products.
   */
  pageCount?: number;
}

export type GetPricesResponse = Price[];
