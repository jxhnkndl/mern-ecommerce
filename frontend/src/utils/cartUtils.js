// Convert prices to two decimal points
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Update the cart and calculate item prices, shipping, tax, and total price
export const updateCart = (state) => {
  // Calculate price of all items in cart (to two decimal points)
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (if order is over $100 = free, otherwise shipping is $10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (15% on all items)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save cart state to local storage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
}