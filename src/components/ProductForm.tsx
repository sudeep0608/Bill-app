import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    gst: 0,
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name.trim() && product.price > 0) {
      onAddProduct(product);
      setProduct({ name: '', price: 0, gst: 0, quantity: 1 });
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setProduct(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="glass rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 card-hover backdrop-blur-xl">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Package className="w-8 h-8 text-white mr-4" />
          <div className="absolute inset-0 w-8 h-8 bg-green-500/30 rounded-full blur-lg"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Add Product</h2>
          <p className="text-white/70">Add items to your bill</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              Product Name *
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              Price (₹) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={product.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              GST (%) *
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={product.gst}
              onChange={(e) => handleChange('gst', parseFloat(e.target.value) || 0)}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
              placeholder="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              Quantity *
            </label>
            <input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
              required
            />
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:scale-[1.02] flex items-center justify-center btn-animate border border-green-400/20"
          >
            <Plus className="w-6 h-6 mr-3" />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;