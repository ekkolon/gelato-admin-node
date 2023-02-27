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

import { GelatoError as GelatoErrorInterface } from '../client/core';
/**
 * Defines error info type. This includes a code and message string.
 */
export interface ErrorInfo {
  code: string;
  message: string;
}

/**
 * Gelato error code structure. This extends Error.
 *
 * @param errorInfo - The error information (code and message).
 * @constructor
 */
export class GelatoError extends Error implements GelatoErrorInterface {
  constructor(private errorInfo: ErrorInfo) {
    super(errorInfo.message);

    /* tslint:disable:max-line-length */
    // Set the prototype explicitly. See the following link for more details:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).__proto__ = GelatoError.prototype;
  }

  /** @returns The error code. */
  public get code(): string {
    return this.errorInfo.code;
  }

  /** @returns The error message. */
  public get message(): string {
    return this.errorInfo.message;
  }

  /** @returns The object representation of the error. */
  public toJSON(): object {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

/**
 * A GelatoError with a prefix in front of the error code.
 *
 * @param codePrefix - The prefix to apply to the error code.
 * @param code - The error code.
 * @param message - The error message.
 * @constructor
 */
export class PrefixedGelatoError extends GelatoError {
  constructor(private codePrefix: string, code: string, message: string) {
    super({
      code: `${codePrefix}/${code}`,
      message,
    });

    /* tslint:disable:max-line-length */
    // Set the prototype explicitly. See the following link for more details:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).__proto__ = PrefixedGelatoError.prototype;
  }

  /**
   * Allows the error type to be checked without needing to know implementation details
   * of the code prefixing.
   *
   * @param code - The non-prefixed error code to test against.
   * @returns True if the code matches, false otherwise.
   */
  public hasCode(code: string): boolean {
    return `${this.codePrefix}/${code}` === this.code;
  }
}

/**
 * Gelato Client error code structure. This extends PrefixedGelatoError.
 *
 * @param code - The error code.
 * @param message - The error message.
 * @constructor
 */
export class GelatoClientError extends PrefixedGelatoError {
  constructor(code: string, message: string) {
    super('client', code, message);

    /* tslint:disable:max-line-length */
    // Set the prototype explicitly. See the following link for more details:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).__proto__ = GelatoClientError.prototype;
  }
}

export enum ClientErrorCode {
  NO_API_KEY = 'no-api-key',
  NO_CLIENT = 'no-client',
  INVALID_CLIENT_NAME = 'invalid-client-name',
  INVALID_CLIENT_OPTIONS = 'invalid-client-options',
  DUPLICATE_CLIENT = 'duplicate-client',
}

export enum ClientErrorMessage {
  INVALID_CLIENT_NAME = `Invalid Gelato client name "{{clientName}}" provided. Client name must be a non-empty string.`,
  DUPLICATE_DEFAULT_CLIENT_NAME = `The default Gelato client already exists. This means you called initializeClient()
more than once without providing an client name as the second argument. In most cases
you only need to call initializeClient() once. But if you do want to initialize
multiple clients, pass a second argument to initializeClient() to give each client a unique
name.`,
  DUBPLICATE_CLIENT_NAME = `Gelato client named "{{clientName}}" already exists. This means you called initializeClient()
more than once with the same client name as the second argument. Make sure you provide a
unique name every time you call initializeClient().`,
}
