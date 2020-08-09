import React, { useRef, useEffect, useState } from 'react'
import Game from '../gameElements/game';
import Menu from './menu';
import { IsLoggedInProvider } from '../contexts/loginContext';


const GameCanvas = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState(null);
    const [displayMenu, setDisplayMenu] = useState(true);
    const [paused, setPaused] = useState(false);


    const openMenu = () => {
        setDisplayMenu(true);
    }

    function handleChangeDisplay() {
        setDisplayMenu(false);
        console.log(displayMenu);
    }

    function pause() {
        if (paused) {
            setPaused(false);
        } else {
            setPaused(true);
        }
        console.log({ paused });
    }

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


        function loop() {

            //Player interaction with the level
            game.player.move();


            //draw background in every frame, to clear the screen
            function drawBackGround(ctx) {
                let img = new Image();
                img.src = "/space_image.png";
                img.onload = drawImageTest;

                function drawImageTest() {
                    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
                }
            }

            drawBackGround(ctx);




            let planet = document.getElementById("planet");
            // ctx.drawImage(planet, 350, 250, 250, 250);

            for (let otherObject of game.level.gameObjects) {
                ctx.save();
                if (otherObject.gravitable) {
                    ctx.drawImage(planet, otherObject.posX - otherObject.rad, otherObject.posY - otherObject.rad, 2 * otherObject.rad, 2 * otherObject.rad);
                } else {
                    otherObject.draw(ctx);

                }
                ctx.restore();
            }

            //draw player
            function draw(ctx) {
                let img = new Image();
                img.src = "/ufo.png";
                img.onload = drawImageTest;

                function drawImageTest() {
                    ctx.drawImage(img, game.player.posX - game.player.rad - 50, game.player.posY - game.player.rad - 50, 200, 200);
                }
            }

            ctx.save();
            // game.player.draw(ctx);
            draw(ctx);
            ctx.restore();

            //draw texts
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText(` LIVES:  ${game.player.lives}`, 10, 50);
            ctx.fillText(` LEVEL: ${game.currentLevelNumber + 1}`, 10, 90);
            ctx.fillText(` COLLECTED: ${game.player.score} / ${game.level.scoreToWin}`, 10, 130);
            ctx.fillText("Press Space to Gravitate!", 200, 50);
            if (paused) {
                cancelAnimationFrame(loop);
            } else {
                requestAnimationFrame(loop);
            }
        }

        loop();


    }, [paused])

    const handleKeyDown = e => {
        if (e.keyCode === 32) {
            gameState.player.state = 1;
        }
        if (e.keyCode === 83) {
            gameState.start();
        }
        if (e.keyCode === 80) {
            pause();
        }
    };


    const handleKeyUp = e => {
        gameState.player.state = 0;

    };


    return (
        <IsLoggedInProvider>
            <>
                <img src="/saturn.png" alt="dsdfhsdk" id="planet" width="0" height="0"></img>
                <div tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                    <canvas id="viewport" ref={canvasRef} />
                </div>
                <button onClick={openMenu} style={{ top: 0, right: 0, position: "absolute" }} >Menu</button>
                {displayMenu &&
                    <Menu value={displayMenu} onChange={handleChangeDisplay} />
                }
            </>
        </IsLoggedInProvider>
    )
}

export default GameCanvas
