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
import { OrdersAPI } from './orders-api';

/**
 * Gets the {@link OrdersAPI} service for the default client or a
 * given client.
 *
 * `getOrdersAPI()` can be called with no arguments to access the default client's
 * {@link OrdersAPI} service or as `getOrdersAPI(client)` to access the
 * {@link OrdersAPI} service associated with a specific client.
 *
 * @example
 * ```javascript
 * // Get the OrdersAPI service for the default client
 * const defaultOrdersAPI = getOrdersAPI();
 * ```
 *
 * @example
 * ```javascript
 * // Get the OrdersAPI service for a given client
 * const otherOrdersAPI = getOrdersAPI(otherApp);
 * ```
 *
 */
export function getOrdersAPI(client?: Client): OrdersAPI {
  if (typeof client === 'undefined') {
    client = getClient();
  }

  const gelatoClient: GelatoClient = client as GelatoClient;
  return gelatoClient.getOrInitService('orders', (client) => new OrdersAPI(client));
}

export {
  BillingEntityObject,
  CreaeOrderMetadataObject,
  CreateOrderRequest,
  File,
  FileType,
  GetOrderResponse,
  ItemObject,
  ItemOption,
  ItemPreview,
  ItemPreviewType,
  OrderChannel,
  OrderCreateItemObject,
  OrderFinancialStatus,
  OrderFulfillmentStatus,
  OrderGetShippingAddressObject,
  OrderObject,
  PackageObject,
  PatchOrderItemObject,
  PatchOrderRequest,
  QuoteOrder,
  QuoteOrderRecipientObject,
  QuoteOrderRequest,
  QuoteOrderRequestProductObject,
  QuoteOrderResponse,
  QuoteOrderResponseProductObject,
  QuoteOrderResponseShipmentMethodObject,
  ReceiptItemObject,
  ReceiptObject,
  ReturnAddressObject,
  SearchOrdersRequest,
  SearchOrdersResponse,
  ShipmentObject,
  ShippingAddressObject,
} from './order';
export { OrdersAPI } from './orders-api';
