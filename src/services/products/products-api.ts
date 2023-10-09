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
import { GetCatalogResponse, GetCatalogsResponse } from './catalog';
import { GetCoverDimensionsResponse } from './cover-dimensions';
import * as endpoints from './endpoints';
import { GetPricesResponse } from './prices';
import { GetProductResponse, GetProductsFilter, GetProductsResponse } from './product';
import { GetStockAvailabilityResponse } from './stock-availability';

/**
 * @description
 *
 *
 * @resourceVersion `v3`
 * @resourceURI `https://product.gelatoapis.com/v3/catalogs`
 *
 * @publicApi
 */
export class ProductsAPI extends BaseAPI {
  /**
   * Retrieve a list of available catalogs.
   * @returns A promise resolving with a list of `Catalog` objects.
   */
  async getCatalogs(): Promise<GetCatalogsResponse> {
    return this.httpClient.get<GetCatalogsResponse>(endpoints.CATALOGS);
  }

  /**
   * Retrieve information about a specific catalog.
   * Includes a catalog's attributes which defines the products
   * stored inside of the catalog.
   * @param catalogId The `id` of the catalog to fetch.
   * @returns A promise resolving with a `Catalog` object that contains product attributes.
   */
  async getCatalog(catalogId: string): Promise<GetCatalogResponse> {
    return this.httpClient.get<GetCatalogResponse>(endpoints.getCatalog(catalogId));
  }

  /**
   * Retrieve a list of products within a catalog.
   * @param catalogId The `id` of the catalog from which to query products.
   * @param filter Query parameters to customize the request.
   * @returns A promisve resolving with an object that contains the list of products,
   *  and `hits` for provided _filter_ param (if applicable).
   */
  async getProducts(
    catalogId: string,
    filter: GetProductsFilter = {},
  ): Promise<GetProductsResponse> {
    return this.httpClient.post<GetProductsResponse, GetProductsFilter>(
      endpoints.getCatalogProducts(catalogId),
      filter,
    );
  }

  /**
   * Retrieve detail information about a product.
   * @param productId The `id` of the product to fetch.
   * @returns A promise resolving with an object containing product details.
   */
  async getProduct(productId: string): Promise<GetProductResponse> {
    return this.httpClient.get<GetProductResponse>(endpoints.getProduct(productId));
  }

  /**
   * Get prices for all quantities of a product.
   * @param productId The `id` of the product.
   * @returns A promise resolving with a list of `Price` objects.
   */
  async getProductPrices(productId: string): Promise<GetPricesResponse> {
    return this.httpClient.get<GetPricesResponse>(endpoints.getProductPrices(productId));
  }

  /**
   * Retrieve information about the dimensions of the cover of a product
   * such as photo book or a multi-page brochure.
   * @param productId The `id` of the product.
   * @returns A promise resolving with an object containing details about
   *  the dimensions of the cover of the product by provided `productId`.
   */
  async getCoverDimensions(
    productId: string,
    config: { params: { pageCount: number } },
  ): Promise<GetCoverDimensionsResponse> {
    return this.httpClient.get<GetCoverDimensionsResponse>(
      endpoints.getProductCoverDimensions(productId),
      config,
    );
  }

  /**
   * Get information about the availability of stock-able products in different regions.
   * @param productIds A list of product ids for which to get availability details.
   * @returns A promise resolving with an object containing products availability details.
   */
  async getStockAvailability(productIds: string[]): Promise<GetStockAvailabilityResponse> {
    return this.httpClient.post<GetStockAvailabilityResponse, { products: string[] }>(
      endpoints.STOCK_AVAILABILITY,
      { products: productIds },
    );
  }
}
