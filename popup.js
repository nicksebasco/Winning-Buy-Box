document.addEventListener('DOMContentLoaded', function(){
  var wins  = 0;
  var total = 0;

  document.getElementById("b1").onclick = function(){
    chrome.runtime.sendMessage({sender: "popup" });
  };
  chrome.runtime.onMessage.addListener(function(message){
    if(message.method === "updatePopup"){
      // updateStatsTable(message.message);
      wins = message.message[0]? wins + 1: wins;
      total = total + 1;
      updateWinPercent();
    }
  });

  function updateWinPercent(){
    var value = " " + ((wins/total)*100).toFixed(2).slice(0,4) + "%";
    document.getElementById("b1").setAttribute("data-badge", value);
    // document.getElementById("winPercent").innerText = " " + ((wins/total)*100).toFixed(2) + "%";
  }

  // add a table of the winners to the popup
  /*
  function parseLinkText(lt){
    return lt.slice(lt.search("com/")+4,lt.search("/dp")-1);
  }
  function updateStatsTable(message){

      var attrs = message,
          winner = attrs[0],
          link = attrs[1],
          row = document.createElement('tr'),
          alink = document.createElement('a'),
          cell1 = document.createElement('td'),
          cell2 = document.createElement('td');

      alink.innerText = parseLinkText(link);
      alink.href = link;
      alink.style.textDecoration = "none";

      cell1.appendChild(alink);

      cell2.innerText = winner;

      row.appendChild(cell1);
      row.appendChild(cell2);

      document.getElementById("stats-table").appendChild(row);

      wins = winner? wins + 1: wins;
      total = total + 1;

  }
  */
});
