import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  },
  createProduct: async (newProduct) => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: "Please fill in all fields." };
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: "Created successfully" };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  },
}));
