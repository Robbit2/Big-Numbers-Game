/*
    vars and lets are lowercase with underscores
    functions are lowercase with capitalizedSecondaryWords
    consts are CAPITALIZED
*/
const LS = localStorage;
const VERSION = "0.0.1-alpha";

class GAME {
    constructor(){
        this.number = 0;
        this.big_number = 0;
        this.TPS = 20;
    }
}

const save = (game) => {
    LS.gameSave = JSON.stringify(game);
};

const load = (game) => {
    if(LS){
        if(LS.gameSave !== null && LS.gameSave !== "undefined"){
            console.log(LS.gameSave);
            let gameSave = JSON.parse(LS.gameSave);
            for(let item in game){
                if(gameSave[item] == null){
                    gameSave[item] = game[item];
                }
            }
            game = gameSave;
        }
    }
    return game;
};

var Game = new GAME();

var gameLoop;

function tryload(){
    try{
        Game = load(Game);
    }
    catch{
        console.error("Load failed");
    }
    gameLoop = accurateTimer(() => {
        document.title = Game.number;
        save(Game);
    },1000/Game.TPS);
}

const prestige = () => {
    if(Game.number > 0){
        Game.number = 0;
        Game.big_number++;
    }
};