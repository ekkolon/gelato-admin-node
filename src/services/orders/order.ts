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

import { ShipmentMethodType } from '../shipment/shipment';

export type OrderChannel = 'ui' | 'api' | 'shopify' | 'etsy';

export type OrderFulfillmentStatus =
  | 'created'
  | 'passed'
  | 'failed'
  | 'canceled'
  | 'printed'
  | 'shipped'
  | 'draft'
  | 'pending_approval'
  | 'not_connected'
  | 'on_hold';

export type OrderFinancialStatus =
  | 'draft'
  | 'pending'
  | 'invoiced'
  | 'to_be_invoiced'
  | 'paid'
  | 'canceled'
  | 'partially_refunded'
  | 'refunded'
  | 'refused';

export interface GetOrderResponse {
  /** Gelato order id. */
  id: string;
  /** Type of the order. It can be order or draft. Draft orders can be edited from the dashboard and they don't go into production until you decide to convert draft into a regular order via UI or programmatically via Order Patch API. */
  orderType: string;
  /** Reference to your internal order id. */
  orderReferenceId: string;
  /** Reference to your internal customer id. */
  customerReferenceId: string;
  /** The order current fulfillment status. Can be: created, passed, failed, canceled, printed, shipped, draft, pending_approval, not_connected, on_hold. */
  fulfillmentStatus: OrderFulfillmentStatus;
  /** The order current financial status. Can be: draft, pending, invoiced, to_be_invoiced, paid, canceled, partially_refunded, refunded and refused. */
  financialStatus: OrderFinancialStatus;
  /** The order currency in iso code standard ISO 4217. */
  currency: string;
  /** The order channel. Can be: ui, api, shopify and etsy. */
  channel: OrderChannel;
  /** E-commerce store ID identifying which store the order was placed in. It will be null if the order was placed via UI or API. */
  storeId?: string;
  /** Date and time in ISO 8601 format when order was created. */
  createdAt: string;
  /** Date and time in ISO 8601 format when order was updated. */
  updatedAt: string;
  /** Date and time in ISO 8601 format when order was placed. */
  orderedAt: string;
  /** List of order items. */
  items: ItemObject[];
  /** Information about shipment. */
  shipment?: ShipmentObject;
  /** Billing recipient. */
  billingEntity?: BillingEntityObject;
  /** Shipping address. */
  shippingAddress?: OrderGetShippingAddressObject;
  /** Return address. */
  returnAddress?: ReturnAddressObject;
  /** List of order receipts. */
  receipts: ReceiptObject[];
  /** List of connected order IDs. Used when an order needs to be produced in multiple locations for example. Read more here. */
  connectedOrderIds?: string[];
}

export interface ReceiptObject {
  id: string;
  orderId: string;
  transactionType: string;
  currency: string;
  items: ReceiptItemObject[];
  productsPriceInitial: number;
  productsPriceDiscount: number;
  productsPrice: number;
  productsPriceVat: number;
  productsPriceInclVat: number;
  packagingPriceInitial: number;
  packagingPriceDiscount: number;
  packagingPrice: number;
  packagingPriceVat: number;
  packagingPriceInclVat: number;
  shippingPriceInitial: number;
  shippingPriceDiscount: number;
  shippingPrice: number;
  shippingPriceVat: number;
  shippingPriceInclVat: number;
  discount: number;
  discountVat: number;
  discountInclVat: number;
  totalInitial: number;
  total: number;
  totalVat: number;
  totalInclVat: number;
}

export interface ReceiptItemObject {
  id: string;
  receiptId: string;
  referenceId: string;
  type: string;
  title: string;
  currency: string;
  priceBase: string;
  amount: string;
  priceInitial: number;
  discount: number;
  price: number;
  vat: number;
  priceInclVat: number;
  createdAt: string;
  updatedAt: string;
}

export interface BillingEntityObject {
  id: string;
  companyName: string;
  companyNumber?: string;
  companyVatNumber?: string;
  country: string;
  recipientName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postСode: string;
  state?: string;
  email: string;
  phone?: string;
}

export type ItemPreviewType = 'preview_default' | 'preview_thumbnail';

export interface ItemPreview {
  type: ItemPreviewType;
  url: string;
}

export type FileType =
  | 'default'
  | 'back'
  | 'neck-inner'
  | 'neck-outer'
  | 'sleeve-left'
  | 'sleeve-right'
  | 'inside';

