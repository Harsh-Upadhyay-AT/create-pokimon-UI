import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../Layout"
import Home from "../Pages/Home"
import PokemonList from "../Pages/PokemonList"
import MyPokemonList from "../Pages/MyPokemonList"
import { Error404 } from "../Pages/Error/Error404"
import PokemonDetails from "../Pages/PokemonDetails"

const AppRoutes=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/pokemon/list" element={<PokemonList/>}/>
                <Route path="/my/pokemon/list/" element={<MyPokemonList/> }/>
                <Route path="pokemon/:listId" element={<PokemonDetails/>}/>
                <Route path="/*" element={<Error404/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes