// adapted from http://www.asterixcreative.com/blog-mobile-gyroscope-with-javascript-and-quaternions-programming-tutorial-pt1.html


// 0. init, process gyro data

var debugFlag = false;	// ** fix ** there is a better logic to this than using global i think in the addEventListener callback

function debug () {
	if (document.getElementById('gyroInfo').style.visibility=='hidden') {
		document.getElementById('gyroInfo').style.visibility='visible';
		document.getElementById('quatInfo').style.visibility='visible';
		document.getElementById('mouseInfo').style.visibility='visible';	        
		debugFlag = true;
		return true;
	} else {
		document.getElementById('gyroInfo').style.visibility='hidden';
		document.getElementById('quatInfo').style.visibility='hidden';
		document.getElementById('mouseInfo').style.visibility='hidden';
		debugFlag = false;
		return false;
	}
}

// document.addEventListener("click",debug);
// document.addEventListener("touchStart",debug);

var gyro=quatFromAxisAngle(0,0,0,0);

// get orientation info, rolling back if gyro info not available
if (window.DeviceOrientationEvent) {//
    window.addEventListener("deviceorientation", function () {//gyro
        processGyro(event.alpha, event.beta, event.gamma); 
    }, true);
} 

function processGyro(alpha,beta,gamma)
{ 	
	document.getElementById("alpha").innerHTML=alpha.toFixed(5);
	document.getElementById("beta").innerHTML=beta.toFixed(5);
	document.getElementById("gamma").innerHTML =gamma.toFixed(5);
	
	gyro=computeQuaternionFromEulers(alpha,beta,gamma);
	  
	 document.getElementById("x").innerHTML=gyro.x.toFixed(5);
	 document.getElementById("y").innerHTML=gyro.y.toFixed(5);
	 document.getElementById("z").innerHTML=gyro.z.toFixed(5);
	 document.getElementById("w").innerHTML=gyro.w.toFixed(5);
}
	

// canvas context

var canvas = document.getElementById('gyroCanvas');
var context = canvas.getContext('2d');
context.canvas.width  = window.innerWidth;//resize canvas to whatever window dimensions are
context.canvas.height = window.innerHeight;
context.translate(canvas.width / 2, canvas.height / 2); //put 0,0,0 origin at center of screen instead of upper left corner
context.font = "10px Helvetica";
context.fillStyle = "#EEE";

// process gyroscope data

function computeQuaternionFromEulers(alpha,beta,gamma)//Alpha around Z axis, beta around X axis and gamma around Y axis intrinsic local space in that order(each axis moves depending on how the other moves so processing order is important)
{
	var x = degToRad(beta) ; // beta value
	var y = degToRad(gamma) ; // gamma value
	var z = degToRad(alpha) ; // alpha value

	// precompute to save on processing time
	var cX = Math.cos( x/2 );
	var cY = Math.cos( y/2 );
	var cZ = Math.cos( z/2 );
	var sX = Math.sin( x/2 );
	var sY = Math.sin( y/2 );
	var sZ = Math.sin( z/2 );

	var w = cX * cY * cZ - sX * sY * sZ;
	var x = sX * cY * cZ - cX * sY * sZ;
	var y = cX * sY * cZ + sX * cY * sZ;
	var z = cX * cY * sZ + sX * sY * cZ;

	return makeQuat(x,y,z,w);	  
}

function quaternionMultiply(quaternionArray) {

	// multiplies 2 or more quaternions together 
	// order is important -- last to first transformation
	
	var temp = quaternionArray[0];
	var qSoFar ={x:temp.x,y:temp.y,z:temp.z,w:temp.w}; //must copy to not alter original object
	for(var i=1 ;i < quaternionArray.length ;i ++)
	{
		var temp2=quaternionArray[i];
		var next={x:temp2.x,y:temp2.y,z:temp2.z,w:temp2.w};
		//ww,x,y,z
		var w = qSoFar.w * next.w - qSoFar.x * next.x - qSoFar.y * next.y - qSoFar.z * next.z;
		var x = qSoFar.x * next.w + qSoFar.w * next.x + qSoFar.y * next.z - qSoFar.z * next.y;
		var y = qSoFar.y * next.w + qSoFar.w * next.y + qSoFar.z * next.x - qSoFar.x * next.z;
		var z = qSoFar.z * next.w + qSoFar.w * next.z + qSoFar.x * next.y - qSoFar.y * next.x;
		
		qSoFar.x=x;
		qSoFar.y=y;
		qSoFar.z=z;
		qSoFar.w=w;
	}
	
	return qSoFar;
}

