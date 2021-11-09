import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js';

//Add your own config content
const firebaseConfig = {
  apiKey: 'AIzaSyARqljuS5yf86OHAp8H1u9q0j6I6m1Scss',
  authDomain: 'quiz-01-2c676.firebaseapp.com',
  projectId: 'quiz-01-2c676',
  storageBucket: 'quiz-01-2c676.appspot.com',
  messagingSenderId: '180059847819',
  appId: '1:180059847819:web:768ec49d4e155787f9688e',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// //Add to firebase
// async function addName() {
//   var name = readInput('name');
//   if (!name) return null;
//   try {
//     const docRef = await addDoc(collection(db, 'score'), {
//       name: name,
//     });
//     clearInput('name');
//     displayNamesInList('listOfNames');
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// }

//add scores
async function addScore() {
  if (currentQuestion >= 2) {
    try {
      const docRef = await addDoc(collection(db, 'score'), {
        score: `${score}`,
      });
      console.log('adding score to firebase');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}

//Remove to firebase
async function deleteName() {
  var id = this.getAttribute('data-id');
  await deleteDoc(doc(db, 'names', id));
  displayNamesInList('listOfNames');
}

//Get all from firebase
async function getNames() {
  const names = await getDocs(collection(db, 'score'));
  return names;
}

function readInput(id) {
  if (!document.getElementById(id) && !document.getElementById(id).value)
    return null;

  return document.getElementById(id).value;
}

function clearContentOfElement(id) {
  if (!document.getElementById(id)) return null;
  document.getElementById(id).innerHTML = '';
}

function formatListItem(item) {
  return `<li>
            <h3>${item.name}</h3>
            <button
              class="deleteName"
              data-id="${item.id}">
              DELETE
            </button>
          </li>`;
}

function clearInput(id) {
  if (!document.getElementById(id)) return null;
  document.getElementById(id).value = '';
}

function addNameToList(list, item) {
  if (!document.getElementById(list)) return null;
  document.getElementById(list).innerHTML += formatListItem(item);
}

function addEventListner() {
  if (!document.getElementById('addName')) return null;
  document.getElementById('addName').removeEventListener('click', addName);
  document.getElementById('addName').addEventListener('click', addName);

  if (!document.getElementsByClassName('deleteName')) return null;
  var elements = document.getElementsByClassName('deleteName');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', deleteName, false);
  }
}

async function displayNamesInList(id) {
  var namesInDb = await getNames();
  clearContentOfElement(id);

  namesInDb.forEach((doc) => {
    addNameToList('listOfNames', { id: doc.id, name: doc.data().name });
  });

  addEventListner();
  return;
}

async function init() {
  await displayNamesInList('listOfNames');
  addEventListner();
}

init();

// Sak quiz
const imageCards = document.getElementById('cardsContainer');
const question = document.getElementById('question');
const clickImage = document.getElementById('clickImage');
const quizTitle = document.getElementById('quiz-title');
const popup = document.getElementById('popup');
const sound = document.getElementById('sound');
const clickTheMatchingImage = document.getElementById('clickTheMatchingImage');

let currentQuestion = 0;
let score = 0;
let randomIndex;

const silhouetteImg = [
  {
    id: '01',
    img: './images/Luke.png',
    question: 'Which guy is from Death Note?',
  },
  {
    id: '02',
    img: './images/Ichigo.png',
    question: 'Who is a Shinigami who has a sword named Zangetsu?',
  },
  {
    id: '03',
    img: './images/Naruto.png',
    question: 'Who has a name which is a type of topping you put in ramen?',
  },
  {
    id: '04',
    img: './images/Levi.png',
    question: 'Who fights against titans?',
  },
];
const ghibliSound = [
  {
    src: 'data/hauru.mp3',
    movie: 'Hawl',
    img: './images/hauru.png',
  },
  {
    src: 'data/kurenainobuta.mp3',
    movie: 'Porco Rosso',
    img: './images/kurenainobuta.png',
  },
  {
    src: 'data/laputa.mp3',
    movie: 'Castle in the Sky',
    img: './images/laputa.png',
  },
  {
    src: 'data/majo.mp3',
    movie: 'Kikis Delivery Service',
    img: './images/majo.png',
  },
  {
    src: 'data/nausicaa.mp3',
    movie: 'Nausicaa of the Valley of the Wind',
    img: './images/nausicaa.png',
  },
  {
    src: 'data/sentochihiro.mp3',
    movie: 'Spirited Away',
    img: './images/sentochihiro.png',
  },
  {
    src: 'data/totoro.mp3',
    movie: 'My Neighbor Totoro',
    img: './images/totoro.png',
  },
];

// Noah quiz
var imageBox1;
var imageBox2;
var imageBox3;
var imageRect;
var textBox;
var mainImageRect;
var mainBox;
var mousePosition;
var boxNr;
var isDown = false;
var offset = [0, 0];
var randomPicker;
let checkHover;

var pictureArray = [
  //PIZZA
  {
    question: 'What should go on this pizza?',
    folderURL: 'pizzaimgs',
    winNr: 1,
  },
  //APHEX TWIN
  {
    question: 'What is his logo?',
    folderURL: 'apheximgs',
    winNr: 2,
  },
  //TURKISK YOGHURT
  {
    question: 'What country is he from?',
    folderURL: 'turkimgs',
    winNr: 3,
  },
];

function createImages() {
  //console.log('inside the createImage function');
  randomPicker = random(pictureArray);
  //console.log('randomP is ', randomPicker);
  var $mainDiv = $('<div/>').attr('id', 'mainBox');
  $mainDiv
    .css({
      height: '40%',
      width: '40%',
      position: 'absolute',
      left: '50%',
      top: '25%',
      transform: 'translate(-50%,-50%)',
      background: `url(/images/${pictureArray[randomPicker].folderURL}/main.jpeg)`,
      'background-size': '100%',
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'z-index': '1',
    })
    .appendTo('#containerBox')
    .html();

  for (var u = 1; u <= 3; u++) {
    var $newDiv = $('<div/>').attr('id', 'imageBox' + u);
    $newDiv
      .css({
        height: '20%',
        width: '20%',
        position: 'absolute',
        left: 25 * u + '%',
        top: '75%',
        transform: 'translate(-50%,-50%)',
        background: `url(/images/${pictureArray[randomPicker].folderURL}/item${u}.jpeg)`,
        'background-size': '100%',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'z-index': '1',
      })
      .appendTo('#containerBox')
      .html();
  }

  imageBox1 = document.getElementById('imageBox1');
  imageBox2 = document.getElementById('imageBox2');
  imageBox3 = document.getElementById('imageBox3');
  mainBox = document.getElementById('mainBox');
  textBox = document.getElementById('question');
  textBox.innerHTML = pictureArray[randomPicker].question;
}

function dragAndDrop() {
  if (imageBox1) {
    imageBox1.addEventListener(
      'mousedown',
      (e) => {
        isDown = true;
        checkHover = 'imageBox1';
        boxNr = 1;
        offset = [
          imageBox1.offsetLeft - e.clientX,
          imageBox1.offsetTop - e.clientY,
        ];
      },
      true
    );
  }

  if (imageBox2) {
    imageBox2.addEventListener(
      'mousedown',
      (e) => {
        isDown = true;
        checkHover = 'imageBox2';
        boxNr = 2;
        offset = [
          imageBox2.offsetLeft - e.clientX,
          imageBox2.offsetTop - e.clientY,
        ];
      },
      true
    );
  }

  if (imageBox3) {
    imageBox3.addEventListener(
      'mousedown',
      (e) => {
        isDown = true;
        checkHover = 'imageBox3';
        boxNr = 3;
        offset = [
          imageBox3.offsetLeft - e.clientX,
          imageBox3.offsetTop - e.clientY,
        ];
      },
      true
    );
  }

  document.addEventListener(
    'mouseup',
    function () {
      isDown = false;
      console.log('boxNr is ', boxNr);
      imageRect = document
        .getElementById('imageBox' + boxNr)
        .getBoundingClientRect();
      mainImageRect = mainBox.getBoundingClientRect();
      console.log('mainImageRect is ', mainImageRect);
      console.log(mainBox.offsetHeight);
      if (
        imageRect.top <= mainImageRect.top + mainBox.offsetHeight &&
        imageRect.top >= mainImageRect.top &&
        imageRect.left <= mainImageRect.left + mainBox.offsetHeight &&
        imageRect.left >= mainImageRect.left
      ) {
        if (boxNr == pictureArray[randomPicker].winNr) {
          mainBox.style.backgroundImage = `url(/images/${pictureArray[randomPicker].folderURL}/win.jpeg)`;
        } else {
          mainBox.style.backgroundImage = `url(/images/${pictureArray[randomPicker].folderURL}/lose.jpeg)`;
        }
        for (var i = 1; i <= 3; i++) {
          $('#imageBox' + i).remove();
        }
        setTimeout(next, 1000);
      }
    },
    true
  );

  document.addEventListener('mousemove', function () {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      for (var i = 1; i <= 3; i++) {
        if (checkHover == 'imageBox' + i) {
          document.getElementById('imageBox' + i).style.left =
            mousePosition.x + offset[0] + 'px';
          document.getElementById('imageBox' + i).style.top =
            mousePosition.y + offset[1] + 'px';
        }
      }
    }
  });
}

function startGame() {
  document.body.style.background =
    'linear-gradient(to right, rgba(14, 236, 151, 0.65), rgba(128, 13, 223, 0.65))';
  question.innerHTML = `<button id="startBtn">Begin the Game</button>`;
  question.addEventListener('click', next);
}
startGame();

// Give random index number of array
function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return index;
}

