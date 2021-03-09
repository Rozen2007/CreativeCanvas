/**
 * @name: 
 * @author 
 * @website 
 */

let c = new Candy('#c', 600, 600);
let width = CANVAS_WIDTH;
let height = CANVAS_HEIGHT;
let points = [];
let pointSize = 4;
let mouseDown = false;

let mousePos = {
  x: 0, y: 0
}
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);
window.addEventListener('mousemove', (e) => {
  mousePos.x = e.offsetX;
  mousePos.y = e.offsetY;
})
window.addEventListener('touchmove', (e) => {
  e.preventDefault();
  console.log(e.touches)
  mousePos.x = e.touches[0].pageX;
  mousePos.y = e.touches[0].pageY;
})

c.createScreenBuffer('osc');
let osc = c.screenBuffers.osc;

window.onload = function () {
  let url = './src/images/nike.png';

  let mouse = new Vector(0, 0);

  let img = c.loadImage(url);
  img.setAttribute('crossOrigin', '');
  c.trypreload();
  c.preload = function () {
    animate();
  }

  c.noStroke();
  let count = 1;
  function animate() {
    c.clear('white');

    mouse.setXY(mousePos.x, mousePos.y);
    osc.image(img, 100, 100, width - 200, height - 150);

    if (count > 0) getPixelCoords();
    count--;

    for (let i = 0; i < points.length; i++) {
      points[i].behaviour(mouse);
      points[i].update();
      points[i].render();
    }
    c.loop(animate);
  }

}

