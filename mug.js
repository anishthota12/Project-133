mugStatus = "";
mugImage = "";
objects = [];

function back() {
    window.location = "index.html";
}

function preload() {
    mugImage = loadImage("mug.jpg");
}

function setup() {
    canvas = createCanvas(480, 350);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("mugStatus").innerHTML = "Status: Detecting Objects...";
}

function draw() {
    if (mugStatus != "") {
        image(mugImage, 0, 0, 480, 350);
        for (i = 0; i < objects.length; i++) {
            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        document.getElementById("mugStatus").innerHTML = "Status : Objects Detected!";
        document.getElementById("mugsDetected").innerHTML = "Number of Objects Detected: " + objects.length;
    }
}

function modelLoaded() {
    mugStatus = true;
    objectDetector.detect(mugImage, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
        console.log(objects);
    }
}