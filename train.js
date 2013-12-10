var
TS_ReadyToEnter = 0,
TS_MovingEntering = 1,
TS_StoppedOnPlatform = 2,
TS_MovingExiting = 3,
TS_OutofPlatform = 4;

var Tracks = new Array();
var Trains = new Array();
var CurrentTime = new Date();


var MOVE_ARRIVALONLY = 1,
    MOVE_DEPARTUREONLY = 2,
    MOVE_ARRIVAL_DEPARTURE = 3;
	
function Track(TrackNo, X1, Y1, X2, Y2)
{
	this.TrackNo = TrackNo;
	this.X1 = X1;
	this.Y1 = Y1;
	this.X2 = X2;
	this.Y2 = Y2;
	this.IsOccupied = false;
	this.Train;
}

Track.prototype.UpdateStatus = function ()
{
    if (this.Train == null) return;

    var X = this.Train.CurrentX;
    var Y = this.Train.CurrentY;
    var flag = IsTrainOnTrack(X, Y, this);

    if (!flag)
    {
        var L = this.Train.CoachLength * 1.1 * this.Train.NoOfCoaches;
        X += this.Train.Direction == 1 ? -L : L;

        flag = IsTrainOnTrack(X, Y, this);
    }

}

function Train(TrainNo, TrainName, Track, Speed, CoachList, Direction, ArrivalTime, DepartureTime, StnFrom, StnFromName, StnTo, StnToName, MoveType)
{
    this.TrainName = TrainName;
    this.TrainNo = TrainNo;
    this.Station = Station;
    this.NoOfCoaches = CoachList.length;
    this.Track = Track;
    this.Direction = Direction;
    this.ArrivalTime = ArrivalTime;
    this.DepartureTime = DepartureTime;
    this.CurrentX = 0;
    this.CurrentY = 0;
    this.Speed = Speed;
    this.CoachLength = 25;
    this.CoachWidth = 15;
    this.Angle = 0;
    this.StnFrom=StnFrom;
    this.StnFromName=StnFromName;
    this.StnTo=StnTo;
    this.StnToName = StnToName;
    this.SortTime = ArrivalTime;
    this.MoveType = MoveType;
    this.ReadyFor = "A";
    this.CoachList = [];
    var T = this;
	
 $(CoachList).each(function ()
    {
        var clr = "white";
        switch (this.toString())
        {
            case "En": clr = "red"; break;
            case "H": clr = "#1e90ff"; break;
            case "S": clr = "#ffe4c4"; break;
            case "A": clr = "#6495ed"; break;
            case "F": clr = "#ffb6c1"; break;
            case "C": clr = "#add8e6"; break;
            case "B": clr = "#87ceeb"; break;
            case "D": clr = "#f0e68c"; break;
            case "E": clr = "#48d1cc"; break;
            case "J": clr = "#add8e6"; break;
            case "G": clr = "#87ceeb"; break;
            case "HA": clr = "#6495ed"; break;
            case "AB": clr = "#87ceeb"; break;
            case "PC": clr = "#d3d3d3"; break;
            case "GS": clr = "#ffd700"; break;
            case "SLR": clr = "#ff7f50"; break;
            case "SYLR": clr = "#ff7f50"; break;     
        }
        T.CoachList.push({ "Name": this.toString(), "Clr": clr });
    });
    this.Status = TS_ReadyToEnter;
    this.StopX = 0;
    this.StopY = 0;
}

