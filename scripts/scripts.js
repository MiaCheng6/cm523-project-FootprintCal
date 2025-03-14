//Quiz
let firstplay = document.getElementById("btn-play");
let optionbus = document.getElementById("optionbus");
let optioncar = document.getElementById("optioncar");
let optionmetro = document.getElementById("optionmetro");
let optionbike = document.getElementById("optionbike");
let optionwalk = document.getElementById("optionwalk");

const CO2toTree = 22;
const AvgCO2 = 234;
let userSaveCo2 = 0;
let allScore = 0;
const CO2toCar = 6.4;
const CO2toKwh = 0.43;
const KwhtoPhone = 0.015;
const CO2toCoffee = 0.00738;
let fix = 1;
const Percent = 100;

firstplay.addEventListener("click", function() {
     showTrees(1);
});
optionbus.addEventListener("click", function() {
     showTrees(2);
     choose(5, 'Bus');
});
optioncar.addEventListener("click", function() {
     showTrees(2);
     choose(5, 'Car');
});
optionmetro.addEventListener("click", function() {
     showTrees(2);
     choose(5, 'Metro');
});
optionbike.addEventListener("click", function() {
     showTrees(2);
     choose(5, 'Bike');
});
optionwalk.addEventListener("click", function() {
     showTrees(2);
     choose(5, 'Walk');
});


const optAlways = document.getElementById("optAlways");
const optSometimes = document.getElementById("optSometimes");
const optNotconsider = document.getElementById("optNotconsider");

optAlways.addEventListener("click", function() {
     showTrees(3);
     choose(5, 'Always');
});
optSometimes.addEventListener("click", function() {
     showTrees(3);
      choose(5, 'Sometimes');
});
optNotconsider.addEventListener("click", function() {
     showTrees(3);
     choose(5, 'Not considering this option');
});

const optYes = document.getElementById("optYes");
const optNo = document.getElementById("optNo");

optYes.addEventListener("click", function() {
     showTrees(4);
     choose(5, 'Yes');
});
optNo.addEventListener("click", function() {
     showTrees(4);
     choose(5, 'No');
});

const optOne = document.getElementById("optOne");
const optTwo = document.getElementById("optTwo");
const optThree = document.getElementById("optThree");

optOne.addEventListener("click", function() {
     showTrees(5);
     choose(5, 'One');
});
optTwo.addEventListener("click", function() {
     showTrees(5);
     choose(5, 'Two');
});
optThree.addEventListener("click", function() {
     showTrees(5);
     choose(5, 'Three or more');
});

const optFood = document.getElementById("optFood");
const optPaper = document.getElementById("optPaper");
const optTincans = document.getElementById("optTincans");
const optPlastic = document.getElementById("optPlastic");
const optGlass = document.getElementById("optGlass");
const optNone = document.getElementById("optNone");

optFood.addEventListener("click", function() {
     choose(5,'Food');
});
optPaper.addEventListener("click", function() {
     choose(5,'Paper');
});
optTincans.addEventListener("click", function() {
     choose(5,'Tin cans');
});
optPlastic.addEventListener("click", function() {
     choose(5,'Plastic');
});
optGlass.addEventListener("click", function() {
     choose(5,'Glass');
});
optNone.addEventListener("click", function() {
     choose(5,'None');
});


const submitbtn = document.getElementById("submitbtn");
const replay = document.getElementById("replay");
const DifferenceWithAvg = document.querySelector("#diffavg");
const desc = document.querySelector(".desc");
const numberOfTrees = document.querySelector("#numtree");
const desctree = document.querySelector("#desctree");
const DisplayTrees = document.querySelector("#tree");
const plantlevel = document.querySelector(".plantlevel");
const numberOfCoffee = document.querySelector("#numcoffee");
const numberOfCars = document.querySelector("#numcar");
const numberOfPhones = document.querySelector("#numphone");
let AllScore =  document.querySelector("#AllScore");

submitbtn.addEventListener("click", function() {
     submit();
});
replay.addEventListener("click", function() {
     showTrees(0);
});