export interface File {
  url: string;
  type?: FileType;
}

export interface ItemOption {
  id: string;
  type: 'envelope';
  productUid: string;
  quantity: number;
}

export interface ItemObject {
  id: string;
  itemReferenceId: string;
  productUid: string;
  pageCount?: number;
  quantity: number;
  fulfillmentStatus: OrderFulfillmentStatus;
  files: File[];
  processedFileUrl: string;
  previews: ItemPreview[];
  options?: ItemOption[];
}

export interface ShipmentObject {
  id: string;
  shipmentMethodName: string;
  shipmentMethodUid: string;
  packageCount: number;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  minDeliveryDate: string;
  maxDeliveryDate: string;
  totalWeight: number;
  fulfillmentCountry: string;
  packages: PackageObject[];
}

export interface PackageObject {
  id: string; // Package Id.
  orderItemIds: string[]; // List of order item Ids.
  trackingCode: string; // The tracking code of the package.
  trackingUrl: string; // The tracking url.
}

/**
 * Represents an item in an order.
 */
export interface OrderCreateItemObject {
  /**
   * Reference to your internal order item ID. Must be unique within your order.
   */
  itemReferenceId: string;
  /**
   * Type of printing product in product UID format.
   */
  productUid: string;
  /**
   * The page count for multipage products. This parameter is only needed for multipage products.
   * All pages in the product, including front and back cover, are included in the count.
   * For example, for a Wire-o Notebook there are 112 inner pages (56 leaves), 2 front (outer and inside) and 2 back cover (outer and inside) pages, total 116 pages. The pageCount is 116.
   * Read more: https://docs.printify.com/docs/page-count-parameter
   */
  pageCount?: number;
  /**
   * Files that would be used to generate product file. Files are required for printable products only.
   * Supported file formats are: PDF, PNG, TIFF, SVG and JPEG. For PDF files, please use one of the compatible PDF/X standards, for example in PDF/X-1a:2003 or PDF/X-4 standard.
   */
  files?: File[];
  /**
   * The product quantity. Defines how many copies of product should be printed.
   * The minimum value is 1.
   */
  quantity: number;
}

export interface CreaeOrderMetadataObject {
  key: string;
  value: string;
}

export interface ShippingAddressObject {
  firstName: string;
  lastName: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postCode: string;
  state?: string;
  country: string;
  email: string;
  phone?: string;
  isBusiness?: boolean;
  federalTaxId?: string;
  stateTaxId?: string;
  registrationStateCode?: string;
}

export interface OrderGetShippingAddressObject extends ShippingAddressObject {
  id: string;
}

/**
 * Return address object allows overriding one or multiple fields within sender address of the parcel.
 */
export interface ReturnAddressObject {
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postCode?: string;
  state?: string;
  country?: string;
  email?: string;
  phone?: string;
}

/**
 * Represents the request for creating a new order.
 */
export interface CreateOrderRequest {
  /**
   * The type of the order. Can be "order" or "draft".
   * Default value: "order".
   */
  orderType?: string;
  /**
   * Reference to your internal order ID.
   */
  orderReferenceId: string;
  /**
   * Reference to your internal customer ID.
   */
  customerReferenceId: string;
  /**
   * The ISO code of the currency that the order should be charged in.
   * Supported currencies: EUR, USD, JPY, BGN, CZK, DKK, GBP, HUF, PLN, RON, SEK, CHF, ISK, NOK, HRK, RUB, TRY, AUD, BRL, CAD, CNY, HKD, IDR, ILS, INR, KRW, MXN, MYR, NZD, PHP, SGD, THB, ZAR, CLP, AED.
   * Note: It is applicable only for customers using wallets or credit cards for payments.
   */
  currency: string;
  /**
   * A list of line item objects, each containing information about an item in the order.
   */
  items: OrderCreateItemObject[];
  /**
   * A list of key-value pair objects used for storing additional, structured information on an order.
   * Max number of entries: 20.
   */
  metadata?: CreaeOrderMetadataObject[];
  /**
   * Shipping address information.
   */
  shippingAddress: ShippingAddressObject;
  /**
   * Preferred shipping method identifier. Can be "normal", "express" or shipmentMethodUid value returned in the Quote API call response. By default, the cheapest shipping method will be used.
   */
  shipmentMethodUid?: string;
  /**
   * Return address information.
   */
  returnAddress?: ReturnAddressObject;
}

