//
//  File Name:    script.js (for dotArt)
//  Author:       Artem Suprun
//  Date:         07/19/2023
//  Description:  A script containing code that renders an
//                image and converts it into a dotted form.
//

const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

function drawScene() {
  //canvas.width = png.width;
  //canvas.height = png.height;
  let ratioX = canvas.width / png.naturalWidth;
  let ratioY = canvas.height / png.naturalHeight;
  let ratio = Math.min(ratioX, ratioY);
  
  ctx.drawImage(png, 0, 0, png.naturalWidth*ratio, png.naturalHeight*ratio);
  
  const data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const dots = [];
  for (let y = 0; y < data.height; y++) {
    for (let x = 0; x < data.width; x++) {
      if (data.data[(x*4 + y*4 * data.width) + 3] > 128) {
        let red = data.data[(x*4 + y*4 * data.width)];
        let green = data.data[(x*4 + y*4 * data.width) + 1];
        let blue = data.data[(x*4 + y*4 * data.width) + 2];
        const dot = {
          x : x,
          y : y,
          color: "rgb("+(red)+", "+(green)+", "+(blue)+")"
        };
        dots.push(dot);
      }
    }
  }
  
  ctx.fillStyle = "white";
  for (let i = 0; i < dots.length; i += 15) {
    const dot = dots[i];
    ctx.fillStyle = dot.color;
    ctx.fillRect(dot.x, dot.y, 2, 2);
  }
}

const png = new Image();
png.src = "./art.png";
//png.crossOrigin = "Anonymous";
png.onload = drawScene;
