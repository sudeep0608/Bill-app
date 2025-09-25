import React from 'react';
import { Trash2, CreditCard as Edit3, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onRemoveProduct: (id: string) => void;
  onUpdateProduct: (id: string, product: Omit<Product, 'id'>) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onRemoveProduct, onUpdateProduct }) => {
  if (products.length === 0) {
    return (
      <div className="glass rounded-2xl shadow-2xl p-12 mb-8 border border-white/20 text-center backdrop-blur-xl">
        <div className="relative inline-block">
          <Package className="w-20 h-20 text-white/50 mx-auto mb-6 float" />
          <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full blur-xl mx-auto"></div>
        </div>
        <p className="text-white/80 text-xl font-medium mb-2">No products added yet</p>
        <p className="text-white/60">Add products using the form above</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 card-hover backdrop-blur-xl">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Package className="w-8 h-8 text-white mr-4" />
          <div className="absolute inset-0 w-8 h-8 bg-purple-500/30 rounded-full blur-lg"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Products ({products.length})</h2>
          <p className="text-white/70">Manage your product list</p>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full table-auto bg-white/5 backdrop-blur-sm">
          <thead>
            <tr className="bg-white/10 border-b border-white/20">
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                Price (₹)
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                GST (%)
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                GST Amount (₹)
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                Total (₹)
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => {
              const subtotal = product.price * product.quantity;
              const gstAmount = (subtotal * product.gst) / 100;
              const total = subtotal + gstAmount;
              
              return (
                <tr key={product.id} className="hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">{product.name}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-white/90">₹{product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-white/90">{product.gst}%</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-white/90">{product.quantity}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-green-400 font-medium">₹{gstAmount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-yellow-400">₹{total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                        title="Remove product"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;