const options = {
    1:[
        {label:"Bus",score:100*4*270/10},       
      {label:"Car",score:300*4*270/10},
        {label:"Metro",score:100*4*270/10},
        {label:"Bike",score:65*4*270/10},
        {label:"Walk",score:0},
    ],
    2:[
        {label:"Always",score:20*365/10},
        {label:"Sometimes",score:50*365/10},
        {label:"Not considering this option",score:100*365/10},
    ],
    3:[
        {label:"Yes",score:100*365/10},
        {label:"No",score:0},
    ],
    4:[
        {label:"One",score:50*365/10},
        {label:"Two",score:100*365/10},
        {label:"Three or more",score:150*365/10},
    ],
    5:[
        {label:"Food",score:-5*365/10},
        {label:"Paper",score:-1520/10},
        {label:"Tin cans",score:-5*365/10},
        {label:"Plastic",score:-2800/10},
        {label:"Glass",score:-5*365/10},
        {label:"None",score:0}
    ]
}

showTrees();
function showTrees(key){
    if(key==1){
        localStorage.removeItem("answer");
    }
    let doms = document.getElementsByClassName("chat_box");
    key = Number(key);
    for (let i = 0; i < doms.length; i++) {
        doms[i].style.display = "none";
    }
    if(key>0&&key<7){
        doms[key-1].style.display = "block";
        document.querySelector(".indexBox").style.display = "none";
    }else{
        let lastScore = JSON.parse(localStorage.getItem("lastAnswer")||'{}');
        if(lastScore.allScore){
        }
        document.querySelector(".indexBox").style.display = "block";
    }
}

function choose(key,value){
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
    if(key==5){
        let fDom = document.getElementsByClassName("chat_content")[key-1];
        let cDom = fDom.getElementsByClassName("chat_bubble_option");
        answer[key] = answer[key]||[];
        let opIndex = answer[key].indexOf(value);
        if(opIndex!=-1){ 
            answer[key].splice(opIndex,1);
        }else{
            answer[key].push(value);
        }
        for (let i = 0; i < cDom.length; i++) {
            if(answer[key].indexOf(cDom[i].innerText)==-1){
                cDom[i].classList.remove("choose_bubble");
            }else{                    
                cDom[i].classList.add("choose_bubble");
            }
        }
    }else{
        answer[key] = [value];
        this.showTrees(key+1);
    }
    console.log(key, value);
    console.log(answer);
    localStorage.setItem("answer",JSON.stringify(answer));
}

