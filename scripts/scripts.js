//Quiz
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
    localStorage.setItem("answer",JSON.stringify(answer));
}
function submit(){
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
    let allScore = 0;
    for (let i in answer) {
        if(i==5){
            for (let j = 0; j < answer[i].length; j++) {
                allScore+= options[i].find(item=>item.label==answer[i][j]).score;
            }
        }else{
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
    answer.allScore = allScore;
  console.log(answer);
  console.log(data);
    localStorage.setItem("lastAnswer",JSON.stringify(answer));
    this.showTrees(6);
}

//Result
const DifferenceWithAvg = document.querySelector("#diffavg");
const desc = document.querySelector(".desc");
const numberOfTrees = document.querySelector("#numtree");
const desctree = document.querySelector("#desctree");
const DisplayTrees = document.querySelector("#tree");
const plantlevel = document.querySelector(".plantlevel");
const numberOfCoffee = document.querySelector("#numcoffee");
const numberOfCars = document.querySelector("#numcar");
const numberOfPhones = document.querySelector("#numphone");
const playagain =  document.querySelector(".again");
const share =  document.querySelector(".share");
const AllScore =  document.querySelector("#AllScore");


//cal the user score
let answer = JSON.parse(localStorage.getItem("answer")||'{}');
let allScore = 0;
    for (let i in answer) {
        if(i==5){
            for (let j = 0; j < answer[i].length; j++) {
                allScore+= options[i].find(item=>item.label==answer[i][j]).score;
            }
        }else{
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
answer.allScore = allScore;
console.log(allScore);

//show allscore
function ShowAllScore(){
   AllScore.textContent = allScore/100;
}

ShowAllScore();

//calculate tree number
const CO2toTree = 22;
const AvgCO2 = 234;
let userSaveCo2 = AvgCO2 - allScore/100;

function calculateTrees(){
numtree.textContent = 
Math.abs(Math.round(userSaveCo2 / CO2toTree));
    }
calculateTrees();

//display trees
function addTrees(){
for (var i = 0; i < numtree.textContent; i++) {
    DisplayTrees.innerHTML += "<img src='https://cdn-icons-png.flaticon.com/512/877/877802.png' width='20%'/>";
}
}

addTrees();

//display tree disc
let bad = 'Oh! You killed';
let good = 'Congrats! You saved';

function treeDisc() {
    if (userSaveCo2 > 0){
        desctree.textContent = good;
    } else {
      desctree.textContent = bad;
    } 
}

treeDisc();

//cal the difference of CO2 between user and avg
const Percent = 100;

function calculateDiffAvg(){
diffavg.textContent = Math.abs(Math.round(
((userSaveCo2) / AvgCO2) * Percent));
    }

calculateDiffAvg();

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

calculateResults();

// display levels
let finalscore = allScore/100;
function calculateLevels() {
       if ( 0 < finalscore && finalscore < 68){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png'/><h4>Challenger</h4></div>";
    }  else if ( 68 < finalscore && finalscore  < 116 ){
plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png'/><h4>Grandmaster</h4>";
    }  else if ( 116 < finalscore && finalscore  < 164 ){
plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png'/><h4>Master</h4>";
    } else if ( 212 < finalscore && finalscore < 260 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png'/><h4>Bright diamond</h4>";
    } else if ( 260 < finalscore && finalscore < 308 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png'/><h4>Luxurious platinum</h4>";
    } else if ( 164 < finalscore && finalscore < 212 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png'/><h4>The glory of the gold</h4>";
    } else if ( 308 < finalscore && finalscore < 356 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png'/><h4>Unyielding Silver</h4>";
    } else if ( 356 < finalscore && finalscore < 404 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png'/><h4>The heroic bronze</h4>";
    } else{
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png'/><h4>Iron</h4>";
    }
}

calculateLevels();

//display bar chart
var data = [
{
x: ['Transport','Shopping habit','Energy consumption','Diet preference',  'Recycle'],
y: [options[1].find(item=>item.label==answer[1][0]).score*10, options[2].find(item=>item.label==answer[2][0]).score*10, options[3].find(item=>item.label==answer[3][0]).score*10, options[4].find(item=>item.label==answer[4][0]).score*10, options[5].find(item=>item.label==answer[5][0]).score*10],
type: 'bar',
 marker: {
color: '#367d7d'
}
}
];

var layout = {
title: 'Details of Your Carbon Footprint_CO2/g'
};


Plotly.newPlot("barchart", data, layout);

//cal the coffee number
const CO2toCoffee = 0.00738;
let fix = 1;

function calculateCoffee() {
    if ( userSaveCo2 > 0 ){
        numcoffee.textContent = Math.abs(Math.round(userSaveCo2 / CO2toCoffee));
}else if( userSaveCo2 < 0) {
      numcoffee.textContent = Math.abs(Math.round(userSaveCo2 / CO2toCoffee));
    }else {
      numcoffee.textContent = Math.abs(Math.round((userSaveCo2 + fix) / CO2toCoffee));
    }
}

calculateCoffee();

//cal the cars number
const CO2toCar = 6.4;
const CO2toKwh = 0.43;

function calculateCars() {
    if ( userSaveCo2 > 0 ){
    numcar.textContent = Math.abs(Math.round((userSaveCo2 / CO2toKwh) * CO2toCar));
}else if( userSaveCo2 < 0) {
      numcar.textContent = Math.abs(Math.round((userSaveCo2 / CO2toKwh) * CO2toCar));
    }else {
    numcar.textContent = Math.abs(Math.round(((userSaveCo2+fix) / CO2toKwh) * CO2toCar));
    }
}

calculateCars();

//cal the phone charging times
const KwhtoPhone = 0.015;

function calculateChargePhone() {
    if ( userSaveCo2 > 0 ){
    numphone.textContent = Math.abs((Math.round((userSaveCo2 / CO2toKwh) / KwhtoPhone)));
} else if ( userSaveCo2 < 0 ){
    numphone.textContent = Math.abs((Math.round((userSaveCo2 / CO2toKwh) / KwhtoPhone))); 
    } else {
 numphone.textContent = Math.abs((Math.round(((userSaveCo2+fix) / CO2toKwh) / KwhtoPhone)));
    } 
}
calculateChargePhone();


