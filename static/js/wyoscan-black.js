var wsvg;
var digits;
var dots;
var numbers;

var segmentCounter = 0;
var scrollback = 10;
var prevDigit;
var prevSegment;

var timerFunction = null;

function setup(svgid)
{
	var w = document.getElementById(svgid);
	
	// must wait for the svg to load
	w.addEventListener("load", function() {
		wsvg = w.contentDocument;
		
		// digits[][] holds the svg shapes that turn on & off
		digits = new Array(6);
		for(var i = 0; i < digits.length; i++)
		{
			digits[i] = new Array(7);
			for(var j = 0; j < digits[i].length; j++)
			{
				var s = i.toString() + '-' + j.toString();
				digits[i][j] = wsvg.getElementById(s);
			}
		}
		
		// hh:mm separators
		dots = wsvg.getElementById('dots');
		var all = wsvg.getElementsByTagName('g');
		for(var i = 0; i < all.length; i++)
		{
			all[i].setAttribute('fill', 'white');
		}
		
		timerFunction = setInterval(animate, 50);
	}, false);
	
	// numbers[][] holds which segments to show for each # at each position
	numbers = new Array(10);
	for(var i = 0; i < numbers.length; i++)
		numbers[i] = new Array(20);

	numbers[0][0] = false;
	numbers[0][1] = true;
	numbers[0][2] = true;
	numbers[0][3] = true;
	numbers[0][4] = false;
	numbers[0][5] = true;
	numbers[0][6] = true;
	numbers[0][7] = true;

	numbers[1][0] = false;
	numbers[1][1] = false;
	numbers[1][2] = false;
	numbers[1][3] = true;
	numbers[1][4] = false;
	numbers[1][5] = false;
	numbers[1][6] = true;
	numbers[1][7] = false;

	numbers[2][0] = false;
	numbers[2][1] = true;
	numbers[2][2] = false;
	numbers[2][3] = true;
	numbers[2][4] = true;
	numbers[2][5] = true;
	numbers[2][6] = false;
	numbers[2][7] = true;

	numbers[3][0] = false;
	numbers[3][1] = true;
	numbers[3][2] = false;
	numbers[3][3] = true;
	numbers[3][4] = true;
	numbers[3][5] = false;
	numbers[3][6] = true;
	numbers[3][7] = true;  

	numbers[4][0] = false;
	numbers[4][1] = false;
	numbers[4][2] = true;
	numbers[4][3] = true;
	numbers[4][4] = true;
	numbers[4][5] = false;
	numbers[4][6] = true;
	numbers[4][7] = false; 

	numbers[5][0] = false;
	numbers[5][1] = true;
	numbers[5][2] = true;
	numbers[5][3] = false;
	numbers[5][4] = true;
	numbers[5][5] = false;
	numbers[5][6] = true;
	numbers[5][7] = true; 

	numbers[6][0] = false;
	numbers[6][1] = true;
	numbers[6][2] = true;
	numbers[6][3] = false;
	numbers[6][4] = true;
	numbers[6][5] = true;
	numbers[6][6] = true;
	numbers[6][7] = true; 

	numbers[7][0] = false;
	numbers[7][1] = true;
	numbers[7][2] = false;
	numbers[7][3] = true;
	numbers[7][4] = false;
	numbers[7][5] = false;
	numbers[7][6] = true;
	numbers[7][7] = false;  

	numbers[8][0] = false;
	numbers[8][1] = true;
	numbers[8][2] = true;
	numbers[8][3] = true;
	numbers[8][4] = true;
	numbers[8][5] = true;
	numbers[8][6] = true;
	numbers[8][7] = true;   

	numbers[9][0] = false;
	numbers[9][1] = true;
	numbers[9][2] = true;
	numbers[9][3] = true;
	numbers[9][4] = true;
	numbers[9][5] = false;
	numbers[9][6] = true;
	numbers[9][7] = true;
	
	// init animate scrollback arrays
	prevDigit = new Array(scrollback);
	prevSegment = new Array(scrollback);
	for(var i = 0; i < prevDigit.length; i++)
		prevDigit[i] = 0;
	for(var i = 0; i < prevSegment.length; i++)
		prevSegment[i] = 0;
}

function animate()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	var hr = ("00" + h).slice(-2);
	var mn = ("00" + m).slice(-2);
	var sc = ("00" + s).slice(-2);
	var timeString = hr + mn + sc;
	
	// blink dots
	if(s % 2 == 0)
		dots.setAttribute('fill-opacity', '1.0');
	else
		dots.setAttribute('fill-opacity', '0.0');
		
	// animate
	var thisDigit = parseInt(segmentCounter % 42 / 7);
	var thisSegment = parseInt(segmentCounter % 7);
	var thisDigitValue = parseInt((timeString.charAt(thisDigit)));
	
	if(numbers[thisDigitValue][thisSegment+1])
		digits[thisDigit][thisSegment].setAttribute('fill-opacity', '1.0');
	else
		digits[thisDigit][thisSegment].setAttribute('fill-opacity', '0.1');
	
	// clear previous segment
	digits[prevDigit[0]][prevSegment[0]].setAttribute('fill-opacity', '0.1');
	segmentCounter++;
	prevDigit.shift();
	prevDigit.push(thisDigit);
	prevSegment.shift();
	prevSegment.push(thisSegment);
	

}