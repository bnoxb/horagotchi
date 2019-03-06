class Horatio {
    constructor(name) {
        this.name =         name;
        this.hungerLvl =    0;
        this.sleepLvl =     0;
        this.boredomLvl =   0;
        this.isAlive =      true;
        this.age =          0;
        this.$babyHoratio=  $(`<img id="baby-horatio" src="images/baby-horatio.gif">`);
        this.form =         `Baby`;
    }
    feed() {
        if (this.isAlive && this.hungerLvl >= 5) {
            $(`#announcer`).text(`You just fed ${horatio.name}`);
            giveFood();
        } else if(this.isAlive && this.hungerLvl <= 5){
            $(`#announcer`).text(`${horatio.name} isn't hungry right now.`);
        } else {
            $(`#announcer`).text(`${horatio.name} is food for the bugs!`);
        }
    }
    sleep() {
        if (this.isAlive && this.sleepLvl >= 5) {
            $(`#announcer`).text(`JUST PUT ${horatio.name} TO SLEEP`);
            makeSleep();
            
        } else if (this.isAlive && this.sleepLvl <= 5) {
            $(`#announcer`).text(`${horatio.name} isn't tired right now`);
        } else {
            $(`#announcer`).text(`${horatio.name} is dead you idiot!`);
        }
    }
    play() {
        if (this.isAlive && this.boredomLvl >= 5) {
            $(`#announcer`).text(`You just played with ${horatio.name}`);
            this.boredomLvl = 0;
            setTimeout(function () {
                $(`#announcer`).text(``);
            }, 3000);
        } else if (this.isAlive && this.boredomLvl <= 5){
            $(`#announcer`).text(`${horatio.name} doesn't want to play right now`);
        }
        else {
            $(`#announcer`).text(`${horatio.name} is dead!`);
        }
    }
}
// variable to store intervals
let hoInt;
let slpInt;
let hunInt;
let borInt;
let aInt;
// variable to instantiate horatio
let horatio;

// Velocity Registration
const flyInVelocity = () => {
   $.Velocity.RegisterEffect(`transition.flyIn`, {
    defaultDuration: 700,
    calls:[
      [{
           right: ranNumRight,
           top: ranNumTop,
           opacity: 1,
      }]  
    ],  
}); 
} 
$.Velocity.RegisterEffect(`transition.spinIn`, {
    defaultDuration: 500,
    calls:[
        [ {rotateY: 180}, .15],
        [ {rotateY: -180}, .25],
        [ {rotateY: 90}, .4],
        [ {rotateY: 0}, .2]
    ],
    reset: {rotateY: 0, rotateX: 0}
});

const startGame = () => {
    hunInt = setInterval(hungerInt, 1500);
    borInt = setInterval(boredomInt, 1000);
    slpInt = setInterval(sleepinessInt, 2000);
    aInt = setInterval(ageInt, 30000);
    gameBoard();
};

const hungerInt = () => {
        horatio.hungerLvl ++;
        render();
        if (horatio.hungerLvl >= 100 && horatio.isAlive) {
            $(`#announcer`).text(`${horatio.name} HAS FALLEN`);
            horatio.isAlive = false;
            clearLifeIntervals();
            death();
        } else if (horatio.isAlive === false) {
            clearLifeIntervals();
        }
};

const boredomInt = () => {
        horatio.boredomLvl ++;
        render();
        if (horatio.boredomLvl >= 100 && horatio.isAlive) {
            $(`#announcer`).text(`${horatio.name} HAS FALLEN`);
            horatio.isAlive = false;
            clearLifeIntervals();
            death();
        } else if (horatio.isAlive === false) {
            clearLifeIntervals();
        }
};

const sleepinessInt = () => {
        horatio.sleepLvl ++;
        render();
        if (horatio.sleepLvl >= 100 && horatio.isAlive) {
            $(`#announcer`).text(`${horatio.name} HAS FALLEN`);
            horatio.isAlive = false;
            clearLifeIntervals();
            death();
        } else if (horatio.isAlive === false) {
            clearLifeIntervals();
        }
};

const ageInt = () => {
        horatio.age++;
        render();
        if (horatio.age === 5 && horatio.isAlive) {
            $(`#announcer`).text(`Horatio is about to evolve!!!`).velocity(`transition.swoopIn`, {
                duration: 500,
                complete: () => {
                   evolve();
                }
            });
            clearLifeIntervals(); 
        }else if (horatio.isAlive === false) {
            clearLifeIntervals();
        }
};

