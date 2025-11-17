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

import { HttpClientOptions } from './http-client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClientOptions extends HttpClientOptions {}

export interface Client {
  name: string;
  options: ClientOptions;
}

/**
 * `GelatoError` is a subclass of the standard JavaScript `Error` object. In
 * addition to a message string and stack trace, it contains a string code.
 */
export interface GelatoError {
  /**
   * Error codes are strings using the following format: `"service/string-code"`.
   * Some examples include `"products/invalid-id"` and
   * `"orders/invalid-order-type"`.
   */
  code: string;

  /**
   * An explanatory message for the error that just occurred.
   *
   * This message is designed to be helpful to you, the developer. Because
   * it generally does not convey meaningful information to end users,
   * this message should not be displayed in your application.
   */
  message: string;

  /**
   * A string value containing the execution backtrace when the error originally
   * occurred.
   */
  stack?: string;

  /**
   * Returns a JSON-serializable object representation of this error.
   *
   * @returns A JSON-serializable representation of this object.
   */
  toJSON(): object;
}
