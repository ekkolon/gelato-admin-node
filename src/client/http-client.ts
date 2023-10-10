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
  AxiosRequestConfig,
  delete as makeDeleteRequest,
  get as makeGetRequest,
  patch as makePatchRequest,
  post as makePostRequest,
} from 'axios';

import { GELATO_API_HEADER_KEY } from '../utils/env';

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
 *    or by using a `.env` file and loading it before starting the process.
 *
 * @todo Improve response object - provide more context, like statusCode, url.
 *
 * @publicApi
 */
export class HttpClient {
  constructor(private options_: HttpClientOptions) {}

  /**
   * Make a `GET` request to an eligable Gelato API endpoint.
   * @param url Resource URL to fetch.
   * @param options Options to customize the request.
   * @returns
   */
  async get<T>(url: string, options: HttpRequestConfigInit = {}): Promise<T> {
    const config = prepareRequestConfig(this.options_.apiKey, options);
    const response = await makeGetRequest<T>(url, config);
    return response.data;
  }

  /**
   * Make a `POST` request to an eligable Gelato API endpoint.
   * @param url Target url to request data from.
   * @param options Options to customize the request.
   */
  async post<T, D>(url: string, data: D, options: HttpRequestConfigInit = {}): Promise<T> {
    const config = prepareRequestConfig(this.options_.apiKey, options);
    const response = await makePostRequest<T>(url, data, config);
    return response.data;
  }
  /**
   * Make a `PATCH` request to an eligable Gelato API endpoint.
   * @param url Resource URL to patch.
   * @param options Options to customize the request.
   */
  async patch<T, D>(url: string, data: D, options: HttpRequestConfigInit = {}) {
    const config = prepareRequestConfig(this.options_.apiKey, options);
    const response = await makePatchRequest<T>(url, data, config);
    return response.data;
  }
  /**
   * Make a `DELETE` request to an eligable Gelato API endpoint.
   * @param url Resource URL to delete.
   * @param options Options to customize the request.
   */
  async delete<T = unknown>(url: string, options: HttpRequestConfigInit = {}) {
    const config = prepareRequestConfig(this.options_.apiKey, options);
    const response = await makeDeleteRequest<T>(url, config);
    return response.data;
  }
}

export type HttpRequestHeadersInit = Omit<
  AxiosRequestConfig['headers'],
  'Content-Type' | 'content-type' | 'X-API-KEY'
>;

export type HttpRequestConfigInit = Omit<AxiosRequestConfig, 'headers' | 'data'> & {
  headers?: HttpRequestHeadersInit;
};

/**
 * Options to customize how a Gelato {@link HttpClient} processes requests.
 */
export interface HttpClientOptions {
  apiKey?: string;
}

/**
 * Merge an *incoming* (axios) request config object with internal http config.
 * @param requestOptions - Incoming request config object.
 * @returns The merged Axios request config object.
 */
function prepareRequestConfig(apiKey: string | undefined, reqConfig: HttpRequestConfigInit) {
  const { headers: headers_, ...otherOptions } = reqConfig;
  const headers: Record<string, string> = {
    ...headers_,
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers[GELATO_API_HEADER_KEY] = apiKey;
  }

  return { ...otherOptions, headers };
}
