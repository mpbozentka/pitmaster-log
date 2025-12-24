import React, { useState } from 'react';
import { Flame, Calendar, Users, Thermometer, Clock, FileText } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState('story');

  // Helper to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600 text-sm font-semibold">({recipe.rating})</span>
      </div>
    );
  };

  // Helper for category badge color
  const getCategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case 'beef': return 'bg-red-100 text-red-800 border-red-200';
      case 'pork': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'poultry': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-2xl mx-auto my-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(recipe.category)}`}>
              {recipe.category}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 leading-tight">{recipe.title}</h2>
            <div className="flex items-center mt-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{recipe.date}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {renderStars(recipe.rating)}
            {recipe.tags && recipe.tags.includes("Fail") && (
               <span className="mt-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase">
                 Never Again
               </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50">
        {['story', 'specs', 'cook'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize focus:outline-none transition-colors duration-200 ${
              activeTab === tab 
                ? 'bg-white text-blue-600 border-t-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'story' ? 'The Story' : tab === 'specs' ? 'The Specs' : 'The Cook'}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 bg-white min-h-[200px]">
        
        {/* TAB: STORY */}
        {activeTab === 'story' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Users className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-blue-900 uppercase">The Occasion</h4>
                <p className="text-gray-700">{recipe.occasion.event}</p>
                {recipe.occasion.guests && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Guests:</span> {recipe.occasion.guests.join(", ")}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="flex items-center text-sm font-bold text-gray-900 uppercase mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Pitmaster's Log
              </h4>
              <p className="text-gray-700 italic border-l-4 border-gray-300 pl-4 py-1">
                "{recipe.occasion.notes}"
              </p>
            </div>
          </div>
        )}

        {/* TAB: SPECS */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-2 gap-4 animate-fadeIn">
            <div className="col-span-2 sm:col-span-1 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-bold text-gray-500 uppercase">Equipment</span>
              <p className="font-medium text-gray-900">{recipe.specs.equipment}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 bg-gray-50 rounded-lg">
               <span className="text-xs font-bold text-gray-500 uppercase">Meat</span>
               <p className="font-medium text-gray-900">{recipe.specs.meat}</p>
            </div>
            <div className="col-span-2 p-3 bg-orange-50 rounded-lg border border-orange-100 flex items-center justify-between">
               <div className="flex items-center">
                 <Flame className="w-5 h-5 text-orange-500 mr-2" />
                 <div>
                   <span className="text-xs font-bold text-orange-800 uppercase block">Fuel / Rub</span>
                   <span className="text-sm text-gray-800">{recipe.specs.fuel}</span>
                 </div>
               </div>
            </div>
            <div className="col-span-2 p-3 bg-red-50 rounded-lg border border-red-100 flex items-center">
                 <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                 <div>
                   <span className="text-xs font-bold text-red-800 uppercase block">Temps</span>
                   <span className="text-sm text-gray-800 font-mono">
                     {recipe.specs.temp_start}°F <span className="text-gray-400">→</span> {recipe.specs.temp_finish}°F
                   </span>
                 </div>
            </div>
          </div>
        )}

        {/* TAB: COOK */}
        {activeTab === 'cook' && (
          <div className="animate-fadeIn">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Ingredients</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-6 bg-gray-50 p-4 rounded-lg">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Instructions</h4>
            <div className="space-y-4">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold mt-0.5 mr-3">
                    {i + 1}
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecipeCard;