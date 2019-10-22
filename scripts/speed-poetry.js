function timer(s) {
  let t = setInterval(function() {
    document.getElementById("timer").innerText = (new Date).clearTime().addSeconds(s).toString("m:ss");
    if (s === 0) {
      clearInterval(t);
    }
    s--;
  }, 1000);
  return s;
}

function getPoem() {
  let pageNumber = Math.floor(Math.random() * 2252) + 1;
  let poemNumber = Math.floor(Math.random() * 20) + 1;
  let
}