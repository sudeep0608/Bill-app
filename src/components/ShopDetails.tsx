import React from 'react';
import { Store, MapPin, Phone, Mail } from 'lucide-react';
import { ShopDetails as ShopDetailsType } from '../types';

interface ShopDetailsProps {
  shopDetails: ShopDetailsType;
  onUpdate: (details: ShopDetailsType) => void;
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ shopDetails, onUpdate }) => {
  const handleChange = (field: keyof ShopDetailsType, value: string) => {
    onUpdate({
      ...shopDetails,
      [field]: value,
    });
  };

  return (
    <div className="glass rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 card-hover backdrop-blur-xl">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Store className="w-8 h-8 text-white mr-4" />
          <div className="absolute inset-0 w-8 h-8 bg-blue-500/30 rounded-full blur-lg"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Shop Details</h2>
          <p className="text-white/70">Configure your store information</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-3">
            <Store className="w-4 h-4 inline mr-2 text-blue-300" />
            Shop Name *
          </label>
          <input
            type="text"
            value={shopDetails.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
            placeholder="Enter shop name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-3">
            <MapPin className="w-4 h-4 inline mr-2 text-green-300" />
            Shop Location *
          </label>
          <input
            type="text"
            value={shopDetails.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
            placeholder="Enter shop location"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-3">
            <Phone className="w-4 h-4 inline mr-2 text-purple-300" />
            Phone Number
          </label>
          <input
            type="tel"
            value={shopDetails.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
            placeholder="Enter phone number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-3">
            <Mail className="w-4 h-4 inline mr-2 text-pink-300" />
            Email Address
          </label>
          <input
            type="email"
            value={shopDetails.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;