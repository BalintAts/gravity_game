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

        let game = new Game(canvas.width, canvas.height);
        setGameState(game);
        game.start();

        // game.player.ctx = ctx;


        function loop() {
            game.player.move();

            ctx.fillStyle = "#6666ff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText(` LIVES:  ${game.player.lives}`, 10, 50);
            ctx.fillText(` LEVEL: ${game.currentLevelNumber + 1}`, 10, 90);
            ctx.fillText(` SCORE: ${game.player.score} / ${game.level.scoreToWin}`, 10, 130);
            ctx.fillText("Press Space to Gravitate!", 200, 50);


            for (let i = 0; i < game.level.gameObjects.length; i++) {
                game.level.gameObjects[i].draw(ctx);
            }
            //move and draw the player
            game.player.draw(ctx);
            requestAnimationFrame(loop);

        }

        loop();


    }, [])

    const handleKeyDown = e => {
        if (e.keyCode === 32) {
            gameState.player.state = 1;
        }
        if (e.keyCode === 83) {
            gameState.start();
        }
        // if (e.keyCode === 77) {
        //     gameState.player.state = -1;
        // }
    };
    const handleKeyUp = e => {
        gameState.player.state = 0;
        console.log(gameState.player.state);

    };

    const openMenu = () => {

    };


    return (
        <>
            <div tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                <canvas id="viewport" ref={canvasRef} />
            </div>
            <button onClick={openMenu} style={{ top: 0, right: 0, position: "absolute" }} >Menu</button>
        </>
    )
}

export default GameCanvas
