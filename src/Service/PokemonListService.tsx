import { hasError, hasSuccess } from "./ApiHelper";
import api from "../config/api";
import { appClient } from "./networkService";
import {  GetImageList, GetPokemonList } from "../Redux/PokemonListSlice/PokemonListAsyncThunk";
import { GetAbilityList } from "../Redux/PokemonDetailSlice/PokemonDetailAsyncThunk";

export async function getAllDetails(payload: GetPokemonList) {
    try{
        const response = await appClient.get(api.endPoint.pokemon + "?offset=" + payload.offset + "&limit=" + payload.limit);
        return hasSuccess(response?.data)
    }
    catch(error) {
        return hasError(error)
    }
}
export async function getPokemonDetails(payload: GetImageList) {

    try{
        const response = await appClient.get(api.endPoint.ditto + payload.id)
        return hasSuccess(response?.data)
    }
    catch(error) {
        return hasError(error)
    }
}
export async function getAbilityDetails(payload: GetAbilityList) {
    try{
        const response = await appClient.get(api.endPoint.ability + payload.id);
        return hasSuccess(response?.data)
    }
    catch(error) {
        return hasError(error)
    }
}
