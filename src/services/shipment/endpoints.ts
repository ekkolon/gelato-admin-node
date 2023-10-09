import { combineURLs } from '../../utils/urls';

const SHIPMENT_ROOT = 'https://shipment.gelatoapis.com/v1';

export const SHIPMENT_METHODS = combineURLs(SHIPMENT_ROOT, 'shipment-methods');