function submit(){
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
   allScore = 0;
  console.log(options,answer);
    for (let i in answer) {
        if(i==5){
            for (let j = 0; j < answer[i].length; j++) {
              console.log('j', options[j+1]);
                allScore+= options[j+1].find(item=>item.label==answer[i][j]).score;
            }
        }else{
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
    answer.allScore = allScore;
    console.log(answer);
    localStorage.setItem("lastAnswer",JSON.stringify(answer));
    this.showTrees(6);
  
  userSaveCo2 = AvgCO2 - allScore/100;
  
ShowAllScore();
calculateTrees();
calculateDiffAvg();
calculateResults();
calculateLevels();
calculateCoffee();
calculateCars();
calculateChargePhone();
addTrees();
//showchart();
treeDisc();
}


//show allscore
function ShowAllScore(){
   AllScore.textContent = allScore/100;
}

//calculate tree number
function calculateTrees(){
numtree.textContent = 
Math.abs(Math.round(userSaveCo2 / CO2toTree));
    }

//display trees
function addTrees(){
for (let i = 0; i < numtree.textContent; i++) {
   if (userSaveCo2 > 0){
         DisplayTrees.innerHTML += "<img src='images/savetree.png' width='20%'/>";
    } else {
      DisplayTrees.innerHTML += "<img src='images/killtree.png' width='20%'/>";
    } 
}
}

//display tree disc
let bad = 'Ow! You killed';
let good = 'Congrats! You saved';

function treeDisc() {
    if (userSaveCo2 > 0){
        desctree.textContent = good;
    } else {
      desctree.textContent = bad;
    } 
}

// cal the difference of CO2 between user and avg
function calculateDiffAvg(){
diffavg.textContent = Math.abs(Math.round(
((userSaveCo2) / AvgCO2) * Percent));
    }

// display results
let high = '% higher than avg';
let low = '% lower than avg';
let middle = '% equals to avg';

function calculateResults() {
    if (userSaveCo2 > 0){
        desc.textContent = low;
    } else if (userSaveCo2 < 0){
      desc.textContent = high;
    } else {
  desc.textContent = middle;
}
}

// display levels
function calculateLevels() {
  let finalscore = allScore/100;
       if ( 0 < finalscore && finalscore < 68){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Challenger.jpeg' width='100%'/><h4>Challenger</h4></div>";
    }  else if ( 68 < finalscore && finalscore  < 116 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Grandmaster.jpeg' width='100%'/><h4>Grandmaster</h4>";
    }  else if ( 116 < finalscore && finalscore  < 164 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Master.jpeg' width='100%'/><h4>Master</h4>";
    } else if ( 212 < finalscore && finalscore < 260 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Bright Diamond.jpeg' width='100%'/><h4>Bright Diamond</h4>";
    } else if ( 260 < finalscore && finalscore < 308 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Luxurious Platinum.jpeg' width='100%'/><h4>Luxurious Platinum</h4>";
    } else if ( 164 < finalscore && finalscore < 212 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/The Glory of the Gold.jpeg' width='100%'/><h4>The Glory of the Gold</h4>";
    } else if ( 308 < finalscore && finalscore < 356 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Unyielding Silver.jpeg' width='100%'/><h4>Unyielding Silver</h4>";
    } else if ( 356 < finalscore && finalscore < 404 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/The Heroic Bronze.jpeg' width='100%'/><h4>The Heroic Bronze</h4>";
    } else{
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='images/Iron.jpeg' width='100%'/><h4>Iron</h4>";
    }
}

/*
//display bar chart
function showchart(){
   let answer = JSON.parse(localStorage.getItem("answer")||'{}');
   allScore = 0;
  console.log(options,answer);
    for (let i in answer) {
        if(i==5){
            for (let j = 0; j < answer[i].length; j++) {
              console.log('j', options[j+1]);
                allScore+= options[j+1].find(item=>item.label==answer[i][j]).score;
            }
        }else{
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
    answer.allScore = allScore;
    console.log(answer);
    localStorage.setItem("lastAnswer",JSON.stringify(answer));
    this.showTrees(6);
  
let data = [
  {
    x: ['Transport','Shopping habit','Energy consumption','Diet preference',  'Recycle'],
   y: [
options[1].find(item=>item.label==answer[1][0]).score*10, options[2].find(item=>item.label==answer[2][0]).score*10, options[3].find(item=>item.label==answer[3][0]).score*10, options[4].find(item=>item.label==answer[4][0]).score*10, options[5].find(item=>item.label==answer[5][0]).score*10],
    type: 'bar',
    marker: {
    color: '#367d7d'
  }
  }
];

let layout = {
title: 'Details of Your Carbon Footprint_CO2/g'
};

Plotly.newPlot("barchart", data, layout);


let barchart = document.getElementById("barchart");
function chartlayout () { 
    barchart.style.backgroundColor = "white";       
    barchart.style.width = "100%";        
}
chartlayout();}
*/


//cal the coffee number
function calculateCoffee() {
    if ( userSaveCo2 > 0 ){
      numcoffee.textContent = Math.abs(Math.round(userSaveCo2 / CO2toCoffee));
    }else if( userSaveCo2 < 0) {
      numcoffee.textContent = Math.abs(Math.round(userSaveCo2 / CO2toCoffee));
    }else {
      numcoffee.textContent = Math.abs(Math.round((userSaveCo2 + fix) / CO2toCoffee));
    }
}


//cal the cars number
function calculateCars() {
    if ( userSaveCo2 > 0 ){
    numcar.textContent = Math.abs(Math.round((userSaveCo2 / CO2toKwh) * CO2toCar));
    }else if( userSaveCo2 < 0) {
      numcar.textContent = Math.abs(Math.round((userSaveCo2 / CO2toKwh) * CO2toCar));
    }else {
    numcar.textContent = Math.abs(Math.round(((userSaveCo2+fix) / CO2toKwh) * CO2toCar));
    }
}

//cal the phone charging times
function calculateChargePhone() {
    if ( userSaveCo2 > 0 ){
    numphone.textContent = Math.abs((Math.round((userSaveCo2 / CO2toKwh) / KwhtoPhone)));
    } else if ( userSaveCo2 < 0 ){
    numphone.textContent = Math.abs((Math.round((userSaveCo2 / CO2toKwh) / KwhtoPhone))); 
    } else {
 numphone.textContent = Math.abs((Math.round(((userSaveCo2+fix) / CO2toKwh) / KwhtoPhone)));
    } 
}
