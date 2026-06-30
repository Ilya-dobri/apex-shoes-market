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

export type Categories = {
  title: string
  description: string

  imageUrl: string
}