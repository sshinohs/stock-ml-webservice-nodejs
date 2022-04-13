/*Generate a random value using the noise function with
noiseParam as its argument. Store this in the variable n. Remember that n will be between 0 and 1.
Use the map function to map n from the range 0 to 1 to the range 0 to height. Store this value in the variable value.
Append value to your array marketvalue using the push function.
Add noiseStep to noiseParam to prepare it for the next iteration. */


var marketvalue = []; //81 values that vary. // saves all the positions of the graph
//change scale from 0 to height in map variable
var noiseParam = 0;
var noiseStep = 0.1; // this defines how jagged the curve is

function setup() {
    createCanvas(400, 400);
    strokeWeight (5);
    //setting up the array
    for ( var i = 0; i <= width/5; i++) { //this makes it suited for any width
        var n = noise(noiseParam);
        var value = map(n, 0, 1, 0, height);  //if n = o.5 then value will be halfway between 0 and height
        marketvalue.push(value); //appends the value to the latest market value
        noiseParam += noiseStep;
    }

}

function draw() {
    background(0,0,255);
    stroke(255);
    for (var i = 0; i < width/5 ; i++) { //here you don't use <=
        line(i*5, marketvalue[i],i*5 + 5, marketvalue[i+1]);
    }

}