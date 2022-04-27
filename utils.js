import {bombs,generateField,opened} from './config.js'

// Stats
export var _status = true;
var fields = [];
var _opened = 0;
var _bombs = 0;

// Functions
export const initiate = (level) => {
    fields = generateField(level);
    _bombs =  bombs();
    return fields;
}

function Reveal(x,y){
    fields[x][y].open = true;
    _opened = opened();
}

function CheckAround(x,y){
    let nears = [
        [ x-1 , y],
        [ x , y-1],
        [ x-1 , y-1],
        [ x+1 , y],
        [ x , y+1],
        [ x+1 , y+1],
        [ x-1 , y+1],
        [ x+1 , y-1],
    ];
    // Filter near cells that might be out of box
    nears = nears.filter((n) => n[0] !== -1 && n[0] !== fields.length && n[1] !== fields.length && n[1] !== -1 );
    
    let mines = nears.filter((n) => fields[n[0]][n[1]].mine);
    
    return {
        nears: mines.length ? mines : nears,
        alert: mines.length && true};
    }

    export const  Open = (x,y) => {
    var cards = document.querySelectorAll('#card');
    const width = Math.sqrt(cards.length);

    cards[width*x+y].style.background = 'white';
    
    if(fields[x][y].mine){
        // Lose Case
        cards[width*x+y].innerHTML = `<span id='count' >-_-</span>`;
        let over = document.querySelector('#over');
        over.style.display = 'block';
        _status = false;
        return;
    }
    
    if(_opened+_bombs+1 === Math.pow(width,2)){
        // Win Case
        console.log('Congrats!');
        let win = document.querySelector('#win');
        win.style.display = 'block';
    }

    Reveal(x,y);
    
    let result =  CheckAround(x,y);
    
    if(result.nears.length && result.alert){
        
        let _cardIndex = width*x+y;
        cards[_cardIndex].style.background = 'white';
        cards[_cardIndex].innerHTML = `<span id='count' >${result.nears.length}</span>`;
        
    }else{
        
        for (let index = 0; index < result.nears.length; index++) {
            const near = result.nears[index];  
            if(!fields[near[0]][near[1]].open){
                cards[width*near[0]+near[1]].style.background = 'white';
                Open(near[0], near[1]);
            } 
        }
        
   }
};