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

import _ from 'lodash';

import { GelatoClient } from '../../../src/client/gelato-client';
import { GELATO_API_KEY_VAR } from '../../../src/client/lifecycle';
import * as mocks from '../../resources/mocks';

describe('GelatoClient', () => {
  let mockClient: GelatoClient;
  let gelatoApiKeyVar: string | undefined;

  beforeEach(() => {
    gelatoApiKeyVar = process.env[GELATO_API_KEY_VAR];
    delete process.env[GELATO_API_KEY_VAR];
    mockClient = new GelatoClient(mocks.clientOptions, mocks.clientName);
  });

  afterEach(() => {
    if (gelatoApiKeyVar) {
      process.env[GELATO_API_KEY_VAR] = gelatoApiKeyVar;
    } else {
      delete process.env[GELATO_API_KEY_VAR];
    }
  });

  describe('#name', () => {
    it("should return the client's name", () => {
      expect(mockClient.name).toEqual(mocks.clientName);
    });

    it('should be read-only', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mockClient as any).name = 'foo';
      }).toThrow('Cannot set property name of #<GelatoClient> which has only a getter');
    });
  });

  describe('#options', () => {
    it("should return the client's options", () => {
      expect(mockClient.options).toStrictEqual(mocks.clientOptions);
    });

    it('should be read-only', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mockClient as any).options = {};
      }).toThrow('Cannot set property options of #<GelatoClient> which has only a getter');
    });

    it('should not return an object which can mutate the underlying options', () => {
      const original = _.clone(mockClient.options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockClient.options as any).foo = 'changed';
      expect(mockClient.options).toStrictEqual(original);
    });
  });
});
