import './style.css'
import * as PIXI from 'pixi.js';
import viteLogo from '/vite.svg';
import kiwi from '/kiwi.png';

// Create the application helper and add its render target to the page
let app = new PIXI.Application<HTMLCanvasElement>({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

let promise = new Promise((resolve) => {
  let img = new Image();
  img.src = kiwi;
  img.onload = async () => {
    // 创建canvas来转换图片为base64
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);
    const base64Url = canvas.toDataURL('image/png');
    await PIXI.Assets.load({ alias: 'kiwi', src: base64Url });
    resolve(base64Url);
  };
});
await PIXI.Assets.load({ alias: 'vite', src: viteLogo });
await promise;
const texture = PIXI.Assets.get('vite');

// Create the sprite and add it to the stage
let sprite = PIXI.Sprite.from(texture);
app.stage.addChild(sprite);
sprite.pivot.x = sprite.width / 2;
sprite.pivot.y = sprite.height / 2;
sprite.y = 100;

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  sprite.rotation -= delta * 0.01;
});

sprite.eventMode = 'static';
sprite.on('pointerdown', (event) => { console.log('sprite pointer down'); })

app.view.addEventListener('touchend', ev => {
  console.log('view touchend');
  ev.preventDefault();
})
