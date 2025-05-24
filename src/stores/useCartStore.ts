import { create } from "zustand";
import { MenuItem } from "@/components/menu/menuItemCard";

type CartItem = MenuItem & { quantity: number };

type CartState = {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        items: [...get().items, { ...item, quantity: 1 }],
      });
    }
  },
  removeFromCart: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },
  increaseQty: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    });
  },
  decreaseQty: (id) => {
    const updated = get().items
      .map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);
    set({ items: updated });
  },
  clearCart: () => {
    set({ items: [] });
  },
  total: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
