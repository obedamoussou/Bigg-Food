import { X } from "lucide-react";

type DetailsProps = {
  recipe: {
    strMeal: string;
    strInstructions: string;
    [key: string]: unknown;
  };
  onClose: () => void;
};

const Details = ({ recipe, onClose }: DetailsProps) => {
  // Récupérer ingrédients et mesures
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`] as string;
    const measure = recipe[`strMeasure${i}`] as string;
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ?? ''} ${ingredient}`);
    }
  }

  return (
    <div className="w-full h-full bg-black/30 fixed top-0 left-0 z-50 flex justify-center items-start">
      <div className="bg-white max-w-[500px] mt-10 mb-10 space-y-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center pt-4 border-b">
          <h1 className="text-[24px] font-light px-4">{recipe.strMeal}</h1>
          <button className="pr-4" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="px-4 overflow-y-auto max-h-[610px] custom-scroll">
          <h2 className="text-[20px] text-white font-light bg-[#fab55f] px-4 py-2">Instructions :</h2>
          <p className="py-4 text-[#3E3F3A] whitespace-pre-line">{recipe.strInstructions}</p>

          <h2 className="text-[20px] text-white font-light bg-[#fab55f] px-4 py-2 mt-6">Ingrédients :</h2>
          <ul className="py-4 list-disc list-inside space-y-1">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
