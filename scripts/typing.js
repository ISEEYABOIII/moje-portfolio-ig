let typeSpeed = 200;
let deleteSpeed = 100;
let wordDelay = 2000;
let counter = 0;

// utility function that returns a promise that resolves after t milliseconds
const delay = (t) => {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
}

//Change Current Job
const changeCurrentJob = async (wordsJson) => {
    //Get Current Job
    let currentJob = document.getElementById('wrap');
    for (let wordFromJson of wordsJson) {
        //Deleting
        //Previous word letters count
        let prevLetters = currentJob.innerHTML.split('');
        //Loop letters with for of to remove them
        for (let letterFromWordPrev of currentJob.innerHTML) {
            //Remove Last letter
            prevLetters.pop();
            //Join Letters Array
            currentJob.innerHTML = prevLetters.join('');
            await delay(deleteSpeed);
        }

        //Typing
        for (let letterFromWord of wordFromJson) {
            currentJob.innerHTML = currentJob.innerHTML + letterFromWord;
            //Type Speed
            await delay(typeSpeed);
        }
        //After finishing word Wait
        await delay(wordDelay);

    }
    //ReDO Typing - Declare Variables then Redo -
    let words = document.getElementsByClassName('typewrite');
    let wordsData = words[0];
    let wordsJson2 = JSON.parse(wordsData.getAttribute('data-type'));
    counter++;
    if (counter < 1) {
        changeCurrentJob(wordsJson2);
    }
}

// On window load Loop data-type And convert from json to txt and type
window.onload = function () {
    let words = document.getElementsByClassName('typewrite');
    let wordsData = words[0];
    let wordsJson = JSON.parse(wordsData.getAttribute('data-type'));
    setTimeout(changeCurrentJob, wordDelay, wordsJson);
};
