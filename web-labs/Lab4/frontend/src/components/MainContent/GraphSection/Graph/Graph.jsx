import React, {useRef, useEffect} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Graph.module.css';
import GraphSvg from './GraphSvg';
import Canvas from './Canvas/Canvas';
import GraphMirrorSvg from "./GraphMirrorSvg";
import NoGraphSvg from "./NoGraphSvg";

const Graph = (props) => {
    const canone = 68;
    const pointsCanvasRef = useRef(null);
    const currentCanvasRef = useRef(null);

    const loadPrevPoints = (canvas, canvasCtx) => {
        for (let entry of props.entries) {
            // eslint-disable-next-line
            if (entry.r == props.rCurrent[0]) {
                canvasCtx.fillStyle = entry.inside ? 'green' : 'red';
                canvasCtx.beginPath();
                if (entry.r >= 0) {
                    canvasCtx.arc(
                        entry.x / entry.r * canone + canvas.width / 2,
                        -entry.y / entry.r * canone + canvas.height / 2,
                        2, 0, 2 * Math.PI);
                    canvasCtx.fill();
                } else {
                    canvasCtx.arc(
                        -(entry.x) / entry.r * canone + canvas.width / 2,
                        entry.y / entry.r * canone + canvas.height / 2,
                        2, 0, 2 * Math.PI);
                    canvasCtx.fill();
                }
            }
        }
    }

    const clearCanvas = (canvas, canvasCtx) => {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    }


    const handleClick = (canvasRef, event) => {
        const canvas = canvasRef.current;

        props.rCurrent.forEach(function (itemR) {
            let canvasX;
            let canvasY;
            if (itemR >= 0) {
                canvasX = (event.nativeEvent.offsetX - canvas.width / 2) / canone * itemR;
                canvasY = (-event.nativeEvent.offsetY + canvas.height / 2) / canone * itemR;
            } else {
                canvasX = -1 * ((event.nativeEvent.offsetX - canvas.width / 2) / canone * itemR);
                canvasY = -1 * ((-event.nativeEvent.offsetY + canvas.height / 2) / canone * itemR);
            }

            if (canvasY < props.yMin) {
                canvasY = props.yMin;
            } else if (canvasY > props.yMax) {
                canvasY = props.yMax;
            }

            props.selectXByGraph(canvasX.toString().substring(0, 7));
            props.selectYByGraph(canvasY.toString().substring(0, 7));
            props.selectRByGraph(itemR);
            props.checkEntryByGraph();
        });
    }

    useEffect(() => {
        const pointsCanvas = pointsCanvasRef.current;
        const pointsCanvasCtx = pointsCanvas.getContext('2d');
        clearCanvas(pointsCanvas, pointsCanvasCtx);

        const currentCanvas = currentCanvasRef.current;
        const currentCanvasCtx = currentCanvas.getContext('2d');
        clearCanvas(currentCanvas, currentCanvasCtx);

        loadPrevPoints(pointsCanvas, pointsCanvasCtx);
    });

    if (props.rCurrent[0] > 0) {
        return (
            <div styleName="graph-container">
                <GraphSvg rValue={props.rCurrent}/>
                <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)"/>
                <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)"
                        handleClick={handleClick}/>
            </div>
        );
    }
    if (props.rCurrent[0] < 0) {
        return (
            <div styleName="graph-container">
                <GraphMirrorSvg rValue={props.rCurrent}/>
                <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)"/>
                <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)"
                        handleClick={handleClick}/>
            </div>
        );
    } else {
        return (
            <div styleName="graph-container">
                <NoGraphSvg rValue={props.rCurrent}/>
                <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)"/>
                <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)"
                        handleClick={handleClick}/>
            </div>
        );
    }
}

export default CSSModules(Graph, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});
