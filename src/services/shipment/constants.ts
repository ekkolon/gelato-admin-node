import { combineURLs } from '../../utils/urls';

const SHIPMENT_API_ROOT_URI = 'https://shipment.gelatoapis.com/v1';

const SHIPMENT_METHODS_ROOT_URI = combineURLs(SHIPMENT_API_ROOT_URI, 'shipment-methods');

/** @internalApi */
export const getShipmentMethodsURL = () => combineURLs(SHIPMENT_METHODS_ROOT_URI, '');