// shows imgs
function createCards(imgArray) {
  for (let i = 0; i < imgArray.length; i++) {
    imageCards.innerHTML += `<img class="imgBtn" id="${i}" src="${imgArray[i].img}" />`;
  }
  addEventListener();
}

// add EventListener to imgBtn class
function addEventListener() {
  let imgBtn = document.querySelectorAll('.imgBtn');
  console.log(imgBtn);
  imgBtn.forEach((e) => e.addEventListener('click', onClick));
}

function addAnimalEventListener() {
  let animalImage = document.querySelectorAll('.animalImage');
  console.log(animalImage);
  animalImage.forEach((e) => e.addEventListener('click', onClick));
}
//add EventListener for clicking a card
function onClick(evt) {
  let popupContent = document.getElementById('content');
  console.log('target is ', parseInt(evt.target.id));
  console.log('randomIndex is ', randomIndex);
  question.innerHTML = '';
  if (parseInt(evt.target.id) === randomIndex) {
    popupContent.innerHTML = 'You got it!!';
    popupToggle();
    score++;
    console.log('score is ', score);
  } else {
    popupToggle();
    popupContent.innerHTML = 'You suck!';
  }
  currentQuestion++;
  console.log('currentQ is ', currentQuestion);
  setTimeout(next, 1000);
}

