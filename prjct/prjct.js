//calculation logic:
//defining variables:
const buttons = document.querySelector(".buttons");
const button = document.querySelectorAll(".button");
const screen = document.querySelector(".screen");
let equationArr = [];
let theme = 0;
const toggleBtn = document.querySelector(".toggle-btn");
const toggleDot = document.querySelector(".select");
let root = document.querySelector(":root");
let rootStyles = getComputedStyle(root);

if (localStorage.getItem("theme")!== null) {
  theme = parseInt(localStorage.getItem("theme"));
  changeTheme();
} 


function isNumber(num) {
  return !isNaN(num);
}
function solveEquation() {
  let secondArr = [];
  let simplyfiedArr = [];
  let solutionArr = [];
  let number = "";
  if (matchOp(equationArr.at(-1))) {
    equationArr.pop();
  }
  for (let k = 0; k < equationArr.length; k++) {
    if (isNumber(equationArr[k]) || equationArr[k] == ".") {
      number += equationArr[k];
    }
    if (matchOp(equationArr[k])) {
      secondArr.push(number);
      secondArr.push(equationArr[k]);
      number = "";
    }
  }
  secondArr.push(number);
  number = "";

  let n = 0;
  while (n < secondArr.length) {
    if (secondArr[n] != "x" && secondArr[n] != "/") {
      simplyfiedArr.push(secondArr[n]);
    } else {
      if (secondArr[n] == "x") {
        let prev = simplyfiedArr.pop();
        let curr = parseFloat(prev) * parseFloat(secondArr[n + 1]);
        simplyfiedArr.push(curr);
        n++;
      } else {
        if (parseFloat(secondArr[n + 1]) == 0) {
          equationArr = [];
          secondArr = [];
          simplyfiedArr = [];
          screen.innerHTML = "Error can't devide by zero";
          return;
        } else {
          let prev = simplyfiedArr.pop();
          let curr = parseFloat(prev) / parseFloat(secondArr[n + 1]);
          simplyfiedArr.push(curr);
          n++;
        }
      }
    }
    n++;
  }

  let m = 0;
  while (m < simplyfiedArr.length) {
    if (simplyfiedArr[m] != "+" && simplyfiedArr[m] != "-") {
      solutionArr.push(simplyfiedArr[m]);
    } else {
      if (simplyfiedArr[m] == "+") {
        let prev = solutionArr.pop();
        let curr = parseFloat(prev) + parseFloat(simplyfiedArr[m + 1]);
        solutionArr.push(curr);
      } else {
        let prev = solutionArr.pop();
        let curr = parseFloat(prev) - parseFloat(simplyfiedArr[m + 1]);
        solutionArr.push(curr);
      }
      m++;
    }
    m++;
  }
  equationArr = [solutionArr.join("")];
  screen.innerHTML = parseFloat(solutionArr.join(""));
}
function matchOp(content) {
  let operations = new Set();
  operations.add("+");
  operations.add("-");
  operations.add("/");
  operations.add("x");
  if (operations.has(content)) {
    return true;
  } else {
    return false;
  }
}
button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("reset")) {
      equationArr = [];
      screen.innerHTML = "0";
    } else if (btn.classList.contains("del")) {
      equationArr.pop();
      let screenStr = equationArr.join("");
      screen.innerHTML = screenStr;
    } else if (btn.classList.contains("solve")) {
      solveEquation();
    } else {
      if (
        (matchOp(btn.innerHTML) && equationArr.length == 0) ||
        (matchOp(btn.innerHTML) && matchOp(equationArr.at(-1)))
      ) {
        return;
      } else {
        equationArr.push(btn.innerHTML);
        let screenContent = equationArr.join("");
        screen.innerHTML = screenContent;
      }
    }
  });
});

//changing themes:

function changeTheme() {
  toggleDot.style.transform = `translateX(${15 * theme}px)`;
  if (theme == 0) {
    root.style.cssText = `--Bg-main-bg: hsl(222, 26%, 31%);
        --Bg-keyborad-toggle: hsl(223, 31%, 20%);
        --Bg-screen: hsl(224, 36%, 15%);

        --Key-bg: hsl(30, 25%, 89%);
        --Key-shadow:hsl(28, 16%, 65%);
        --Key2-bg: hsl(6, 63%, 50%);
        --Key2-shadow: hsl(6, 70%, 34%);
        --Key3-bg: hsl(225, 21%, 49%);
        --Key3-shadow: hsl(224, 28%, 35%);

        --Text-dark: hsl(221, 14%, 31%);
        --Text-light: hsl(0, 0%, 100%);
        --Text-light-sec: hsl(36, 10%, 90%);
        --Text-solve-btn: hsl(36, 10%, 90%);
    `;
  }
  if (theme == 1) {
    root.style.cssText = `--Bg-main-bg: hsl(0, 0%, 90%);
        --Bg-keyborad-toggle: hsl(0, 5%, 81%);
        --Bg-screen: hsl(0, 0%, 93%);

        --Key3-bg: hsl(185, 42%, 37%);
        --Key3-shadow:hsl(185, 58%, 25%);
        --Key2-bg: hsl(25, 98%, 40%);
        --Key2-shadow: hsl(25, 99%, 27%);
        --Key-bg: hsl(45, 7%, 89%);
        --Key-shadow: hsl(35, 11%, 61%);

        --Text-calc-head: hsl(52, 8%, 19%);
        --Text-num-btn: hsl(52, 8%, 19%);
        --Text-diff-btn: #fff;
        --Text-screen: hsl(52, 8%, 19%);
        --Text-solve-btn: #fff;
        `;
    document.querySelector(".calc-head").style.color = "hsl(60, 9%, 20%))";
  }
  if (theme == 2) {
    root.style.cssText = `--Bg-main-bg: hsl(268, 75%, 9%);
        --Bg-keyborad-toggle: hsl(268, 71%, 12%);
        --Bg-screen: hsl(268, 71%, 12%);

        --Key-bg: hsl(281, 89%, 26%);
        --Key-shadow:hsl(285, 91%, 52%);
        --Key2-bg: hsl(176, 100%, 44%);
        --Key2-shadow: hsl(177, 92%, 70%);
        --Key3-bg: hsl(268, 47%, 21%);
        --Key3-shadow: hsl(290, 70%, 36%);

        --Text-calc-head: hsl(52, 93%, 62%);
        --Text-num-btn: hsl(52, 93%, 62%);
        --Text-diff-btn: #fff;
        --Text-screen: hsl(52, 93%, 62%);
        --Text-solve-btn: hsl(185, 100%, 11%);
        `;
  }
}

toggleBtn.addEventListener("click", (e) => {
  theme = (theme + 1) % 3;
  window.localStorage.setItem("theme", `${theme}`);
  changeTheme();
});