Train.prototype.UpdateTrack = function (Track)
{
    this.Track = Track;
    this.CurrentX = this.Direction == 1 ? Track.X1 : Track.X2;
    this.CurrentY = this.Direction == 1 ? Track.Y1 : Track.Y2;
    if (this.Direction == 1) this.Angle = CalAngle(Track.X1, Track.Y1, Track.X2, Track.Y2);
    else this.Angle = CalAngle(Track.X2, Track.Y2, Track.X1, Track.Y1);

    this.StopX = this.CurrentX + Math.cos(this.Angle) * Math.abs((Track.X1 - Track.X2) * .9);
    this.StopY = this.CurrentY + Math.sin(this.Angle) * Math.abs((Track.Y1 - Track.Y2) * .9);

}
Train.prototype.Move = function (interval)
{
    if (this.Track == null) return;
    
    this.ReadyFor = CurrentTime < this.ArrivalTime ? "A" : "D";
    this.SortTime=this.ReadyFor == "A"?this.ArrivalTime:this.DepartureTime;
    
    if (Math.abs(this.CurrentX - this.StopX) < 5)
    {
        if (this.DepartureTime > CurrentTime)
        {
            this.Status = TS_StoppedOnPlatform;
            return;
        }
    }

    var R = this.Speed; //this.Speed*this.TimeDiffrence

    var X = Math.cos(this.Angle) * R;
    var Y = Math.sin(this.Angle) * R;

    this.CurrentX += X;
    this.CurrentY += Y;

    if ((this.CurrentX <= this.Track.X1 && this.Direction == 1) || (this.CurrentX >= this.Track.X2 && this.Direction == -1))
    {
        this.Status = TS_ReadyToEnter
    }

    if ((this.CurrentX <= this.StopX && this.Direction == 1) || (this.CurrentX >= this.StopX && this.Direction == -1))
    {
        this.Status = TS_MovingEntering;
    }

    if ((this.CurrentX > this.StopX && this.Direction == 1) || (this.CurrentX < this.StopX && this.Direction == -1))
    {
        this.Status = TS_MovingExiting;
    }
    var L = (this.CoachLength * 1.1) * this.NoOfCoaches
    if ((this.CurrentX > this.Track.X2 + L && this.Direction == 1) || (this.CurrentX < this.Track.X1 - L && this.Direction == -1))
    {
        this.Status = TS_OutofPlatform;
    }

}


Train.prototype.Draw = function (context)
{
    var R = 0,T = this;
	var LastColor="",BeginPathDone=false;
    $(this.CoachList).each(function (index)
    {
        var X = Math.cos(T.Angle) * R;
        var Y = Math.sin(T.Angle) * R;
        X += T.CurrentX;
        Y += T.CurrentY;
		
        DrawRect(context, X, Y, T.CoachLength, T.CoachWidth, T.Angle, this.Clr);
        context.fillStyle = "blue";
        context.fillText(this.Name, X - T.CoachLength * .25, Y + T.CoachWidth * .25);

        R -= T.CoachLength * 1.1;
    });
}

function DrawLine(context, X1, Y1, X2, Y2)
{
    //context.save();
    context.beginPath();
    context.moveTo(X1, Y1);
    context.lineTo(X2, Y2);
    context.stroke();
    //context.restore();
}

function DrawRect(context, X, Y, W, H, Angle, FillColor, strokeStyle)
{
    if (!FillColor) FillColor = "white";
    if (!strokeStyle) strokeStyle = "#c0c0c0";

    //context.save();
    //context.translate(X, Y);
    //context.rotate(Angle);
    context.beginPath();
    context.rect(X-W * .5, Y-H * .5, W, H);
    context.fillStyle = FillColor;
    context.fill();
    context.strokeStyle = strokeStyle;
    context.stroke();
    //context.restore();
}
function CalAngle(X1, Y1, X2, Y2)
{
    var theta = Math.atan2(Y2 - Y1, X2 - X1);
    if (theta < 0) theta += 2 * Math.PI;
    return theta;
}

function Station(Platforms, Text1, Text2)
{
    this.Platforms = Platforms;
    this.Text1 = Text1;
    this.Text2 = Text2;
}

function IsTrainOnTrack(X, Y, Track)
{
    var slope = (Track.Y2 - Track.Y1) / (Track.X2 - Track.X1);
    var y = slope * X + Track.Y1;
    var tollrate = 5;

    return (y <= Y + tollrate && y >= Y - tollrate) && (X >= Track.X1 && X <= Track.X2);
}

