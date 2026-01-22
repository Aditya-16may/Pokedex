import Pokeball from "../assets/Pokeball.png"
import Bulbasaur from "../assets/bulbasaur.jpg"
import Poliwag from "../assets/poliwag.jpg"
import Mewoth from "../assets/meowth-face.jpg"
import Geodude from "../assets/geodude.jpg"
import Squirtle from "../assets/squirtle.jpg"
import Charmender from "../assets/charmender.jpg"
import "../style/header.css"
import "../style/global.css"
import { useState, useEffect, useRef } from "react"

export default function Header(){
    const BallRef = useRef(null);
    const ContainerRef = useRef(null);
    const balls = [Pokeball,Bulbasaur,Charmender, Squirtle, Poliwag, Mewoth, Geodude ];
    const [index, setIndex] = useState(0);
    useEffect(()=>{
            const ball = BallRef.current;
            const container = ContainerRef.current;

            let x = 20;
            let y = 20;

            let vx = (Math.random()*2 + 1) * (Math.random()< 0.5 ? -1 : 1);
            let vy = (Math.random()*2 + 1) * (Math.random()< 0.5 ? -1 : 1);
            const size = ball.offsetWidth;
            function animate (){
                const cw = container.clientWidth;
                const ch = container.clientHeight;

                x += vx;
                y += vy;
                if (x <= 0 || x + size >= cw) vx *= -1;
                if (y <= 0 || y + size >= ch) vy *= -1;

                ball.style.transform = `translate(${x}px, ${y}px) rotate(${x + y}deg)`;

                requestAnimationFrame(animate);
            }

            animate();
            const intervals = setInterval(() => {
                setIndex((prev)=> ((prev)+1) % balls.length);
            }, 5000);
            return ()=> clearInterval(intervals);

            
        },[]);
    return(
        
        <>
            <div id="container" ref={ContainerRef}>
                <div id="ball">
                    <img src={balls[index]} ref={BallRef} alt="Pokeball"/>
                </div>
                <section>
                    <h3>Welcome to the world of Pokemons !</h3>
                </section>
            </div>
        </>
    );
}