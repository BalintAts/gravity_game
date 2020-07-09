import React, { useRef, useEffect, useState } from 'react'
import Game from '../gameElements/game';
import Level from '../gameElements/level';
import Player from '../gameElements/player';
import GameObject from '../gameElements/gameObject';
import levelsData from '../data/levelsData';


const GameCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    // const gameRef = useRef(null);
    const [gameState, setGameState] = useState(null);

    useEffect(() => {

        //set up the canvas
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const ctx = canvas.getContext("2d");



        //setup game
        let game = new Game();
        setGameState(game);
        game.createLevel()  //currentlevelnumber comres from game


        //shoud refactor for dependency injection
        for (let i = 0; i < game.level.gameObjects.length; i++) {
            game.level.gameObjects[i].ctx = ctx;
            game.level.gameObjects[i].game = game;
        }

        game.player = new Player(800, 400, game);
        game.player.ctx = ctx;

        // draw level






        //move and draw moving objects
        function loop() {
            // console.log(loop);
            ctx.fillStyle = "#6666ff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < game.level.gameObjects.length; i++) {
                game.level.gameObjects[i].draw();
            }
            //move and draw the player
            game.player.move();
            game.player.draw();
            // player.draw("red");
            // console.log(player);
            requestAnimationFrame(loop);

        }

        loop();


    }, [])

    const handleKeyDown = e => {
        gameState.player.state = 1;
        console.log("ondown")
    };
    const handleKeyUp = e => {
        console.log("onup")
    };


    return (
        <div id="controlField" tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default GameCanvas
