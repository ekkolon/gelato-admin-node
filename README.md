# Gelato API - Node.js Client

> WIP - DO NOT USE YET! See [Disclaimer](#disclaimer).

This library provides a simple and straightforward way to interact with the [Gelato API](https://dashboard.gelato.com/docs/), allowing you to easily integrate Gelato's print-on-demand services into your Node.js applications.

See [Gelato API Docs](https://dashboard.gelato.com/docs/) for more details.

## Table of Contents

- [Roadmap](#roadmap)
  - [Development Workflows](#development-workflows)
  - [APIs integration](#apis-integration)
- [License](#license)
- [Authors](#authors)
- [Disclaimer](#disclaimer)

## Roadmap

### Development workflows

- [x] Initialize NX monorepo
- [x] Setup libraries for each Gelato API resource namespace
- [ ] Create and provide ability to initialize `GelatoClient` with options.
  - [ ] Get `apiKey` option from env variable
  - [ ] Provide `apiKey` in _options_ param when initializing the client.
- [x] Create custom HTTP client to make authenticated requests

### APIs integration

_In no particular order._

- [ ] **Gelato Orders API (v4 only)**
  - [ ] Create Order
  - [ ] Get Order
  - [ ] Search Orders
  - [ ] Cancel Orders
  - [ ] Quote Order
  - [ ] Patch Draft Order
  - [ ] Delete Draft Order
- [ ] **Gelato Products API**
  - [ ] Catalog
    - [ ] List Catalogs
    - [ ] Get Catalog
  - [ ] Product
    - [ ] Search Products
    - [ ] Get Product
    - [ ] Get Product Cover Dimensions
  - [ ] Price
    - [ ] Get Product Prices
  - [ ] Stock Availability
    - [ ] Get Product Stock Availability
- [ ] **Gelato Shipment API**
  - [ ] Get Shipment Methods

## License

This project is licensed under the Apache License (2.0) - see the [LICENSE](LICENSE) file for details.

## Authors

- [Nelson Dominguez](https://www.github.com/ekkolon)

## Disclaimer

Please note that this is **_not_ an official Gelato product**. I am in no way affiliated with Gelato. However, I created this client library to make it easier for developers to work with Gelato's powerful print-on-demand platform.

You are fully responsible for your use of this library. See [LICENSE](/LICENSE) file for more information.
