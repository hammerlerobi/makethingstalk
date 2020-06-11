var colors = [
  "#38D6BC",
  "#67D6E0",
  "#009DEC",
  "#5287EB",
  "#7D3CD7",
  "#B35BD1",
  "#DF5CBE",
  "#F8803F",
  "#FAA82E",
  "#E7C755",
];

export function random_color() {
  return colors[parseInt(Math.random() * colors.length)];
}

// GENERATE COLOR RANGE
// function rand(min, max) {
//   return parseInt(Math.random() * (max - min + 1), 10) + min;
// }

// function get_random_color() {
//   var h = rand(1, 360); // color hue between 1 and 360
//   var s = rand(60, 80); // saturation 30-100%
//   var l = rand(45, 55); // lightness 30-70%
//   return "hsl(" + h + "," + s + "%," + l + "%)";
// }
