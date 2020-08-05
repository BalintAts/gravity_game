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
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight}px`;

        const width = 1300;
        const height = 700

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width;
        canvas.style.height = height;

        const ctx = canvas.getContext("2d");



        //setup game

        let game = new Game(width, height);
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



            // //drawother*********************************************
            // function drawOther(ctx, imgSource, posX, posY, width, height) {
            //     let img = new Image();
            //     img.src = "/space_image.png";
            //     img.onload = drawImageTest;

            //     function drawImageTest() {
            //         ctx.drawImage(imgSource, posX, posY, width, height);
            //     }
            // }


            // for (let otherObject of game.level.gameObjects) {
            //     ctx.save();
            //     let imgSource = otherObject.imgSource;
            //     let posX = otherObject.posX;
            //     let posY = otherObject.posY;
            //     let width = otherObject.rad * 2;
            //     let height = otherObject.rad * 2;

            //     drawOther(ctx, imgSource, posX, posY, width, height);
            //     ctx.restore();
            // }





            //draw gameobjects*****************************
            for (let i = 0; i < game.level.gameObjects.length; i++) {
                ctx.save();
                game.level.gameObjects[i].draw(ctx);
                ctx.restore();

            }

            //draw player
            function drawUfo(ctx) {
                let img = new Image();
                img.src = "/ufo.png";
                img.onload = drawImageTest;

                function drawImageTest() {
                    ctx.drawImage(img, game.player.posX - game.player.rad, game.player.posY - game.player.rad, 200, 200);
                }
            }

            ctx.save();
            drawUfo(ctx);
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
