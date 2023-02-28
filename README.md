# Gelato API - Node.js Client

A lightweight Node.js client for the [Gelato API](https://dashboard.gelato.com/docs/).

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Initializing a GelatoClient](#initializing-a-gelatoclient)
    - [Using an environment variable (recommended)](#using-an-environment-variable-recommended)
    - [Using the `options.apiKey` parameter](#using-the-optionsapikey-parameter)
  - [Initializing named clients](#initializing-named-clients)
  - [Accessing client instances](#accessing-client-instances)
  - [Using API services](#using-api-services)
    - [Using API services from a named client](#using-api-services-from-a-named-client)
- [Running unit tests](#running-unit-tests)
- [Running e2e tests](#running-e2e-tests)
  - [Remarks](#remarks)
- [License](#license)
- [Authors](#authors)
- [Disclaimer](#disclaimer)

## Features

- :sparkles: Initialize and access multiple clients on-demand
- :deciduous_tree: Tree-shakable (only use and compile the services you need)
- :page_facing_up: Simple and intuitive API
- :shield: Battle-tested

## Getting Started

### Prerequisites

Before you can start using this library, you must complete the following steps:

1. Create a [Gelato Account](https://gelato.com), if you haven't already.
2. Generate an [API Key](https://dashboard.gelato.com/keys/manage)

### Installation

```bash
# npm
npm install gelato-admin

# yarn
yarn add gelato-admin
```

## Usage

Every API service is tied to a `GelatoClient` instance. You can create as many `GelatoClient` instances as you like, provided you initialize them with a unique name. If you only need one client, you can use the default client.

There are two ways to initialize a `GelatoClient`:

### Initializing a GelatoClient

#### Using an environment variable (recommended)

```bash
# .env

GELATO_API_KEY=your-api-key
```

```ts
import { initializeClient } from 'gelato-admin';

// Initialize the default client with the API key from the environment variable
const client = initializeClient();
```

#### Using the `options.apiKey` parameter

```ts
import { initializeClient } from 'gelato-admin';

// Initialize the default client with the API key from the environment variable
const client = initializeClient({ apiKey: 'your-api-key' });
```

### Initializing named clients

When you don't pass a name to the `initializeClient` function, it will initialize the default client. If you want to initialize a named client, you can pass a name as the second argument.

```ts
import { initializeClient } from 'gelato-admin';

// Initialize a named client with the API key from the environment variable
const namedClient = initializeClient({}, 'named-client');
```

### Accessing client instances

You can access an initialized `GelatoClient` instance by using the `getClient` function.

```ts
import { getClient } from 'gelato-admin';

// Get the default client
const client = getClient();

// Get a named client
const mySpecialClient = getClient('my-special-client');
```

### Using API services

Once you have initialized a `GelatoClient` instance, you can use any of the available API services.

```ts
import { getProductsAPI } from 'gelato-admin/products';

// Get the products API service from the default client.
const productsAPI = getProductsAPI();

// Get a list of all catalogs
const catalogs = await productsAPI.getCatalogs();
```

#### Using API services from a named client

In cases where you wish to use a named client, you can pass an instance of the client as the first parameter to the API service function.

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

## Running unit tests

To run unit tests, run the following command:

```bash
yarn run test
```

## Running e2e tests

e2e tests are intended to be run against a live Gelato API instance. To run e2e tests, you must first create a `.env` file in the root directory of the project and add the following environment variables:

```bash
GELATO_API_KEY=your-api-key
```

To inovke e2e testing, run the following command:

```bash
yarn run test:e2e
```

### Remarks

If any of the e2e tests fail, make sure you check your orders in the Gelato dashboard if any (draft) orders were created. If so, you will need to manually delete them.

_However, **no actual orders are created**_ during e2e testing. The e2e tests are designed to only create draft orders. If you see any orders in your dashboard that are not drafts, please open an issue.

## License

This project is licensed under the Apache License (2.0) - see the [LICENSE](LICENSE) file for details.

## Authors

- [Nelson Dominguez](https://www.github.com/ekkolon)

## Disclaimer

Please note that this is **_not_ an official Gelato product**. I am in no way affiliated with Gelato. However, I created this client library to make it easier for developers to work with Gelato's powerful print-on-demand platform.

You are fully responsible for your use of this library. See [LICENSE](/LICENSE) file for more information.
