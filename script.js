var isRunning = true;
var currentNepaliLetter;
var index;
var correctAnswerBtn;
var flashcardCompletedCount = 0;
var lengthOfRounds = 10;
var isFlashcardCompleted = false;

const alphabetData = [
    {
        nepaliLetter: "क",
        correctAnswer: "ka"
    },
    {
        nepaliLetter: "ख",
        correctAnswer: "kha"
    },
    {
        nepaliLetter: "ग",
        correctAnswer: "ga"
    },
    {
        nepaliLetter: "घ",
        correctAnswer: "gha"
    },
    {
        nepaliLetter: "ङ",
        correctAnswer: "nya"
    },
    {
        nepaliLetter: "च",
        correctAnswer: "cha"
    },
    {
        nepaliLetter: "छ",
        correctAnswer: "chha"
    },
    {
        nepaliLetter: "ज",
        correctAnswer: "ja"
    },
    {
        nepaliLetter: "झ",
        correctAnswer: "jha"
    },
    {
        nepaliLetter: "ञ",
        correctAnswer: "yna"
    },
    {
        nepaliLetter: "ट",
        correctAnswer: "ta"
    },
    {
        nepaliLetter: "ठ",
        correctAnswer: "tha"
    },
    {
        nepaliLetter: "ड",
        correctAnswer: "da"
    },
    {
        nepaliLetter: "ढ",
        correctAnswer: "dha"
    },
    {
        nepaliLetter: "ण",
        correctAnswer: "na"
    },
    {
        nepaliLetter: "त",
        correctAnswer: "ta"
    },
    {
        nepaliLetter: "थ",
        correctAnswer: "tha"
    },
    {
        nepaliLetter: "द",
        correctAnswer: "da"
    },
    {
        nepaliLetter: "ध",
        correctAnswer: "dha"
    },
    {
        nepaliLetter: "न",
        correctAnswer: "na"
    },
    {
        nepaliLetter: "प",
        correctAnswer: "pa"
    },
    {
        nepaliLetter: "फ",
        correctAnswer: "pha"
    },
    {
        nepaliLetter: "ब",
        correctAnswer: "ba"
    },
    {
        nepaliLetter: "भ",
        correctAnswer: "bha"
    },
    {
        nepaliLetter: "म",
        correctAnswer: "ma"
    },
    {
        nepaliLetter: "य",
        correctAnswer: "ya"
    },
    {
        nepaliLetter: "र",
        correctAnswer: "ra"
    },
    {
        nepaliLetter: "ल",
        correctAnswer: "la"
    },
    {
        nepaliLetter: "व",
        correctAnswer: "wa"
    },
    {
        nepaliLetter: "श",
        correctAnswer: "sha"
    },
    {
        nepaliLetter: "ष",
        correctAnswer: "sa"
    },
    {
        nepaliLetter: "स",
        correctAnswer: "sa"
    },
    {
        nepaliLetter: "ह",
        correctAnswer: "ha"
    },
    {
        nepaliLetter: "क्ष",
        correctAnswer: "chhya"
    },
    {
        nepaliLetter: "त्र",
        correctAnswer: "tra"
    },
    {
        nepaliLetter: "ज्ञ",
        correctAnswer: "gya"
    }
];

document.addEventListener("keydown", nextFlashcard);

function nextFlashcard(e) {
    if (e.key === ' ' && isRunning === true && isFlashcardCompleted === true) {
        const checkInfoElem = document.getElementById('check-info');
        checkInfoElem.textContent = "";
        for (let i = 0; i < 4; i++) {
            const btn = document.getElementById(`btn-${i+1}`);
            const hasCorrectClass = btn.classList.contains("btn-correct");
            const hasIncorrectClass = btn.classList.contains("btn-incorrect");
            const hasShowCorrectClass = btn.classList.contains("btn-show-correct");
            if (hasCorrectClass === true) {
                btn.classList.remove("btn-correct");
            }
            else if (hasIncorrectClass === true) {
                btn.classList.remove("btn-incorrect");
            }
            else if (hasShowCorrectClass === true) {
                btn.classList.remove("btn-show-correct");
            }
            btn.disabled = false;
        }

        isFlashcardCompleted = false;

        assignCurrentNepaliLetter();
    }
}

function randomNumber(min, max, usedAnswers) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    
    while (usedAnswers !== undefined && usedAnswers.includes(alphabetData[randomNumber].correctAnswer) === true) {
        randomNumber = Math.floor(Math.random() * (max - min) + min);
    }

    return randomNumber;
}

function assignCurrentNepaliLetter() {
    const pressKeyInfoElem = document.getElementById('press-key-info');
    pressKeyInfoElem.style.display = "none";

    index = randomNumber(0, 36);
    let currentCorrectAnswer = alphabetData[index].correctAnswer;
    currentNepaliLetter = alphabetData[index].nepaliLetter;
    const nepaliLetterElem = document.getElementById('nepali-letter');
    nepaliLetterElem.textContent = currentNepaliLetter;
    
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');
    const btn3 = document.getElementById('btn-3');
    const btn4 = document.getElementById('btn-4');
    let usedAnswers = [currentCorrectAnswer];
    usedAnswers.push(setRandomAnswer(btn1, usedAnswers));
    usedAnswers.push(setRandomAnswer(btn2, usedAnswers));
    usedAnswers.push(setRandomAnswer(btn3, usedAnswers));
    usedAnswers.push(setRandomAnswer(btn4, usedAnswers));
    let correctAnswerBtnNum = randomNumber(1, 5);
    correctAnswerBtn = document.getElementById(`btn-${correctAnswerBtnNum}`);
    correctAnswerBtn.textContent = currentCorrectAnswer;
}

function setRandomAnswer(btn, usedAnswers) {
    let rndIndex = randomNumber(0, 36, usedAnswers);
    let answer = alphabetData[rndIndex].correctAnswer;

    btn.textContent = answer;

    return answer;
}

function checkCorrectAnswer(id, answer) {
    const btn = document.getElementById(id);
    const checkInfoElem = document.getElementById('check-info');
    if (answer === alphabetData[index].correctAnswer) {
        btn.classList.add("btn-correct");
        checkInfoElem.style.color = "rgb(80, 210, 194)";
        checkInfoElem.textContent = "Nice work! That's some impressive stuff! 🥳";
    }
    else {
        btn.classList.add("btn-incorrect");
        correctAnswerBtn.classList.add("btn-show-correct");
        checkInfoElem.style.color = "rgb(255, 87, 95)";
        checkInfoElem.textContent = "No worries, you're still learning! 👍"
    }

    const pressKeyInfoElem = document.getElementById('press-key-info');
    pressKeyInfoElem.style.display = "block";

    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');
    const btn3 = document.getElementById('btn-3');
    const btn4 = document.getElementById('btn-4');
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;

    isFlashcardCompleted = true;

    flashcardCompletedCount++;
    const progressElem = document.getElementById('progress');
    progressPercent = flashcardCompletedCount * 10;
    progressElem.style.width = `${progressPercent}%`;
    if (progressPercent === 100) {
        isRunning = false;
    }
}