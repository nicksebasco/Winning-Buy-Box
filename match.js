var text = "            Sold by <b>UbrewUSA</b> ";
var re1  = /sold by <b>.*<\/b>/ig;
var re2 = /<b>.*<\/b>/ig;

var matched = text.match(re1)[0];

if(matched){
  var winner = matched.match(re2)[0];
  // console.log(winner.slice(3,winner.length-4));
}

// console.log((/UBReWUSA/ig).test("ubrewusa"));

var text2 = "https://www.amazon.com/Enolmatic-Vacuum-Bottle-Filler/dp/B0064OIJUO/ref=sr_1_5?m=A1ZDJWVHPHTSGN&s=merchant-items&ie=UTF8&qid=1465840012&sr=1-5";
console.log(typeof text2.search("ref="));
console.log(text2);
console.log(text2.slice(0,68));