function SortTrain(arr)
{
    arr = arr.sort(function (a, b)
    {
        var va = a.SortTime,
            vb = b.SortTime;
        return va > vb ? 1 : (va === vb ? 0 : -1);
    });
}
function ShowTrainInWaiting()
{
    var str = "<table style='border-spacing: 1px'><tr><td>No<td>Name<td>A/D<td>Time<td>P/F";
    
    SortTrain(Trains);

    $(Trains).each(function (index)
    {
        str += "<tr style='background-color:" + (this.ReadyFor == "A" ? "#CEF6CE" : "#F3F781") + "'><td>" + this.TrainNo + "<td>" + this.TrainName + "<td>" + this.ReadyFor + "<td>" + GetTime(this.SortTime) + "<td>" + (this.Track ? this.Track.TrackNo : "");
    });

    str += "</table>";

    $("#divTrainsList").html(str);

}
function GetTime(dt)
{
    var H = dt.getHours();
    var M = dt.getMinutes();
    return (H < 10 ? "0" + H : H) + "." + (M < 10 ? "0" + M : M);
}
/*Station.prototype.Draw = function (context)
{
		var H = context.canvas.height;
		var W = context.canvas.width;
		var Gap = H / (this.Platforms + 1);
		var Y = Gap * .5;

    context.clearRect(0, 0, W, H);
    context.font = "10pt Calibri";
    context.fillStyle = "blue";
    context.fillText(this.Text1, W * .5, 10);

    var UpdateTracks = false;
    if (Tracks.length == 0) UpdateTracks = true;

    var TrackCounter = 0;
	

    for (var i = 0; i < this.Platforms; i++)
    {
        Y += i % 2 == 0 ? Gap * .4 : Gap * 1.55;

        DrawRect(context, W * .5, Y, W, Gap * .4, 0, "#A9E2F3", "#A9E2F3");
        context.fillText(i + 1, 10, Y + Gap * .15);

        if (Tracks.length > i)
        {
            var s = "";
            if (Tracks[i].Train)
            {
                var T=Tracks[i].Train;
                s = T.TrainNo + "-" + T.TrainName + ",  " + T.ArrivalTime.getHours() + "." + T.ArrivalTime.getMinutes() + " - " + T.DepartureTime.getHours() + "." + T.DepartureTime.getMinutes();
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
*/



var DrawOnce=true;

function StationMaster()
{
	
	if(DrawOnce)
	{
		var canvas = document.getElementById("canvas0");
		var context = canvas.getContext("2d");

	    Stn.Draw(context);
		DrawOnce=false;
	}
	
	var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	
    $(Tracks).each(function (index)
    {
        if (this.Train)
        {
			this.Train.Move(20);
			this.Train.Draw(context);
        }
    });

    var TrainsToRemove = [];

    var DeptOutTime = new Date(CurrentTime.getTime() - 60000 * 10);
    $(Trains).each(function (index)
    {
        if (this.Status == TS_OutofPlatform || this.DepartureTime < DeptOutTime)
        {
            TrainsToRemove.push(this.TrainNo);
        }

    });
        
    $("#divStatus").html(Trains.length);

    if (TrainsToRemove.length > 0)
        ShowTrainInWaiting();

    while (TrainsToRemove.length > 0)
    {
        var T = TrainsToRemove[0];
        for (var i = 0; i < Trains.length; i++)
        {
            if (Trains[i].TrainNo == T)
            {
                if (Trains[i].Track)
                    Trains[i].Track.Train = null;

                Trains.splice(i, 1);
                break;
            }
        }

        TrainsToRemove.splice(0, 1);
    }
    
    var str = CurrentTime.toTimeString();
    
    var TrainCounter = 0;
    $(Tracks).each(function (index)
    {
        if (this.IsOccupied == false)
        {
            for (var i = TrainCounter; i < Trains.length; i++)
            {
                if (Trains[i].Track == null
					&& Trains[i].Status == TS_ReadyToEnter
					&& CurrentTime >= Trains[i].ArrivalTime
					 )
                {
                    Trains[i].UpdateTrack(this);
                    this.IsOccupied = true;
                    this.Train = Trains[i];
                    break;
                }
            };

            TrainCounter = i;
        } else
        {
            if (this.Train == null)
                this.IsOccupied = false;
        }

    });

    $("#divTime").html(str);
}