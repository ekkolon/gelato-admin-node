# Gelato Node.js SDK

A lightweight, zero-dependency Node.js SDK for integrating [Gelato](https://dashboard.gelato.com/docs/)'s print-on-demand services into your application.

This library is tree-shakable, so you only import and bundle the API services you actually use. It supports the usage of multiple Gelato accounts within the same process through [named clients](#using-named-clients).

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Using API services](#using-api-services)
- [Running tests](#running-tests)
- [License](#license)
- [Authors](#authors)
- [Disclaimer](#disclaimer)

## Getting Started

### Prerequisites

Before using this library, complete the following steps:

1. [Create a Gelato account](https://gelato.com)
2. [Generate an API key](https://dashboard.gelato.com/keys/manage)

### Installation

```bash
# npm
npm install gelato-admin

# pnpm
pnpm add gelato-admin

# yarn
yarn add gelato-admin
```

## Usage

Every API service is tied to a `GelatoClient` instance, which handles the request/response lifecycle when communicating with the Gelato API.

There are two ways to initialize a `GelatoClient`:

### 1. Using an environment variable (recommended)

See [.env.example](./.env.example).

```bash
# .env
GELATO_API_KEY=my-api-key
```

```ts
import { initializeClient } from 'gelato-admin';

// Reads the API key from the GELATO_API_KEY environment variable
const client = initializeClient();

// Equivalent to:
const client = initializeClient({ apiKey: process.env.GELATO_API_KEY });
```

### 2. Setting the API key explicitly

> Useful for on-demand initialization and required when using named clients.

```ts
import { initializeClient } from 'gelato-admin';

const client = initializeClient({ apiKey: 'my-api-key' });
```

### Using named clients

> Note: named clients are not a Gelato API feature. They are a design choice for applications that need to operate against multiple Gelato accounts within the same process.

You can initialize as many client instances as needed, as long as each has a unique name. If you only work with a single Gelato account, named clients are not necessary.

```ts
import { initializeClient } from 'gelato-admin';

// Reads from the environment variable, but registers under a specific name
const myDefaultNamedClient = initializeClient({}, 'my-named-client');

// A second client pointing at a different Gelato account
const myOtherClient = initializeClient({ apiKey: 'other-account-api-key' }, 'other-account-client');
```

### Accessing client instances

```ts
import { getClient } from 'gelato-admin';

// Retrieve the default client
const defaultClient = getClient();

// Retrieve a named client
const myNamedClient = getClient('my-named-client');
```

## Using API services

The following API services are available:

| Name          | Module                   | Service             |
| ------------- | ------------------------ | ------------------- |
| **Orders**    | `gelato-admin/orders`    | `getOrdersAPI()`    |
| **Products**  | `gelato-admin/products`  | `getProductsAPI()`  |
| **Shipment**  | `gelato-admin/shipment`  | `getShipmentAPI()`  |
| **Ecommerce** | `gelato-admin/ecommerce` | `getEcommerceAPI()` |

### Default client

```ts
import { getProductsAPI } from 'gelato-admin/products';

const productsAPI = getProductsAPI();

const catalogs = await productsAPI.getCatalogs();
```

### Named client

To use a named client, pass the client instance as the first argument to the service function:

```ts
import { initializeClient } from 'gelato-admin';
import { getOrdersAPI } from 'gelato-admin/orders';

const mySpecialClient = initializeClient({ apiKey: 'my-other-api-key' }, 'my-special-client');

const ordersAPI = getOrdersAPI(mySpecialClient);

const orders = await ordersAPI.getOrders();
```

## Running tests

### Unit tests

```bash
pnpm test
```

### E2E tests

```bash
pnpm test:e2e
```

E2E tests only create draft orders. If a test run fails partway through, check your Gelato dashboard to confirm no non-draft orders were created. If any non-draft orderes were created, you must delete them manually.

## License

Licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Authors

- [Nelson Dominguez](https://www.github.com/ekkolon)

## Disclaimer

This is not an official Gelato product and is not affiliated with Gelato in any way. It was built to make it easier for developers to work with the Gelato API.

> You bear full responsibility for your use of this library. See the [LICENSE](/LICENSE) file for more information.
