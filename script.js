//***use usedIndex array parameter to also exclude tested letters
//vary check-info messages

let currentNepaliLetter;
let index;
let correctAnswerBtn;
let isRunning = true;
let isFlashcardCompleted = false;
let lengthOfRounds;
let flashcardCompletedCount = 0;
let correctFlashcardsCount = 0;
let progressPercent = 0;
let backgroundMusic;
const resultsModal = document.getElementById('results-modal');
const progressElem = document.getElementById('progress-bar');
const checkInfoElem = document.getElementById('check-info');
const soundEffectsCheckbox = document.getElementById('sound-effects-checkbox');
let isSoundEffectsChecked;
const btn1 = document.getElementById('btn-1');
const btn2 = document.getElementById('btn-2');
const btn3 = document.getElementById('btn-3');
const btn4 = document.getElementById('btn-4');
const imageContainer = document.getElementById('image-container');
const correctAnswerAudio = document.getElementById('correct-answer-audio');
const incorrectAnswerAudio = document.getElementById('incorrect-answer-audio');
const displayModalAudio = document.getElementById('display-modal-audio');
const lofiAudio = document.getElementById('lofi-audio');
const whistleAudio = document.getElementById('whistle-audio');
const funkJazzAudio = document.getElementById('funk-jazz-audio');
const soulAudio = document.getElementById('soul-audio');
const countryAudio = document.getElementById('country-audio');
const punkRockAudio = document.getElementById('punk-rock-audio');
const acousticAudio = document.getElementById('acoustic-audio');

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

