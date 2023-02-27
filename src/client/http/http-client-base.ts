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

import { AxiosRequestConfig } from 'axios';
import { GELATO_API_HEADER_KEY } from '../../utils/env';

type ApiHeaderKey = typeof GELATO_API_HEADER_KEY;

export type HttpRequestHeadersInit = Omit<
  AxiosRequestConfig['headers'],
  'Content-Type' | 'content-type' | ApiHeaderKey
>;

export type HttpRequestConfigInit = Omit<AxiosRequestConfig, 'headers' | 'data'> & {
  headers?: HttpRequestHeadersInit;
};

export interface HttpClientBaseOptions {
  apiKey?: string;
}

export class HttpClientBase {
  #options: HttpClientBaseOptions;

  /**
   *
   */
  constructor(options: HttpClientBaseOptions) {
    this.#options = options;
  }

  /**
   * Returns the request headers to be used for all requests.
   * @param headerOptions - Additional headers to be added to the request.
   * @returns The request headers to be used for all requests.
   */
  protected getRequestConfig(requestOptions: HttpRequestConfigInit = {}): AxiosRequestConfig {
    const { headers: headersInit, ...otherOptions } = requestOptions;
    const headers = this.getRequestHeaders(headersInit);
    return { ...otherOptions, headers };
  }

  /**
   * Returns the request headers to be used for all requests.
   * @param headerOptions - Additional headers to be added to the request.
   * @returns The request headers to be used for all requests.
   */
  protected getRequestHeaders(headerOptions: HttpRequestHeadersInit = {}): Record<string, any> {
    const headers: Record<string, any> = {
      ...headerOptions,
      'Content-Type': 'application/json',
    };

    if (this.#options.apiKey) {
      headers[GELATO_API_HEADER_KEY] = this.#options.apiKey;
    }
    return headers;
  }
}
