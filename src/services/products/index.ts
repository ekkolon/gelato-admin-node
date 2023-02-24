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

import { Client, getClient } from '../../client';
import { GelatoClient } from '../../client/gelato-client';
import { ProductsAPI } from './products-api';

/**
 * Gets the {@link ProductsAPI} service for the default client or a
 * given client.
 *
 * `getProductsAPI()` can be called with no arguments to access the default client's
 * {@link ProductsAPI} service or as `getProductsAPI(client)` to access the
 * {@link ProductsAPI} service associated with a specific client.
 *
 * @example
 * ```javascript
 * // Get the ProductsAPI service for the default client
 * const defaultProductsAPI = getProductsAPI();
 * ```
 *
 * @example
 * ```javascript
 * // Get the ProductsAPI service for a given client
 * const otherProductsAPI = getProductsAPI(otherApp);
 * ```
 *
 */
export function getProductsAPI(client?: Client): ProductsAPI {
  if (typeof client === 'undefined') {
    client = getClient();
  }

  const gelatoClient: GelatoClient = client as GelatoClient;
  return gelatoClient.getOrInitService('products', (client) => new ProductsAPI(client));
}

export {
  Catalog,
  CatalogProductAttribute,
  CatalogProductAttributeValue,
  GetCatalogResponse,
  GetCatalogsResponse,
} from './catalog';
export {
  DimensionAttribute,
  GetCoverDimensionsParams,
  GetCoverDimensionsResponse,
} from './cover-dimensions';
export { GetPricesParams, GetPricesQueryParams, GetPricesResponse, Price } from './prices';
export {
  AttributeFilterValue,
  AttributeHits,
  FilterHits,
  GetProductResponse,
  GetProductsFilter,
  GetProductsResponse,
  MeasureUnit,
  Product,
  ProductAttributes,
} from './product';
export { ProductsAPI } from './products-api';
export {
  Availability,
  GetStockAvailabilityResponse,
  ProductAvailability,
  StockAvailabilityRequest,
} from './stock-availability';
