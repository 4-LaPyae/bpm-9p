import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, "10%", "10%");
        context.font = "20px Georgia";
        context.fillText(props.text, 10, 35);
    }, [props.text]);

    return <canvas ref={canvasRef} height="50px" />;
};

export default Canvas;
