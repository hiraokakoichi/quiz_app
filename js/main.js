const headline = document.getElementById('headline');
const genre = document.getElementById('genre');
const level = document.getElementById('level');
const guide = document.getElementById('guide');
const choices = document.getElementById('choices');
const start = document.getElementById('startBtn');
const home = document.getElementById('homeBtn');

let quizSet;

let currentNum = 0;
let score = 0;
let choicesData;

headline.textContent = 'ようこそ';
genre.classList.add('non-display');
level.classList.add('non-display');
home.classList.add('non-display');
guide.textContent = '以下のボタンをクリック！';

start.addEventListener( 'click', quizStart );
home.addEventListener( 'click', function(){
  document.location.reload();
});

function quizStart(){
  start.classList.add('non-display');
  headline.textContent = '取得中';
  guide.textContent = '少々お待ち下さい';
  fetch("https://opentdb.com/api.php?amount=10")
  .then(response => {
    return response.json();
  })
  .then(data => {
    quizSet =　data.results;
    return quizSet;
  })
  .then(quizSet=>{
    genre.classList.remove('non-display');
    level.classList.remove('non-display');  
    setQuiz();
  })
  .catch(error => {
    alert("クイズの取得に失敗しました");
  });
}

function checkAnswer(btn) {
  if (btn.value === choicesData[0]) {
    score++;
  } 
}

function setQuiz() {
  isAnswered = false;
  // 見出し文挿入
  headline.textContent = `問題${currentNum+1}`;
  // 問題文挿入
  guide.innerHTML = quizSet[currentNum].question;
  // ジャンル
  genre.textContent = '[ジャンル]'+quizSet[currentNum].category;
  // 難易度
  level.textContent = '[難易度]'+quizSet[currentNum].difficulty;

  // 選択肢を作成
  choicesData = quizSet[currentNum].incorrect_answers;
  choicesData.unshift(quizSet[currentNum].correct_answer);

  while (choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }

  choicesData.forEach(choice => {
  const btn = document.createElement('input');
  btn.type = 'button';
  //btn.value = choice;
  btn.innerHTML = choice;
  btn.value = btn.textContent;
  btn.classList.add('choiceBtn');
  btn.addEventListener('click', () => {
    checkAnswer(btn);
    if (currentNum === quizSet.length - 1) {
      headline.textContent = `Score: ${score} / ${quizSet.length}`;
      guide.textContent = '再チャレンジしたい場合は以下のボタンをクリック！';

      genre.classList.add('non-display');
      level.classList.add('non-display');
      choices.classList.add('non-display');
      home.classList.remove('non-display');
      while (choices.firstChild) {
        choices.removeChild(choices.firstChild);
      }
    } else {
      currentNum++;
      setQuiz();
    }
    });
   choices.appendChild(btn);
  });
}