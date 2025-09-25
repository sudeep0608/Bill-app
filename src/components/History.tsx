import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { History as HistoryIcon, Search, Eye, Download, Trash2 } from 'lucide-react';
import { Bill } from '../types';
import { getBillHistory, deleteBillFromHistory } from '../utils/storage';
import { generatePDF } from '../utils/pdf';
import Receipt from './Receipt';

const History: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = getBillHistory();
    setBills(history);
  };

  const handleDeleteBill = (billId: string) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      deleteBillFromHistory(billId);
      loadHistory();
    }
  };

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
    setShowReceipt(true);
  };

  const handleDownloadBill = async (bill: Bill) => {
    setSelectedBill(bill);
    // Wait for the receipt to render
    setTimeout(() => {
      generatePDF(bill);
    }, 100);
  };

  const filteredBills = bills.filter(bill =>
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.shopDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showReceipt && selectedBill) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowReceipt(false)}
              className="glass text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/10 backdrop-blur-xl border border-white/20 btn-animate"
            >
              ← Back to History
            </button>
            <button
              onClick={() => generatePDF(selectedBill)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center btn-animate border border-blue-400/20"
            >
              <Download className="w-5 h-5 mr-3" />
              Download PDF
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl">
            <Receipt bill={selectedBill} className="rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl shadow-2xl p-8 border border-white/20 card-hover backdrop-blur-xl">
      <div className="flex items-center mb-6">
        <div className="relative">
          <HistoryIcon className="w-8 h-8 text-white mr-4" />
          <div className="absolute inset-0 w-8 h-8 bg-indigo-500/30 rounded-full blur-lg"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Bill History ({bills.length})</h2>
          <p className="text-white/70">View and manage your bills</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-4 text-white/50" />
          <input
            type="text"
            placeholder="Search by bill number or shop name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
          />
        </div>
      </div>

      {filteredBills.length === 0 ? (
        <div className="text-center py-16">
          <div className="relative inline-block">
            <HistoryIcon className="w-20 h-20 text-white/50 mx-auto mb-6 float" />
            <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full blur-xl mx-auto"></div>
          </div>
          <p className="text-white/80 text-xl font-medium mb-2">
            {bills.length === 0 ? 'No bills generated yet' : 'No bills found matching your search'}
          </p>
          <p className="text-white/60">
            {bills.length === 0 ? 'Generate your first bill to see it here' : 'Try a different search term'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full table-auto bg-white/5 backdrop-blur-sm">
            <thead>
              <tr className="bg-white/10 border-b border-white/20">
                <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                  Bill Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                  Shop Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-white">{bill.billNumber}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">{bill.shopDetails.name}</div>
                    <div className="text-sm text-white/70">{bill.shopDetails.location}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {format(new Date(bill.date), 'dd/MM/yyyy')}
                    </div>
                    <div className="text-sm text-white/70">
                      {format(new Date(bill.date), 'HH:mm')}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{bill.products.length} items</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-yellow-400">
                      ₹{bill.totalAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBill(bill)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                        title="View bill"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDownloadBill(bill)}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/20 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                        title="Download PDF"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBill(bill.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                        title="Delete bill"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;