import { combineURLs } from '../../utils/urls';

const PRODUCTS_API_ROOT_URI = 'https://product.gelatoapis.com/v3/';

const CATALOGS_ROOT_URI = combineURLs(PRODUCTS_API_ROOT_URI, 'catalogs');
const PRODUCTS_ROOT_URI = combineURLs(PRODUCTS_API_ROOT_URI, 'products');
const STOCK_ROOT_URI = combineURLs(PRODUCTS_API_ROOT_URI, 'stock');
const STOCK_AVAILABILITY_URI = combineURLs(STOCK_ROOT_URI, 'region-availability');

/** @internalApi */
export const getCatalogsURL = () => CATALOGS_ROOT_URI;

/** @internalApi */
export const getCatalogURL = (catalogId: string) => {
  return combineURLs(CATALOGS_ROOT_URI, catalogId);
};

/** @internalApi */
export const getProductsURL = (catalogId: string) => {
  return combineURLs(getCatalogURL(catalogId), 'products:search');
};

/** @internalApi */
export const getProductURL = (productId: string) => combineURLs(PRODUCTS_ROOT_URI, productId);

/** @internalApi */
export const getProductPricesURL = (productId: string) => {
  return combineURLs(getProductURL(productId), 'prices');
};

/** @internalApi */
export const getProductCoverDimensionsURL = (productId: string) => {
  return combineURLs(getProductURL(productId), 'cover-dimensions');
};

/** @internalApi */
export const getProductsStockAvailabilityURL = () => STOCK_AVAILABILITY_URI;
