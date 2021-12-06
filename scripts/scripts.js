/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

//Quiz
const options = {
    1:[
        {label:"Bus",score:100*4*270/10},            {label:"Car",score:300*4*270/10},
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
        {label:"Paper",score:-5*365/10},
        {label:"Tin cans",score:-5*365/10},
        {label:"Plastic",score:-5*365/10},
        {label:"Glass",score:-5*365/10},
        {label:"None",score:0},
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
        let lastScore = JSON.parse(localStorage.getItem("lastAnswer")||'{}');//获取上次作答及成绩
        if(lastScore.allScore){
        }
        document.querySelector(".indexBox").style.display = "block";
    }
}

function choose(key,value){
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
    if(key==5){
        // 多选
        let fDom = document.getElementsByClassName("chat_content")[key-1];//父元素
        let cDom = fDom.getElementsByClassName("chat_bubble_option");//当前所有选项元素
        answer[key] = answer[key]||[];//没值就赋值成数组 避免数组操作报错
        let opIndex = answer[key].indexOf(value);
        if(opIndex!=-1){ //indexOf查找 找到元素为下标 找不到为-1；判断是否已选择;
            answer[key].splice(opIndex,1);//找到了从数组中删掉
        }else{
            answer[key].push(value);//找不到就往数组中添加
        }
        for (let i = 0; i < cDom.length; i++) {
            if(answer[key].indexOf(cDom[i].innerText)==-1){
                // 没选择的选项
                cDom[i].classList.remove("choose_bubble");
            }else{
                // 选择的选项
                cDom[i].classList.add("choose_bubble");
            }
        }
    }else{
        // 单选
        answer[key] = [value];
        this.showTrees(key+1);
    }
    localStorage.setItem("answer",JSON.stringify(answer));//添加到缓存
}
function submit(){
    // 提交
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
    let allScore = 0;
    for (let i in answer) {
        if(i==5){
            // 多选
            for (let j = 0; j < answer[i].length; j++) {
                allScore+= options[i].find(item=>item.label==answer[i][j]).score;
            }
        }else{
            // 单选
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
    answer.allScore = allScore;
    
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


//cal the tree number
let answer = JSON.parse(localStorage.getItem("answer")||'{}');
let allScore = 0;
    for (let i in answer) {
        if(i==5){
            // 多选
            for (let j = 0; j < answer[i].length; j++) {
                allScore+= options[i].find(item=>item.label==answer[i][j]).score;
            }
        }else{
            // 单选
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
answer.allScore = allScore;
console.log(allScore);

const CO2toTree = 22;
const AvgCO2 = 234;
let userSaveCo2 = AvgCO2 - allScore/100;

function calculateTrees(){
numtree.textContent = Math.round(userSaveCo2 / CO2toTree);
    }
calculateTrees();

//display trees
function addTrees(){
for (var i = 0; i < numtree.textContent; i++) {
    DisplayTrees.innerHTML += "<img src='https://cdn-icons-png.flaticon.com/512/877/877802.png' width='20%'/>";
};
}

addTrees();


//display tree disc
let bad = 'Oh! You killed';
let good = 'Congrats! You saved';

function treeDisc() {
    if (
  userSaveCo2 > 0){
        desctree.textContent = good;
    } else {
      desctree.textContent = bad;
    } 
}

treeDisc();

//show allscore
function ShowAllScore(){
   AllScore.textContent = allScore/100;
}

ShowAllScore();

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
        desc.textContent = high;
    } else if (userSaveCo2 < 0){
      desc.textContent = low;
    } else {
  desc.textContent = middle;
}
}

calculateResults();

// display levels
function calculateLevels() {
       if ( 404 < userSaveCo2 < 452 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png'/><h4>Challenger</h4></div>";
    }  else if ( 356 < userSaveCo2 < 404 ){
plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png'/><h4>Grandmaster</h4>";
    }  else if ( 308 < userSaveCo2 < 356 ){
plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png'/><h4>Master</h4>";
    } else if ( 260 < userSaveCo2 < 308 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png'/><h4>Bright diamond</h4>";
    } else if ( 212 < userSaveCo2 < 260 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png'/><h4>Luxurious platinum</h4>";
    } else if ( 164 < userSaveCo2 < 212 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png'/><h4>The glory of the gold</h4>";
    } else if ( 116 < userSaveCo2 < 164 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png'/><h4>Unyielding Silver</h4>";
    } else if ( 68 < userSaveCo2 < 116 ){
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png'/><h4>The heroic bronze</h4>";
    } else {
       plantlevel.innerHTML = "<div style='text-align:center;'><img src='https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png'/><h4>Iron</h4>";
    }
}

calculateLevels();

//display radar chart
data = [{
type: 'scatterpolar',
r: [options[1].find(item=>item.label==answer[1][0]).score/100, options[2].find(item=>item.label==answer[2][0]).score/100, options[3].find(item=>item.label==answer[3][0]).score/100, options[4].find(item=>item.label==answer[4][0]).score/100, options[5].find(item=>item.label==answer[5][0]).score/100],
theta: ['Transport','Shopping habit','Energy consumption','Diet preference',  'Recycle'],
fill: 'toself'
}]

layout = {
polar: {
radialaxis: {
  visible: true,
  range: [0, 50]
}
},
showlegend: false
}

Plotly.newPlot("radarchart", data, layout)


//cal the coffee number
const CO2toCoffee = 0.00738;

function calculateCoffee(){
numcoffee.textContent = Math.round(userSaveCo2 / CO2toCoffee);
    }
calculateCoffee();

//cal the cars number
const CO2toCar = 6.4;
const CO2toKwh = 0.43;

function calculateCars(){
numcar.textContent = Math.round((userSaveCo2 / CO2toKwh) * CO2toCar);
    }
calculateCars();

//cal the phone charging times
const KwhtoPhone = 0.015;

function calculateChargePhone(){
numphone.textContent = Math.round((userSaveCo2 / CO2toKwh) / KwhtoPhone);
    }
calculateChargePhone();


