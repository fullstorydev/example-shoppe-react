import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap';
import { AppDispatch } from '../actions';
import { AppState } from "../store";
import { CartViewModifier } from '../types/cart';
import { removeFromCart } from '../actions/cart';

type Props = {
  cartView?: CartViewModifier
}

const CartItems: React.FC<Props> = ({ cartView = CartViewModifier.NONE }) => {
  const products = useSelector((state: AppState) => state.cartState.products);
  const dispatch = useDispatch<AppDispatch>();
  const cartTotal = products.reduce((total, prod) => total + prod.price, 0);
  return (
    <ListGroup>
      { products.map((product, i) => (
        <ListGroup.Item key={product.id}>
          {product.title}
          <span className='cart-price'>${product.price} <span className='text-muted'>{product.unit}</span>
            {CartViewModifier.DELETE === (cartView & CartViewModifier.DELETE) &&
              <span className='fa fa-times text-danger remove-item' onClick={() => dispatch(removeFromCart(i))}></span>
            }
          </span>                     
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <strong>Total</strong> <span className='cart-price'><strong>${cartTotal.toFixed(2)}</strong></span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CartItems;