export interface OrderObject {
  id: string;
  orderReferenceId: string;
  fulfillmentStatus: OrderFulfillmentStatus;
  financialStatus: OrderFinancialStatus;
  currency?: string;
  channel: OrderChannel;
  country?: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
  orderedAt?: string;
}

export interface SearchOrdersRequest {
  ids?: string[];
  orderReferenceId?: string;
  orderReferenceIds?: string[];
  fulfillmentStatuses?: OrderFulfillmentStatus[];
  financialStatuses?: OrderFinancialStatus[];
  channels?: OrderChannel[];
  countries?: string[];
  search?: string;
  startDate?: string[];
  endDate?: string[];
  offset?: number;
  limit?: number;
}

export interface SearchOrdersResponse {
  orders: OrderObject[];
}

export interface QuoteOrderRecipientObject {
  country: string; // The two-character ISO 3166-1 code that identifies the country or region.
  firstName: string; // The first name of the recipient at this address. Maximum length is 25 characters.
  lastName: string; // The last name of the recipient at this address. Maximum length is 25 characters.
  companyName?: string; // The company name of the recipient at this address. Maximum length is 60 characters.
  addressLine1: string; // The first line of the address. For example, number, street, and so on. Maximum length is 35 characters.
  addressLine2?: string; // The second line of the address. For example, suite or apartment number. Maximum length is 35 characters.
  city: string; // The city name. Maximum length is 30 characters.
  postCode: string; // The postal code, which is the zip code or equivalent. Typically required for countries with a postal code or an equivalent. See postal code. Maximum length is 15 characters.
  state?: string; // The code for a US state or the equivalent for other countries. Required for requests if the address is in one of these countries: Australia, Canada or United States. Maximum length is 35 characters. See list of state codes.
  email: string; // The email address for the recipient.
  phone?: string; // The phone number, in E.123 format. Maximum length is 25 characters.
  isBusiness?: boolean; // Boolean value, declares the recipient being a business. Use if tax for recipient country is different for private and business customers (e.g. in Brazil) to change federalTaxId field type. Mandatory for Brazil if recipient is a company.
  federalTaxId?: string; // The Federal Tax identification number of recipient. Use to provide CPF/CNPJ of a Brazilian recipient. Mandatory for Brazil. In order to supply CNPJ instead of CPF, set isBusiness field to true.
  stateTaxId?: string; // The State Tax identification number of recipient. Use to provide IE of a Brazilian recipient. Mandatory for Brazil if recipient is a company. In order to supply this field, set isBusiness field to true.
  registrationStateCode?: string; // The code number for a US state or the equivalent for other countries that defines state where recipient company is registered. Mandatory for Brazil if recipient is a company. In order to supply this field, set isBusiness field to true.
}

export interface QuoteOrderRequestProductObject {
  itemReferenceId: string;
  productUid: string;
  pageCount?: number;
  files?: File[];
  quantity: number;
}

export interface QuoteOrderRequest {
  orderReferenceId: string;
  customerReferenceId: string;
  recipient: QuoteOrderRecipientObject;
  products: QuoteOrderRequestProductObject[];
  currency: string;
  allowMultipleQuotes?: boolean;
}

export interface QuoteOrderResponseProductObject {
  itemReferenceId: string;
  productUid: string;
  pageCount?: number;
  files?: File[];
  quantity: number;
  price: number;
  currency: string;
}

export interface QuoteOrderResponseShipmentMethodObject {
  name: string;
  shipmentMethodUid: string;
  price: number;
  currency: string;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  minDeliveryDate: string;
  maxDeliveryDate: string;
  type: ShipmentMethodType;
  isPrivate: boolean;
  isBusiness: boolean;
  totalWeight: number;
  numberOfParcels: number;
}

export interface QuoteOrder {
  id: string;
  itemReferenceIds: string[];
  fulfillmentCountry: string;
  shipmentMethods: QuoteOrderResponseShipmentMethodObject[];
  products: QuoteOrderResponseProductObject[];
}

export interface QuoteOrderResponse {
  orderReferenceId: string;
  quotes: QuoteOrder[];
}

export interface PatchOrderItemObject {
  id: string;
  files?: File[];
}

export interface PatchOrderRequest {
  orderType: 'order'; // The value should be order to convert draft order into a regular one.
  items?: ItemObject[]; // List of order items which should be modified.
}
