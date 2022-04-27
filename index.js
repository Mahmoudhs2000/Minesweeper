import {_status,Open,initiate} from './utils.js';

console.log('Here We Go !');
window.onload = () => {
    // Fetcing data
    var fields = initiate(1);
    var grid = document.querySelector('#grid');
    var buttons = document.querySelectorAll('#levels span');
    
    function render(){
        grid.innerHTML = ``;
        for (let i = 0; i < Math.pow(fields.length,2); i++) {
            grid.innerHTML += `<div id="card"></div>`
        }
        
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
    
    render();
    
    // Click Listeners
    buttons.forEach(btn => {
            btn.addEventListener('click', function(){
                buttons.forEach(bt => {
                    bt.classList.remove('selected')
                });
                let _level = parseInt(btn.dataset.level);
                fields = initiate(_level);
                grid.classList.remove(...grid.classList);
                grid.classList.add(`grid${_level}`)
                btn.classList.add('selected');
                render();
            })

    });
}