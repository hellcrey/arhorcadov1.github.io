const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const desistirButton=document.getElementById('desistir');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = 'orange';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    txtperdiste.classList.remove('hidden')
    inputpalabra.value=palabrandom[0];
    inputpalabra.classList.remove('hidden')
    document.getElementById('perdiste').style = 'display:block'
    document.getElementById('palabra').style = 'display:block'
}

function endGameWin(){
    document.removeEventListener('keydown', letterEvent);
    txtganaste.classList.remove('hidden')
    document.getElementById('ganaste').style = 'display:block'
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGameWin();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

var palabrandom=[];

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    palabrandom.push(word)
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
}

const startGame = () => {
    usedLetters = [];
    mistakes=0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    palabrandom=[];
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
    txtganaste.classList.add('hidden')
    txtperdiste.classList.add('hidden')
    inputpalabra.value='';
    inputpalabra.classList.add('hidden')
    document.getElementById('perdiste').style = 'display:none'
    document.getElementById('palabra').style = 'display:none'
    document.getElementById('ganaste').style = 'display:none'
    
};

function desistir(){
    endGame()
    txtperdiste.classList.remove('hidden')
    wordContainer.classList.remove('hidden')
    inputpalabra.value=palabrandom[0];
    inputpalabra.classList.remove('hidden')
    document.getElementById('perdiste').style = 'display:block'
    document.getElementById('palabra').style = 'display:block'
}

var txtganaste=document.querySelector('.ganaste')
var txtperdiste=document.querySelector('.perdiste')
var inputpalabra=document.querySelector('.palabra')

startButton.addEventListener('click', startGame);
desistirButton.addEventListener('click', desistir);