// display popup to go to the next question
function popupToggle() {
  popup.classList.toggle('active');
}

// next button generator
// const nextBtn = document.getElementById('nextBtn');
// nextBtn.addEventListener('click', next);

let totalScore;

//popup comes up and goes to the next question
function next() {
  // const nextBtn = document.getElementById('nextBtn');
  // nextBtn.addEventListener('click', () => {

  imageCards.innerHTML = '';
  popup.classList.remove('active');
  switch (currentQuestion) {
    case 0:
      //document.body.style.backgroundColor = '#000';
      quizTitle.innerHTML = 'Silhouette QUIZ';
      clickTheMatchingImage.innerHTML = 'Click on a matching image';
      clickImage.innerHTML = '';
      randomIndex = random(silhouetteImg);
      console.log(randomIndex);

      question.innerHTML = silhouetteImg[randomIndex].question;
      createCards(silhouetteImg);

      break;

    case 1:
      console.log('btn clicked');

      quizTitle.innerHTML = 'Ghibli Intro QUIZ';
      question.innerHTML = 'Which Ghibli movie is this song from?';
      clickTheMatchingImage.innerHTML = 'Click on a matching image';
      randomIndex = random(ghibliSound);
      console.log('ghibli random is ', randomIndex);
      //sound.innerHTML = `<img src = "./images/playBtn.png" onclick="playAudio('./${ghibliSound[randomIndex].src}')">`;
      sound.innerHTML = `<audio controls><source src="${ghibliSound[randomIndex].src}" type="audio/wav"></audio>`;
      createCards(ghibliSound);
      addEventListener();
      break;

    case 2:
      quizTitle.innerHTML = '';
      clickTheMatchingImage.innerHTML = '';
      sound.children ? sound.parentNode.removeChild(sound) : null;
      console.log('soundChildrend is ', sound.children);
      randomIndex = random(animalList);
      question.innerHTML = `Find the ${animalList[randomIndex].name}`;
      let xPos = 0;
      let yPos = 0;

      for (let i = 0; i < animalList.length; i++) {
        if (xPos == 4) (xPos = 0), yPos++;
        let animalDiv = $('<div/>').attr('class', 'animalImage');
        animalDiv.attr('id', `${i}`);
        //animalDiv.attr('onclick', `onClick()`);
        animalDiv
          .css({
            left: 25 * xPos + '%',
            top: 25 * yPos + '%',
            background: `url(/images/${animalList[i].src})`,
            'background-size': 'contain',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
          })
          .appendTo('#containerBox')
          .html();
        xPos++;
      }

      addAnimalEventListener();
      break;
    case 3:
      console.log('current is # ', currentQuestion);
      document.querySelectorAll('.animalImage').forEach((e) => e.remove());
      quizTitle.innerHTML = '';
      clickTheMatchingImage.innerHTML = '';
      let container = document.getElementsById('container');
      container.innerHTML = `<div>hej</div>`;

      //   document.getElementsById('container').innerHTML = ` <input
      //   type="button"
      //   value="button1"
      //   id="nextglasses"
      //   onclick="nextGlasses()"
      // />
      // <input
      //   type="button"
      //   value="button2"
      //   id="nextshoes"
      //   onclick="nextShoes()"
      // />
      // <input
      //   type="button"
      //   value="button3"
      //   id="nextextra"
      //   onclick="nextExtra()"
      // />
      // <button id="submit" onclick="checkAnswer()">Submit Answer</button>
      // <div id="results"></div>

      // <div id="background">
      //   <div id="glasses" />
      //   <div id="character" />
      //   <div id="glasses-variants">
      //     <div id="glasses1"></div>
      //     <div id="glasses2"></div>
      //     <div id="glasses3"></div>
      //   </div>
      //   <div id="shoes" />
      //   <div id="extra" />
      // </div>`;

      displayGlasses();
      nextGlasses();
      break;

    case 4:
      //sound.children ? sound.parentNode.removeChild(sound) : null;
      console.log('soundChildrend is ', sound.children);
      //sound.parentNode.removeChild(sound);
      createImages();
      dragAndDrop();
      break;

    default:
      quizTitle.innerHTML = `You've got ${score}/${currentQuestion} correct!`;
      totalScore = score;
      quizTitle.style.marginTop = '300px';
      clickImage.innerHTML = '';
      sound.innerHTML = '';
      addScore();
  }
  // });
}

