/**
 * NOTE:  make sure you replace term parameter with the correct term from one.uf course search, currently Spring 2017
 * Usage:  I use this in a console in chrome/firefox
 *
 *
 * Recursively searches UF's open courses every 30 seconds and alerts if there is an opening
 * @param {String} course - course id e.g. "enc1101" or "cot3100"
 * @param {String} (OPTIONAL) section - course section number
 * @param {Number} (OPTIONAL) seconds - number of seconds between each search, default = 30, numbers less than 10 default to 30
 */
function checkCourse(course, section, seconds){	
  if (section === undefined || typeof(section) != "string") section = "";
	
  var req = new XMLHttpRequest()
    , url = "https://one.uf.edu/api/myschedule/course-search/?category=RES&course-code=" + course + "&prog-level=UGRD&term=20175;
  
  if (section != "")  url += "&section=" + section;
    
  if (seconds === undefined || typeof(seconds) != "number" || seconds < 10) seconds = 30;
	
  req.overrideMimeType("application/json");
  req.open("GET", url);
  req.onload = function(){
  	var data = JSON.parse(req.responseText);
  	if (data.length > 0){
		var json = JSON.parse(req.responseText)[0];
		if (json.hasOwnProperty("TOTALROWS")){
			if (json["TOTALROWS"] > 0){
				alert(course + " has openings");
			} else { 
				setTimeout(function(){checkCourse(course, section, seconds)}, seconds * 1000);
			}
		}
  	}
  }
  req.send();
}
