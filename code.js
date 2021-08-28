var status = "";
var obj = [];


function preload() {}

function setup() {
    canvas = createCanvas(450, 360);
    video = createCapture(VIDEO);
    canvas.center();
    video.size(450, 360);
    video.hide();
    document.getElementById('status').innerHTML = 'Status: Detecting Objects';
}

function modelLoaded() {
    status = true;
    console.log('Successfully Loaded The Model');
    document.getElementById('objectFoundStatus').innerHTML = 'Finding The Object';
}

function draw() {
    image(video, 0, 0, 450, 360);
    if (status != '') {
        objectDetector.detect(video, gotResults);
        for (let i = 0; obj.length > i; i++) {
            if (obj[i].label == objectNameToFind) {
                fill('Red')
                stroke('Red');
                document.getElementById('objectFoundStatus').innerHTML = 'Found ' + objectNameToFind;
            } else {
                fill('Cyan')
                stroke('Cyan');
            }
            strokeWeight(1)
            textSize(15)
            percent = floor(obj[i].confidence * 100);
            text(obj[i].label + " " + percent + "%", obj[i].x + 5, obj[i].y - 5)
            noFill()
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
            console.log(obj[i].label)
            document.getElementById('status').innerHTML = 'Status: Detected Objects';
        }
    }
}

function start() {
    objectNameToFind = document.getElementById('objectNameToFind').value;
    if (objectNameToFind == '') {
        console.log('Nothing')
    }
    if (objectNameToFind != '') {
        console.log(objectNameToFind);
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        obj = results;

    }
}