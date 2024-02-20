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

export interface GetTemplateResponse {
  /** Template id. */
  id: string;

  /** Template name. */
  templateName: string;

  /** Product title. */
  title: string;

  /** Product description. */
  description: string;

  /** Main product preview url. */
  previewUrl: string;

  /** Array of variants in product template. */
  variants: VariantObject[];

  /** Date and time in ISO 8601 format when template was created. */
  createdAt: string;

  /** Date and time in ISO 8601 format when template was updated. */
  updatedAt: string;
}

export interface VariantObject {
  /** Variant id. */
  id: string;

  /** Variant title. */
  title: string;

  /** Type of printing product in product uid format. */
  productUid: string;

  /**
   * Array of variant options.
   * Fields distinguishing on which properties variant is being split
   */
  variantOptions: VariantOptionObject[];

  /** Array of image placeholders for variant. */
  imagePlaceholders: TemplateImagePlaceholderObject[];
}

export interface VariantOptionObject {
  /** Variant option name. */
  name: string;

  /** Variant option value. */
  value: string;
}

export interface TemplateImagePlaceholderObject {
  /** Image placeholder name. */
  name: string;

  /**
   * Image placeholder print area.
   * Values: front, back, neck-inner, neck-outer, sleeve-left, sleeve-right.
   */
  printArea: 'front' | 'back' | 'neck-inner' | 'neck-outer' | 'sleeve-left' | 'sleeve-right';

  /** Printable area height in mm. */
  height: number;

  /** Printable area width in mm. */
  width: number;
}
