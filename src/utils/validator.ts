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
 * Validates that a value is an array.
 * @param value The value to validate.
 * @returns Whether the value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Validates that a value is a string.
 * @param value The value to validate.
 * @returns Whether the value is a string or not.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Validates that a value is a non-empty string.
 * @param value The value to validate.
 * @returns Whether the value is a non-empty string or not.
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value !== '';
}

/**
 * Validates that a value is a nullable object.
 * @param value The value to validate.
 * @returns Whether the value is an object.
 */
export function isObject(value: unknown): boolean {
  return typeof value === 'object' && !isArray(value);
}

/**
 * Validates that a value is a non-null object.
 * @param value The value to validate.
 * @returns Whether the value is a non-null object.
 */
export function isNonNullObject<T>(value: T | null | undefined): value is T {
  return isObject(value) && value !== null;
}
