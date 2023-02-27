import { CreateOrderRequest } from '../../src/services/orders';

export const SHIPPING_METHODS = ['normal', 'express', 'pallet'];

export const REQUIRED_ORDER_FIELDS = [
  'orderType',
  'orderReferenceId',
  'customerReferenceId',
  'currency',
  // 'items',
  // 'shippingAddress',
];

export const newDraftOrder: CreateOrderRequest = {
  orderType: 'draft',
  orderReferenceId: 'cat-next-door-1',
  customerReferenceId: 'the-neighbors-cat',
  currency: 'EUR',
  items: [
    {
      itemReferenceId: 'the-cats-preferred-clothing',
      productUid:
        'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_s_gco_white_gpr_4-4',
      quantity: 1,
      files: [
        {
          url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
      ],
    },
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: 'Amazing Node Library 16',
    city: 'NodeFamilyCity',
    postCode: '60306',
    country: 'DE',
    email: 'test@example.com',
  },
};

export const SHIPPING_ADDRESS_FIELDS = Object.keys(newDraftOrder.shippingAddress);
