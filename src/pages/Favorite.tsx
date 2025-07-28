import { useState } from "react";
import { useFavorites } from "../components/general/UseFavorites";
import Details from "../components/form/Details";

import toast, { Toaster } from 'react-hot-toast';

    type Recipe = {
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
        strInstructions: string;
        [key: string]: unknown;
    };

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');

  const handleShowDetails = async (id: string) => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await res.json();

            if (data.meals && data.meals.length > 0) {
            setSelectedRecipe(data.meals[0]);
            } else {
            setError("Recette introuvable.");
            }
        } catch {
            setError("Erreur lors du chargement des détails.");
        }
    };

  return (
    <div>
      <div className="flex justify-center px-4 md:px-7 mt-32">
        <div className="w-full lg:w-[1000px]">
          <div className="flex flex-col items-center gap-4 bg-[#F8F5F0] py-16 rounded-lg">
            <h1 className="text-[28px] md:text-3xl font-light text-center">My Favorites</h1>
            <div className="w-full px-5 md:px-10">
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-center">No favorite meals yet.</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-[#fab55f] text-white">
                    <tr>
                      <th className="p-2">Image</th>
                      <th>Name</th>
                      <th>View</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((fav) => (
                      <tr key={fav.idMeal} className="border-b">
                        <td className="p-2">
                          <img src={fav.strMealThumb} alt={fav.strMeal} className="w-16 h-16 rounded" />
                        </td>
                        <td>{fav.strMeal}</td>
                        <td>
                          {/* Tu peux afficher le détail ici ou aller vers une page /recipe/:id */}
                          <button
                              onClick={() => handleShowDetails(fav.idMeal)}
                              className="text-sm bg-[#93C54B] text-white px-3 py-1 rounded">View</button>
                        </td>
                        <td>
                          <button
                            onClick={() => (removeFavorite(fav.idMeal), toast.error('Removed from favorites!'))}
                            className="text-sm text-red-500"
                          >
                            Remove
                          </button>
                          <Toaster
                            position="top-center"
                            reverseOrder={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Détails concernant le repas instructions et ingrédients */}
                      {selectedRecipe && (
                          <Details
                              recipe={selectedRecipe}
                              onClose={() => setSelectedRecipe(null)}
                          />
                      )}
      </div>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
    </div>
  );
};

export default Favorites;
