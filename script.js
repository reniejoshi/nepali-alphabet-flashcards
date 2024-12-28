//add accuracy calcuating feature

var currentNepaliLetter;
var index;

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
        correctAnswer: "nya"
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
    if (e.key === ' ') {
        for (let i = 0; i < 4; i++) {
            const btn = document.getElementById(`btn-${i+1}`);
            const hasCorrectClass = btn.classList.contains("btn-correct");
            const hasIncorrectClass = btn.classList.contains("btn-incorrect");
            if (hasCorrectClass === true) {
                btn.classList.remove("btn-correct");
            }
            else if (hasIncorrectClass === true) {
                btn.classList.remove("btn-incorrect");
            }
            btn.disabled = false;
        }
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
    index = randomNumber(0, 36);
    currentCorrectAnswer = alphabetData[index].correctAnswer;
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
    const correctAnswerBtn = document.getElementById(`btn-${correctAnswerBtnNum}`);
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
    if (answer === alphabetData[index].correctAnswer) {
        btn.classList.add("btn-correct");
    }
    else {
        btn.classList.add("btn-incorrect");
    }
    btn.disabled = true;
    //need to disable all buttons
}