const clearLifeIntervals = () => {
    clearInterval(hunInt);
    clearInterval(slpInt);
    clearInterval(borInt);
    clearInterval(aInt);
    clearInterval(hoInt);
    $(`img#baby-horatio`).stop(true);
};
// make the gameboard
const gameBoard = () => {
    //make the buttons
    $(`<div id="hungerButton" class="button col-sm">Feed It</div>`).appendTo(`#buttons-wrapper`);
    $(`<div id="boredomButton" class="button col-sm">Play with It</div>`).appendTo(`#buttons-wrapper`);
    $(`<div id="sleepButton" class="button col-sm">Turn off the lights</div>`).appendTo(`#buttons-wrapper`);
    $(` <div class="col-6"><span id="announcer"></span></div>`).appendTo(`#game-board`);
    $(`<div class="col-sm"><div class="progress" style="height: 50px;"><div class="progress-bar progress-bar-green hunger-bar bars" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Hunger Level</div></div></div>
        <div class="col-sm"><div class="progress" style="height: 50px;"><div class="progress-bar progress-bar-orange boredom-bar bars" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Boredom</div></div></div>    
        <div class="col-sm"><div class="progress" style="height: 50px;"><div class="progress-bar progress-bar-purple sleep-bar bars" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Tiredness</div></div></div>`
        ).appendTo(`#progress-bar-wrapper`);
    // makes the baby horatio
    $(`#the-egg-div`).append(horatio.$babyHoratio);
    $(`#heading`).css({
        background: 'rgba(1, 102, 10, .75)',
        color: 'black'
    });
    $(`.smaller-heading`).css({
        background: `rgba(1, 102, 10, .75)`,
        color: 'black'
    });
    render();
    // initializes the pacing interval
    hoInt = horatioTimerStart();
};

//render function
const render = () => {
    // update the headings
    $(`#current-form`).text(`Current Form: ${horatio.form}`);
    $(`#heading`).text(horatio.name);
    $(`#age`).text(`Age: ${horatio.age}`);
    $(`div.hunger-bar`).css(`width`, horatio.hungerLvl+ "%").attr(`aria-valuenow`, horatio.hungerLvl);
    $(`div.boredom-bar`).css(`width`, horatio.boredomLvl+ "%").attr(`aria-valuenow`, horatio.boredomLvl);
    $(`div.sleep-bar`).css(`width`, horatio.sleepLvl+ "%").attr(`aria-valuenow`, horatio.sleepLvl);
};
// animation for horatio moving
function paceHoratio() {
    // make him pace back and forth
    const ranNumR = Math.round(Math.random() * 800);
    const ranNumT = Math.round(Math.random() * 125)+ 275;
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
    ranNumRight = Math.round(Math.random() * 400) + 250;
    ranNumTop = Math.round(Math.random() * 100) + 390;
    // append the food and give it a random spot
    $(`#wrapper`).append($meal)
    flyInVelocity();
    $(`img#food`).velocity('transition.flyIn').velocity(`transition.spinIn`);
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
            horatio.hungerLvl = 0;
            $(`#announcer`).text(``);
            render();
            clearFood();
            }
        }
    );
};

const clearFood = () => {
    console.log(`clearing food`)
    $(`img#food`).velocity(`transition.slideUpOut`, {
        duration: 300,
        complete: function () {
        $(`img#food`).detach();
        console.log(`resetting pace...`);
        resetPace();    
        }
    });
    
};

const makeSleep = () => {
    clearInterval(hoInt);
    $(`img#baby-horatio`).stop();
    $(`img#baby-horatio`).attr(`src`, `./images/horatio-baby-sleep.gif`);
    setTimeout(function (){
        $(`img#baby-horatio`).attr(`src`, `./images/baby-horatio.gif`);
        horatio.sleepLvl = 0;
        $(`#announcer`).text(``);
        render();
        console.log(`resetting pace...`);
        resetPace();
    }, 5000);
};

const resetPace = () => {
    console.log(`reseting the paceInterval`)
    if (horatio.isAlive) {
        hoInt = horatioTimerStart();
    }
};

const death = () => {
    $(`img#baby-horatio`).velocity(`callout.pulse`, {
        duration: 500,
        complete: function () {
            $(this).attr(`src`, `images/horatio-baby-dead01.png`);
        }
    })
    clearInterval(hoInt);
    $(`img#baby-horatio`).stop();
};

const breakEgg = () => {
    $(`img#the-egg`).attr(`src`, `images/egg-break.gif`);
    setTimeout(removeEgg, 750);
}
const removeEgg = () => {
    $(`img#the-egg`).velocity(`callout.pulse`);
    $(`img#the-egg`).remove();
    startGame();
}
const giveName = () => {
    horatio = new Horatio(prompt(`Give your Horatio a name!`, `Horatio Prime`));
    $(`#announcer`).text(``);
    breakEgg();
};

const evolve = () => {
    $(`img#baby-horatio`).attr({
       src: './images/horatio-old-01.png'
    }
    ).velocity({
        width: 600
    },
    {
        duration: 1000,
        delay: 20
    }) 
};

$(`#wrapper`).on('click', function(e) {
    if (e.target.tagName === 'DIV'){
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