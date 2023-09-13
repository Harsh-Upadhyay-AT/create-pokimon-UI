/* eslint-disable jsx-a11y/alt-text */
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../Redux/store";
import { useEffect } from "react";
import { getAllDetailsAction } from "../../Redux/PokemonListSlice/PokemonListAsyncThunk";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import constant from "../../config/constant";
import { setTotalPageCount } from "../../Service/ApiHelper";
import { pokemonAction } from "../../Redux/PokemonListSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { list, id, offset, total, limit } = useSelector(
    (state: IRootState) => state.pokemonStateData
  );
  list.map((item, index) => {
    const dynamicId = item?.url?.split("/pokemon/");
    return dynamicId;
  });
  useEffect(() => {
    dispatch(
      getAllDetailsAction({
        id: 0,
        offset,
        limit,
      })
    );

  }, [dispatch, id, limit, offset]);
  const totalPage = setTotalPageCount(total, limit);
  const pageChangeHandler = (currentPage: number) => {
    const page = Number(currentPage);
    dispatch(pokemonAction.setCurrentPage(page));
    dispatch(
      getAllDetailsAction({
        id,
        offset,
        limit,
      })
    );
  };
  return (
    <>

    

      <div className="list">
        {list.map((item, index) => {
          const pokemonIndex = item?.url?.split("/pokemon/");
          const imageUrl = `https://img.pokemondb.net/artwork/large/${item.name}.jpg`;
          return (
            <div className="list-item" key={index}>
              <img style={{ width: "300px", height: "auto" }} src={imageUrl} />
              <div>{item.name}</div>
              <div>
                <Link to={`/pokemon/${pokemonIndex?.[1]?.replace("/", "")}`}>
                  View detail
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Pagination
          page={offset}
          onPageChangeHandler={pageChangeHandler}
          totalPages={
            totalPage > 0
              ? totalPage
              : constant.offset.defaultCurrentPaginationNumber
          }
        />
      </div>
    </>
  );
};
export default Home;