function inverseQuaternion(q) {
	return makeQuat(q.x,q.y,q.z,-q.w);
}

function degToRad(deg) {
	 return deg * Math.PI / 180; 
}

function makeQuat(x,y,z,w) {
	return  {"x":x,"y":y,"z":z,"w":w};
}

function quatFromAxisAngle(x,y,z,angle) {
	var q={};
	var half_angle = angle/2;
	q.x = x * Math.sin(half_angle);
	q.y = y * Math.sin(half_angle);
	q.z = z * Math.sin(half_angle);
	q.w = Math.cos(half_angle);
	return q;
}

function rotateObject(obj,q) {
	var newObj={};
	newObj.vertices=[];
	
	for(var i=0 ; i<obj.vertices.length ; i++) {
	  newObj.vertices.push(rotatePointViaQuaternion(obj.vertices[i],q));
	}
	return newObj;
}

function rotatePointViaQuaternion(pointRa,q) {
	
	var tempQuot = {'x':pointRa[0], 'y':pointRa[1], 'z':pointRa[2], 'w':0 };
	var rotatedPoint=quaternionMultiply([ q , tempQuot, conjugateQuat(q)]); // inverseQuaternion(q) also works 

	return [rotatedPoint.x,rotatedPoint.y,rotatedPoint.z];
	
	function conjugateQuat(qq) {
		return makeQuat(-qq.x,-qq.y,-qq.z,qq.w);
	}
}	  































// 1. 3d data

function makeRect(width,height,depth) {

	// returns a 3D box like object centered around the origin. 
	// There are more than 8 points for this cube as it is being made 
	// by chaining together a strip of triangles so points are redundant at least 3x. 
	// Confusing for now (sorry) but this odd structure comes in handy later for transitioning into webgl

	var newObj={};
	var hw=width/2;
	var hh=height/2;
	var hd=depth/2;
	newObj.vertices=[  						  
				[-hw,hh,hd],[hw,hh,hd],[hw,-hh,hd], // first triangle
				[-hw,hh,hd],[-hw,-hh,hd],[hw,-hh,hd],//2 triangles make front side
				[-hw,hh,-hd],[-hw,hh,hd],[-hw,-hh,-hd], //left side
				[-hw,hh,hd],[-hw,-hh,hd],[-hw,-hh,-hd],
				[hw,hh,-hd],[hw,hh,hd],[hw,-hh,-hd], //right side
				[hw,hh,hd],[hw,-hh,hd],[hw,-hh,-hd],
				[-hw,hh,-hd],[hw,hh,-hd],[hw,-hh,-hd],//back
				[-hw,hh,-hd],[-hw,-hh,-hd],[hw,-hh,-hd],
				[-hw,hh,-hd],[hw,hh,-hd],[hw,hh,hd],//top
				[-hw,hh,-hd],[-hw,hh,hd],[hw,hh,hd],
				[-hw,-hh,-hd],[hw,-hh,-hd],[hw,-hh,hd],//bottom
				[-hw,-hh,-hd],[-hw,-hh,hd],[hw,-hh,hd]
	];
	
	return newObj;
}

function makeTriangle(width,height,depth) {

	// returns a 3D trianglelike object centered around the origin. 

	var newObj={};
	var hw=width/2;
	var hh=height/2;
	var hd=depth/2;
	newObj.vertices=[  	
				[-hw,hh,hd],[hw,hh,hd],[hw,-hh,hd] // first triangle
	];
	
	return newObj;
}

