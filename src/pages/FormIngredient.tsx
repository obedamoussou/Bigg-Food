import { HeartMinus, HeartPlus } from "lucide-react"
import { useState } from "react";
import Details from "../components/form/Details";
import { useFavorites } from "../components/general/UseFavorites";

import toast, { Toaster } from 'react-hot-toast';

const FormIngredient = () => {

    type Recipe = {
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
        strInstructions: string;
        [key: string]: unknown;
    };

    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);




    const fetchWeather = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ingredient.trim()) return;
        setLoading(true);
        setRecipes(null);
        setError('');

        try {
            const reponce = await fetch(
            `http://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
            );

            const data = await reponce.json();

            if (data.error) {
            setError(data.error.message);
            } else {
            setRecipes(data.meals || []);
            }
        } catch {
            setError("Erreur de chargement");
        } finally {
            setLoading(false); // ✅ Loader OFF
        }
    };

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

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    return (
        <div className="flex justify-center px-4 md:px-7 mt-32">
            <div className="w-full lg:w-[1000px] bg-[#F8F5F0] rounded-lg pb-16">
                <div className="flex flex-col items-center gap-4 bg-[#F8F5F0] pt-16 rounded-lg">
                    <h1 className="text-[28px] md:text-3xl font-light text-center">Search Recipes by Ingredient</h1>
                    <form action="" className="w-full px-5 md:px-10">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="">
                                Ingredient Name :
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Eg: Bacon or Tomatoes or Eggs"
                                className=" p-2 rounded-md border border-[#FDA732] outline-none" />
                            <button
                                onClick={fetchWeather}
                                className="uppercase bg-[#93C54B] py-2 rounded-md mt-6 text-white text-sm">
                                get recipe
                            </button>
                        </div>
                    </form>
                </div>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                {loading && (
                    <div className="flex justify-center my-4">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {!loading && recipes?.length === 0 && (
                    <p className="text-center text-gray-500">Aucun plat trouvé.</p>
                )}


                {/* Résultat de la recherche */}
                { recipes && 
                    (<div>
                        <h2 className="text-[24px] font-light text-center pb-16">Result :</h2>
                        <div className="px-5 md:px-10 flex justify-center flex-wrap gap-10">
                            { recipes.map ((recipe) => (
                                <div key={recipe.idMeal} className="max-w-64 bg-white rounded-xl relative pb-8">
                                    <div
                                        onClick={() =>
                                            isFavorite(recipe.idMeal)
                                            ? (removeFavorite(recipe.idMeal), toast.error('Removed from favorites!'))
                                            : (addFavorite({
                                                idMeal: recipe.idMeal,
                                                strMeal: recipe.strMeal,
                                                strMealThumb: recipe.strMealThumb,
                                                }), toast.success('Added to favorites!'))
                                        }
                                        className="absolute -right-5 top-3 cursor-pointer bg-white w-10 h-10 flex justify-center items-center rounded-full"
                                    >
                                        <Toaster
                                            position="top-center"
                                            reverseOrder={false}
                                        />
                                        {isFavorite(recipe.idMeal) ? <HeartMinus /> : <HeartPlus />}
                                    </div>
                                    <img src={recipe.strMealThumb} alt="" className="rounded-t-xl" />
                                    <div className="w-full flex flex-col items-center px-4 pt-4">
                                        <h3 className="text-[20px] text-center font-light">{recipe.strMeal}</h3>
                                        <button
                                            onClick={() => handleShowDetails(recipe.idMeal)}
                                            className="uppercase w-full bg-[#93C54B] py-2 rounded-md mt-6 text-white text-sm">
                                            view details
                                        </button>   
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)   
                }
            </div>
                {/* Détails concernant le repas instructions et ingrédients */}
                    {selectedRecipe && (
                        <Details
                            recipe={selectedRecipe}
                            onClose={() => setSelectedRecipe(null)}
                        />
                    )}

        </div>
    )
}

export default FormIngredient