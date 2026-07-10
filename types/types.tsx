export type User = {
  username: string;
  userPassword: number;
};

export type Product = {
  productName: string;
  productPrice: number;
  productId: number | null;
  categoryId: number;
};


export  type UseSportsStoreType = {
  users: User[];
  isLoading: boolean;
  cart: number
  errors: string[];
  products: Product[];
  buttonIDs: number | null;
  addButtonId: (buttonId: number | null) => void;
};

export type CategoryItem = {
  id: string
  label: string
  href: string
}

export type CategoryColumn = {
  id: string
  title: string
  items: CategoryItem[]
}

export type Categories = {
  title: string | undefined
  id: string
  label: string
  description?: string
  imageUrl?: string
  columns: CategoryColumn[]
}