import React, { useRef, useEffect, useState } from 'react'
import Game from '../gameElements/game';
import Menu from './menu';


const GameCanvas = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState(null);
    const [displayMenu, setDisplayMenu] = useState(false);
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
        canvas.style.height = `${window.innerHeight - 10}px`;

        const ctx = canvas.getContext("2d");

        //setup game

        let game = new Game(canvas.width, canvas.height);
        setGameState(game);
        game.start();


        function loop() {

            // ctx.globalCompositeOperation = 'destination-over';
            // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

            function drawBackGround(ctx) {
                let img = new Image();
                img.src = "/space_image.png";
                img.onload = drawImageTest;

                function drawImageTest() {
                    ctx.drawImage(img, 150, 150);
                }
            }

            drawBackGround(ctx);

            game.player.move();

            // ctx.fillStyle = "#6666ff";
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.save();

            for (let i = 0; i < game.level.gameObjects.length; i++) {
                ctx.save();
                game.level.gameObjects[i].draw(ctx);
                ctx.restore();

            }


            game.player.draw(ctx);


            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText(` LIVES:  ${game.player.lives}`, 10, 50);
            ctx.fillText(` LEVEL: ${game.currentLevelNumber + 1}`, 10, 90);
            ctx.fillText(` SCORE: ${game.player.score} / ${game.level.scoreToWin}`, 10, 130);
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
        <>
            <div tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                <canvas id="viewport" ref={canvasRef} />
            </div>
            <button onClick={openMenu} style={{ top: 0, right: 0, position: "absolute" }} >Menu</button>
            {displayMenu &&
                <Menu value={displayMenu} onChange={handleChangeDisplay} />
            }


        </>
    )
}

export default GameCanvas
