
// build highscore board
var highscores= [
    {name: "joe", score: "95" }, 
    {name: "maria", score: "11" }, 
    {name: "zach", score: "10" }, 
    {name: "sarah", score: "8" }, 
    {name: "jason", score: "7" }, 
]
var gamestate= {}
     
//questions and options

var questions= [
    {question: "0+1", answer: "1", options: ["3", "4", "2", "1"]},
    {question: "0+2", answer: "2", options: ["3", "4", "2", "1"]},
    {question: "0+3", answer: "3", options: ["3", "4", "2", "1"]},
    {question: "0+4", answer: "4", options: ["3", "4", "2", "1"]},
    {question: "0+5", answer: "5", options: ["3", "4", "5", "1"]},
]

//timer built out

function tic() {
    document.getElementById("timer").innerHTML = gamestate.time
    if(gamestate.running) {
        setTimeout(() => { 
            gamestate.time--
            tic()
        },1000)
    }
}

function getTop3() {
    var top3 = highscores.sort((a, b) => b.score - a.score);
    return top3.slice(0,3);
    
}

//clear high score

function clearHighScore() {
    document.getElementById("highscore").innerHTML = "";

}
function clearGetName() {
    document.getElementById("getName").innerHTML = "";
}

function clearQuiz() {
    document.getElementById("question").innerHTML = "";
    document.getElementById("answers").innerHTML = "";
}

function clearStartPage() {
    document.getElementById("startpage").innerHTML = "";
}

function clearTimer() {
    document.getElementById("timer").innerHTML = "";
}

function cleardivs() {
    clearHighScore()

    clearGetName()
    clearQuiz()    
    clearStartPage()
    clearTimer()

}

//build high score board

function buildHighScoreBoard() {
    cleardivs()
    var top3 = getTop3()
    var html = `
    <table>
        <tr>
            <th>Name</th>
            <th>score</th>
            <th>place</th>
        </tr>
        `
    for (var i= 0; i<3; i++) {
        html += `<tr>
        <td>${top3[i].name}</td>
        <td>${top3[i].score}</td>
        <td>${i + 1}</td>
        </tr>`
    }
    html += "</table>"
    var newGameButton= `
    <button onclick="startButton()">"Would you like to play again"</button>
    `
    document.getElementById("highscore").innerHTML = html + newGameButton

}

function addScore(name, score) { 
    var scoreobject= {name:name, score:score};
    highscores.push(scoreobject); 
}

// get name
function getName() {
    cleardivs()
    let person= prompt("please enter your name");
    if (person != null){return person} ;
    if (person === null) {return "rando"};
}

//get score
function getScore() {

}

function start() {
    cleardivs()
    askQuestion()
    tic()

}
function checkAnswer(guess, answer) {
    console.log(guess, " ", answer)
    if(answer === guess){
        gamestate.question++
        if(gamestate.question < questions.length){ 
            askQuestion()  
        } else {
            gamestate.running= false
           var name= getName()
           var score= gamestate.time
           highscores.push({name: name, score: score})
           buildHighScoreBoard()
        }
        
    } else {
        console.log("moron")
        gamestate.time -= 10;
        document.getElementById("timer").innerHTML = gamestate.time
    }

}
function askQuestion() {
    cleardivs()
    document.getElementById("timer").innerHTML = gamestate.time
    var q= questions[gamestate.question].question
    var a= questions[gamestate.question].answer
    var o= questions[gamestate.question].options
    var html= `<ul>`
    for (var i=0; i < o.length; i++){
        console.log(o[i])
        html += `
            <li>
                <button onClick='checkAnswer(${o[i]}, ${a})'>${o[i]}</button>
            </li>
        `

    }
    html +=  `</ul>`
    document.getElementById("question").innerHTML = q
    document.getElementById("answers").innerHTML = html
    
    
}

function startButton() {
    cleardivs()
    gamestate= {
        time: 100,
        question: 0,
        running: true
    }
    document.getElementById("startpage").innerHTML = `
    <button onclick="start()">would you like to start?</button>
    `
}
startButton();