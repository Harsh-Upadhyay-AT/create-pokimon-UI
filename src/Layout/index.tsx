import { Link, Outlet } from "react-router-dom"
import { Strings } from "../Resource/Strings"

const Layout =()=>{
    return(
        <>
        <h1> Pokemon</h1>
        <ul style={{ display: "flex", listStyle: "none", gap: "30px" }}>
            <li>
                <Link to="/">{Strings.home}</Link>
            </li>
            <li>
                <Link to="/pokemon/list">{Strings.pokemonList}</Link>
            </li>
            <li>
                <Link to="/my/pokemon/list/">{Strings.myPokemonList}</Link>
            </li>
        </ul>
        <Outlet/>
        </>
    )
}
export default Layout