function makePlaneWithTriangle(width,height,depth) {

	// returns a 3D plane object constructed by 2 triangles

	var newObj={};
	var hw=width/2;
	var hh=height/2;
	var hd=depth/2;
	newObj.vertices=[  	
				[-hw,hh,hd],[hw,hh,hd],[hw,-hh,hd], // first triangle
                                [-hw,hh,hd],[-hw,-hh,hd],[hw,-hh,hd] // 2 triangles make front side
	];
	
	return newObj;
}

function makeArcWithTriangle(width,height,depth) {

	// returns a 3D arc object triangle

	// may not need these
  	var newObj={};
	var hw=width/2;
	var hh=height/2;
	var hd=depth/2;
	var thisPoint0 = [];
	var thisPoint1 = [];
	var thisPoint2 = [];

	newObj.vertices=[];
	
	// push new points [x,y,z] onto vertices[]

	for (i=0; i<2*Math.PI; i+=2*Math.PI/100) {

	        var c = Math.cos(i);
	        var s = Math.sin(i);

		// very ugly ** fix **
		thisPoint0 = [0,0,hd];
		if (i==0) { 
			thisPoint1 = [hw,0,hd];	
		} else {
			thisPoint1 = thisPoint2;	
		}
		thisPoint2 = [hw*c,hh*s,hd];

		newObj.vertices.push(thisPoint0,thisPoint1,thisPoint2);
	}  
	
	return newObj;
}

// var cube=makeRect(canvas.width/5,canvas.width/5,canvas.width/5);
// var cube=makePlaneWithTriangle(canvas.width/5, canvas.width/5, canvas.width/5);
// cube.color="purple";
var hourAxis=makeArcWithTriangle(canvas.width/1.5,canvas.width/1.5,0);
hourAxis.color="black";
var minAxis=makeArcWithTriangle(canvas.width/1.5,canvas.width/1.5,0);
minAxis.color="black";
var secAxis=makeArcWithTriangle(canvas.width/1.5,canvas.width/1.5,0);
secAxis.color="black";
















// 2. render

function renderObj(obj,q) {

	var rotatedObj=rotateObject(obj,q);
	context.lineWidth = 1;
	context.strokeStyle = obj.color;
	
	function scaleByZ(val,z) {
		var focalLength=900; // [900] should probably be a global but oh well
		var scale= focalLength/((-z)+focalLength);
		return val*scale;
	}
	
	for(var i=0 ; i<obj.vertices.length ; i+=3) {

		for (var k=0;k<3;k++) {
		  
			var vertexFrom=rotatedObj.vertices[i+k];
		  	var temp=i+k+1;
		  	if(k==2) 
			  	temp=i;
			  
			var vertexTo=rotatedObj.vertices[temp];		
			context.beginPath();

		// original w/ focal length
		context.moveTo(scaleByZ(vertexFrom[0],vertexFrom[2]), ( -scaleByZ(vertexFrom[1],vertexFrom[2])));
		context.lineTo(scaleByZ(vertexTo[0],vertexTo[2]), ( -scaleByZ(vertexTo[1],vertexTo[2])));
		// if (debugFlag) context.fillText(k,scaleByZ(vertexFrom[0],vertexFrom[2]), ( -scaleByZ(vertexFrom[1],vertexFrom[2])));

		// context.stroke();				// all
		// if (k % 2 == 0) context.stroke();		// spokes only
		if (k % 2 != 0) context.stroke();		// points only

		}
	}
}











// 3. user input

var userQuat=quatFromAxisAngle(0,0,0,0);//a quaternion to represent the users finger swipe movement - default is no rotation
var prevTouchX = -1; // -1 is flag for no previous touch info
var prevTouchY = -1;

// touch

// document.addEventListener("touchStart", touchStartFunc, true);//?misspelled
document.addEventListener("touchstart", touchStartFunc, true);
document.addEventListener("touchmove", touchmoveFunc, true);
document.addEventListener("touchend", touchEndFunc, true);


