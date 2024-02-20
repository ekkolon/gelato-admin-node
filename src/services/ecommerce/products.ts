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

export interface GetProductListRequest {
  /** Sorting by orderBy field. Could be desc or asc. By default - desc. */
  order?: 'desc' | 'asc';

  /** Sorting field. Could be createdAt or updatedAt. By default - createdAt. */
  orderBy?: 'createdAt' | 'updatedAt';

  /** Offset for pagination (default: 0). */
  offset?: number;

  /** Limit for pagination (default: 100, maximum: 100). */
  limit?: number;
}

export interface GetProductListResponse {
  /** List of products. */
  products: GetProductResponse[];
}

export interface GetProductRequest {
  /** Store id. */
  storeId: string;

  /** Product id. */
  productId: string;
}

export interface GetProductResponse {
  /** Product id. */
  id: string;

  /** Store id. */
  storeId: string;

  /** Product id from your store. */
  externalId: string;

  /** Product title. */
  title: string;

  /** Product description. */
  description: string;

  /** Product preview url. */
  previewUrl: string;

  /** Product preview url from your store. */
  externalPreviewUrl: string;

  /** Product thumbnail url from your store. */
  externalThumbnailUrl: string;

  /** Publishing error code. */
  publishingErrorCode: string;

  /** Product status. Can be created, publishing, publishing_error, active. */
  status: 'created' | 'publishing' | 'publishing_error' | 'active';

  /** Date and time in ISO 8601 format when product was published. */
  publishedAt: string;

  /** Date and time in ISO 8601 format when product was created. */
  createdAt: string;

  /** Date and time in ISO 8601 format when product was updated. */
  updatedAt: string;

  /** Product variants. */
  variants: GetProductVariantObject[];

  /** Product variant options. */
  productVariantOptions: ProductVariantOption[];
}

export interface GetProductVariantObject {
  /** Variant id. */
  id: string;

  /** Product id. */
  productId: string;

  /** Variant title. */
  title: string;

  /** Variant id from your store. */
  externalId: string;

  /** Variant connection status. Can be connected, not_connected, ignored. */
  connectionStatus: 'connected' | 'not_connected' | 'ignored';
}

export interface ProductVariantOption {
  /** Variant option name. */
  name: string;

  /** Variant option values. */
  values: string[];
}

export interface CreateProductRequest {
  /** Store id. */
  storeId: string;

  /** Template id. */
  templateId: string;

  /** Product title. */
  title: string;

  /** Product description. */
  description: string;

  /**
   * Indicates whether the product is visible in the online store. 7
   * By default - false.
   */
  isVisibleInTheOnlineStore?: boolean;

  /**
   * Whether the product is published to the Point of Sale channel.
   * Possible values: web, global.
   * By default - web.
   * web - The product isn't published to the Point of Sale channel.
   * global - The product is published to the Point of Sale channel.
   * We support it only for Shopify stores.
   */
  salesChannels?: string[];

  /**
   * Array of product variants, each containing information about
   * the variant placeholders which need to be updated.
   *
   * If you do not provide variants in the request, the product will
   * be created with variants as per variants in template.
   *
   * If only a few variants are provided, the product will be created
   * with those variants plus the remaining variants from template variants.
   *
   * For example if template has three variants Small, Medium and Large
   * and you provide only Small and Medium variant information then the
   * product will also include Large variants based on the settings in template.
   */
  variants?: CreateProductVariantObject[];

  /**
   * List of tags that are used for filtering and search.
   * A product can have up to 13 tags.
   * Each tag can have up to 255 characters.
   * In the case of Etsy tag length is limited to 20 characters.
   */
  tags?: string[];
}

export interface CreateProductResponse {
  /** Store product id. */
  id: string;

  /** Store id. */
  storeId: string;

  /** Product id on external store. */
  externalId?: string;

  /** Product title. */
  title: string;

  /** Product description. */
  description: string;

  /** Product preview url. */
  previewUrl: string;

  /** Product status.
   *
   * Possible values: created, publishing, active, publishing_error.
   */
  status: 'created' | 'publishing' | 'active' | 'publishing_error';

  /** List of product tags. */
  tags?: string[];

  /** Date and time in ISO 8601 format when product was published. */
  publishedAt?: string;

  /** Date and time in ISO 8601 format when product was created. */
  createdAt: string;

  /** Date and time in ISO 8601 format when product was updated. */
  updatedAt: string;
}

export interface CreateProductVariantObject {
  /** Template Variant Id. */
  templateVariantId: string;

  /** Variant position. By default - 0. */
  position?: number;

  /** Array of image placeholders which need to be updated. */
  imagePlaceholders?: ProductImagePlaceholderObject[];
}

export interface ProductImagePlaceholderObject {
  /** Image placeholder name. */
  name: string;

  /**
   * Image placeholder file URL.
   *
   * Supported file types: jpg, jpeg, png, pdf.
   */
  fileUrl: string;

  /**
   * A way how image should be inserted.
   *
   * Possible values: slice, meet.
   *
   * @default 'slice'
   */
  fitMethod?: 'slice' | 'meet';
}
