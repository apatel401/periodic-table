import { useEffect, useRef } from 'react';
import { wavelengthToColor } from './wavelengthToColor';
import { lines } from '../test';

const useDrawSpectrum = (currentElement, canvasId) => {
    useEffect(() => {
        if (currentElement){
          /*  Passing only number of current element to use another json which has strongLines data to produce spectral images*/
            const {name, strongLines} = lines[currentElement.number];
            const main = document.getElementById("spectra");
            const canvas = document.createElement("canvas");
            console.log(main)
            canvas.width = main.offsetWidth;
            canvas.height = (main.offsetHeight * 95) / 100;
            canvas.id = canvasId;
    
            const ctx = canvas.getContext("2d");
            const titleDiv = document.createElement("div");
            titleDiv.id = "eTitle";
            const textNode = document.createTextNode(name);
            titleDiv.appendChild(textNode);
    
            main.innerHTML = ''; // Clears the contents of the Div
            main.appendChild(canvas); // Adds the canvas
            main.appendChild(titleDiv); // Adds the div over the canvas
    
            // Prepare the gradient background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let spectrumMargin = (canvas.width - 400) / 2;
            for (let i = 380; i < 781; i++) {
                ctx.globalAlpha = 0.4;
                ctx.fillStyle = wavelengthToColor(i);
                ctx.fillRect(spectrumMargin + i - 380, 0, 1, canvas.height);
            }
            spectrumMargin = (canvas.width - 300) / 2;
    
            if (strongLines) {
                // Draws the strong lines over the background
                ctx.globalAlpha = 1;
                for (let j = 0; j < strongLines.length; j++) {
                    ctx.fillStyle = wavelengthToColor(strongLines[j]);
                    ctx.fillRect(spectrumMargin + strongLines[j] - 400, 0, 1, canvas.height);
                }
    
                // Draws the ruler
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeStyle = "#FFFFFF";
                // Lower triangle markers
                for (let i = 0; i < 301; i += 60) {
                    ctx.beginPath();
                    ctx.moveTo(spectrumMargin + i - 3, canvas.height);
                    ctx.lineTo(spectrumMargin + i, canvas.height - (canvas.height / 12));
                    ctx.lineTo(spectrumMargin + i + 3, canvas.height);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
                // Upper triangle markers
                for (let i = 0; i < 301; i += 60) {
                    ctx.beginPath();
                    ctx.moveTo(spectrumMargin + i - 3, 0);
                    ctx.lineTo(spectrumMargin + i, canvas.height / 12);
                    ctx.lineTo(spectrumMargin + i + 3, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
            }
        }
        
    }, [currentElement, canvasId]);
};

export default useDrawSpectrum;
