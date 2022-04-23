console.log('Here We Go !');
window.onload = () => {
    // Static Data
    var _status = true;
    var fields = [
        [{id: 0,open: false, mine: false},{id: 1,open: false, mine: true},{id: 2,open: false, mine: false},{id: 3,open: false, mine: true},{id: 4,open: false, mine: false}],
        [{id: 5,open: false, mine: true},{id: 6,open: false, mine: true},{id: 7,open: false, mine: false},{id: 8,open: false, mine: false},{id: 9,open: false, mine: false}],
        [{id: 10,open: false, mine: true},{id: 11,open: false, mine: false},{id: 12,open: false, mine: false},{id: 13,open: false, mine: false},{id: 14,open: false, mine: false}],
        [{id: 15,open: false, mine: false},{id: 16,open: false, mine: true},{id: 17,open: false, mine: false},{id: 18,open: false, mine: false},{id: 19,open: false, mine: false}],
        [{id: 20,open: false, mine: false},{id: 21,open: false, mine: false},{id: 22,open: false, mine: false},{id: 23,open: false, mine: false},{id: 24,open: false, mine: false}],
    ];
    var bombs = 6;
    var opened = 0;

    // Functions
    function Reveal(x,y){
        fields[x][y].open = true;
        opened++;
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
        nears = nears.filter((n) => n[0] !== -1 && n[0] !== 5 && n[1] !== 5 && n[1] !== -1 );

        let mines = nears.filter((n) => fields[n[0]][n[1]].mine);

        return {
            nears: mines.length ? mines : nears,
            alert: mines.length && true};
    }

    function Open(x,y){

        cards[5*x+y].style.background = 'white';

        if(fields[x][y].mine){
            cards[5*x+y].innerHTML = `<span id='count' >-_-</span>`;
            let over = document.querySelector('#over');
            over.style.display = 'block';
            _status = false;
            return;
        }

        if(opened+bombs+1 === 25){
            console.log('Winner');
            let win = document.querySelector('#win');
            win.style.display = 'block';
        }

        Reveal(x,y);
        
        let result =  CheckAround(x,y);
        
        if(result.nears.length && result.alert){
            
            let _cardIndex = 5*x+y;
            cards[_cardIndex].style.background = 'white';
            cards[_cardIndex].innerHTML = `<span id='count' >${result.nears.length}</span>`;
            
        }else{
            
            for (let index = 0; index < result.nears.length; index++) {
                const near = result.nears[index];  
                if(!fields[near[0]][near[1]].open){
                    cards[5*near[0]+near[1]].style.background = 'white';
                    Open(near[0], near[1]);
                } 
            }
            
       }
    };

    // Click Listener
    var cards = document.querySelectorAll('#card');

    cards.forEach((card, i) => {
        card.addEventListener('click', function(){
            let row = fields.find((f) => f.find((ff)=> ff.id === i));
            let targetCell = row.find((r)=> r.id === i);
            let _rowIndex = fields.indexOf(row);
            let _colIndex = row.indexOf(targetCell);
            // Measure Click/Search Time
            console.time('Search Time');
            _status && Open(_rowIndex,_colIndex);
            console.timeEnd('Search Time');
        })
    });
}