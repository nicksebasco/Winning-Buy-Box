// Background Javascript File

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.executeScript(null, {"file": "script1.js"});
});

chrome.runtime.onMessage.addListener(function(message){
  if (message.sender === "script1"){
    //alert(message.message[0]);
    for(var i = 0; i < message.message.length; i++){
      getProductInfo(message.message[i]);
    }
  }
  else if(message.sender === "popup"){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method: "captureData"});
    });
  }
});

function getProductInfo(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
     var text = parseResponseText(url,xhr.responseText);
     // send message to popup
     chrome.runtime.sendMessage({sender: "bg",method:"updatePopup",message: [text,url]});
     // send message to content script
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {method: "processBackgroundVars", url:url, winner: text});
     });
   } else{
     console.log("error");
   }
  };

}

function parseResponseText(url,text){
  // returned if buybox winner is UbrewUSA
  var bool = false;
  // if amazon page buybox has a div with the id soldByThirdParty
  if(text.match(/soldByThirdParty/g)){
    var matched = text.match(/sold by <b>.*<\/b>/ig);
    // if within this div a bold seller prefixed with "sold by" is found
    if(matched){
      var winner = matched[0].match(/<b>.*<\/b>/ig)[0];
      winner = new RegExp(winner.slice(3,winner.length-4),"ig");
      bool = true ? winner.test("ubrewusa"): false;
    }

  }
  return bool;
}
