import {insertElement, insertElementWriteProtect} from './modify-dom.js';

export class Puzzle {
    /* The Engine that makes the Sudoku puzzle 
        and methods around manipulating it 
     */
    constructor(){
        this.puzzle = [];
        this.order = [];
        this.size = 81;
    }

    getRandomOrder(){
        /* Returns an array 1-9 in random order for puzzle gen */
        var valueSet = new Set()
        while (valueSet.size < 9){
            valueSet.add(Math.floor(Math.random() * (10 - 1) + 1));
        }
        this.order = Array.from(valueSet);
    }

    getMod(val){
        /* Returns the %3 of val */
        return val % 3;
    }

    getSection(val){
        /* Returns what 3*3 section the value would be in */
        return (Math.ceil(val/3))-1;
    }

    indextoRow(cellIndex){
        /* Takes the cell index value and returns row index
        arg:
            cellIndex: the cell id
        returns: index of row to insert value
        */
       return Math.floor(cellIndex/9);
    }

    indextoCol(cellIndex){
        /* Takes the cell index and returns col index
        arg:
            cellIndex: the cell id
        returns: index of col to insert value
        */
       return cellIndex%9;
    }

    insertValueCheck(x,y){
        /* this checks if a value is actually being inserted or just modified
        arg:
            x: x index
            y: y index
        returns: boolean, true if no current number in cell
        */
        if (typeof(this.puzzle[y][x]) == 'number'){
            return false;
        }
        return true;
    }

    removeValueCheck(value){
        /* this checks whats inserting into puzzle if bool
            means blank returns true
        */
        if (typeof(value) == 'boolean'){
            return true;
        }
        return false;
    }

    updateBoard(cellIndex,value){
        /* Updates a Cell in the puzzle obj
        args:
            cellIndex: the cell id 
            value: the value in cell

        checks if there is a value there and updates size of puzzle accordingly 
        */
        var x = this.indextoCol(cellIndex);
        var y = this.indextoRow(cellIndex);
        if (this.insertValueCheck(x,y) && typeof(value) == 'number'){
            this.size--;
        }else if (this.removeValueCheck(value) && !this.insertValueCheck(x,y)){
            this.size++;
        }
        this.puzzle[y][x] = value;
        console.log(this.size);
        if(this.size == 0){
            alert('Board is full')
        }
    }

    createRow(){
        /* Adds the Current this.order to puzzle */
        this.puzzle.push(this.order);
        this.size -= this.order.length;
    }

    shuffleOrder(int){
        /* re-indexes this.order 
        Arg:
            int: How far each value should be offset
        */
        var count = int;
        var tempArr = this.order.slice();
        while (count > 0){
            tempArr.push(tempArr.shift());
            count--;
        }
        this.order = tempArr;
    }

    findShuffle(){
        /* Finds section and Columns to Swaps */
       this.getRandomOrder();
       var section = this.getSection(this.order[6]);
       var c1_index = this.getMod(this.order[0]);
       var c2_index = this.getMod(this.order[1]);
       if (c1_index == c2_index){
           if (c1_index == 2){
               c2_index--;
           } else{
                c2_index ++;
           }
       }
       c1_index += section*3;
       c2_index += section*3;
       this.split1 = c1_index;
       this.split2 = c2_index;
    }

    shuffleRow(){
        /* Swaps 2 random rows in the same 3*3 section */
        this.findShuffle();
        [this.puzzle[this.split1], this.puzzle[this.split2]] = [this.puzzle[this.split2], this.puzzle[this.split1]];
    }

    shuffleCol(){
        /* Swaps 2 random cols in the same 3*3 section */
        this.findShuffle();
        for (var row of this.puzzle){
            [row[this.split1], row[this.split2]] = [row[this.split2], row[this.split1]];
        }
    }

    randomNum(){
        /* Makes a random num between 0-8*/
        return Math.floor(Math.random() * (9 - 0) + 0);
    }

    randomXY(){
        /* Returns a random X Y coord between 0-8
        */
       var x = this.randomNum();
       var y = this.randomNum();
       return [x,y]
    }

    remove(remove){
        /* Replaces Values from the puzzle with false
        Arg:
            remove: the number of cells to replace
        */
       console.log(this.size);
        while (remove > 0){
            var randIndex = this.randomXY();
            var x = randIndex[0];
            var y = randIndex[1];
            if (!this.insertValueCheck(x,y)){
                this.size++;
            }
            this.puzzle[y][x] = false;
            remove--;
        }
        console.log('Free Squares '+this.size);
    }

    buildPuzzle(){
        /* Builds the full puzzle 
            adds a row, shuffles values
                adds next row etc.
        */
        this.getRandomOrder();
        var rows = 9;
        while (rows > 0){
            this.createRow();
            var offset = this.getMod(rows);
            var shuffle = 3;
            if (offset == 1){
                shuffle = 2;
            }
            this.shuffleOrder(shuffle);
            rows--;
        }
    }

    writePuzzle(){
        /* Write the current puzzle to the board and make cells with values read only */
        var cellId = 0;
        for (var row of this.puzzle){
            for (var cell of row){
                if (typeof(cell) == 'boolean'){
                    insertElement(cellId,'');
                }else{
                    insertElementWriteProtect(cellId,cell);
                }
                cellId++;
            }
        }
    }

    run(){
        this.buildPuzzle();
        var shuffles = 10
        while (shuffles > 0){
            this.shuffleCol();
            this.shuffleRow();
            shuffles--;
        }
        this.remove(30);
    }
}
