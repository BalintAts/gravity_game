import React, { useRef, useEffect } from 'react'
import Game from '../gameElements/game';
import Level from '../gameElements/level';
import Player from '../gameElements/player';
import GameObject from '../gameElements/gameObject';


const GameCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {



        //set up the canvas
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //setup game
        let game = new Game();
        let level = game.createLevel()  //currentlevelnumber comres from game
        let player = new Player(ctx, level);
        game.player = player;

        // for(gameOjects in level.gra)


        function loop() {
            console.log(loop);
            requestAnimationFrame(loop);
            player.move(game);
        }

        loop();


    }, [])



    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default GameCanvas
