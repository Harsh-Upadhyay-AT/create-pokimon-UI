import { FC, useEffect, useState } from "react";
import { CATCH_NAME } from "../PokemonDetails";
import { getItem, removeItem, setItem } from "../../Components/Storage";

interface MyPokemonListProps {
  name: string;
  image: string;
  nickName: string;
}

const MyPokemonList: FC = () => {
  const [parsedData, setParsedData] = useState<MyPokemonListProps[] | null>(null);

  useEffect(() => {
    const { data } = getItem(CATCH_NAME);
    const parsedDataFromLocalStorage = JSON.parse(
      data!
    );
    setParsedData(parsedDataFromLocalStorage);
  }, []);

  const removeHandler = (index: number) => {
    const updatedData = [...(parsedData || [])]
    updatedData.splice(index, 1);
    setParsedData(updatedData);
    setItem(CATCH_NAME, JSON.stringify(updatedData));
  };

  return (
    <div style={{display: "flex" , flexWrap: "wrap", width: "250px",height:"250px" }}>
      <div>
        {parsedData && parsedData?.map((items, index) => {
          const imageUrl = `https://img.pokemondb.net/artwork/large/${items.name}.jpg`;
          return (
            <div key={index}>
              <img style={{width: "200px"}} src={imageUrl} alt={items.name} />
              <div>Name:{items.name}</div>
              <div>Nickname:{items.nickName}</div>
              <button onClick={() => removeHandler(index)}>Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPokemonList;
