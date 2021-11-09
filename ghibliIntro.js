const containerBox = document.getElementById('containerBox');
const textBox = document.getElementById('textBox');

let randomPicker;
let currentQuestion = 0;

const ghibliSound = [
  {
    src: 'data/hauru.mp3',
    movie: 'Hawl',
  },
  {
    src: 'data/kurenainobuta.mp3',
    movie: 'Porco Rosso',
  },
  {
    src: 'data/laputa.mp3',
    movie: 'Castle in the Sky',
  },
  {
    src: 'data/majo.mp3',
    movie: 'Kikis Delivery Service',
  },
  {
    src: 'data/nausicaa.mp3',
    movie: 'Nausicaa of the Valley of the Wind',
  },
  {
    src: 'data/sentochihiro.mp3',
    movie: 'Spirited Away',
  },
  {
    src: 'data/totoro.mp3',
    movie: 'My Neighbor Totoro',
  },
];
const ghibliImg = [
  {
    movie: 'Hawl',
    img: './images/hauru.png',
  },
  {
    movie: 'Porco Rosso',
    img: './images/kurenainobuta.png',
  },
  {
    movie: 'Castle in the Sky',
    img: './images/laputa.png',
  },
  {
    movie: 'Kikis Delivery Service',
    img: './images/majo.png',
  },
  {
    movie: 'Nausicaa of the Valley of the Wind',
    img: './images/nausicaa.png',
  },
  {
    movie: 'Spirited Away',
    img: './images/sentochihiro.png',
  },
  {
    movie: 'My Neighbor Totoro',
    img: './images/totoro.png',
  },
];

function initGhibli() {
  //quizTitle.innerHTML = 'Ghibli Intro QUIZ';
  containerBox.innerHTML = '';
  console.log('btn clicked');

  const clickImage = document.createElement('div');
  clickImage.setAttribute('id', 'clickImage');
  clickImage.innerHTML = 'Click the matching Image';

  textBox.innerHTML = 'Which Ghibli movie is this song from?';
  randomPicker = random(ghibliImg);
  console.log('ghibli random is ', randomPicker);
  containerBox.innerHTML = `<audio id="audioControls" controls><source src="${ghibliSound[randomPicker].src}" type="audio/wav"></audio>`;
  createCards(ghibliImg);
  addEventListener();
}

// add EventListener to imgBtn class
function addEventListener() {
  let imgBtn = document.querySelectorAll('.imgBtn');
  console.log(imgBtn);
  imgBtn.forEach((e) => e.addEventListener('click', onClick));
}

function onClick(evt) {
  let popupContent = document.getElementById('content');
  console.log('target is ', parseInt(evt.target.id));
  if (parseInt(evt.target.id) === randomPicker) {
    correctAnswer();
    // popupContent.innerHTML = 'You got it!!';
    // popupToggle();
    // score++;
    // console.log('score is ', score);
  } else {
    wrongAnswer();
    // popupToggle();
    // popupContent.innerHTML = 'You suck!';
  }
  currentQuestion++;
  ghibliSound.splice(randomPicker, 1);
  //   console.log('currentQ is ', currentQuestion);
  //   setTimeout(next, 1000);
}

initGhibli();

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return index;
}

// shows imgs
function createCards(imgArray) {
  for (let i = 0; i < imgArray.length; i++) {
    containerBox.innerHTML += `<img class="imgBtn" id="${i}" src="${imgArray[i].img}" />`;
  }
  addEventListener();
}

function correctAnswer() {
  textBox.innerHTML = 'CORRECT ANSWER!';
  //setTimeout(randomInit, 1500);
  console.log('correct answer');
}

function wrongAnswer() {
  textBox.innerHTML = 'WRONG ANSWER!';
  //setTimeout(randomInit, 1500);
  console.log('wrong answer');
}
