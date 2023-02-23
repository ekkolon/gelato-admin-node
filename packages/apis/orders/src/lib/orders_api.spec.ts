import { orders } from './orders_api';

describe('orders', () => {
  it('should work', () => {
    expect(orders()).toEqual('orders');
  });
});