function touchStartFunc(e)
{
	prevTouchY=e.touches[0].clientY;
	prevTouchX=e.touches[0].clientX;
	debug();
}

function touchmoveFunc(e)
{
	if( navigator.userAgent.match(/Android/i) ) //stupid android bug cancels touch move if it thinks there's a swipe happening
	{   
	  e.preventDefault();
	}
	userXYmove(e.touches[0].clientX,e.touches[0].clientY);
}

function touchEndFunc(e)
{
  prevTouchX = -1;
  prevTouchY = -1;
}

// mouse

document.addEventListener("mousedown", mouseDownFunc, true);
document.addEventListener("mousemove", mouseMoveFunc, true);
document.addEventListener("mouseup", mouseUpFunc, true);

function mouseDownFunc(e)
{
  prevTouchX = e.clientX;
  prevTouchY = e.clientY;
  debug();
}

function mouseMoveFunc(e)
{
	if (prevTouchX!= -1)
		userXYmove(e.clientX,e.clientY);
}

function mouseUpFunc(e)
{
  prevTouchX = -1;
  prevTouchY = -1;
}
	
function userXYmove(x,y)
{

	document.getElementById("userX").innerHTML=x;
	document.getElementById("userY").innerHTML=y;
	
	if(prevTouchX != -1 ) //need valid prevTouch info to calculate swipe
	{
	  var xMovement=x-prevTouchX;
	  var yMovement=y-prevTouchY;
	  //var xMovementQuat=quatFromAxisAngle(1,0,0,y/200);//movement on y rotates x and vice versa
	  //var yMovementQuat=quatFromAxisAngle(0,1,0,x/200);//200 is there to scale the movement way down to an intuitive amount
	 //userQuot=quaternionMultiply([yMovementQuat,xMovementQuat]);//use reverse order
	 
	 
	 var xMovementQuat=quatFromAxisAngle(1,0,0,yMovement/200);//movement on y rotates x and vice versa
	 var yMovementQuat=quatFromAxisAngle(0,1,0,xMovement/200);//200 is there to scale the movement way down to an intuitive amount	 
	  userQuat=quaternionMultiply([gyro,yMovementQuat,xMovementQuat,inverseQuaternion(gyro),userQuat]);//use reverse order

	}
	prevTouchY=y;
	prevTouchX=x;
}



	






// 4. animate

function renderLoop() {

  // requestAnimationFrame( renderLoop ); //better than set interval as it pauses when browser isn't active
  context.clearRect( -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
  
  if(!( window.DeviceOrientationEvent && 'ontouchstart' in window))
  {
	this.fakeAlpha = (this.fakeAlpha || 0)+ .0;//z axis - use 0 to turn off rotation
	this.fakeBeta = (this.fakeBeta || 0)+ .7;//x axis
	this.fakeGamma = (this.fakeGamma || 0)+ .5;//y axis
	processGyro(this.fakeAlpha,this.fakeBeta,this.fakeGamma);
  }
  
  // renderObj(cube,quaternionMultiply([inverseQuaternion(gyro),userQuat]));
  // renderObj(hourAxis,inverseQuaternion(gyro));
  // renderObj(minAxis,inverseQuaternion(gyro));
  // renderObj(secAxis,inverseQuaternion(gyro));
  // renderObj(secAxis,quaternionMultiply([inverseQuaternion(gyro),userQuat]));
  // renderObj(secAxis,userQuat);
  // renderObj(hourAxis,quaternionMultiply([inverseQuaternion(gyro),inverseQuaternion(gyro), inverseQuaternion(gyro)]));
  renderObj(hourAxis,quaternionMultiply([inverseQuaternion(gyro),userQuat]));
  renderObj(minAxis,quaternionMultiply([inverseQuaternion(gyro),inverseQuaternion(gyro), userQuat]));
  renderObj(secAxis,quaternionMultiply([inverseQuaternion(gyro),inverseQuaternion(gyro), inverseQuaternion(gyro), userQuat]));
}

// using setInterval instead of manual approach suggested

// renderLoop();

renderTimer = window.setInterval(renderLoop, 1000/20);
