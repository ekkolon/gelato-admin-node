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

import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

import { GELATO_API_HEADER_KEY, GELATO_API_KEY_VAR } from 'src/utils/env';

/**
 * Options to customize how a Gelato {@link HttpClient} processes requests.
 *
 * @publicApi
 */
export interface HttpClientOptions {
  apiKey?: string;
}

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
export class HttpClient {
  constructor(private readonly options: HttpClientOptions) {}

  /**
   * Make a `GET` request to an eligable Gelato API endpoint.
   * @param url Resource URL to fetch.
   * @param options Options to customize the request.
   * @returns
   */
  async get<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response = await axios.get<T>(url, this._mergeRequestConfig(options));

    return response.data;
  }

  /**
   * Make a `POST` request to an eligable Gelato API endpoint.
   * @param url Target url to request data from.
   * @param options Options to customize the request.
   */
  async post<T, D>(
    url: string,
    data: D,
    options: Omit<AxiosRequestConfig<D>, 'data'> = {},
  ): Promise<T> {
    const response = await axios.post<T>(url, data, this._mergeRequestConfig(options));

    return response.data;
  }
  /**
   * Make a `PATCH` request to an eligable Gelato API endpoint.
   * @param url Resource URL to patch.
   * @param options Options to customize the request.
   */
  async patch<T, D>(url: string, data: D, options: Omit<AxiosRequestConfig<D>, 'data'> = {}) {
    const response = await axios.patch<T>(url, data, this._mergeRequestConfig(options));

    return response.data;
  }
  /**
   * Make a `DELETE` request to an eligable Gelato API endpoint.
   * @param url Resource URL to delete.
   * @param options Options to customize the request.
   */
  async delete<T = any>(url: string, options: Omit<AxiosRequestConfig, 'data'> = {}) {
    const response = await axios.delete<T>(url, this._mergeRequestConfig(options));

    return response.data;
  }

  private _mergeRequestConfig(options: AxiosRequestConfig) {
    const { headers, ...requestOptions } = options;
    return { ...requestOptions, headers: this._mergeRequestHeaders(headers) };
  }

  private _mergeRequestHeaders(
    axiosHeaders: AxiosRequestConfig['headers'],
  ): RawAxiosRequestHeaders {
    return { ...axiosHeaders, 'Content-Type': 'application/json', ...this._getAuthHeader() };
  }

  private _getAuthHeader() {
    const apikKey = this.getApiKey();
    return { [GELATO_API_HEADER_KEY]: apikKey };
  }

  private getApiKey(): string {
    const apiKey = this.options?.apiKey ?? process.env[GELATO_API_KEY_VAR];
    if (!this.checkApiKeyValue(apiKey)) {
      throw new Error(`Requests to the Gelato API must use an '${GELATO_API_HEADER_KEY}' header.`);
    }

    return apiKey;
  }

  private checkApiKeyValue(apiKey: unknown): apiKey is string {
    return apiKey != null && typeof apiKey === 'string' && apiKey.length > 0;
  }
}
