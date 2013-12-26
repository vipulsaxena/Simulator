/// <reference path="erail_mobile.js" />
/// <reference path="train.js" />

var Stn = null;
var TimerInterval = 10;
var SelectedStation = "NDLS";
var Multiplier = 50;
var UpdateSlider=true;

$(document).ready(function ()
{
    var canvas = document.getElementById("canvas0");
    var context = canvas.getContext("2d");
    context.canvas.width = $("#canvas1").width();
    context.canvas.height = $("#canvas1").height();
	
    context.font = "10pt Calibri";
		
	canvas = document.getElementById("canvas1");
    context = canvas.getContext("2d");
    context.canvas.width = $("#canvas1").width();
    context.canvas.height = $("#canvas1").height();
    context.font = "10pt Calibri";
	
    CurrentTime.setHours(5);
    GetTrains(SelectedStation);

    $("#slider").slider({
        max: 1440,
        start: function (event, ui) { UpdateSlider = false; },
        slide: function (event, ui)
        {
            var val = $("#slider").slider("value");
            var H = Math.floor(val / 60);
            var M = val - (H * 60);
            CurrentTime.setHours(H);
            CurrentTime.setMinutes(M);
        },
        stop: function (event, ui)
        {
            UpdateStationTrains();
            UpdateSlider=true;
        }
    });

});

function Timer()
{
    if (UpdateSlider)
    {
        CurrentTime = new Date(CurrentTime.getTime() + TimerInterval * Multiplier);
        $("#slider").slider("value", CurrentTime.getHours() * 60 + CurrentTime.getMinutes());
    }

    StationMaster();
}


Station.prototype.Draw = function (context)
{
    var H = context.canvas.height;
    var W = context.canvas.width;
    var Gap = H / (this.Platforms + 1);
    var Y = Gap * .5;

    context.clearRect(0, 0, W, H);
    context.fillStyle = "blue";
    context.fillText(this.Text1, W * .5, 10);

    var UpdateTracks = false;
    if (Tracks.length == 0) UpdateTracks = true;

    var TrackCounter = 0;

    for (var i = 0; i < this.Platforms; i++)
    {
        Y += i % 2 == 0
		? Gap * .4 : Gap * 1.55;

        DrawRect(context, W * .5, Y, W, Gap * .4, 0, "#c0c0c0", "#c0c0c0");
        context.fillStyle = "blue";
        context.fillText("PF-" + (i + 1), 10, Y + Gap * .15);

        if (Tracks.length > i)
        {
            var s = "";
            if (Tracks[i].Train)
            {
                var T = Tracks[i].Train;

                s = T.TrainNo + "-"
                    + T.TrainName + ",  "
                    + GetTime(T.ArrivalTime) + " - "
                    + GetTime(T.DepartureTime) + ", ";

                if (T.StnTo == SelectedStation)
                {
                    s += " from " + T.StnFromName + "(" + T.StnFrom + ")";
                }
                else if (T.StnFrom == SelectedStation)
                {
                    s += " to " + T.StnToName + "(" + T.StnTo + ")";
                }
                else
                {
                    s += T.StnFromName + "(" + T.StnFrom + ")";
                    s += " to " + T.StnToName + "(" + T.StnTo + ")";
                }
            }
            context.fillText(s, 50, Y + Gap * .15);

        }

        if (i % 2 == 0)
        {
            DrawLine(context, 0, Y + Gap * .5, W, Y + Gap * .5);
            DrawLine(context, 0, Y + Gap, W, Y + Gap);

            if (UpdateTracks)
            {
                TrackCounter++;
                Tracks.push(new Track(TrackCounter, 0, Y + Gap * .5, W, Y + Gap * .5));
                TrackCounter++;
                Tracks.push(new Track(TrackCounter, 0, Y + Gap, W, Y + Gap));
            }
        }

    }
    context.fillText(this.Text2, W * .5, H - Gap * .15);
}