function nextFlashcard() {
    if (isRunning === true) {
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
    index = randomNumber(0, 36);
    let currentCorrectAnswer = alphabetData[index].correctAnswer;
    currentNepaliLetter = alphabetData[index].nepaliLetter;
    const nepaliLetterElem = document.getElementById('nepali-letter');
    nepaliLetterElem.textContent = currentNepaliLetter;
    
    let usedAnswers = [currentCorrectAnswer];
    usedAnswers.push(setRandomAnswer(btn1, usedAnswers));
    usedAnswers.push(setRandomAnswer(btn2, usedAnswers));
    usedAnswers.push(setRandomAnswer(btn3, usedAnswers));
    usedAnswers.push(setRandomAnswer(btn4, usedAnswers));
    let correctAnswerBtnNum = randomNumber(1, 5);
    correctAnswerBtn = document.getElementById(`btn-${correctAnswerBtnNum}`);
    correctAnswerBtn.textContent = currentCorrectAnswer;

    loadLocalStorageItems();
}

function loadLocalStorageItems() {
    let lengthOfRoundsString = localStorage.getItem("lengthOfRounds");
    lengthOfRounds = Number(lengthOfRoundsString);

    let isSoundEffectsCheckedString = localStorage.getItem("isSoundEffectsChecked");
    if (isSoundEffectsCheckedString === 'true') {
        isSoundEffectsChecked = true;
    }
    else if (isSoundEffectsCheckedString === 'false') {
        isSoundEffectsChecked = false;
    }
    else if (isSoundEffectsCheckedString === null) {
        isSoundEffectsChecked = true;
    }

    soundEffectsCheckbox.checked = isSoundEffectsChecked;
}

function updateOptions() {
    const lengthOfRoundsInput = document.getElementById('length-of-rounds').value;
    localStorage.setItem("lengthOfRounds", lengthOfRoundsInput);
    lengthOfRounds = Number(lengthOfRoundsInput);
    
    isSoundEffectsChecked = soundEffectsCheckbox.checked;
    localStorage.setItem("isSoundEffectsChecked", String(isSoundEffectsChecked));

    closeOptionsModal();
}

function setRandomAnswer(btn, usedAnswers) {
    let rndIndex = randomNumber(0, 36, usedAnswers);
    let answer = alphabetData[rndIndex].correctAnswer;

    btn.textContent = answer;

    return answer;
}

function checkCorrectAnswer(id, answer) {
    const btn = document.getElementById(id);
    
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;

    isFlashcardCompleted = true;

    flashcardCompletedCount++;
    progressPercent = flashcardCompletedCount / lengthOfRounds * 100;
    const body = document.body;
    let width = (progressElem.offsetWidth / body.offsetWidth) * 100;
    let interval = setInterval(moveProgressBar, 25);
    function moveProgressBar() {
        if (width <= progressPercent) {
            progressElem.style.width = `${width}%`;
            width++;
        }
        else {
            clearInterval(interval);
        }
    }

    if (answer === alphabetData[index].correctAnswer) {
        btn.classList.add("btn-correct");
        checkInfoElem.style.color = "rgb(80, 210, 194)";
        checkInfoElem.textContent = "Nice work! That's some impressive stuff! 🥳";
        correctFlashcardsCount++;
        
        let setTimeoutDuration;
        if (isSoundEffectsChecked === true) {
            correctAnswerAudio.play();
            setTimeoutDuration = correctAnswerAudio.duration * 1000;
        }
        else {
            setTimeoutDuration = 1000;
        }

        if (progressPercent === 100) {
            setTimeout(displayResultsModal, setTimeoutDuration);
        }
        else {
            setTimeout(nextFlashcard, setTimeoutDuration);
        }
    }
    else {
        btn.classList.add("btn-incorrect");
        correctAnswerBtn.classList.add("btn-show-correct");
        checkInfoElem.style.color = "rgb(255, 87, 95)";
        checkInfoElem.textContent = "No worries, you're still learning! 👍"

        let setTimeoutDuration;
        if (isSoundEffectsChecked) {
            incorrectAnswerAudio.play();
            setTimeoutDuration = incorrectAnswerAudio.duration * 1000
        }
        else {
            setTimeoutDuration = 1500;
        }
        
        if (progressPercent === 100) {
            setTimeout(displayResultsModal, setTimeoutDuration);
        }
        else {
            setTimeout(nextFlashcard, setTimeoutDuration);
        }
    }

    if (progressPercent === 100) {
        isRunning = false;
    }
}

function calculateAccuracy() {
    let accuracy = correctFlashcardsCount / lengthOfRounds * 100;
    return accuracy;
}

function displayResultsModal() {
    if (isSoundEffectsChecked) {
        displayModalAudio.play();
    }

    const accuracyBar = document.getElementById('accuracy-bar');
    let accuracy = calculateAccuracy();
    if (accuracy >= 70) {
        accuracyBar.style.backgroundColor = "#04AA6D";
    }
    else if (accuracy >= 40) {
        accuracyBar.style.backgroundColor = "#FEDC56";
    }
    else {
        accuracyBar.style.backgroundColor = "#f44336";
    }

    const commentP = document.getElementById('comment-h2');
    const img = document.createElement("img");
    let commentPText;
    let imgSrc;            
    if (accuracy == 100) {
        commentPText = "Impressive!";
        imgSrc = "/images/very-good-2.png";
    }
    else if (accuracy <= 40) {
        commentPText = "No worries, keep learning!";
        imgSrc = "/images/okay.png";
    }
    else if (accuracy <= 70) {
        commentPText = "Good effort!";
        imgSrc = "/images/good-job.png";
    }
    else if (accuracy < 90) {
        commentPText = "You're on the right track!";
        imgSrc = "/images/well-done.png";
    }
    else if (accuracy >= 90) {
        commentPText = "Excellent work!";
        imgSrc = "/images/very-good.png";
    }
    commentP.textContent = commentPText;    
    img.id = "comment-img";
    img.src = imgSrc;
    imageContainer.appendChild(img);

    const correctFlashcardsCountElem = document.getElementById('correct-flashcards-count-p');
    const accuracyElem = document.getElementById('accuracy-p');

    correctFlashcardsCountElem.innerHTML = `<b>${correctFlashcardsCount}/${lengthOfRounds}</b><br>Correct`;
    
    resultsModal.style.display = "block";

    let width = 0;
    let interval = setInterval(moveAccuracyBar, 15);
    function moveAccuracyBar() {
        if (width <= accuracy) {
            accuracyBar.style.width = width + "%";
            accuracyElem.innerHTML = `<b>${width}</b>%<br>Accuracy`;
            width++;
        }
        else {
            clearInterval(interval);
        }
    }
}

function closeResultsModal() {
    resultsModal.style.display = "none";
}

function closeOptionsModal() {
    const optionsModal = document.getElementById('options-modal');
    optionsModal.style.display = "none";
}

function newRound() {
    resultsModal.style.display = "none";
    isRunning = true;
    flashcardCompletedCount = 0;
    correctFlashcardsCount = 0;
    progressPercent = 0;
    progressElem.style.width = `${progressPercent}%`;
    const prevImg = document.getElementById('comment-img');
    imageContainer.removeChild(prevImg);
    nextFlashcard();
}

window.addEventListener('beforeunload', (e) => {
    if (isRunning === true && flashcardCompletedCount !== 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

function displayOptionsModal() {
    const optionsModal = document.getElementById('options-modal');
    optionsModal.style.display = 'block';
}

function displayBackgroundMusicDropdown() {
    const dropdown = document.getElementById('background-music-dropdown');
    dropdown.style.display = 'block';

    const caret = document.getElementById('caret');
    caret.classList.add('rotate');
}

function setBackgroundMusic(musicInput) {
    if (backgroundMusic !== undefined) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    const backgroundMusicInputElem = document.getElementById('background-music-input-elem');
    backgroundMusicInputElem.textContent = musicInput;

    musicInput = musicInput.toLowerCase();

    if (musicInput === 'none') {
        return;
    }

    switch(musicInput) {
        case 'acoustic':
            backgroundMusic = acousticAudio;
            break;
        case 'country':
            backgroundMusic = countryAudio;
            break;
        case 'funk jazz':
            backgroundMusic = funkJazzAudio;
            break;
        case 'lo-fi':
            backgroundMusic = lofiAudio;
            break;
        case 'punk rock':
            backgroundMusic = punkRockAudio;
            break;
        case 'soul':
            backgroundMusic = soulAudio;
            break;
        case 'whistle':
            backgroundMusic = whistleAudio;
            break;
    }

    backgroundMusic.loop = true;
    backgroundMusic.play();
}