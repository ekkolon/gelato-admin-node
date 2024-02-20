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
import {
  CreateProductRequest,
  CreateProductResponse,
  GetProductListRequest,
  GetProductListResponse,
  GetProductResponse,
} from './products';
import { GetTemplateResponse } from './templates';

const ECOMMERCE_ROOT_URL = 'https://ecommerce.gelatoapis.com/v1';

const getEcommerceStoreProductsUrl = (storeId: string) => {
  const ecommerceStoresURL = combineURLs(ECOMMERCE_ROOT_URL, 'stores');
  return combineURLs(ecommerceStoresURL, storeId);
};

const ECOMMERCE_TEMPLATES_URL = combineURLs(ECOMMERCE_ROOT_URL, 'templates');

/**
 * @description
 *
 *
 * @resourceVersion `v1`
 * @resourceURI `https://ecommerce.gelatoapis.com/v1`
 *
 * @publicApi
 */
export class EcommerceAPI extends ApiService {
  /**
   * Retrieve a list of products
   * @param params Params to customize query result
   */
  getProducts(storeId: string, params: GetProductListRequest): Promise<GetProductListResponse> {
    const productsUrl = getEcommerceStoreProductsUrl(storeId);
    return this.httpClient.get<GetProductListResponse>(productsUrl, { params });
  }

  /**
   * Retrieve product information
   * @param storeId The target ecommerce store ID.
   * @param productId The ID of the product to fetch.
   */
  getProduct(storeId: string, productId: string): Promise<CreateProductResponse> {
    const productsUrl = getEcommerceStoreProductsUrl(storeId);
    const productUrl = combineURLs(productsUrl, productId);
    return this.httpClient.get<GetProductResponse>(productUrl);
  }

  /**
   * Create a product from template.
   * @param storeId The target ecommerce store ID.
   * @param data Product data.
   */
  createProductFromTemplate(
    storeId: string,
    data: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const url = getEcommerceStoreProductsUrl(storeId);
    return this.httpClient.post<CreateProductResponse, CreateProductRequest>(url, data);
  }

  /**
   * Retrieve template information
   * @param templateId The ID of the template to fetch
   */
  getTemplate(templateId: string): Promise<GetTemplateResponse> {
    const templateUrl = combineURLs(ECOMMERCE_TEMPLATES_URL, templateId);
    return this.httpClient.get<GetTemplateResponse>(templateUrl);
  }
}
