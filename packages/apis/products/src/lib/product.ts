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

export type AttributeFilterValue = string | number | boolean | (string | number)[];

export interface GetProductsFilter {
  /**
   * Associative array of the product attribute based filters for filtering.
   */
  attributeFilters?: Record<string, AttributeFilterValue>;

  /**
   * Offset for the products list. Default value: 0
   */
  offset?: number;

  /**
   * Maximum amount of products within the response. Upper limit is 500.
   */
  limit?: number;
}

export interface MeasureUnit {
  value: number;
  measureUnit: string;
}

export type AttributeHits = Record<string, any>;

export interface FilterHits {
  attributeHits: AttributeHits;
}

export type ProductAttributes = Record<string, any>;

export interface Product {
  productUid: string;
  attributes: ProductAttributes;
  weight: MeasureUnit;
  dimensions: MeasureUnit[];
  supportedCountries: string[];
}

export interface GetProductsResponse {
  products: Product[];
  hits: FilterHits;
}

export interface GetProductResponse extends Product {
  isStockable: boolean;
  isPrintable: boolean;
  validPageCounts: number[];
  notSupportedCountries: string[];
}
