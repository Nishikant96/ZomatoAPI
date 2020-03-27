// Timer 

var d = new Date();
var start = d.getTime();
var count=0;

//Parsing
function parser(data) {
  return JSON.parse(data)
}

///Creating Cards

//Desired card element
/*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/

function contentCreation(citiesObject){
	count++;

var div=document.createElement('div')
div.className="card text-white bg-dark mb-3"

var indiv=document.createElement('div')
indiv.className="card-body"

var h5=document.createElement('h5')
h5.className="card-title"

h5.innerText= citiesObject.title

indiv.appendChild(h5)

div.appendChild(indiv)
ender();
return div
}

function startSearch(){
n = d.getTime();	
//document.getElementById("Timer").innerText=" ";
var xhr = new XMLHttpRequest();
var x = document.getElementById("search").value;
console.log('Initially xhr.readyState is: ', xhr.readyState)
xhr.open("GET", "https://developers.zomato.com/api/v2.1/locations?query="+x+"&count=10");
console.log('after configuration using open()', xhr.readyState)
xhr.setRequestHeader("user-key", "4a0c39d878446666a8f61a0f65d2a0f3");
xhr.send(null);
console.log('after send', xhr.readyState)

xhr.addEventListener("readystatechange", function(event){
	
	console.log('from inside handler this.readyState', this.readyState)
  if (this.readyState === 4) {
    console.log('readystate is 4 now', this.responseText);
    
	var dataObj = parser(this.responseText)
    console.log('dataObj is:', dataObj)
  
	var CityArray= dataObj.location_suggestions
	console.log('cityArr is:', CityArray)
	CityArray.forEach(
	function(cityObj){
//		contentCreation(cityObj)
	var element= contentCreation(cityObj)	
	document.getElementById("result").appendChild(element)
	});
}
});
}

function ender(){
var end = d.getTime();
document.getElementById("Timer").innerText="Fetched "+ count+ " results in "+ (end-start)+" miliseconds!";
}