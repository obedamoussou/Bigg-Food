import { useEffect, useState } from "react";

export type FavoriteMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const FAVORITES_KEY = "favoriteMeals";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (data: FavoriteMeal[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
  };

  const addFavorite = (meal: FavoriteMeal) => {
    const updated = [...favorites, meal];
    setFavorites(updated);
    saveToLocalStorage(updated);
  };

  const removeFavorite = (idMeal: string) => {
    const updated = favorites.filter((m) => m.idMeal !== idMeal);
    setFavorites(updated);
    saveToLocalStorage(updated);
  };

  const isFavorite = (idMeal: string) => {
    return favorites.some((m) => m.idMeal === idMeal);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
