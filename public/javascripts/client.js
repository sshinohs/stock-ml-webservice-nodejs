let myCircle;

function setup() {
    createCanvas(400, 400);
    background(0);
    // retrieve the x, y coords from the DB
    fetch('/circle', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
            if(data) {
                // create a circle at the x, y coords
                myCircle = new Circle(data.x, data.y);
            }
            else {
                myCircle = new Circle(0, 0);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function draw() {
    background(0);
    if(myCircle) myCircle.draw();
}

function mousePressed() {
    // make sure the circle has been created
    if(myCircle) {
        // redraw the circle at the position that was clicked
        myCircle.x = mouseX;
        myCircle.y = mouseY;

        // update the DB with the new coords
        saveCircleCoords(myCircle.x, myCircle.y);
    }
}

function saveCircleCoords(newX, newY) {
    fetch('/circle', {
        method: 'PUT',
        body: JSON.stringify({x: newX, y: newY}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if(response.ok) {
                console.log('Coords were updated in the DB.');
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });
}

// poll the DB every 1 sec to get the stored x, y coords
// note: this is a demo of how to retrieve data from mongodb, in a real system it might make more sense to send these updates via something like Socket.io to avoid the need for polling
setInterval(function() {
    fetch('/circle', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
            myCircle.x = data.x;
            myCircle.y = data.y;
        })
        .catch(function(error) {
            console.log(error);
        });
}, 1000);

// 'blueprint' for our circle objects
class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 50;
    }

    draw() {
        stroke(255);
        strokeWeight(3);
        ellipse(this.x, this.y, this.r);
    }
}