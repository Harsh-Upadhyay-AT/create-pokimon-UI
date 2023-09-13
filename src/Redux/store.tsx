import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { pokemonReducer } from "./PokemonListSlice";
import { pokemonDetailReducer } from "./PokemonDetailSlice";

export const store = configureStore({
    reducer: {
        pokemonStateData: pokemonReducer,
        pokemonDetailStateData: pokemonDetailReducer,
    }
});
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;