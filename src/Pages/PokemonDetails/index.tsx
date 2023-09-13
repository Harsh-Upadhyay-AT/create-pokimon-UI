import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IRootState, useAppDispatch } from "../../Redux/store";
import React, { useEffect, useState } from "react";
import { getAbilityDetailsAction } from "../../Redux/PokemonDetailSlice/PokemonDetailAsyncThunk";
import {
  getAllDetailsAction,
  getPokemonDetailsAction,
} from "../../Redux/PokemonListSlice/PokemonListAsyncThunk";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { getItem, setItem } from "../../Components/Storage";

export const CATCH_NAME = "CATCH_NAME";
const PokemonDetails = () => {
  const { listId } = useParams();
  const [inputData, setInputData] = useState<string>("");
  const { offset, imagePokemonList, limit } = useSelector(
    (state: IRootState) => state.pokemonStateData
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const id = Number(listId);
    dispatch(getAbilityDetailsAction({ id }));
    dispatch(
      getAllDetailsAction({
        id,
        offset,
        limit,
      })
    );
    dispatch(getPokemonDetailsAction({ id }));
  }, [dispatch, limit, listId, offset]);

  const onChangeHandler = (event: any) => {
    setInputData(event.target.value);
  };
  const SubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputData.trim() === "") {
      return;
    }

    const popupOptions: SweetAlertOptions = {
      title: "<i>successful Nickname</i>",
      html: "successful",
      confirmButtonText: " <u>Ok</u>",
    };

    try {
      const result = await Swal.fire(popupOptions);
      if (result.isConfirmed) {
        const { data } = await getItem(CATCH_NAME);
        const listOfLastData = data ? JSON.parse(data) : [];
        const newData = {
          id: listId,
          name: imagePokemonList.name,
          nickName: inputData,
        };
        var updatedLocalStorage;
        if(listOfLastData != null) {
           updatedLocalStorage = [...listOfLastData, newData];
        }else{
           updatedLocalStorage = [data]
        }
        setItem(CATCH_NAME, JSON.stringify(updatedLocalStorage));
        navigate("/my/pokemon/list/");
      }
    } catch (error) {
      return error;
    }
  };
  const imageUrl = `https://img.pokemondb.net/artwork/large/${imagePokemonList.name}.jpg`;
  return (
    <>
      <div>
        <img src={imageUrl} alt={imagePokemonList.name} />
      </div>
      <div>title:{imagePokemonList.name}</div>
      <div>weight:{imagePokemonList.weight}</div>
      <div>height: {imagePokemonList.height}</div>
      <div>order: {imagePokemonList.order}</div>
      <form onSubmit={SubmitHandler}>
        <input
          type="text"
          placeholder="write the Nickname"
          value={inputData}
          onChange={onChangeHandler}
        />
        <button type="submit">catch</button>
      </form>
    </>
  );
};

export default PokemonDetails;
