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

import dotenv from 'dotenv';

import { initializeClient } from '../../src/client';
import { GelatoClient } from '../../src/client/gelato-client';
import { DEFAULT_CLIENT_NAME } from '../../src/client/lifecycle';
import { BaseAPI } from '../../src/services/api-service';
import {
  GetOrderResponse,
  getOrdersAPI,
  OrdersAPI,
  QuoteOrderRequest,
} from '../../src/services/orders';
import {
  GetCatalogResponse,
  GetCatalogsResponse,
  GetProductResponse,
  getProductsAPI,
  GetProductsResponse,
  ProductsAPI,
} from '../../src/services/products';
import { getShipmentAPI, ShipmentAPI } from '../../src/services/shipment';
import { GelatoEnvConfig, GELATO_API_KEY_VAR, loadEnvConfig } from '../../src/utils/env';
import { GelatoClientError } from '../../src/utils/error';

import * as ordersMock from '../resources/order.mocks';

describe('Gelato Admin', () => {
  const envConfig = initializeTestEnvironmentVariables();
  const defaultGelatoClient = initializeClient(envConfig) as GelatoClient;

  describe('gelato-admin#Client', () => {
    it('should create an instance of `GelatoClient`', async () => {
      expect(defaultGelatoClient).toBeDefined();
      expect(defaultGelatoClient).toBeInstanceOf(GelatoClient);
    });

    it('should throw when attempting to initialize a client with an invalid client name', async () => {
      expect(() => initializeClient(undefined, '')).toThrowError(GelatoClientError);
    });

    it('should throw when attempting to initialize a client with an invalid api key', async () => {
      expect(() => initializeClient({ apiKey: '' }, 'invalid-api-key')).toThrow(GelatoClientError);
    });
  });

  describe('gelato-admin/products', () => {
    let catalogs: GetCatalogsResponse;
    const productsAPI = getProductsAPI(defaultGelatoClient);

    describe('getProductsAPI', () => {
      runServiceInitTest('ProductsAPI', productsAPI, ProductsAPI, envConfig);
    });

    let catalog: GetCatalogResponse;

    describe('productsAPI#getCatalogs', () => {
      it('should return an object with a `data` and `pagination` property', async () => {
        catalogs = await productsAPI.getCatalogs();
        expect(catalogs).toHaveProperty('data');
        expect(catalogs).toHaveProperty('pagination');
      });

      it('should contain a list of catalogs in the `data` with a length > 0', async () => {
        expect(catalogs.data).toBeInstanceOf(Array);
        expect(catalogs.data.length).toBeGreaterThan(0);
      });
    });

    describe('productsAPI#getCatalog', () => {
      it('should return a catalog by id using the first item in the catalogs response', async () => {
        catalog = await productsAPI.getCatalog((catalogs as any).data[0].catalogUid);
        expect(catalog).toBeDefined();
      });

      it('should contain three properties: catalogUid, title, productAttributes', () => {
        expect(catalog).toHaveProperty('catalogUid');
        expect(catalog).toHaveProperty('title');
        expect(catalog).toHaveProperty('productAttributes');
      });
    });

    let allProductsResponse: GetProductsResponse;

    describe('productsAPI#getProducts', () => {
      it('should return an object with a `products` and `hits` property', async () => {
        allProductsResponse = await productsAPI.getProducts(catalog.catalogUid);
        expect(allProductsResponse).toHaveProperty('products');
        expect(allProductsResponse).toHaveProperty('hits');
      });

      it('should contain a list of products in the `products` with a length > 0', async () => {
        expect(allProductsResponse.products).toBeInstanceOf(Array);
        expect(allProductsResponse.products.length).toBeGreaterThan(0);
      });

      it('should only return 3 items when the limit filter is set to 3', async () => {
        allProductsResponse = await productsAPI.getProducts(catalog.catalogUid, {
          attributeFilters: {},
          limit: 3,
        });
        expect(allProductsResponse.products).toBeInstanceOf(Array);
        expect(allProductsResponse.products.length).toEqual(3);
      });
    });

    let product: GetProductResponse;
    describe('productsAPI#getProduct', () => {
      it('should return a product by id using the first item in the products response', async () => {
        product = await productsAPI.getProduct(allProductsResponse.products[0].productUid);
        expect(product).toBeDefined();
        expect(product).toHaveProperty('productUid');
        expect(product.productUid).toEqual(allProductsResponse.products[0].productUid);
      });
    });

    describe('productsAPI#getCoverDimensions', () => {
      it('should get cover dimensions for specific product', async () => {
        const productWithCoverDimensionsId =
          'photobooks-hardcover_pf_210x280-mm-8x11-inch_pt_170-gsm-65lb-coated-silk_cl_4-4_ccl_4-4_bt_glued-left_ct_matt-lamination_prt_1-0_cpt_130-gsm-65-lb-cover-coated-silk_ver';
        const coverDimensions = await productsAPI.getCoverDimensions(productWithCoverDimensionsId, {
          params: { pageCount: 30 },
        });
        expect(coverDimensions).toBeDefined();
      });
    });

    describe('productsAPI#getProductPrices', () => {
      it('should return a list prices for a specific product', async () => {
        const prices = await productsAPI.getProductPrices(product.productUid);
        expect(prices).toBeInstanceOf(Array);
        expect(prices.length).toBeGreaterThan(0);
      });
    });

    describe('productsAPI#getStockAvailability', () => {
      it('should return stock availability metadata for a list of productIds', async () => {
        const productUids = allProductsResponse.products.map((p) => p.productUid);
        const stock = await productsAPI.getStockAvailability(productUids);
        expect(productUids.length).toEqual(3);
        expect(stock.productsAvailability).toBeDefined();
      });
    });
  });

  describe('gelato-admin/shipment', () => {
    let shipmentAPI: ShipmentAPI = getShipmentAPI(defaultGelatoClient);

    describe('getShipmentAPI', () => {
      runServiceInitTest('ShipmentAPI', shipmentAPI, ShipmentAPI, envConfig);
    });

    describe('shipmentAPI#getShipmentMethods()', () => {
      it('should return available shipment methods', async () => {
        const response = await shipmentAPI.getShipmentMethods();
        expect(response.shipmentMethods?.length).toBeGreaterThan(0);
        expect(response.shipmentMethods[0].shipmentMethodUid).toBeDefined();
        expect(response.shipmentMethods[0].name).toBeDefined();
        expect(['normal', 'express', 'pallet']).toContain(response?.shipmentMethods[0]?.type);
        expect(Array.isArray(response?.shipmentMethods[0]?.supportedCountries)).toBe(true);
      });
    });
  });

  describe('gelato-admin/orders', () => {
    let ordersAPI: OrdersAPI = getOrdersAPI(defaultGelatoClient);

    describe('getOrdersAPI', () => {
      runServiceInitTest('OrdersAPI', ordersAPI, OrdersAPI, envConfig);
    });

    let placedDraftOrder: GetOrderResponse;
    describe('ordersAPI#createDraftOrder', () => {
      it('should create a new draft order', async () => {
        const mockedOrder = ordersMock.newDraftOrder as any;
        const newOrder = (await ordersAPI.createOrder(mockedOrder)) as any;
        expect(newOrder.id).toBeDefined();
        ordersMock.REQUIRED_ORDER_FIELDS.forEach((field) =>
          expect((newOrder as any)[field]).toBe(mockedOrder[field]),
        );
        ordersMock.SHIPPING_ADDRESS_FIELDS.forEach((field) =>
          expect(newOrder.shippingAddress[field]).toBe(mockedOrder.shippingAddress[field]),
        );
        expect(newOrder.shipment).toBeDefined();
        expect(newOrder.items.length).toBe(mockedOrder.items.length);
        expect(newOrder.receipts.length).toBeGreaterThan(0);

        placedDraftOrder = newOrder;
      });
    });

    let fetchedOrder: GetOrderResponse;
    describe('ordersAPI#getOrder', () => {
      it('should return the newly created draft order order', async () => {
        fetchedOrder = await ordersAPI.getOrder(placedDraftOrder.id);
        expect(fetchedOrder.id).toBe(placedDraftOrder.id);
      });

      it('should throw if the order does not exist', async () => {
        await expect(ordersAPI.getOrder('THIS_ORDER_ID_DOES_NOT_EXIST')).rejects.toThrow();
      });
    });

    describe('ordersAPI#getOrders', () => {
      it('should return a list of orders by ids', async () => {
        const response = await ordersAPI.getOrders({ ids: [placedDraftOrder.id] });
        expect(response.orders.length).toBeGreaterThanOrEqual(1);
      });

      it('should return a list of orders by orderReferenceIds', async () => {
        const response = await ordersAPI.getOrders({
          orderReferenceIds: [placedDraftOrder.orderReferenceId],
        });
        expect(response.orders.length).toBeGreaterThanOrEqual(1);
      });

      it('should return a list of orders by search term "cat"', async () => {
        const response = await ordersAPI.getOrders({ search: 'cat' });
        expect(response.orders.length).toBeGreaterThan(0);
      });

      it('should return a list of orders by country "DE"', async () => {
        const response = await ordersAPI.getOrders({
          countries: [placedDraftOrder?.shippingAddress?.country!],
        });
        expect(response.orders.length).toBeGreaterThan(0);
      });

      it('should return a list of orders by country "DE"', async () => {
        const response = await ordersAPI.getOrders({
          countries: [placedDraftOrder?.shippingAddress?.country!],
        });
        expect(response.orders.length).toBeGreaterThan(0);
      });

      it('should return an empty list if a non-existing "orderReferenceId" is provided', async () => {
        const response = await ordersAPI.getOrders({
          orderReferenceId: 'THIS_REFERENCE_DOES_NOT_EXIST',
        });
        expect(response.orders.length).toEqual(0);
      });
    });

    describe('ordersAPI#quoteOrder()', () => {
      it('should quote an order', async () => {
        const {
          orderType,
          items: products,
          shippingAddress: recipient,
          ...mockedDraftOrder
        } = ordersMock.newDraftOrder;
        const newQuote: QuoteOrderRequest = { ...mockedDraftOrder, products, recipient };
        const response = await ordersAPI.quoteOrder(newQuote);

        expect(response).toBeDefined();
        expect(response.quotes.length).toBeGreaterThan(0);

        const firstQuote = response.quotes[0];

        expect(firstQuote.itemReferenceIds).toContain(newQuote.products[0].itemReferenceId);
        expect(firstQuote.fulfillmentCountry).toBeDefined();

        expect(firstQuote.products.length).toBeGreaterThan(0);
        expect(firstQuote.shipmentMethods.length).toBeGreaterThan(0);

        expect(firstQuote.products[0].currency).toBe(newQuote.currency);
        expect(firstQuote.shipmentMethods[0].currency).toBe(newQuote.currency);
      });
    });

    describe('ordersAPI#deleteDraftOrder', () => {
      it('should throw if the order does not exist', async () => {
        await expect(ordersAPI.deleteDraftOrder('THIS_ORDER_DOES_NOT_EXIST')).rejects.toThrow();
      });
      it('should delete the placed draft order', async () => {
        await expect(ordersAPI.deleteDraftOrder(fetchedOrder.id)).resolves.not.toThrow();
      });
    });

    // let updatedOrder: GetOrderResponse;
    // describe('ordersAPI#patchOrder', () => {
    //   it('should patch the order type to "order"', async () => {
    //     placedDraftOrder = await ordersAPI.createOrder(ordersMock.newDraftOrder);
    //     updatedOrder = await ordersAPI.patchDraftOrder(placedDraftOrder.id, {
    //       orderType: 'order',
    //     });
    //     expect(updatedOrder.orderType).toBe('order');
    //
    //     await expect(
    //       ordersAPI.patchDraftOrder('INVALID-ORDER-ID', { orderType: 'order' }),
    //     ).rejects.toThrow();
    //   });
    // });

    // it('should cancel the placed order', async () => {
    //   await expect(ordersAPI.cancelOrder(placedDraftOrder.id)).resolves.not.toThrow();
    //   await expect(ordersAPI.cancelOrder('INVALID-ORDER-ID')).rejects.toThrow();
    // });
  });
});

