import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItemType } from "../types";

type CartState = {
  items: CartItemType[];
  isOpen: boolean;
  isLoading: boolean;
};

type CartActions = {
  // Cart management
  addItem: (item: Omit<CartItemType, "quantity">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Cart UI
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Loading state
  setLoading: (loading: boolean) => void;

  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalDiscount: () => number;
  getFinalPrice: () => number;
};

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      // Cart management
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Add new item with quantity 1
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },

      removeItem: (itemId) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set({
          items: items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Cart UI
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Loading state
      setLoading: (loading) => set({ isLoading: loading }),

      // Computed values
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalDiscount: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          if (item.oldPrice && item.oldPrice > item.price) {
            return total + (item.oldPrice - item.price) * item.quantity;
          }
          return total;
        }, 0);
      },

      getFinalPrice: () => {
        const { getTotalPrice, getTotalDiscount } = get();
        return getTotalPrice() - getTotalDiscount();
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
);

// Convenience hooks for specific actions
export const useCartItems = () => {
  return useCartStore((state) => state.items);
};

export const useCartActions = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};

export const useCartTotals = () => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalDiscount = useCartStore((state) => state.getTotalDiscount);
  const getFinalPrice = useCartStore((state) => state.getFinalPrice);

  return {
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    totalDiscount: getTotalDiscount(),
    finalPrice: getFinalPrice(),
  };
};
