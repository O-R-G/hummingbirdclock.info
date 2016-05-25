var is_waiting = true;

function tweet()
{
	is_waiting = false;
	var data_url = canvas.toDataURL();
	var params = "img=" + data_url;
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function() 
	{
		if(xmlhttp.readyState < 4) 
		{
			// start loading animation
			console.log("waiting");
		}
		else if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			// stop loading animation
			console.log("done");
			if(xmlhttp.responseText)
			{
				// load older posts
				document.getElementById("status").innerHTML += xmlhttp.responseText;
				is_waiting = false;
			}
			else
			{
				// no more posts to load
				// 'done' animation
				document.getElementById("status").innerHTML += data_url;
			}
		}
	}
	
	xmlhttp.open("POST", "lib/twitterAJAX.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
}