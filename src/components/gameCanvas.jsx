import React, { useRef, useEffect } from 'react'
import Game from '../gameElements/game';
import Level from '../gameElements/level';

const GameCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        let game = new Game();
        game.createLevel();




        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [])



    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default GameCanvas
