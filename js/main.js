console.log('window up and running');

const horatio = {
    name:   `Horatio`,
    hungerLvl:      0,
    sleepLvl:       0,
    boredomLvl:     0,
    isAlive:     true,
    //some jquery variables for the gifs
    $babyHoratio: $(`<img id="baby-horatio" src="https://media.giphy.com/media/xPGkOAdiIO3Is/giphy.gif">`),
    $deadHoratio: $(`<img id="dead-horatio" src=#>`),
    // method for feeding
    feed() {
        if (this.isAlive && this.hungerLvl >= 5) {
            $(`#announcer`).text(`JUST FED HORATIO`);
            this.hungerLvl = this.hungerLvl - 5;
            $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
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
            this.sleepLvl = this.sleepLvl - 5;
            $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
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
        if (horatio.hungerLvl === 30 && horatio.isAlive) {
            $(`#announcer`).text(`HORATIO HAS FALLEN`);
            horatio.isAlive = false;
            clearInterval(hunger);
        } else if (horatio.isAlive === false) {
            clearInterval(hunger);
        }
    }, 2000);
    const boredom = setInterval(function (){
        horatio.boredomLvl ++;
        $(`#scoreBoard`).text(`Hunger:${horatio.hungerLvl} |Boredom:${horatio.boredomLvl} |Sleepiness:${horatio.sleepLvl}`);
        if (horatio.boredomLvl === 30 && horatio.isAlive) {
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
        if (horatio.sleepLvl === 45 && horatio.isAlive) {
            $(`#announcer`).text(`HORATIO HAS FALLEN`);
            horatio.isAlive = false;
            $(`img#baby-horatio`).remove();
            clearInterval(sleepiness);
        } else if (horatio.isAlive === false) {
            clearInterval(sleepiness);
        }
    }, 3000);
    gameBoard();
    
}

// make the gameboard
const gameBoard = () => {
    //make a div for the buttons
    const $buttonDiv = $(`<div id="buttons-wrapper" class="button"></div>`).appendTo(`#the-egg-div`);
    //make the buttons
    const $hungerButton = $(`<button id="hungerButton">Feed It!</button>`).appendTo(`#buttons-wrapper`);
    const $boredomButton = $(`<button id="boredomButton" class="button">Play with It!</button>`).appendTo(`#buttons-wrapper`);
    const $sleepButton = $(`<button id="sleepButton" class="button">Time for a nap!</button>`).appendTo(`#buttons-wrapper`);
    //const $babyHoratio = $(`<img id="baby-horatio" src="https://media.giphy.com/media/xPGkOAdiIO3Is/giphy.gif">`)
    //removes the egg image
    $(`img#the-egg`).remove();
    $(`#the-egg-div`).append(horatio.$babyHoratio);

}


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