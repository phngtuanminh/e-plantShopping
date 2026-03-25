import { createSlice } from "@reduxjs/toolkit";

/**
 * CartSlice — Paradise Nursery
 * Redux Toolkit slice managing the shopping cart state.
 *
 * State shape:
 *   items: Array<{
 *     id:       number,
 *     name:     string,
 *     latin:    string,
 *     category: string,
 *     price:    number,
 *     img:      string,
 *     quantity: number,
 *   }>
 */

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /* ── 1. addItem ────────────────────────────────────────────
       Adds a plant to the cart.
       • If the plant is already in the cart, increments its quantity by 1.
       • If it is new, pushes it with quantity: 1.
    ─────────────────────────────────────────────────────────── */
    addItem(state, action) {
      const incomingPlant = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === incomingPlant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...incomingPlant, quantity: 1 });
      }
    },

    /* ── 2. removeItem ─────────────────────────────────────────
       Removes a plant from the cart entirely, regardless of quantity.
       Expects action.payload to be the plant's id (number).
    ─────────────────────────────────────────────────────────── */
    removeItem(state, action) {
      const plantId = action.payload;
      state.items = state.items.filter((item) => item.id !== plantId);
    },

    /* ── 3. updateQuantity ─────────────────────────────────────
       Updates the quantity of a specific plant in the cart.
       Expects action.payload: { id: number, quantity: number }
       • If the new quantity is less than 1, the item is removed.
    ─────────────────────────────────────────────────────────── */
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;

      if (quantity < 1) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

/* ── Action creators ── */
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

/* ── Selectors ── */

/** Returns all items currently in the cart. */
export const selectCartItems = (state) => state.cart.items;

/** Returns the total number of individual units in the cart. */
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

/** Returns the grand total price of all items in the cart. */
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
