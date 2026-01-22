import Meowth from "../assets/Meowth.svg"
import Psyduck from "../assets/Psyduck.svg"
import Pokeball from "../assets/Pokeball.png"
import { MdRefresh } from 'react-icons/md';
import PokemonCard from "./PokemonCards";
import PokemonDetails from "./PokemonDetails";
import "../style/display.css"
import "../style/global.css"

export default function Display({
    PokemonList,
    SelectedPokemon,
    Loading,
    Error,
    refresh,
    PokemonSelect,
}){
    if(Loading){
        return(
            <>
                <div className="background">
                    <div className="Main">
                        <div className="Gallery">
                            <h2>Pokemon Gallery Hall</h2>
                            <p id="Refresh" style={{opacity: Loading? 0.5:1}} onClick={!Loading ? refresh : undefined}><MdRefresh id="icon"/>Refresh</p>
                        </div>
                        {Loading && <div className="Error">
                            <div className="Message">
                                <img src={Pokeball} alt="Pokeball"></img>
                                <p>Loading...</p>
                            </div>
                            <img src={Meowth} alt="Meowth"></img>
                        </div>}
                    </div>
                </div>
            </>);
    }
    else if(Error){
        return(
            <>
                <div className="background">
                    <div className="Main">
                        <div className="Gallery">
                            <h2>Pokemon Gallery Hall</h2>
                            <p id="Refresh" onClick={refresh}><MdRefresh id="icon" />Refresh</p>
                        </div>
                        {Error && <div className="Error">
                            <div className="Message">
                                <img src={Pokeball} alt="Pokeball"></img>
                                <p>{Error}</p>
                            </div>
                            <img src={Psyduck} alt="Psyduck"></img>
                        </div>}
                    </div>
                </div>
            </>
        );
    }
    else if(SelectedPokemon){
        return(
            <>
                <div className="background">
                    <div className="Main">
                        <div className="Gallery">
                            <h2>Pokemon Gallery Hall</h2>
                            <p id="Refresh" onClick={refresh}><MdRefresh id="icon"/>Refresh</p>
                        </div>
                        <div className="DetailPage">
                            {SelectedPokemon && !Error && (
                            <PokemonDetails pokemon={SelectedPokemon}/>
                            )}
                        </div>
                        
                    </div>
                </div>
            </> 
        );
    }
    else{
        return(
            <>
                <div className="background">
                    <div className="Main">
                        <div className="Gallery">
                            <h2>Pokemon Gallery Hall</h2>
                            <p id="Refresh" onClick={refresh}><MdRefresh id="icon"/>Refresh</p>
                        </div>
                        <div className="Board">
                            {PokemonList.map((p) =>(
                                <PokemonCard key={p.id} pokemon = {p} onSelect={PokemonSelect}/>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}