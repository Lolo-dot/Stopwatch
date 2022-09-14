var mode = false;
var timeCounter = 0;
var lapCounter = 0;
var lapNumber = 0;
var action;
var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

$(function(){

    hideshowButtons("#startbutton", "#lapbutton");

    $("#startbutton").click(function(){
        mode = true;
        hideshowButtons("#stopbutton", "#lapbutton");
        //start counter
        startCounter();
    });

    $("#stopbutton").click(function(){
        hideshowButtons("#resumebutton", "#resetbutton");
        //stop counter
        clearInterval(action);
    });

    $("#resumebutton").click(function(){
        mode = true;
        hideshowButtons("#stopbutton", "#lapbutton");
        //continue counter
        startCounter();
    });

    $("#resetbutton").click(function(){
        mode = false;
        location.reload();
    });

    $("#lapbutton").click(function(){
        if(mode){
            //stop action
            clearInterval(action);
            //add lap to lap details
            addLap();
            //reset the lap count
            lapCounter = 0;
            //start action
            startCounter();
        }
    });

    //functions
    function hideshowButtons(x, y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    function startCounter(){
        action =  setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*1000){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*1000){
                lapCounter = 0;
            }
            updateTime();
        }, 10) 
    }

    function updateTime() {
        timeMinutes = Math.floor(timeCounter/6000);

        timeSeconds = Math.floor((timeCounter%6000)/100);

        timeCentiseconds = Math.floor((timeCounter%6000)%100);
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        lapMinutes = Math.floor(lapCounter/6000);

        lapSeconds = Math.floor((lapCounter%6000)/100);

        lapCentiseconds = Math.floor((lapCounter%6000)%100);
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    function format(number){
        if(number<10){
            return "0"+number;
        }
        else{
            return number;
        }
    }

    function addLap(){
        lapNumber++;
        var myLapDetails = '<div class="lap">' +
                                '<div class="laptimetitle">'+
                                    'Lap '+ lapNumber +
                                '</div>'+
                                '<div class="laptime">'+
                                    '<span>' + format(lapMinutes) + '</span>' +
                                    ':<span>' + format(lapSeconds) + '</span>' +
                                    ':<span>' + format(lapCentiseconds) + '</span>' +
                                '</div>'+
                            '</div>';
        $(myLapDetails).prependTo("#laps");
    }
    
});