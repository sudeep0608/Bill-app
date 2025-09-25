import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Save, Download, FileText } from 'lucide-react';
import { Product, ShopDetails as ShopDetailsType, Bill } from '../types';
import ShopDetails from './ShopDetails';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import BillSummary from './BillSummary';
import Receipt from './Receipt';
import { saveBillToHistory } from '../utils/storage';
import { generatePDF, printReceipt } from '../utils/pdf';

const BillGenerator: React.FC = () => {
  const [shopDetails, setShopDetails] = useState<ShopDetailsType>({
    name: '',
    location: '',
    phone: '',
    email: '',
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentBill, setCurrentBill] = useState<Bill | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: uuidv4(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateProduct = (id: string, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...updatedProduct, id } : product
    ));
  };

  const calculateTotals = () => {
    const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const totalGST = products.reduce((sum, product) => {
      const productSubtotal = product.price * product.quantity;
      return sum + (productSubtotal * product.gst) / 100;
    }, 0);
    const totalAmount = subtotal + totalGST;
    
    return { subtotal, totalGST, totalAmount };
  };

  const generateBillNumber = () => {
    const now = new Date();
    const dateString = format(now, 'yyyyMMdd');
    const timeString = format(now, 'HHmmss');
    return `BILL-${dateString}-${timeString}`;
  };

  const submitOrder = async () => {
    if (!shopDetails.name || !shopDetails.location || products.length === 0) {
      alert('Please fill in shop details and add at least one product.');
      return;
    }

    setIsGenerating(true);
    
    try {
      const { subtotal, totalGST, totalAmount } = calculateTotals();
      
      const bill: Bill = {
        id: uuidv4(),
        billNumber: generateBillNumber(),
        date: new Date().toISOString(),
        shopDetails,
        products,
        subtotal,
        totalGST,
        totalAmount,
      };

      saveBillToHistory(bill);
      setCurrentBill(bill);
      setShowReceipt(true);
      
      // Reset form
      setProducts([]);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error generating bill. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReceipt = async () => {
    if (currentBill) {
      await generatePDF(currentBill);
    }
  };

  const printReceiptHandler = () => {
    printReceipt();
  };

  const backToForm = () => {
    setShowReceipt(false);
    setCurrentBill(null);
  };

  if (showReceipt && currentBill) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
            <button
              onClick={backToForm}
              className="glass text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/10 backdrop-blur-xl border border-white/20 btn-animate"
            >
              ← Back to Generator
            </button>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={printReceiptHandler}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-green-500/25 flex items-center btn-animate border border-green-400/20"
              >
                <FileText className="w-5 h-5 mr-3" />
                Print
              </button>
              <button
                onClick={downloadReceipt}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center btn-animate border border-blue-400/20"
              >
                <Download className="w-5 h-5 mr-3" />
                Download PDF
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl">
            <Receipt bill={currentBill} className="rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ShopDetails shopDetails={shopDetails} onUpdate={setShopDetails} />
      <ProductForm onAddProduct={addProduct} />
      <ProductList 
        products={products} 
        onRemoveProduct={removeProduct}
        onUpdateProduct={updateProduct}
      />
      
      {products.length > 0 && (
        <>
          <BillSummary products={products} />
          <div className="glass rounded-2xl shadow-2xl p-8 border border-white/20 backdrop-blur-xl">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={submitOrder}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[1.02] disabled:transform-none flex items-center btn-animate border border-blue-400/20"
              >
                <Save className="w-6 h-6 mr-3" />
                {isGenerating ? 'Generating...' : 'Generate Bill'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BillGenerator;