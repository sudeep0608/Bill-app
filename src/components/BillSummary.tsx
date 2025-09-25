import React from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { Product } from '../types';

interface BillSummaryProps {
  products: Product[];
}

const BillSummary: React.FC<BillSummaryProps> = ({ products }) => {
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalGST = products.reduce((sum, product) => {
    const productSubtotal = product.price * product.quantity;
    return sum + (productSubtotal * product.gst) / 100;
  }, 0);
  const totalAmount = subtotal + totalGST;

  return (
    <div className="glass rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 card-hover backdrop-blur-xl">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Calculator className="w-8 h-8 text-white mr-4" />
          <div className="absolute inset-0 w-8 h-8 bg-blue-500/30 rounded-full blur-lg"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Bill Summary</h2>
          <p className="text-white/70">Review your calculations</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center py-4 border-b border-white/20">
          <span className="text-xl text-white/90 font-medium">Subtotal:</span>
          <span className="text-xl font-bold text-white">₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center py-4 border-b border-white/20">
          <span className="text-xl text-white/90 font-medium">Total GST:</span>
          <span className="text-xl font-bold text-green-400">₹{totalGST.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center py-6 border-t-2 border-white/30 bg-white/10 rounded-xl px-6 backdrop-blur-sm">
          <span className="text-2xl font-bold text-white flex items-center">
            <DollarSign className="w-7 h-7 mr-3 text-yellow-400" />
            Total Amount:
          </span>
          <span className="text-3xl font-bold text-yellow-400 pulse-custom">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;