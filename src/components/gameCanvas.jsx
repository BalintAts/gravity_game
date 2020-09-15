import React, { useRef, useEffect, useState, useContext } from 'react'
import Game from '../gameElements/game';
import Menu from './menu';
import { IsLoggedInProvider, IsLoggedInContext } from '../contexts/loginContext';
import ReactDom from 'react-dom';
import LoggedInBar from './loggedInBar';


const GameCanvas = props => {
    const canvasRef = useRef(null);
    const [gameInstance, setGameInstance] = useState(null);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [paused, setPaused] = useState(false);
    // const a = useContext(IsLoggedInContext);
    // console.log(a);
    const [isLoggedin, setIsLoggedin] = useContext(IsLoggedInContext);
    const [currentLevelNumber, setcurrentLevelNumber] = useState(0);   //for updating this component when game loads cause it doesn't update when context changes

    const openMenu = () => {
        setDisplayMenu(true);
    }

    function handleChangeDisplay() {
        setDisplayMenu(false);
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

        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const ctx = canvas.getContext("2d");
        console.log("Canvas useEffect called");
        console.log(isLoggedin);





        function drawHud() {
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


        function drawBackGround(ctx) {
            let img = new Image();
            img.src = "/space_image.png";
            img.onload = drawImageWhenLoaded;
            function drawImageWhenLoaded() {
                ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
            }
        }


        function drawLevelObejcts() {
            let saturn = document.getElementById("saturn");
            let jupiter = document.getElementById("jupiter");
            let mars = document.getElementById("mars");
            let uranus = document.getElementById("uranus");

            for (let otherObject of game.level.gameObjects) {
                ctx.save();
                if (otherObject.gravitable) {

                    switch (otherObject.thing) {
                        case "saturn":
                            ctx.drawImage(saturn, otherObject.posX - otherObject.rad, otherObject.posY - otherObject.rad, 2 * otherObject.rad, 2 * otherObject.rad);
                            break;
                        case "jupiter":
                            ctx.drawImage(jupiter, otherObject.posX - otherObject.rad, otherObject.posY - otherObject.rad, 2 * otherObject.rad, 2 * otherObject.rad);
                            break;
                        case "uranus":
                            ctx.drawImage(uranus, otherObject.posX - otherObject.rad, otherObject.posY - otherObject.rad, 2 * otherObject.rad, 2 * otherObject.rad);
                            break;
                        case "mars":
                            ctx.drawImage(mars, otherObject.posX - otherObject.rad, otherObject.posY - otherObject.rad, 2 * otherObject.rad, 2 * otherObject.rad);
                            break;
                        default:
                            ctx.drawImage(saturn, otherObject.posX - otherObject.rad, otherObject.posY - otherObject.rad, 2 * otherObject.rad, 2 * otherObject.rad);
                    }
                } else {
                    otherObject.draw(ctx);   //different method call, becouse it is not an image, needs refactor when there is an image asset
                }
                ctx.restore();
            }
        }


        function drawPlayer() {
            function draw(ctx) {
                let img = new Image();
                img.src = "/ufo.png";
                img.onload = drawImageTest;

                function drawImageTest() {
                    ctx.drawImage(img, game.player.posX - game.player.rad - 50, game.player.posY - game.player.rad - 50, 200, 200);
                }
            }
            ctx.save();
            draw(ctx);
            ctx.restore();
        }

        function loop() {
            game.player.move();
            drawBackGround(ctx);
            drawLevelObejcts();
            drawPlayer();
            drawHud();
        }



        let game = new Game(canvas.width, canvas.height);

        setGameInstance(game);
        game.start();
        loop();


    }, [isLoggedin, paused])

    const handleKeyDown = e => {
        if (e.keyCode === 32) {
            // gameInstance.player.state = 1;
            gameInstance.currentLevelNumber = 1;
            gameInstance.changeLevel();
        }
        if (e.keyCode === 83) {
            gameInstance.start();
        }
        if (e.keyCode === 80) {
            pause();
        }
    };


    const handleKeyUp = e => {
        gameInstance.player.state = 0;

    };


    return (
        <IsLoggedInProvider>
            <>
                <img src="/saturn.png" alt="/saturn.png" id="saturn" width="0" height="0"></img>
                <img src="/jupiter.png" alt="/jupiter.png" id="jupiter" width="0" height="0"></img>
                <img src="/mars.png" alt="/mars.png" id="mars" width="0" height="0"></img>
                <img src="/uranus.png" alt="/uranus.png" id="uranus" width="0" height="0"></img>
                <div tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                    <canvas id="viewport" ref={canvasRef} />
                </div>
                <LoggedInBar style={{ top: 30, right: 300, position: "fixed" }} >Logged in as {isLoggedin} </LoggedInBar>
                <button onClick={openMenu} style={{ top: 30, right: 30, position: "fixed" }} >Menu</button>
                <Menu display={displayMenu} onClose={() => setDisplayMenu(false)} onChange={handleChangeDisplay} />

            </>
        </IsLoggedInProvider>
    )
}

export default GameCanvas
