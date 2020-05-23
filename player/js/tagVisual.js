let blurV;
let blurH;
let offset;

function preload() {
  blurV = loadShader('./assets/shader/base.vert', './assets/shader/blur.frag');
  blurH = loadShader('./assets/shader/base.vert', './assets/shader/blur.frag');
  offset = loadShader('./assets/shader/base.vert', './assets/shader/offset.frag');
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('tag-visual');

  rectMode(CENTER);
  imageMode(CENTER);
  colorMode(HSB, 360, 1, 1)


  A = createGraphics(1920, 1080);
  A.colorMode(HSB, 360, 1, 1);

  B = createGraphics(1920, 1080, WEBGL);
  B.colorMode(HSB, 360, 1, 1);

  C = createGraphics(1920, 1080, WEBGL);
  C.colorMode(HSB, 360, 1, 1);

  //draw()
}

function draw(hue) {


  raster = 3
  a = width / raster


  A.background(0, 0, 0)

  for (var i = 0; i < raster * raster; i++) {

    x = Math.round(random(raster)) * a
    y = Math.round(random(raster)) * a - height / width * a / 2

    item(A, x, y, a)

  }

  blurH.setUniform('direction', [1.0, 0.0]);
  blurV.setUniform('direction', [0.0, 1.0]);

  blurH.setUniform('tex', A);


  B.shader(blurH);
  B.fill(0, 0, 1);
  B.rect(0, 0, width, height);


  blurV.setUniform('tex', B);


  C.shader(blurV);
  C.fill(0, 0, 1);
  C.rect(0, 0, width, height);

  //

  h = hue
  hc = (h + 180) % 360;

  let colorA = color(h, 1, 1);
  let colorB = color(hc, .1, 1);

  offset.setUniform('org', A);
  offset.setUniform('blur', C);
  offset.setUniform('colorA', getRGBArray(colorA));
  offset.setUniform('colorB', getRGBArray(colorB));

  shader(offset);
  fill(0, 0, 1);
  rect(0, 0, width, height);

  noLoop()


}

function getRGBArray(color) {
  console.log(red(color) / 255.0, green(color) / 255.0, blue(color) / 255.0);
  return [red(color) / 255.0, green(color) / 255.0, blue(color) / 255.0]
}

function item(g, x, y, width) {

  let a = width / 2

  g.stroke(0, 0, 1)
  g.fill(0, 0, 1)

  g.push()
  g.translate(x, y)

  for (var i = 0; i < 2 * 2; i++) {

    let x0 = (i % 2) * a
    let y0 = floor(i / 2) * a

    if (random() > 0.5) {

      g.beginShape()

      g.vertex(x0, y0)
      g.vertex(x0 + a, y0)
      g.vertex(x0, y0 + a)

      g.endShape()

    }

    if (random() > 0.5) {

      g.beginShape()

      g.vertex(x0 + a, y0)
      g.vertex(x0 + a, y0 + a)
      g.vertex(x0, y0 + a)

      g.endShape()

    }

  }

  g.pop()

}
