const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-contaner');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//FUNCTIONS
// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
        ${selectedWord
			.split('')
			.map(
				letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
			)
			.join('')}
    `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';
	}
}

//Update the wrong letters
function updateWrongLettersEl(){
    //display wrong letters
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}   
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}  
    `;

    //display body parts
    figureParts.forEach((part, i) => {
        const errors = wrongLetters.length;
        if(i < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'YOU HAVE LOOOOOST!!!';
        popup.style.display = "flex";
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

//EVENT LISTENERS
//KEY DOWN LETTER PRESS EVENT
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    } 
});

//Play again
playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})

displayWord();