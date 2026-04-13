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

/**
 * HTTP client for making (authenticated) requests to Gelato APIs.
 *
 * @remarks
 * All requests to Gelato APIs must include an `X-API-KEY` header.
 *
 * You can provide this value in the following ways:
 *
 * - Using the `apiKey` option when initializing the client.
 * - Using a `GELATO_API_KEY` environment variable (recommended).
 *
 * Make sure the current node process contains this variable,
 * either by directly assigning it when running your server process
 * or by using a `.env` file and loading it before starting the process.
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
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Make a `POST` request to an eligable Gelato API endpoint.
   * @param url Target url to request data from.
   * @param options Options to customize the request.
   */
  async post<T, D>(url: string, data: D, options: HttpRequestConfigInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      data,
    });
  }

  /**
   * Make a `PATCH` request to an eligable Gelato API endpoint.
   * @param url Resource URL to patch.
   * @param options Options to customize the request.
   */
  async patch<T, D>(url: string, data: D, options: HttpRequestConfigInit = {}) {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      data,
    });
  }

  /**
   * Make a `DELETE` request to an eligable Gelato API endpoint.
   * @param url Resource URL to delete.
   * @param options Options to customize the request.
   */
  async delete<T = unknown>(url: string, options: HttpRequestConfigInit = {}) {
    return this.request<T>(url, {
      ...options,
      method: 'DELETE',
    });
  }

  private async request<T>(
    url: string,
    reqConfig: HttpRequestConfigInit & { method: string; data?: unknown },
  ): Promise<T> {
    const { headers, data, method, ...otherOptions } = prepareRequestConfig(
      this.options_.apiKey,
      reqConfig,
    );

    const response = await fetch(url, {
      ...otherOptions,
      method,
      headers,
      body: data === undefined ? undefined : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await safeReadErrorBody(response);
      throw new HttpError(response.status, response.statusText, url, errorText);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    // Parse in the current VM context, not undici's internal context.
    // Using response.json() causes a realm mismatch in Jest where
    // `instanceof Array` returns false even though both sides print "Array".
    const text = await response.text();
    return JSON.parse(text) as T;
  }
}

export type HttpRequestHeadersInit = Omit<
  HeadersInit,
  'Content-Type' | 'content-type' | 'X-API-KEY'
>;

export type HttpRequestConfigInit = RequestInit & {
  headers?: HttpRequestHeadersInit;
  data?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
};

/** Options to customize how a Gelato {@link HttpClient} processes requests. */
export interface HttpClientOptions {
  apiKey?: string;
}

/** Constant holding the header key for making authenticated requests to the Gelato API. */
const GELATO_API_HEADER_KEY = 'X-API-KEY';

function prepareRequestConfig(apiKey: string | undefined, reqConfig: HttpRequestConfigInit) {
  const { headers: headers_, data, params, ...otherOptions } = reqConfig;

  const headers: Record<string, string> = {
    ...(headers_ as Record<string, string> | undefined),
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers[GELATO_API_HEADER_KEY] = apiKey;
  }

  return { ...otherOptions, headers, data, params };
}

async function safeReadErrorBody(response: Response): Promise<string | undefined> {
  try {
    return await response.text();
  } catch {
    return undefined;
  }
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
    public readonly body?: string,
  ) {
    super(`HTTP ${status} ${statusText} for ${url}`);
    this.name = 'HttpError';
  }
}
