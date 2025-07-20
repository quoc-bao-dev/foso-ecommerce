import { create } from "zustand";

export type SortProduct =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | null;

type ProductSectionState = {
  sort: SortProduct;
  gtPrice: number;
  ltPrice: number;
};

type ProductSectionActions = {
  setSort: (sort: string) => void;
  setGtPrice: (gtPrice: number) => void;
  setLtPrice: (ltPrice: number) => void;
};

type ProductSectionStore = ProductSectionState & ProductSectionActions;

export const useProductSectionStore = create<ProductSectionStore>()((set) => ({
  sort: null,
  gtPrice: null,
  ltPrice: null,

  setSort: (sort: SortProduct) => set({ sort }),
  setGtPrice: (gtPrice: number) => set({ gtPrice }),
  setLtPrice: (ltPrice: number) => set({ ltPrice }),
}));

export const useSetFilter = () => {
  const setLtPrice = useProductSectionStore((state) => state.setLtPrice);
  const setGtPrice = useProductSectionStore((state) => state.setGtPrice);

  return {
    setLtPrice,
    setGtPrice,
  };
};

export const useSetSort = () => {
  const setSort = useProductSectionStore((state) => state.setSort);

  return {
    setSort,
  };
};