function UpdateStationTrains()
{
    var TempCoaches = ["En", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]

    $(TrainsObjAD.Trains).each(function (index)
    {
        if (index == 0)
            return;

        var day = (CurrentTime.getDay() == 0 ? 6 : CurrentTime.getDay() - 1);
        if (this[T_RunDays][day] == '0')
            return;

        var MoveType = MOVE_ARRIVAL_DEPARTURE;

        var HA = -1, MA = 0, HD = -1, MD = 0;

        if (this[T_Arrival] != "First Stn")
        {
            HA = +this[T_Arrival].split('.')[0];
            MA = +this[T_Arrival].split('.')[1];
        }

        if (this[T_Departure] != "Last Stn")
        {
            HD = +this[T_Departure].split('.')[0];
            MD = +this[T_Departure].split('.')[1];
        }

        var Arr = new Date();

        if (-1 != HA)
        {
            MoveType = MOVE_DEPARTUREONLY;
            Arr.setHours(HA);
            Arr.setMinutes(MA);
        }

        var Dep = new Date();
        if (-1 != HD)
        {
            MoveType = MOVE_ARRIVALONLY;
            this.MoveType
            Dep.setHours(HD);
            Dep.setMinutes(MD);
        }
        else
        {
            Dep = new Date(Arr.getTime() + 60000 * 20); // 20 min gap
        }

        if (-1 == HA)
        {
            Arr = new Date(Dep.getTime() - 60000 * 20);// 20 min gap
        }

        var TrainID = parseInt(this[T_TrainID]);

        Trains.push(new Train(this[T_No],
        this[T_Name],
        null, //track
        Math.random() + 1, //speed
        CoachesList[TrainID] == undefined ? TempCoaches : CoachesList[TrainID],  //coachlist
        TrainDirection[TrainID] == undefined ? 1 : TrainDirection[TrainID],//direction
        Arr,//arrival
        Dep,//departure
        this[T_StnFirst], this[T_StnFirstName],
        this[T_StnLast], this[T_StnLastName],
            MoveType));

    });

    setInterval("Timer()", TimerInterval);
}

var TrainsObjAD = null;
var CoachesList = new Array();
var TrainDirection = new Array();

var TrainsDone = false, CoachesDone = false, DirectionDone = false;
var StnLeft = "";
function CreateTrains()
{
    if (TrainsDone && CoachesDone && DirectionDone)
    {
        UpdateStationTrains();
    }
}

function GetTrains(StationCode)
{
    SelectedStation = StationCode;
    switch (SelectedStation)
    {
        case "NDLS":Stn = new Station(16, "Paharganj", "Ajmeri Gate");StnLeft = "DSB";break;
        case "DLI": Stn = new Station(16, "Chandni Chowk / Fatehpuri ", ""); StnLeft = "OKA"; break;
        case "NZM": Stn = new Station(9, "Gate No 1", "Sarai Kale Khan -Gate No 2"); StnLeft = "DSA"; break;
    }

    TrainsDone = false;
    CoachesDone = false;
    DirectionDone = false;
    CoachesList.length=0;
    TrainDirection.length=0;
    Tracks.length=0;
    Trains.length = 0;

    $("#divTrainsList").html("Loading...");
    
    var BaseURL = "../";
    $.ajax({
        cache: true, url:  "getTrainsPassing.aspx?StationCode=" + SelectedStation + "&Language=0", success:
        function (Data)
        {
            TrainsObjAD = new TrainListAD(Data, "", 1);
            TrainsDone = true;
            CreateTrains();
        }
    });

    $.ajax({
        cache: true, url: "Data.aspx?Action=TRAINCOACHES&Data1=" + SelectedStation + "&Password=2012", success:
        function (Data)
        {
            var Lines = Data.split('$');
            $(Lines).each(function ()
            {
                var F = this.split('~');
                if (F.length == 0)
                    return;

                var TrainID = 0;
                var Coaches = new Array();
                $(F).each(function (i)
                {
                    if (i == 0)
                        TrainID = this;
                    else
                    {
                        var C = this.replace(' ', '').replace('-', '');
                        if (C.length > 2)
                            C = C.substring(0, 2);

                        Coaches.push(C);
                    }
                });

                CoachesList[TrainID] = Coaches;

            });

            CoachesDone = true;
            CreateTrains();

        }
    });


    $.ajax({
        cache: true, url: "Data.aspx?Action=TRAINDIRECTION&Data1=" + SelectedStation + "&Password=2012", success:
        function (Data)
        {
            var Lines = Data.split('~');
            $(Lines).each(function ()
            {
                var F = this.split('^');
                if (F.length < 2)
                    return;

                var TrainID = parseInt(F[0]);
                var Stn = F[1];

                TrainDirection[TrainID] = Stn == "DSB" ? 1 : -1;

            });

            DirectionDone = true;
            CreateTrains();

        }

    });

}