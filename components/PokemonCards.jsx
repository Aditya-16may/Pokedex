import "../style/Cards_and_Details.css"

export default function PokemonCard({ pokemon, onSelect }) {
    return (
        <div className="Cards" onClick={()=>{onSelect(pokemon)}}>
            <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="mx-auto"
            />
            <div className="Info">
                <h3>{pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h3>
                <p className="id">#{pokemon.id}</p>
            </div>
        </div>
    );
}