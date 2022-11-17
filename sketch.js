
const proj_mat = [[1,0,0], [0,1,0], [0,0,1], [0,0,0]];

function setup() {
  createCanvas(800, 800);

}

let theta = 0; 
function draw() {
  background(220);
  let rotation_matZW = [
    [cos(theta), -sin(theta), 0, 0], 
    [sin(theta), cos(theta), 0, 0],
    [0, 0, 1, 0], 
    [0, 0, 0, 1]
  ]
  
  let rotation_matYW = [
    [cos(theta), 0, -sin(theta), 0], 
    [0, 1, 0, 0],
    [sin(theta), 0, cos(theta), 0], 
    [0, 0, 0, 1]
  ]
  
  let rotation_matXW = [
    [1, 0, 0, 0],
    [0, cos(theta), -sin(theta), 0], 
    [0, sin(theta), cos(theta), 0], 
    [0, 0, 0, 1]
  ]
  
  let rotation_matXY = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, cos(theta), -sin(theta)], 
    [0, 0, sin(theta), cos(theta)]
  ]
  
  let rotation_matXZ = [
    [1, 0, 0, 0],
    [cos(theta), 0, 0, -sin(theta)], 
    [0, 0, 1, 0],
    [0, sin(theta), 0, cos(theta)]
  ]
  
  let rotation_matYZ = [
    [cos(theta), 0, 0, -sin(theta)],
    [0, 1, 0, 0], 
    [0, 0, 1, 0],
    [sin(theta), 0, 0, cos(theta)]
  ]
// create 4d points
translate(height/2, width/2); 
let my_points = createPenta();  

// do rotation first
for (let i = 0; i < my_points.length; i++){
    // my_points[i] = matrixMult(my_points[i], rotation_matZW);
    my_points[i] = matrixMult(my_points[i], rotation_matXY);
    my_points[i] = matrixMult(my_points[i], rotation_matYW);
    my_points[i] = matrixMult(my_points[i], rotation_matXW);
    // my_points[i] = matrixMult(my_points[i], rotation_matXZ);
    my_points[i] = matrixMult(my_points[i], rotation_matYZ);
  }
  

// do the projection
let proj = project(my_points);


// scaler up by its projection
for (let i = 0; i < proj.length; i++){
  proj[i] = scalarMult(proj[i], 200); 
}

// draw my points
 for (let i = 0; i < proj.length; i++){
   stroke('black'); 
   strokeWeight(10);
   point(proj[i][0][0], proj[i][0][1], proj[i][0][2]);
 }
 
 console.log(proj);

// Connect our lines
stroke('purple'); 
strokeWeight(3);

// connect all points with a line 
connect(proj[0], proj[1]);
connect(proj[0], proj[2]);
connect(proj[0], proj[3]); 
connect(proj[0], proj[4]);
connect(proj[1], proj[2]);
connect(proj[1], proj[3]);
connect(proj[1], proj[4]);
connect(proj[2], proj[3]);
connect(proj[2], proj[4]);
connect(proj[3], proj[4]);

theta += 0.01;
}








//////// function library
// Matrix Multiplication
function matrixMult(a, b){
  let aRows = a.length; 
  let aCols = a[0].length; 
  let bCols = b[0].length; 
  let result = new Array(aRows); 
  
  for (let r = 0; r < aRows; r++){
      eachRow = new Array(bCols); 
      for (let i = 0; i < bCols; i++){
          let sum = 0; 
          for (let j = 0; j < aCols; j++){
              sum += a[r][j] * b[j][i];
          }
          eachRow[i] = sum;
      }
      result[r] = eachRow;
  }
  return result; 
}

// Scalar Multiplication 
function scalarMult(a, scal){
  let aRows = a.length; 
  let aCols = a[0].length;

  for (let i = 0; i < aRows; i++){
    for (let j = 0; j < aCols; j++ ){
      a[i][j] = scal * a[i][j]; 
    }
  }
  return a;
}

// Create My 4d Shape
function createPenta(){
  let p1 = [[1/sqrt(10), + 1/sqrt(6), 1/sqrt(3), 1]]; 
  let p2 = [[1/sqrt(10), + 1/sqrt(6), 1/sqrt(3), -1]];
  let p3 = [[1/sqrt(10), + 1/sqrt(6), 2/sqrt(3), 0]]; 
  let p4 = [[1/sqrt(10), - sqrt(3/2), 0, 0]]; 
  let p5 = [[2*sqrt(2/5), 0, 0, 0]];

  return penta_set = [p1,p2,p3,p4,p5];
}

function project(points){
  let proj_set = []; 
  for(let point of points){
      proj_set.push(matrixMult(point, proj_mat)); 
  }
  return proj_set;
}

function connect(point1, point2){
  line(point1[0][0], point1[0][1], point2[0][0], point2[0][1]);
}