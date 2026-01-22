import "../style/Cards_and_Details.css"
import Male from "../assets/male.png"
import Female from "../assets/female.png"
import Genderless from "../assets/genderless.png"

export default function PokemonDetails({ pokemon }) {

    const gender_finder = (rate)=>{
        if(rate == null || rate == undefined){
            return (
                <div className="gender_content">
                    <p>Gender date not available for this ..!</p>
                </div>
            )
        }
        else if(rate <0){
            return (<div className="gender_content">
                    <img src={Genderless} className="Gender" alt="Genderless"></img>
                    <p>They don't have genders.. Do they !?</p>
                </div>);
        }
        else if(rate === 0){
            return (<div className="gender_content">
                    <img src={Male} className="Gender" alt="Gender"></img>
                    <img src={Female} className="Gender" alt="Gender"></img>
                    <p>All Male..(How do they Reproduce..!?)</p>
                </div>);
        }
        else if(rate === 8){
            return (<div className="gender_content">
                    <img src={Female} className="Gender" alt="Gender"></img>
                    <p>All Female..(How do they Reproduce..!?)</p>
                </div>);
        }

        const female_rate = rate*12.5;
        const male_rate = 100 - female_rate;
        return (<div className="gender_content">
                    <img src={Male} className="Gender" alt="Gender"></img>
                    <img src={Female} className="Gender" alt="Gender"></img>
                    <p>{male_rate}% Male {female_rate}%  Female</p>
                </div>);
    }
    return (
        <div className="coverpage">
            <h2 className="Name">{pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h2>
            {pokemon.Intro && (
                <div className="Intro">
                    <p>{pokemon.Intro}</p>
                </div>
            )}
            <div className="Details">
                <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="Image"
                />
                <div>
                    <div className="info">
                        <div><strong>ID:</strong> {pokemon.id}</div>
                        <div><strong>Height:</strong> {(pokemon.height)*10} cm</div>
                        <div><strong>Weight:</strong> {(pokemon.weight)/10} kg</div>
                        <div><strong>Gender Rate:</strong> {(gender_finder(pokemon.gender_rate))}</div>
                    </div>
                    <div className="Types">
                        <p><strong>Types:</strong></p>
                        {pokemon.types.map((t) => (
                        <span 
                            key={t.type.name}
                        >
                            {t.type.name[0].toUpperCase() + t.type.name.slice(1)}
                        </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="OtherInfo">
                <div className="Stats">
                    <h3>Base Stats :</h3>

                    {pokemon.stats.map((s) => (
                        <div className="stat-row" key={s.stat.name}>
                            <span className="stat-name">
                                {s.stat.name.replace("-", " ").toUpperCase()} :
                            </span>

                            <div className="stat-bar-bg">
                                <div
                                className="stat-bar-fill"
                                style={{ width: `${Math.min(s.base_stat, 150)}px` }}
                                >
                                {s.base_stat}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="Weakness">
                    <p><strong>Weakness:</strong></p>
                    <div className="collection">
                        {pokemon.weakness && pokemon.weakness.length>0 ? (
                            pokemon.weakness.map((w) => (
                        <span 
                            key={w.type}
                        >
                            {w.type[0].toUpperCase() + w.type.slice(1)}
                            {w.multiplier === 4 && " (4x)"}
                        </span>))
                        ):(
                            <span>None</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}