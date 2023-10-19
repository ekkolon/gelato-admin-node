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

import { combineURLs } from '../../utils/urls';
import { ApiService } from '../api-service';
import { GetCatalogResponse, GetCatalogsResponse } from './catalog';
import { GetCoverDimensionsResponse } from './cover-dimensions';
import { GetPricesResponse } from './prices';
import { GetProductResponse, GetProductsFilter, GetProductsResponse } from './product';
import { GetStockAvailabilityResponse } from './stock-availability';

const PRODUCTS_ROOT_URL = 'https://product.gelatoapis.com/v3/';

const CATALOGS_URL = combineURLs(PRODUCTS_ROOT_URL, 'catalogs');

const STOCK_URL = combineURLs(PRODUCTS_ROOT_URL, 'stock');

const STOCK_AVAILABILITY_URL = combineURLs(STOCK_URL, 'region-availability');

const getCatalogURL = (catalogId: string) => {
  return combineURLs(CATALOGS_URL, catalogId);
};

const getCatalogProductsURL = (catalogId: string) => {
  return combineURLs(getCatalogURL(catalogId), 'products:search');
};

const PRODUCTS_URL = combineURLs(PRODUCTS_ROOT_URL, 'products');

const getProductURL = (productId: string) => combineURLs(PRODUCTS_URL, productId);

const getProductPricesURL = (productId: string) => {
  return combineURLs(getProductURL(productId), 'prices');
};

const getProductCoverDimensionsURL = (productId: string) => {
  return combineURLs(getProductURL(productId), 'cover-dimensions');
};

/**
 * @description
 *
 *
 * @resourceVersion `v3`
 * @resourceURI `https://product.gelatoapis.com/v3/catalogs`
 *
 * @publicApi
 */
export class ProductsAPI extends ApiService {
  /**
   * Retrieve a list of available catalogs.
   * @returns A promise resolving with a list of `Catalog` objects.
   */
  async getCatalogs(): Promise<GetCatalogsResponse> {
    return this.httpClient.get<GetCatalogsResponse>(CATALOGS_URL);
  }

  /**
   * Retrieve information about a specific catalog.
   * Includes a catalog's attributes which defines the products
   * stored inside of the catalog.
   * @param catalogId The `id` of the catalog to fetch.
   * @returns A promise resolving with a `Catalog` object that contains product attributes.
   */
  async getCatalog(catalogId: string): Promise<GetCatalogResponse> {
    return this.httpClient.get<GetCatalogResponse>(getCatalogURL(catalogId));
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
      getCatalogProductsURL(catalogId),
      filter,
    );
  }

  /**
   * Retrieve detail information about a product.
   * @param productId The `id` of the product to fetch.
   * @returns A promise resolving with an object containing product details.
   */
  async getProduct(productId: string): Promise<GetProductResponse> {
    return this.httpClient.get<GetProductResponse>(getProductURL(productId));
  }

  /**
   * Get prices for all quantities of a product.
   * @param productId The `id` of the product.
   * @returns A promise resolving with a list of `Price` objects.
   */
  async getProductPrices(productId: string): Promise<GetPricesResponse> {
    return this.httpClient.get<GetPricesResponse>(getProductPricesURL(productId));
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
      getProductCoverDimensionsURL(productId),
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
      STOCK_AVAILABILITY_URL,
      { products: productIds },
    );
  }
}
