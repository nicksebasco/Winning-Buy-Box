var productContainers = {};
var urlMatch = {};

var urlElements = Array.prototype.slice.call(document.getElementsByClassName("a-link-normal s-access-detail-page  a-text-normal"));
var urls = urlElements.map(function(a){
  return modifyUrl(a.href);
});
urlElements.forEach(function(u){
  var url = modifyUrl(u.href);
  productContainers[url] = u.parentNode.parentNode.parentNode;
});

function modifyUrl(url){
  // find index of "ref=", this is where we can slice the url.
  return url.slice(0,url.search("ref="));
}

function insertAfter(referenceNode,newNode){
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addWinner(bool,url){
  var d = document.createElement('div');
  if(bool){
    // text to be display if winning
    d.innerHTML = "Winner!";
    // text color
    d.style.color = "green";
  }else{
    // text to be displayed if buy box is losing
    d.innerHTML = "X";
    // text color
    d.style.color = "red";
  }
  // font size
  d.style.fontSize = "20px";

  var container = productContainers[url];
  // container.appendChild(d);
  insertAfter(container,d);
}

chrome.runtime.onMessage.addListener(function(request){
  if(request.method === "processBackgroundVars" && !urlMatch.hasOwnProperty(request.url)){
    urlMatch[request.url] = null;
	  addWinner(request.winner,request.url);
  }
  else if(request.method ==="captureData"){
    chrome.runtime.sendMessage({sender: "script1",method:"urlData",message: urls});
  }
});
