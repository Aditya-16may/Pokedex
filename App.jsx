import Display from './components/Display.jsx';
import Pokedex_Footer from './components/Pokedex_Footer.jsx';
import Header from './components/Header.jsx';
import Searchbar from './components/Searchbar.jsx'
import { useEffect, useState } from "react";

const API_Base = "https://pokeapi.co/api/v2";

function App() {
  const [Input, SetInput] = useState("");
  const [PokemonList, SetPokemonList] = useState([]);
  const [AllPokemonList, SetAllPokemonList] = useState([]);
  const [Error, SetError] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [ListLoading, SetListLoading] = useState(false);
  const [SelectedPokemon, SetSelectedPokemon] = useState(null);
  const [refresh, setRefresh] = useState(false);


  useEffect(() =>{
    fetchPokemonList();
    fetchAllPokemonList();
  },[refresh]);

  const fetchPokemonList = async() =>{
    try{
      SetLoading(true);
      SetError(null);
      const offset = Math.floor(Math.random()*1000);
      const res = await fetch(`${API_Base}/pokemon?limit=30&offset=${offset}`);
      if(!res.ok){
        throw new Error("Unable to fetch data!...");
      }
      const data = await res.json();
      const filterdata = await Promise.all(
        data.results.map(async (p)=>{
          const r = await fetch(p.url);
          return await r.json();
        })
      );

      SetPokemonList(filterdata);
    } catch(err) {
      SetError(err.message);
    } finally {
      SetLoading(false);
    }
  };
  const fetchAllPokemonList = async() =>{
    try{
      SetListLoading(true);
      SetError(null);
      const res = await fetch(`${API_Base}/pokemon?limit=2000`);
      if(!res.ok){
        throw new Error("Unable to fetch data!...");
      }
      const data = await res.json();
      SetAllPokemonList(data.results.map(p =>p.name));
    } catch(err) {
      SetError(err.message);
    } finally {
      SetListLoading(false);
    }
  };
  const WeaknessFinder= async(types)=>{
    const damageMap = {};
      
    for(const t of types){
      const res = await fetch(t.type.url);
      const data = await res.json();

      data.damage_relations.double_damage_from.forEach(d =>{
        damageMap[d.name] = (damageMap[d.name] || 1) * 2;
      });
      data.damage_relations.half_damage_from.forEach(d =>{
        damageMap[d.name] = (damageMap[d.name] || 1) * 0.5;
      });
      data.damage_relations.no_damage_from.forEach(d =>{
        damageMap[d.name] = 0;
      });
    }
    return Object.entries(damageMap)
    .filter(([_, value]) => value > 1)
    .map(([type, value]) => ({ type, multiplier: value }));
      
  };

  const fetchPokemonByName= async() =>{
    if(!Input.trim()){
      return;
    }
    try{
      SetLoading(true);
      SetError(null);
      const PokemonRes = await fetch(`${API_Base}/pokemon/${Input.toLowerCase()}`);
      if(!PokemonRes.ok){
        throw new Error("Unable to find Pokemon!...");
      }
      const PokemonData = await PokemonRes.json();
      const PokemonSpeciesRes = await fetch(PokemonData.species.url);
      if(!PokemonSpeciesRes.ok){
        throw new Error("Unable to fetch data..!");
      }
      const PokemonSpeciesData = await PokemonSpeciesRes.json();

      const All_intro = PokemonSpeciesData.flavor_text_entries.filter(
        entry => entry.language.name ==="en"
      );

      const English_intro = All_intro.at(-1);
      const weakness = await WeaknessFinder(PokemonData.types);

      SetSelectedPokemon({
        ...PokemonData,
        gender_rate: PokemonSpeciesData.gender_rate,
        Intro : English_intro
          ?English_intro.flavor_text.replace("/\f/g"," ")
          : "No Info available for this pokemon yet..!",
        weakness,
      });
    }
    catch(err){
      SetError(err.message);
      SetSelectedPokemon(null);
    }
    finally{
      SetLoading(false);
    }
  };

  const handleSelectPokemon=async(pokemon)=>{
    try{
      SetLoading(true);
      SetError(null);
      const PokemonSpeciesRes = await fetch(pokemon.species.url);
      if(!PokemonSpeciesRes.ok){
        throw new Error("Unable to fetch data..!");
      }
      const PokemonSpeciesData = await PokemonSpeciesRes.json();
      const All_intro = PokemonSpeciesData.flavor_text_entries.filter(
        entry => entry.language.name ==="en"
      );

      const English_intro = All_intro.at(-1);
      const weakness = await WeaknessFinder(pokemon.types);

      SetSelectedPokemon({
        ...pokemon,
        gender_rate: PokemonSpeciesData.gender_rate,
        Intro : English_intro
          ?English_intro.flavor_text.replace("/\f/g"," ")
          : "No Info available for this pokemon yet..!",
        weakness,
      });
    }
    catch(err){
      SetError(err.message);
      SetSelectedPokemon(null);
    }
    finally{
      SetLoading(false);
    }
    
  };
  

  return(
    <>
      <Header/>
      <Searchbar
      Input = {Input}
      SetInput = {SetInput}
      onSearch={fetchPokemonByName}
      suggestions={AllPokemonList}
      Loading={ListLoading}
      />
      <Display
      PokemonList={PokemonList}
      SelectedPokemon={SelectedPokemon}
      Loading={Loading}
      Error={Error}
      refresh={()=>{
        setRefresh(prev => !prev);
        SetSelectedPokemon(null);
        SetInput("");
      }}
      PokemonSelect={handleSelectPokemon}
      />
      <Pokedex_Footer/>
    </>
  );
}

export default App
