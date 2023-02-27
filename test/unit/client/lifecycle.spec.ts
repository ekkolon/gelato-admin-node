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

import { GelatoClient } from '../../../src/client/gelato-client';
import { ClientStore, DEFAULT_CLIENT_NAME } from '../../../src/client/lifecycle';
import { GELATO_API_KEY_VAR } from '../../../src/utils/env';
import { ClientErrorCode, ClientErrorMessage, GelatoClientError } from '../../../src/utils/error';

import * as mocks from '../../resources/mocks';

describe('ClientStore', () => {
  let mockClientStore: ClientStore;
  let gelatoApiKeyVar: string | undefined;

  beforeEach(() => {
    gelatoApiKeyVar = process.env[GELATO_API_KEY_VAR];
    delete process.env[GELATO_API_KEY_VAR];
    mockClientStore = new ClientStore();
    mockClientStore.initializeClient(mocks.clientOptions, DEFAULT_CLIENT_NAME);
    mockClientStore.initializeClient(mocks.clientOptions, mocks.clientName);
  });

  afterEach(() => {
    if (gelatoApiKeyVar) {
      process.env[GELATO_API_KEY_VAR] = gelatoApiKeyVar;
    } else {
      delete process.env[GELATO_API_KEY_VAR];
    }
  });

  const emptyClientName = '';

  describe('#initializeClient()', () => {
    it('should throw when initialized with an empty clientName', () => {
      const initializeClientCall = () =>
        mockClientStore.initializeClient(mocks.clientOptions, emptyClientName);

      const invalidClientNameError = new GelatoClientError(
        ClientErrorCode.INVALID_CLIENT_NAME,
        ClientErrorMessage.INVALID_CLIENT_NAME.replace('{{clientName}}', emptyClientName),
      );

      expect(initializeClientCall).toThrow(invalidClientNameError);
    });

    it('should throw when attempting to initialize the default client twice', () => {
      const initializeClientCall = () =>
        mockClientStore.initializeClient(mocks.clientOptions, DEFAULT_CLIENT_NAME);

      const invalidClientNameError = new GelatoClientError(
        ClientErrorCode.DUPLICATE_CLIENT,
        ClientErrorMessage.DUPLICATE_DEFAULT_CLIENT_NAME,
      );

      expect(initializeClientCall).toThrow(invalidClientNameError);
    });

    it('should throw when attempting to initialize a client by the same name twice', () => {
      const initializeClientCall = () =>
        mockClientStore.initializeClient(mocks.clientOptions, mocks.clientName);

      const invalidClientNameError = new GelatoClientError(
        ClientErrorCode.DUPLICATE_CLIENT,
        ClientErrorMessage.DUBPLICATE_CLIENT_NAME.replace('{{clientName}}', mocks.clientName),
      );

      expect(initializeClientCall).toThrowError(invalidClientNameError);
    });

    it(`should throw when neither 'option.apiKey' & ${GELATO_API_KEY_VAR} is available`, () => {
      const initializeClientCall = () =>
        mockClientStore.initializeClient(
          mocks.clientOptionsNoApiKey,
          'mock-client-no-api-key-provided',
        );

      expect(initializeClientCall).toThrowError(GelatoClientError);
    });

    it('should throw when an empty apiKey is provided', () => {
      const initializeClientCall = () =>
        mockClientStore.initializeClient(
          mocks.clientOptionsInvalidApiKey,
          'mock-client-invalid-api-key',
        );

      const expectedError = new GelatoClientError(ClientErrorCode.NO_API_KEY, 'Invalid API_KEY');

      expect(initializeClientCall).toThrow(GelatoClientError);
    });

    it('should return an instance of GelatoClient', () => {
      const client = mockClientStore.initializeClient(mocks.clientOptions, 'mock-valid-client');
      expect(client).toBeInstanceOf(GelatoClient);
    });
  });

  describe('#getClient()', () => {
    it('should throw when provided clientName is not a non-empty string', () => {
      const expectedError = makeInvalidClientError(emptyClientName);
      expect(() => mockClientStore.getClient(emptyClientName)).toThrowError(expectedError);
    });

    it('should throw when a client by clientName does not exist', () => {
      const nonExistingClientName = 'non-existing-client-name';
      const expectedErrorMessage = `Gelato client named "${nonExistingClientName}" does not exist. Make sure you call initializeClient() before using any of the Gelato API services.`;
      const expectedError = makeNoClientError(expectedErrorMessage);
      expect(() => mockClientStore.getClient(nonExistingClientName)).toThrowError(expectedError);
    });

    it('should throw when the default clientName does not exist', () => {
      const expectedErrorMessage = `The default Gelato client does not exist. Make sure you call initializeClient() before using any of the Gelato API services.`;
      const expectedError = makeNoClientError(expectedErrorMessage);
      expect(() => new ClientStore().getClient(DEFAULT_CLIENT_NAME)).toThrowError(expectedError);
    });

    it('should return a client instance by given clientName', () => {
      expect(mockClientStore.getClient(mocks.clientName)).toBeInstanceOf(GelatoClient);
    });
  });

  describe('#getClients()', () => {
    it('should return an array with a length of two', () => {
      const clients = mockClientStore.getClients();
      expect(clients).toBeInstanceOf(Array);
      expect(clients.length).toStrictEqual(2);
    });
    it('should return an array where all items are an instance of Client', () => {
      const clients = mockClientStore.getClients();
      clients.forEach((client) => expect(client).toBeInstanceOf(GelatoClient));
    });
  });
});

function makeNoClientError(message: string) {
  return new GelatoClientError(ClientErrorCode.NO_CLIENT, message);
}
function makeInvalidClientError(clientName: string) {
  return new GelatoClientError(
    ClientErrorCode.INVALID_CLIENT_NAME,
    ClientErrorMessage.INVALID_CLIENT_NAME.replace('{{clientName}}', clientName),
  );
}
