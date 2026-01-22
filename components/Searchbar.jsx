import "../style/searchbar.css"
import "../style/global.css"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react";

export default function Searchbar({
    Input,
    SetInput,
    onSearch,
    suggestions,
    Loading,
}){
    const [filter, Setfilter] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(()=>{
        if(!Input){
            Setfilter([]);
            return;
        }
        
        const Data = suggestions.filter(name=> name.startsWith(Input.toLowerCase()));
        Setfilter(Data);
    },[Input,suggestions, showSuggestions]);

    return(
        <>
            <div className="Searchbar">
                <div id="content">
                    <h1>Name or Number of Pokemon</h1>
                    <div className="search-wrapper">
                        <input 
                        placeholder="Search Pokemon..." 
                        type="text" 
                        id="searchbox" 
                        value={Input} 
                        onChange={(e) => {
                            SetInput(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onKeyDown={(e)=> {
                            e.key === "Enter" && onSearch();
                            setShowSuggestions(false);
                        }}
                        >
                        </input>
                        <FaSearch id="Search" onClick={onSearch}/>
                        {Loading && <p className="suggestions">Loading suggestions...</p>}
                        {filter.length > 0 && showSuggestions && (
                            <ul className="suggestions">
                            {filter.map((name) => (
                                <li
                                key={name}
                                onClick={() => {
                                    SetInput(name);
                                    Setfilter([]);
                                    setShowSuggestions(false);
                                }}
                                >
                                {name}
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>
                    <p>Any detail about any pokemon, just a click away..!!</p>
                </div>
                <p id="message">Search for a Pokemon by name or using its National Pokedex number.</p>
            </div>
            
        </>
    );
}