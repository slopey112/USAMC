let buttons = document.getElementsByClassName("collapse");
let left = buttons[0];
let right = buttons[1];

right.style.visibility = "hidden";

left.onclick = function () {
    document.getElementById("right").style.display = "none";
    document.getElementById("left").style.width = "100%";
    left.style.visibility = "hidden";
    right.style.visibility = "visible";
};

right.onclick = function () {
    document.getElementById("right").style.display = "block";
    document.getElementById("left").style.width = "50%";
    left.style.visibility = "visible";
    right.style.visibility = "hidden";
};