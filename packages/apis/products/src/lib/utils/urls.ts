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

import { combineURLs } from '@gelato/shared/http';

const PRODUCTS_API_ROOT_URI = 'https://product.gelatoapis.com/v3/';

const CATALOGS_ROOT_URI = combineURLs(PRODUCTS_API_ROOT_URI, 'catalogs');
const PRODUCTS_ROOT_URI = combineURLs(PRODUCTS_API_ROOT_URI, 'products');
const STOCK_ROOT_URI = combineURLs(PRODUCTS_API_ROOT_URI, 'stock');
const STOCK_AVAILABILITY_URI = combineURLs(STOCK_ROOT_URI, 'region-availability');

/** @internalApi */
export const getCatalogsURL = () => CATALOGS_ROOT_URI;

/** @internalApi */
export const getCatalogURL = (catalogId: string) => {
  return combineURLs(CATALOGS_ROOT_URI, catalogId);
};

/** @internalApi */
export const getProductsURL = (catalogId: string) => {
  return combineURLs(getCatalogURL(catalogId), 'products:search');
};

/** @internalApi */
export const getProductURL = (productId: string) => combineURLs(PRODUCTS_ROOT_URI, productId);

/** @internalApi */
export const getProductPricesURL = (productId: string) => {
  return combineURLs(getProductURL(productId), 'prices');
};

/** @internalApi */
export const getProductCoverDimensionsURL = (productId: string) => {
  return combineURLs(getProductURL(productId), 'cover-dimensions');
};

/** @internalApi */
export const getProductsStockAvailabilityURL = () => STOCK_AVAILABILITY_URI;
