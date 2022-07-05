let title =document.getElementById('title')
let messageEl =document.getElementById('message-el')
let sumEl =document.getElementById('sum-el')
let cardsEl =document.querySelector("#cards-el")
let SGbtn =document.getElementById('start-game')

let startGameBtn =document.querySelector('#start-game')
let newCardBtn =document.querySelector('#new-card')
let reloadBtn =document.querySelector('#reload')

let p1 =document.getElementById('p1')
let p1Score = 0
p1.textContent= p1Score

let p2 =document.getElementById('p2')
let p2Score = 0
p2.textContent= p2Score

let p1Name =document.getElementById('player1name')
p1Name.onkeyup = function(){
    sessionStorage.p1Name = p1Name.value
}
let p2Name =document.getElementById('player2name')
p2Name.onkeyup = function(){
    sessionStorage.p2Name = p2Name.value
}


if(sessionStorage.p1Name === null || sessionStorage.p2Name === null || sessionStorage.p1Name === '' || sessionStorage.p2Name === '' ){
    p1Name.value = null
    p2Name.value = null
}else if (sessionStorage.p1Name != null && sessionStorage.p2Name != null){
p1Name.value = sessionStorage.p1Name
p2Name.value = sessionStorage.p2Name
}




let mood = 'p1';

p1.style=`
background-color: rgb(0, 255, 145);
color:red;
`
p2.style=`
background-color: none;
color:rgb(255, 238, 0);
`


let message = ""
let firstCard = getRandomNumber()
let cardsArray = [firstCard]


let sum =firstCard


function startGame(){
    SGbtn.style.display='none'
    if(sum === 21){
        message = "Booyah! an additional point "
        reloadBtn.style=`
        background:rgb(145, 255, 0);
        color:black;
        border:1px solid black;
        `
        if(mood == 'p1'){
            p1Score += 1
            p1.textContent= p1Score
        }else{
            p2Score += 1
            p2.textContent= p2Score
        }
    }else if(sum < 21){
        message = "Add a new card"
    }else{
        message = "Try again"
        reloadBtn.style=`
        background:red;
        color:white;
        `
    }
    messageEl.textContent = message
    sumEl.textContent = `Sum: ${sum}`
    cardsEl.textContent = "Cards: " + cardsArray.join(" , ")
}



function newCard(){
    startGame()
    if(sum < 21){
    reloadBtn.style.background='goldenrod'
    let newCard = getRandomNumber()
    sum += +newCard
    cardsArray.push(newCard)
    }else{
        newCardBtn.style.display='none'
        reloadBtn.style.display='block'
    }
}
function reload(){
    if(p1Score == 10 || p2Score == 10){
        booyah()
    }else{
        title.textContent="Who is the winner ?!"
        sumEl.textContent = 'Sum: '
        sum = 0
        cardsArray= []
        cardsEl.textContent = 'cards: '
        messageEl.textContent ='want to play a round?'
        newCardBtn.style.display='block'
        reloadBtn.style.display='none'
        if(mood == 'p1'){
            mood = 'p2';
            p1.style=`
            background-color: none;
            color:rgb(255, 238, 0);
            `
            p2.style=`
            background-color: rgb(0, 255, 145);
            color:red;
            `
        }else{
            mood = 'p1'
            p1.style=`
            background-color: rgb(0, 255, 145);
            color:red;
            `
            p2.style=`
            background-color: none;
            color:rgb(255, 238, 0);
            `
        }
    }
}
function getRandomNumber(){
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if(randomNumber > 10){
        return 10
    }else if(randomNumber === 1){
        return 11
    }else{
        return randomNumber
    }
}
function booyah(){
    if(p1Score == 10){
        newCardBtn.style.display='none'
        reloadBtn.style.display='none'
        title.textContent=`${p1Name.value} is the winner`
        p1Score = 0
        p1.textContent= p1Score
        p2Score = 0
        p2.textContent= p2Score
        booyahTime()
    }
    if(p2Score == 10){
        newCardBtn.style.display='none'
        reloadBtn.style.display='none'
        title.textContent=`${p2Name.value} is the winner`
        p1Score = 0
        p1.textContent= p1Score
        p2Score = 0
        p2.textContent= p2Score
        booyahTime()
    }
}
function booyahTime(){
    newCardBtn.style.display='none'
    reloadBtn.style.display='none'
    let i = 0
    let booyahTime = setInterval(() => {
        messageEl.textContent = i+1
        i++
        if(i == 3){
            clearInterval(booyahTime)
            newCardBtn.style.display='block'
            startGameBtn.style.display='block'
            messageEl.textContent ='want to play a round?'
        }
    }, 1000);
}

