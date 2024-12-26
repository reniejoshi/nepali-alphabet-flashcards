//need to work on next button feature
//see w3schools how to slideshow example for css
//that button (and also space bar) should call assignCurrentNepaliLetter function

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

function randomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

function assignCurrentNepaliLetter() {
    index = randomNumber(0, 36);
    currentNepaliLetter = alphabetData[index].nepaliLetter;
    const nepaliLetterElem = document.getElementById('nepali-letter');
    nepaliLetterElem.textContent = currentNepaliLetter;
    
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');
    const btn3 = document.getElementById('btn-3');
    const btn4 = document.getElementById('btn-4');
    setRandomAnswer(btn1);
    setRandomAnswer(btn2);
    setRandomAnswer(btn3);
    setRandomAnswer(btn4);
    let correctAnswerBtnNum = randomNumber(1, 5);
    let correctAnswerBtn;
    switch (correctAnswerBtnNum) {
        case 1:
            correctAnswerBtn = document.getElementById('btn-1');
            break;
        case 2:
            correctAnswerBtn = document.getElementById('btn-2');
            break;
        case 3:
            correctAnswerBtn = document.getElementById('btn-3');
            break;
        case 4:
            correctAnswerBtn = document.getElementById('btn-4');
            break;
    }
    correctAnswerBtn.textContent = alphabetData[index].correctAnswer;
}

function setRandomAnswer(btn) {
    //also need to check if the answer has been set for the previous buttons
    //possibly using array?
    let rndIndex;

    let rndNum = randomNumber(0, 36);
    while (rndIndex === undefined) {
        if (rndNum !== index) {
            rndIndex = rndNum;
        }
        else {
            rndNum = randomNumber(0, 36);
        }
    }
    btn.textContent = alphabetData[rndIndex].correctAnswer;
}

function checkCorrectAnswer(id, answer) {
    const btn = document.getElementById(id);
    if (answer === alphabetData[index].correctAnswer) {
        btn.classList.add("btn-correct");
    }
    else {
        btn.classList.add("btn-incorrect");
    }
}