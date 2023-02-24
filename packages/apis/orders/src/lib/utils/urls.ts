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

const ORDERS_API_ROOT_URI = 'https://order.gelatoapis.com/v4/';

const ORDERS_ROOT_URI = combineURLs(ORDERS_API_ROOT_URI, 'orders');

/** @internalApi */
export const getOrdersURL = () => combineURLs(ORDERS_ROOT_URI, '');

/** @internalApi */
export const getOrdersSearchURL = () => combineURLs(ORDERS_API_ROOT_URI, 'orders:search');

/** @internalApi */
export const getOrderURL = (orderId: string) => combineURLs(ORDERS_ROOT_URI, orderId);

/** @internalApi */
export const getOrderCancelURL = (orderId: string) => {
  return combineURLs(ORDERS_ROOT_URI, `${orderId}:cancel`);
};

/** @internalApi */
export const getOrderQuoteURL = () => combineURLs(`${ORDERS_ROOT_URI}:quote`, '');
