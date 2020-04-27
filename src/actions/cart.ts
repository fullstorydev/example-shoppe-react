import { Product } from '../types/product';
import { CartTypes } from '../types/cart';
import { BillingInfo } from '../types/checkout';
import { createAction } from '../types/helpers';
import { AppDispatch, AppState } from '../store';
import { makePurchase } from '../services/checkout';

export type CartActionTypes = ReturnType<typeof addToCart> 
  | ReturnType<typeof removeFromCart>
  | ReturnType<typeof completePurchase>;

// TODO: update cart in local storage with a cart service

export const addToCart = (product: Product)  => {
  return createAction({
    type: CartTypes.AddToCart,
    product,
  });
};

export const removeFromCart = (index: number) => {
  throw new Error('error removing item from cart');
  return createAction({
    type: CartTypes.RemoveFromCart,
    index,
  });
};

export const completePurchase = (purchasedProducts: Product[]) => {
  return createAction({
    type: CartTypes.CompletePurchase,
    purchasedProducts,
  });
}

export const checkoutCart = (billingInfo: BillingInfo) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const purchasedProducts = getState().cartState.products;
    return makePurchase(billingInfo, purchasedProducts).then(() => dispatch(completePurchase(purchasedProducts)));
  }
}