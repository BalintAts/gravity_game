import React, { useRef, useEffect } from 'react'
import Game from '../gameElements/game';
import Level from '../gameElements/level';
import Player from '../gameElements/player';
import GameObject from '../gameElements/gameObject';
import levelsData from '../data/levelsData';


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
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        //setup game
        let game = new Game();
        game.createLevel()  //currentlevelnumber comres from game


        //shoud refactor for dependency injection
        for (let i = 0; i < game.level.gameObjects.length; i++) {
            game.level.gameObjects[i].ctx = ctx;
            game.level.gameObjects[i].game = game;
        }

        let player = new Player(400, 400, 200);
        game.player = player;
        player.game = game;
        player.ctx = ctx;

        // draw level
        for (let i = 0; i < game.level.gameObjects.length; i++) {
            game.level.gameObjects[i].draw();
        }




        //move and draw moving objects
        function loop() {
            console.log(loop);
            requestAnimationFrame(loop);
            //move and draw the player
            player.move(game);
            player.draw("red");
            player.posX++;
            // player.draw("red");
            console.log(player);

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
