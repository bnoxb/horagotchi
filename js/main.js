
const horatio = {
    name:   `Horatio`,
    hungerLvl:      0,
    sleepLvl:       0,
    boredomLvl:     0,
    isAlive:     true,
    age:            0,
    //some jquery variables for the gifs
    $babyHoratio: $(`<img id="baby-horatio" src="images/baby-horatio.gif">`),
    
    // method for feeding
    feed() {
        if (this.isAlive && this.hungerLvl >= 5) {
            $(`#announcer`).text(`JUST FED ${horatio.name}`);
            giveFood();
            // this.hungerLvl = this.hungerLvl - 5;
            // $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        } else if(this.isAlive && this.hungerLvl <= 5){
            $(`#announcer`).text(`${horatio.name} isn't hungry right now.`);
        } else {
            $(`#announcer`).text(`${horatio.name} IS DEAD YOU IDIOT`);
            death();
        }
    },
    // method for making sleep 
    sleep() {
        if (this.isAlive && this.sleepLvl >= 5) {
            $(`#announcer`).text(`JUST PUT ${horatio.name} TO SLEEP`);
            
        } else if (this.isAlive && this.sleepLvl <= 5) {
            $(`#announcer`).text(`${horatio.name} isn't tired right now`);
        } else {
            $(`#announcer`).text(`${horatio.name} IS DEAD YOU IDIOT`);
        }
    },
    // method for play
    play() {
        if (this.isAlive && this.boredomLvl >= 5) {
            $(`#announcer`).text(`JUST PLAYED WITH ${horatio.name}`);
            this.boredomLvl = this.boredomLvl - 5;
            $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        } else if (this.isAlive && this.boredomLvl <= 5){
            $(`#announcer`).text(`${horatio.name} doesn't want to play right now`);
        }
        else {
            $(`#announcer`).text(`${horatio.name} IS DEAD YOU IDIOT`);
        }
    }
};

const game = () => {
    const hunger = setInterval(function (){
        horatio.hungerLvl ++;
        horatio.age ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl} |Age: ${horatio.age}`);
        if (horatio.hungerLvl === 600 && horatio.isAlive) {
            $(`#announcer`).text(`${horatio.name} HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(hunger);
            death();
        } else if (horatio.isAlive === false) {
            clearInterval(hunger);
        }
    }, 1000);
    const boredom = setInterval(function (){
        horatio.boredomLvl ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl} |Age: ${horatio.age}`);
        if (horatio.boredomLvl === 600 && horatio.isAlive) {
            $(`#announcer`).text(`${horatio.name} HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(boredom);
            death();
        } else if (horatio.isAlive === false) {
            clearInterval(boredom);
        }
    }, 1000);
    const sleepiness = setInterval(function (){
        horatio.sleepLvl ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl} |Age: ${horatio.age}`);
        if (horatio.sleepLvl === 600 && horatio.isAlive) {
            $(`#announcer`).text(`${horatio.name} HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(sleepiness);
            death();
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
    // make him pace back and forth
    const ranNumR = Math.round(Math.random() * 1250);
    const ranNumT = Math.round(Math.random() * 200)+ 100;
    $(`img#baby-horatio`).animate({
        right: ranNumR,
        top: ranNumT,
    }, 9000);
};

function horatioTimerStart() {
    i = setInterval(paceHoratio, 10000);
    return i;
};

const giveFood = () => {
    const $meal = $(`<img id="food" src=./images/food-symbol.png>`);
    ranNumRight = Math.round(Math.random() * 600) + 200;
    ranNumTop = Math.round(Math.random() * 200) + 50;
    // append the food and give it a random spot
    $(`#wrapper`).append($meal)
    $(`img#food`).animate({
            "right": ranNumRight,
            "top": ranNumTop,
            "opacity": 1
    }, 0);
    clearInterval(hoInt);
    foodInterval(ranNumTop, ranNumRight);
};

const foodInterval = (ranNum1, ranNum2) => {
    $(`img#baby-horatio`).stop();
    $(`img#baby-horatio`).animate({
        top: ranNum1-=90,
        right: ranNum2-=50,
    }, {
        duration: 5000,
        complete: function () {
            horatio.hungerLvl = horatio.hungerLvl - 5;
            $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl} |Age: ${horatio.age}`);
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
    if (horatio.isAlive) {
        hoInt = horatioTimerStart();
    }
};

const death = () => {
    $(`img#baby-horatio`).attr(`src`, `images/horatio-baby-dead01.png`);
    console.log(`killing horatio`);
    clearInterval(hoInt);
    $(`img#baby-horatio`).stop();
}

const giveName = () => {
    $(`#announcer`).text(``);
    horatio.name = prompt(`Give your Horatio a name!`, `Horatio`);
    game();
}

$(`#wrapper`).on('click', function(e) {
    if (e.target.tagName === 'BUTTON'){
        const $thisButton = $(e.target)[0];
        //Check the type of button
        if ($($thisButton).attr(`id`) === 'hungerButton') {
           horatio.feed();
        }else if($($thisButton).attr(`id`) === `sleepButton`) {
            horatio.sleep();
        }else if($($thisButton).attr(`id`) === `boredomButton`) {
            horatio.play();
        }   
    }
});
$(`img#the-egg`).on('click', giveName);