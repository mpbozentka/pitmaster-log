import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import recipesData from './data/data.json';
import { ChefHat, Search } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic (Search by title or meat)
  const filteredRecipes = recipesData.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.specs.meat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Header / Hero Section */}
      <div className="bg-slate-900 text-white py-12 px-4 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-500 rounded-full shadow-lg">
              <ChefHat size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            The Pitmaster Log
          </h1>
          <p className="text-slate-400 text-lg">
            Dad's Journey to BBQ Perfection
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search recipes (e.g., 'Ribs' or 'Pork')" 
              className="w-full pl-10 pr-4 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid Layout for Cards */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        
        {filteredRecipes.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No recipes found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

export default App;