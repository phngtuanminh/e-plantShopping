import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
} from './CartSlice';

function CartItem({ onContinueShopping, onCheckout }) {
  const dispatch  = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  /* ── Total number of items ── */
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /* ── Shipping & tax ── */
  const shipping = cartTotal >= 75 ? 0 : 9.99;
  const tax      = parseFloat((cartTotal * 0.08).toFixed(2));
  const grandTotal = parseFloat((cartTotal + shipping + tax).toFixed(2));

  /* ── Handlers ── */
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleContinueShopping = () => {
    onContinueShopping?.();
  };

  const handleCheckout = () => {
    onCheckout?.();
  };

  /* ── Calculate total cost for each item ── */
  const getItemTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  /* ── Empty cart ── */
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Shopping Cart</h2>
        <p className="cart-empty-msg">
          Your cart is empty. Start shopping to add plants! 🌿
        </p>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <p className="cart-item-count">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>

      {/* ── Cart items list ── */}
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            {/* Plant image */}
            <img
              className="cart-item-image"
              src={item.img}
              alt={item.name}
            />

            {/* Plant details */}
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">Unit Price: ${item.price.toFixed(2)}</p>

              {/* Quantity controls — increment and decrement */}
              <div className="cart-item-quantity">
                <button
                  className="quantity-btn decrement-btn"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn increment-btn"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              {/* Total cost for this item */}
              <p className="cart-item-total">
                Total: <strong>${getItemTotalCost(item)}</strong>
              </p>
            </div>

            {/* Remove item button */}
            <button
              className="remove-item-btn"
              onClick={() => handleRemove(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ── Order summary ── */}
      <div className="cart-summary">
        <h3 className="cart-summary-title">Order Summary</h3>

        <div className="cart-summary-row">
          <span>Subtotal:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <div className="cart-summary-row">
          <span>Shipping:</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="cart-summary-row">
          <span>Tax (8%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* Total cart amount */}
        <div className="cart-summary-row cart-total-row">
          <span>Total Cart Amount:</span>
          <strong>${grandTotal.toFixed(2)}</strong>
        </div>

        {/* Action buttons */}
        <div className="cart-actions">
          {/* Continue Shopping */}
          <button
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>

          {/* Checkout */}
          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
