console.log('window up and running');

const horatio = {
    name:   `Horatio`,
    hungerLvl:      0,
    sleepLvl:       0,
    boredomLvl:     0,
    isAlive:     true,
    //some jquery variables for the gifs
    $babyHoratio: $(`<img id="baby-horatio" src="images/baby-horatio.gif">`),
    $deadHoratio: $(`<img id="dead-horatio" src=#>`),
    
    // method for feeding
    feed() {
        if (this.isAlive && this.hungerLvl >= 5) {
            $(`#announcer`).text(`JUST FED HORATIO`);
            giveFood();
            // this.hungerLvl = this.hungerLvl - 5;
            // $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        } else if(this.isAlive && this.hungerLvl <= 5){
            $(`#announcer`).text(`Horatio isn't hungry right now.`);
        } else {
            $(`#announcer`).text(`HORATIO IS DEAD YOU IDIOT`);
        }
    },
    // method for making sleep 
    sleep() {
        if (this.isAlive && this.sleepLvl >= 5) {
            $(`#announcer`).text(`JUST PUT HORATIO TO SLEEP`);
            
        } else if (this.isAlive && this.sleepLvl <= 5) {
            $(`#announcer`).text(`Horatio isn't tired right now`);
        } else {
            $(`#announcer`).text(`HORATIO IS DEAD YOU IDIOT`);
        }
    },
    // method for play
    play() {
        if (this.isAlive && this.boredomLvl >= 5) {
            $(`#announcer`).text(`JUST PLAYED WITH HORATIO`);
            this.boredomLvl = this.boredomLvl - 5;
            $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        } else if (this.isAlive && this.boredomLvl <= 5){
            $(`#announcer`).text(`Horatio doesn't want to play right now`);
        }
        else {
            $(`#announcer`).text(`HORATIO IS DEAD YOU IDIOT`);
        }
    }
};

const game = () => {
    const hunger = setInterval(function (){
        horatio.hungerLvl ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        if (horatio.hungerLvl === 600 && horatio.isAlive) {
            $(`#announcer`).text(`HORATIO HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(hunger);
        } else if (horatio.isAlive === false) {
            clearInterval(hunger);
        }
    }, 2500);
    const boredom = setInterval(function (){
        horatio.boredomLvl ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        if (horatio.boredomLvl === 600 && horatio.isAlive) {
            $(`#announcer`).text(`HORATIO HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(boredom);
        } else if (horatio.isAlive === false) {
            clearInterval(boredom);
        }
    }, 1000);
    const sleepiness = setInterval(function (){
        horatio.sleepLvl ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        if (horatio.sleepLvl === 600 && horatio.isAlive) {
            $(`#announcer`).text(`HORATIO HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(sleepiness);
        } else if (horatio.isAlive === false) {
            clearInterval(sleepiness);
        }
    }, 3000);
    gameBoard();
    
};


// variable to store the interval that makes horatio move

let hoInt;
// make the gameboard
const gameBoard = () => {
    //make a div for the buttons
    const $buttonDiv = $(`<div id="buttons-wrapper"></div>`).appendTo(`#the-egg-div`);
    //make the buttons
    const $hungerButton = $(`<button id="hungerButton" class="button">Feed It!</button><br>`).appendTo(`#buttons-wrapper`);
    const $boredomButton = $(`<button id="boredomButton" class="button">Play with It!</button><br>`).appendTo(`#buttons-wrapper`);
    const $sleepButton = $(`<button id="sleepButton" class="button">Time for a nap!</button><br>`).appendTo(`#buttons-wrapper`);
    //removes the egg image
    $(`img#the-egg`).remove();
    $(`#the-egg-div`).append(horatio.$babyHoratio);
    hoInt = horatioTimerStart();
}
// animation for horatio moving
function paceHoratio() {
    console.log(`currently pacing`);
    // make him pace back and forth
    const ranNumR = Math.round(Math.random() * 1250);
    const ranNumT = Math.round(Math.random() * 200)+ 100;
    console.log(`coords x: ${ranNumR} y: ${ranNumT}`);
    $(`img#baby-horatio`).animate({
        right: ranNumR,
        top: ranNumT,
    }, 9000);
};

function horatioTimerStart() {
    console.log(`running horatioTimerStart`);
    i = setInterval(paceHoratio, 10000);
    return i;
};


const giveFood = () => {
    const $meal = $(`<img id="food" src=./images/food-symbol.png>`);
    ranNumRight = Math.round(Math.random() * 600) + 200;
    ranNumTop = Math.round(Math.random() * 200) + 50;
    console.log(`made the image at top: ${ranNumTop} and right: ${ranNumRight}`);
    // append the food and give it a random spot
    $(`#wrapper`).append($meal)
    $(`img#food`).animate({
            "right": ranNumRight,
            "top": ranNumTop,
            "opacity": 1
    }, 0);
    console.log(`clearing interval`);
    clearInterval(hoInt);
    console.log(`starting foodInterval to ${ranNumTop} and ${ranNumRight}`);
    foodInterval(ranNumTop, ranNumRight);
};

const foodInterval = (ranNum1, ranNum2) => {
    console.log(`food interval executed to ${ranNum1} and ${ranNum2}`)
    $(`img#baby-horatio`).animate({
        top: ranNum1-=90,
        right: ranNum2-=50,
    }, {
        duration: 5000,
        complete: function () {
            horatio.sleepLvl = horatio.sleepLvl - 5;
            $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
            clearFood();
        }
        }
        );
};
const clearFood = () => {
    console.log(`clearing food`)
    $(`img#food`).detach();
    resetPace();
};
const resetPace = () => {
    console.log(`reseting the paceInterval`)
    hoInt = horatioTimerStart();
};

$(`#wrapper`).on('click', function(e) {
    if (e.target.tagName === 'BUTTON'){
        const $thisButton = $(e.target)[0];
        //Check the type of button
        if ($($thisButton).attr(`id`) === 'hungerButton') {
           console.log(`You have clicked the hunger button`)
           horatio.feed();
            
        }else if($($thisButton).attr(`id`) === `sleepButton`) {
            console.log(`You have clicked the sleep button`);
            horatio.sleep();
        }else if($($thisButton).attr(`id`) === `boredomButton`) {
            console.log(`You have clicked the play button`);
            horatio.play();
        }
        
    }

});
$(`img#the-egg`).on('click', game);