const animalList = [
  { name: 'Cat', src: 'q5imgs/cat.jpeg' },
  { name: 'Dog', src: 'q5imgs/dog.jpeg' },
  { name: 'Owl', src: 'q5imgs/great-horned-owl.jpeg' },
  { name: 'Parrot', src: 'q5imgs/parrot.jpeg' },
  { name: 'Popit', src: 'q5imgs/popit.jpeg' },
  { name: 'Shark', src: 'q5imgs/shark.jpg' },
  { name: 'Sloth', src: 'q5imgs/sloth.jpeg' },
  { name: 'Utter', src: 'q5imgs/utter.jpeg' },
  { name: 'Unicorn', src: 'q5imgs/unicorn.png' },
  { name: 'Human', src: 'q5imgs/human.png' },
  { name: 'Ducks', src: 'q5imgs/ducks.jpg' },
  { name: 'Rabbit', src: 'q5imgs/rabbit.jpg' },
  { name: 'Hamster', src: 'q5imgs/hamster.jpg' },
  { name: 'Gorilla', src: 'q5imgs/gorilla.jpg' },
  { name: 'Lemur', src: 'q5imgs/lemur.jpg' },
  { name: 'Giraffe', src: 'q5imgs/giraffe.jpg' },
];

let currentActive = 0;
const glassPos = [0, 100, 200, 300];
const resultBox = document.getElementById('results');
const makeGlasses = [
  {
    imgURL: ['images/0glass1.png', 'images/0glass2.png', 'images/0glass3.png'],
    charaURL: 'images/0frog.png',
    answer: 'glasses2',
  },
  {
    imgURL: ['placeholder'],
  },
];

function displayGlasses() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('glasses' + i).style.background = `url(${
      makeGlasses[0].imgURL[i - 1]
    })`;
  }

  document.getElementById(
    'character'
  ).style.background = `url(${makeGlasses[0].charaURL})`;
}

function nextGlasses() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('glasses' + i).style.visibility = 'hidden';
  }
  if (currentActive != 0) {
    document.getElementById('glasses' + currentActive).style.visibility =
      'visible';
  }

  console.log(glassPos[currentActive]);
  document.getElementById('glasses-variants').style.left =
    -glassPos[currentActive] + '%';
  console.log(currentActive, glassPos.length);
  if (currentActive == glassPos.length - 1) {
    currentActive = 0;
  } else {
    currentActive++;
  }
}

function checkAnswer() {
  console.log("current'active", currentActive);

  if (currentActive === 3) {
    resultBox.innerHTML = 'Correct Answer';
  } else {
    resultBox.innerHTML = 'Wrong Answer';
  }
}
