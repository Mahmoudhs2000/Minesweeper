var _bombs = 0;
var _opened = 0;

// Helpers
export const opened = ()=> {
    _opened++;
    return _opened;
}
export const bombs = ()=> {
    return _bombs;
}

// Main
export const generateField = (level) => {
    var fields = [];
    var cells = 0; // Width * Height
    switch (level) {
        case 1:
            // Level One: 5x5 (25 Cells / 4 bombs);
            _bombs = 4;
            cells = 25;
            var _bombsInx = Array(_bombs).fill().map(() => Math.round(Math.random()*cells));            ;
            for (let i = 0; i < Math.sqrt(cells); i++) {
                fields.push([]);
                for (let j = 0; j < Math.sqrt(cells); j++) {
                    let _id = Math.sqrt(cells)*i+j;
                    fields[i][j] = {id: _id,open: false, mine: _bombsInx.includes(_id)};
                }
            }
            break;
        case 2:
            // Level One: 10x10 (100 Cells / 20 bombs);
            _bombs = 20;
            cells = 100;
            var _bombsInx = Array(_bombs).fill().map(() => Math.round(Math.random()*cells));            ;
            for (let i = 0; i < Math.sqrt(cells); i++) {
                fields.push([]);
                for (let j = 0; j < Math.sqrt(cells); j++) {
                    let _id = Math.sqrt(cells)*i+j;
                    fields[i][j] = {id: _id,open: false, mine: _bombsInx.includes(_id)};
                }
            }
            break;
        case 3:
            // Level One: 20x20 (400 Cells / 40 bombs);
            _bombs = 40;
            cells = 400;
            var _bombsInx = Array(_bombs).fill().map(() => Math.round(Math.random()*cells));            ;
            for (let i = 0; i < Math.sqrt(cells); i++) {
                fields.push([]);
                for (let j = 0; j < Math.sqrt(cells); j++) {
                    let _id = Math.sqrt(cells)*i+j;
                    fields[i][j] = {id: _id,open: false, mine: _bombsInx.includes(_id)};
                }
            }
            break;
    
        default:
            break;
    }
    return fields;
}