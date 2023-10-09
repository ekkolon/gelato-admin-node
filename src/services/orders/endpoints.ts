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

const ORDERS_ROOT = 'https://order.gelatoapis.com/v4/';

export const GET_ORDERS = combineURLs(ORDERS_ROOT, 'orders');

export const SEARCH_ORDERS = combineURLs(ORDERS_ROOT, 'orders:search');

export const QUOTE_ORDER = combineURLs(`${GET_ORDERS}:quote`, '');

export const getOrder = (orderId: string) => combineURLs(GET_ORDERS, orderId);

export const cancelOrder = (orderId: string) => combineURLs(GET_ORDERS, `${orderId}:cancel`);
