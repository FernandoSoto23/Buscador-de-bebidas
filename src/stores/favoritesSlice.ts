import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipiesSliceType, createRecipiSlice } from "./recipiSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";
export  type FavoritesSliceType = {
    favorites: Recipe[];
    handleClickFavorite : ( recipe : Recipe )=>void;
    favoriteExists : (id : Recipe['idDrink'] ) => boolean;
    loadFromStorage : () => void
}
export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipiesSliceType & NotificationSliceType, [],[],FavoritesSliceType> = ( set, get, api )=> ({
    favorites : [],
    handleClickFavorite : (recipe) =>{
        if(get().favoriteExists(recipe.idDrink)){
            set({
                favorites : get().favorites.filter((favorite) => favorite.idDrink !== recipe.idDrink)
            })
            createNotificationSlice(set, get, api).showNotification({
                text : 'Se elimino de favoritos', 
                error: false
            })
        }else{
            set({
                favorites : [...get().favorites, recipe]
            })
            createNotificationSlice(set, get, api).showNotification({
                text : 'Se agrego de favoritos', 
                error: false
            })
        }
        createRecipiSlice(set, get, api).closeModal();
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists : (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id);
    },
    loadFromStorage : () =>{
        const storedFavorites = localStorage.getItem('favorites');
        if(storedFavorites){
            set({
                favorites : JSON.parse(storedFavorites)
            })
        }
    }
})

//Slice Pattern