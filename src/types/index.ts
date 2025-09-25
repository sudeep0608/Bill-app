export interface Product {
  id: string;
  name: string;
  price: number;
  gst: number;
  quantity: number;
}

export interface ShopDetails {
  name: string;
  location: string;
  phone?: string;
  email?: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  date: string;
  shopDetails: ShopDetails;
  products: Product[];
  subtotal: number;
  totalGST: number;
  totalAmount: number;
}