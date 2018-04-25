
var x;          //to store setInterval state
var i = 1;      //for initial 1 session
var mySound;
var onFlag = 1;
console.log("onFLag set to 1");

function timerFunc(endDate){
    console.log("timerFunc is on")
    var now = new Date().getTime();     //get current time
    var distance = endDate - now;       //distance to count, units are milliseconds

    //Breaking down milliseconds into Days, Months, Seconds, Milliseconds
    //var daysLeft = Math.floor(distance / (1000*60*60*24));
    //distance = distance % (1000*60*60*24);      //after taking days, this is left
    //var hoursLeft = Math.floor(distance / (1000*60*60));
    //distance = distance % (1000*60*60);     //after taking away hours, this is left
    var minutesLeft = Math.floor(distance / (1000*60));
    distance = distance % (1000*60);    //after taking away minutes, these many ms are left
    var secLeft = Math.floor(distance / 1000);      //divide milliseconds by 1000 to get seconds
    if(secLeft < 10){
        secLeft = '0'+ secLeft;
    }

    //modifying the HTML document to display the time left
    document.getElementById("timer").innerHTML = /*daysLeft + 'Days ' + hoursLeft + 'Hours ' +*/ minutesLeft + ':' + secLeft + ' ';

    //after finish
    if(distance <= 0 ){
        clearInterval(x);
        mySound = new sound('alarm.mp3');
        mySound.play()
        document.getElementById("timer").innerHTML = "Done!";
    }
    
}   //end timerFunc


function startFunction(){

    var toDateTime = new Date().getTime() + i*1500000;       //adding 25 mins to current time
    console.log("startFunction is on with endDate: "+toDateTime)
    
    //use setInterval to update every second
    x = setInterval(function(){timerFunc(toDateTime)}, 1000)
}//end startFunction


function breakFunction(){

    var toDateTime = new Date().getTime() + i*300000;       //adding 5 mins to current time
    console.log("breakFunction is on with endDate: "+toDateTime)
    
    //use setInterval to update every second
    x = setInterval(function(){timerFunc(toDateTime)}, 1000)
}//end startFunction


function stopFunction(timeToReset){
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Stopped :(";
    setTimeout(function(){document.getElementById("timer").innerHTML = timeToReset;
                            }, 1000);
}


function resetFunction(timeToReset){
    clearInterval(x);
    console.log(timeToReset)
    document.getElementById("timer").innerHTML = "Resetting...";

    setTimeout(function(){document.getElementById("timer").innerHTML = timeToReset;
                            }, 1000);

}


//for start and stop sounds
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


