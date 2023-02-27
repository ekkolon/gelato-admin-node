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

import {
  delete as makeDeleteRequest,
  get as makeGetRequest,
  patch as makePatchRequest,
  post as makePostRequest,
} from 'axios';

import { HttpClientBase, HttpClientBaseOptions, HttpRequestConfigInit } from './http-client-base';

/**
 * Options to customize how a Gelato {@link HttpClient} processes requests.
 *
 * @publicApi
 */
export type HttpClientOptions = HttpClientBaseOptions;

/**
 * HTTP client for making (authenticated) requests to Gelato APIs.
 *
 * @remarks
 * All requests to Gelato APIs must include an `X-API-KEY` header.
 *
 * You can provide this value in the following ways:
 *
 * - Using the `apiKey` option when initializing the client.
 * - Using an `GELATO_API_KEY` environment variable (recommended).
 *
 *    Make sure the current node process contains this variable,
 *    either by directly assigning it when running your server process
 *    or by using a _.env_ file and loading it before starting the process.
 *
 * @todo Improve response object - provide more context, like statusCode, url.
 *
 * @publicApi
 */
export class HttpClient extends HttpClientBase {
  /**
   * Make a `GET` request to an eligable Gelato API endpoint.
   * @param url Resource URL to fetch.
   * @param options Options to customize the request.
   * @returns
   */
  async get<T>(url: string, options: HttpRequestConfigInit = {}): Promise<T> {
    const config = this.getRequestConfig(options);
    const response = await makeGetRequest<T>(url, config);

    return response.data;
  }

  /**
   * Make a `POST` request to an eligable Gelato API endpoint.
   * @param url Target url to request data from.
   * @param options Options to customize the request.
   */
  async post<T, D>(url: string, data: D, options: HttpRequestConfigInit = {}): Promise<T> {
    const config = this.getRequestConfig(options);
    const response = await makePostRequest<T>(url, data, config);
    return response.data;
  }
  /**
   * Make a `PATCH` request to an eligable Gelato API endpoint.
   * @param url Resource URL to patch.
   * @param options Options to customize the request.
   */
  async patch<T, D>(url: string, data: D, options: HttpRequestConfigInit = {}) {
    const config = this.getRequestConfig(options);
    const response = await makePatchRequest<T>(url, data, config);
    return response.data;
  }
  /**
   * Make a `DELETE` request to an eligable Gelato API endpoint.
   * @param url Resource URL to delete.
   * @param options Options to customize the request.
   */
  async delete<T = unknown>(url: string, options: HttpRequestConfigInit = {}) {
    const config = this.getRequestConfig(options);
    const response = await makeDeleteRequest<T>(url, config);
    return response.data;
  }
}
