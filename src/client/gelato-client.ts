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

import { Client, ClientOptions } from './core';
import { deepCopy } from '../utils/deep-copy';
import { ClientErrorCode, GelatoClientError } from '../utils/error';
import { isNonNullObject } from '../utils/validator';
import { HttpClient } from './http-client';

export class GelatoClient implements Client {
  private name_!: string;
  private options_!: ClientOptions;
  private services_: Record<string, unknown> = {};

  private http_!: HttpClient;

  constructor(options: ClientOptions, name: string) {
    this.name_ = name;
    this.options_ = deepCopy(options);

    if (!isNonNullObject(this.options_)) {
      throw new GelatoClientError(
        ClientErrorCode.INVALID_CLIENT_OPTIONS,
        'Invalid Gelato client options passed as the first argument to initializeClient() for the ' +
          `client named "${this.name_}". Options must be a non-null object.`,
      );
    }

    // Initialize the Http client used by all Gelato services internally.
    this.http_ = new HttpClient(options);
  }

  get name(): string {
    return this.name_;
  }

  get options(): ClientOptions {
    return deepCopy(this.options_);
  }

  /**
   * @internal
   */
  get httpClient(): HttpClient {
    return this.http_;
  }

  /**
   * @internal
   */
  getOrInitService<T>(name: string, init: (client: GelatoClient) => T): T {
    return this.ensureService_(name, () => init(this));
  }

   
  private ensureService_<T>(serviceName: string, initializer: () => T): T {
    if (!(serviceName in this.services_)) {
      this.services_[serviceName] = initializer();
    }

    return this.services_[serviceName] as T;
  }
}