function runServiceInitTest(
  name: string,
  serviceInstance: BaseAPI,
  expectedType: any,
  env: GelatoEnvConfig,
) {
  it(`should return an instance of ${name}`, async () => {
    expect(serviceInstance).toBeDefined();
    expect(serviceInstance).toBeInstanceOf(expectedType);
  });

  it('should have a "client" property that is an instance of `GelatoClient`', async () => {
    expect(serviceInstance.client).toBeDefined();
    expect(serviceInstance.client).toBeInstanceOf(GelatoClient);
  });

  it(`should have a "client.name" property which has a value of ${DEFAULT_CLIENT_NAME}`, async () => {
    expect(serviceInstance.client.name).toEqual(DEFAULT_CLIENT_NAME);
  });

  it('should have a "client.apiKey" property which has a value of the api key used to initialize the client', async () => {
    expect(serviceInstance.client.options.apiKey).toEqual(env.apiKey);
  });
}

function initializeTestEnvironmentVariables() {
  // Load environment variables from .env file
  dotenv.config();

  try {
    return loadEnvConfig();
  } catch (error) {
    throw new Error(
      `Error loading environment variables.
    To run the end-to-end tests, you need to create a .env file in the root directory of the project.
    It must contain the following variables: ${GELATO_API_KEY_VAR}.`,
    );
  }
}
