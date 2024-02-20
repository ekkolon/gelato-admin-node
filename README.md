# Gelato Node.js SDK

A lightweight Node.js SDK to seamlessly integrate [Gelato](https://dashboard.gelato.com/docs/)'s powerful print-on-demand services into your Node applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Using API services](#using-api-services)
- [Running tests](#running-tests)
- [License](#license)
- [Authors](#authors)
- [Disclaimer](#disclaimer)

## Features

- :page_facing_up: Simple and intuitive API
- :sparkles: Query and mutate data from different Gelato accounts
- :deciduous_tree: Tree-shakable - only use and compile services you need
- :shield: Battle-tested

## Getting Started

### Prerequisites

Before you can use this library, you must complete the following steps:

1. [Create a Gelato Account](https://gelato.com)
2. [Generate an API Key](https://dashboard.gelato.com/keys/manage)

### Installation

```bash
# npm
npm install gelato-admin

# yarn
yarn add gelato-admin
```

## Usage

Every API service is tied to a `GelatoClient` instance, whose sole purpose is to handle the request/response life-cycle when querying and mutating your Gelato data.

There are two ways to initialize a `GelatoClient`:

### 1. Using an environment variable (recommended)

See [.env.example](./.env.example).

```bash
# .env

GELATO_API_KEY=my-api-key
```

```ts
import { initializeClient } from 'gelato-admin';

// Auto-detect API key from `.env` file
const client = initializeClient();

// The above snippet is a short-hand equivalent for:
const client = initializeClient({ apiKey: process.env.GELATO_API_KEY });
```

### 2. Setting API key explicitly

> Useful for on-demand client initialization. Required for _named_ clients.

```ts
import { initializeClient } from 'gelato-admin';

const client = initializeClient({ apiKey: 'my-api-key' });
```

### Using named clients

> Note: The usage of named clients _is not_ a native Gelato API feature. It is a design decision based on the idea that you may have different Gelato accounts you want to use within the same application context.

You may initialize as many client instances as you like, provided you initialize them with a unique name. If you only have a single Gelato account, however, there is no need to use named clients at all.

To initialize a _named_ client, pass an unique name as the second argument.

```ts
import { initializeClient } from 'gelato-admin';

// Auto-detect API key from `.env` file, but use a specific name for the client instance.
const myDefaultNamedClient = initializeClient({}, 'my-named-client');

// Use another Gelato account API key
const myOtherClient = initializeClient({ apiKey: 'other-account-api-key' }, 'other-account-client');
```

### Accessing client instances

```ts
import { getClient } from 'gelato-admin';

// Get the default client
const defaultClient = getClient();

// Get a named client
const myNamedClient = getClient('my-named-client');
```

## Using API services

Here is an overview of Gelato API services available in this library.

| Name          | Module                   | Service             |
| ------------- | ------------------------ | ------------------- |
| **Orders**    | `gelato-admin/orders`    | `getOrdersAPI()`    |
| **Products**  | `gelato-admin/products`  | `getProductsAPI()`  |
| **Shipment**  | `gelato-admin/shipment`  | `getShipmentAPI()`  |
| **Ecommerce** | `gelato-admin/ecommerce` | `getEcommerceAPI()` |

### Default client

```ts
import { getProductsAPI } from 'gelato-admin/products';

// Get the products API service from the default client.
const productsAPI = getProductsAPI();

// Get a list of all catalogs
const catalogs = await productsAPI.getCatalogs();
```

### Named client

To target a _named_ client, pass the client instance as the first argument to the desired API service function:

```ts
import { initializeClient } from 'gelato-admin';
import { getOrdersAPI } from 'gelato-admin/orders';

// Initialize a named client with the API key from the environment variable
const mySpecialClient = initializeClient({ apiKey: 'my-other-api-key' }, 'my-special-client');

// Get the products API service using the named client.
const ordersAPI = getOrdersAPI(mySpecialClient);

// Get a list of all orders
const orders = await ordersAPI.getOrders();
```

## Running tests

### Unit tests

```bash
yarn run test
```

### E2E tests

```bash
yarn run test:e2e
```

E2E tests only create draft orders. In case E2E tests fail, make sure to check your Gelato dashboard for whether any orders other than `draft orders` were created. If so, you must delete them manually.

## License

This project is licensed under the Apache License (2.0) - see the [LICENSE](LICENSE) file for more details.

## Authors

- [Nelson Dominguez](https://www.github.com/ekkolon)

## Disclaimer

Please note that this is **_not_ an official Gelato product**. I am in no way affiliated with Gelato. However, I started this library to make it easier for developers to work with Gelato's powerful print-on-demand platform.

> You bear complete responsibility for your utilization of this library. See [LICENSE](/LICENSE) file for more information.
