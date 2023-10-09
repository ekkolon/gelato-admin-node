import { combineURLs } from '../../utils/urls';

const PRODUCTS_ROOT = 'https://product.gelatoapis.com/v3/';

export const CATALOGS = combineURLs(PRODUCTS_ROOT, 'catalogs');

const STOCK = combineURLs(PRODUCTS_ROOT, 'stock');
export const STOCK_AVAILABILITY = combineURLs(STOCK, 'region-availability');

export const getCatalog = (catalogId: string) => {
  return combineURLs(CATALOGS, catalogId);
};

export const getCatalogProducts = (catalogId: string) => {
  return combineURLs(getCatalog(catalogId), 'products:search');
};

const PRODUCTS = combineURLs(PRODUCTS_ROOT, 'products');

export const getProduct = (productId: string) => {
  return combineURLs(PRODUCTS, productId);
};

export const getProductPrices = (productId: string) => {
  return combineURLs(getProduct(productId), 'prices');
};

export const getProductCoverDimensions = (productId: string) => {
  return combineURLs(getProduct(productId), 'cover-dimensions');
};
