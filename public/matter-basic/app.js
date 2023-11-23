
//////////////////////////
//
// 🤩 matter.js
//

import {clear, print} from "https://qwark.glitch.me/toolbox.js"

asyncImport('https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js', main)
 
print('<center>👀<h1><orange>matter.js</h1>')

function asyncImport(url,func) {
  const script = document.createElement('script')
  script.src = url
  script.onload = func
  document.head.appendChild(script)  
}
 
function main() {
  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;
 
  // create an engine
  var engine = Engine.create();
 
  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine
  });
 
  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
 
  // add all of the bodies to the world
  Composite.add(engine.world, [boxA, boxB, ground]);
 
  // run the renderer
  Render.run(render);
 
  // create runner
  var runner = Runner.create();
 
  // run the engine
  Runner.run(runner, engine);

}



