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

import { GelatoClient } from '../../client/gelato-client';
import { BaseAPI } from '../api-service';
import {
  getOrderCancelURL,
  getOrderQuoteURL,
  getOrdersSearchURL,
  getOrdersURL,
  getOrderURL,
} from './constants';
import {
  CreateOrderRequest,
  GetOrderResponse,
  PatchOrderRequest,
  QuoteOrderRequest,
  QuoteOrderResponse,
  SearchOrdersRequest,
  SearchOrdersResponse,
} from './order';

/**
 * @description
 *
 *
 * @resourceVersion `v4`
 * @resourceURI `https://order.gelatoapis.com/v4/orders`
 *
 * @publicApi
 */
export class OrdersAPI extends BaseAPI {
  constructor(client: GelatoClient) {
    super(client);
  }

  /**
   * Retrieve a list of orders.
   * @param filter An object containing filter properties to customize the query.
   * @returns A promise resolving with a list of orders found.
   */
  getOrders(filter: SearchOrdersRequest = {}): Promise<SearchOrdersResponse> {
    const url = getOrdersSearchURL();
    return this.httpClient.post<SearchOrdersResponse, SearchOrdersRequest>(url, filter);
  }

  /**
   * Get detail information about single order.
   * @param orderId The `id` of the order.
   * @returns A promise resolving with details about the order by provided `orderId`.
   */
  getOrder(orderId: string): Promise<GetOrderResponse> {
    const url = getOrderURL(orderId);
    return this.httpClient.get<GetOrderResponse>(url);
  }

  /**
   * Create an order.
   * @param data Object containing order details.
   * @returns A promise resolving with the newly created `Order` object.
   */
  createOrder(data: CreateOrderRequest): Promise<GetOrderResponse> {
    const url = getOrdersURL();
    return this.httpClient.post<GetOrderResponse, CreateOrderRequest>(url, data);
  }

  /**
   * Convert draft order into a regular one.
   * Note: Only orders having orderType equal to `draft` can be patched.
   * @param orderId The `id` of the order to patch.
   * @param data Data to update the order object.
   * @returns A promise resolving with details about the order by provided `orderId`
   */
  patchDraftOrder(orderId: string, data: PatchOrderRequest): Promise<GetOrderResponse> {
    const url = getOrderURL(orderId);
    return this.httpClient.patch<GetOrderResponse, PatchOrderRequest>(url, data);
  }

  /**
   * Stop the production and shipment process of an order.
   * Note: If the order has moved to status `printed` or `shipped`,
   * the order can't be canceled.
   * @param orderId The `id` of the order to cancel.
   * @returns A promise resolving with true if the order was canceled successfully.
   *  Otherwise, an error is thrown.
   */
  cancelOrder(orderId: string): Promise<true> {
    const url = getOrderCancelURL(orderId);
    return this.httpClient.post<true, undefined>(url, undefined);
  }

  /**
   * Delete a single draft order.
   * Note: Only orders having orderType equal to `draft` can be deleted.
   * @param orderId The `id` of the order to delete.
   */
  deleteDraftOrder(orderId: string): Promise<unknown> {
    const url = getOrderURL(orderId);
    return this.httpClient.delete<unknown>(url);
  }

  /**
   * Get the list of shipping methods and the product requested.
   * @param data Data for the quote request.
   * @returns A promise resolving with an object containing the `orderReferenceId`
   *  and the list of orders.
   */
  quoteOrder(data: QuoteOrderRequest): Promise<QuoteOrderResponse> {
    const url = getOrderQuoteURL();
    return this.httpClient.post<QuoteOrderResponse, QuoteOrderRequest>(url, data);
  }
}
