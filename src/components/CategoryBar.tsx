import React from 'react';
import { CATEGORIES } from '../data/catalog';
import { Sparkles, CircleDot, Box, BookOpen, Type, Heart, Wallet, Hash } from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'resin-frames':
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
      case 'thread-bangles':
        return <CircleDot className="w-5 h-5 text-[#ffbec2]" />;
      case 'explosion-boxes':
        return <Box className="w-5 h-5 text-[#ffc080]" />;
      case 'scrapbooks':
        return <BookOpen className="w-5 h-5 text-[#ffe088]" />;
      case '3d-letters':
        return <Type className="w-5 h-5 text-[#d4af37]" />;
      case 'rakhis':
        return <Heart className="w-5 h-5 text-[#ff949e]" />;
      case 'wallets':
        return <Wallet className="w-5 h-5 text-[#ffc080]" />;
      case 'numbers':
        return <Hash className="w-5 h-5 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <div className="w-full bg-[#171719] border-b border-[#2a2a2c] py-3 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 sm:gap-6 min-w-max">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex flex-col items-center gap-1.5 p-1.5 rounded-lg transition-all ${
            selectedCategory === null
              ? 'opacity-100 scale-105'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
              selectedCategory === null
                ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                : 'border-[#353437] bg-[#201f21]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#f2ca50]" />
          </div>
          <span className={`text-[11px] font-medium ${selectedCategory === null ? 'text-[#f2ca50] font-bold' : 'text-[#a39e94]'}`}>
            All Crafts
          </span>
        </button>

        {/* Dynamic Category List */}
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex flex-col items-center gap-1.5 p-1.5 rounded-lg transition-all ${
                isSelected ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 overflow-hidden transition-all relative ${
                  isSelected
                    ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'border-[#353437] bg-[#201f21] hover:border-[#4d4635]'
                }`}
              >
                {getCategoryIcon(cat.id)}
              </div>
              <span
                className={`text-[11px] font-medium whitespace-nowrap ${
                  isSelected ? 'text-[#f2ca50] font-bold' : 'text-[#b8b3a8]'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
