import React, { useState } from 'react';
import { Receipt, History as HistoryIcon, FileText } from 'lucide-react';
import BillGenerator from './components/BillGenerator';
import History from './components/History';

type TabType = 'generator' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('generator');

  return (
    <div className="min-h-screen animated-bg">
      {/* Header */}
      <header className="glass shadow-2xl border-b border-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="relative">
                <FileText className="w-10 h-10 text-white mr-4 float" />
                <div className="absolute inset-0 w-10 h-10 bg-white/20 rounded-full blur-xl"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Online Bill Generator</h1>
                <p className="text-white/70 text-sm">Professional billing solution</p>
              </div>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center btn-animate ${
                  activeTab === 'generator'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <Receipt className="w-4 h-4 mr-2" />
                Bill Generator
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center btn-animate ${
                  activeTab === 'history'
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <HistoryIcon className="w-4 h-4 mr-2" />
                History
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generator' ? <BillGenerator /> : <History />}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/20 mt-16 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white/90 mb-2 font-medium">
              Online Bill Generator - Professional billing solution for stores and shops
            </p>
            <p className="text-sm text-white/70">
              Generate professional bills, manage inventory, and track your sales history
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;