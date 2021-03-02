import {Puzzle} from './puzzle.js';
import {insertElementColor} from './modify-dom.js';

export class Solver{

    constructor(){
        ;
    }

    addPuzzle(puzzle){
        /* Import an instance of puzzle class */
        this.pzzleClass = puzzle;
        this.puzzle = this.pzzleClass.puzzle;
    }

    isSolved(){
        /* Determines if puzzle is solved correctly based on sudoku rules
        returns: bool 
        */
        if (this.pzzleClass.size > 0){
            console.log('Not all Spaces filled')
            return false;
        }
        // iterate all rows/cols and check if all unique values
        for (var ind=0; ind < 9; ind++){
            var rowSet = this.convertSet(this.pzzleClass.returnRow(ind));
            var colSet = this.convertSet(this.pzzleClass.returnCol(ind));
            if (rowSet.size !== 9 || colSet.size !== 9){
                alert('Non unique values in row or col ' + ind);
                return false
            }
        }
        // Check the 3*3 cube for all unique values
        for (var x=0; x < 9;x+=3){
            for (var y=0; y < 9;y+=3){
                var cubeSet = this.convertSet(this.pzzleClass.returnCube(x,y));
                if (cubeSet.size !== 9){
                    alert('Non unique values in cube '+x+1+' '+y+1);
                    return false;
                }
            }
        }
        alert('Puzzle is solved');
        return true;
    }

    run(){
        // console.log(this.puzzle);
        // console.log(this.pzzleClass.size);
        this.backStepSolve();
    }

    convertSet(arr){
        /* Takes an array and returns it as a set only adds numbers not bool */
        var retSet = new Set();
        for (var i of arr){
            if (typeof(i) == 'number'){
                retSet.add(i);
            }
        }
        return retSet
    }

    backStepSolve(){
        /* Uses recursion to solve the puzzle
        */
        this.pzzleClass.getRandomOrder()
        var solveOrder = this.pzzleClass.order; 
        // this.addPuzzle(puzzleCopy); // add to class for easier access
        var startIndex = 0;
        var valueCount = 0;
        var solved = 0;
        this.loopdelay = 0; // used for delaying writing value to dom
        /// performance metrics 
        var start = performance.now();
        this.calls = 0
        if (this.recursiveCall(startIndex,solveOrder,solved,valueCount)){
            ;
        }else{
            alert('Un-solvable');
        }
        console.log((performance.now()-start)+' millisecond runtime to solve \n Recursive calls:' + this.calls);
    }

    recursiveCall(row,solveOrder,solved,valueCount){
        /*
        args:
            row: row index to start
            solveOrder: order to search values
            solved: count of nums fully placed
            valueCount: count of specific num placed
        */
        // if value fully inserted move to next value in solve order
        if (valueCount == 9){
            valueCount = 0;
            solved ++;
            row = 0;
        }
        // base case no values to solve for
        if (solveOrder.length == solved){
            return true;
        }
        var val = solveOrder[solved] // the search value
        this.calls += 1;
        // row Loop
        for (var rowInd=row;rowInd<9;rowInd++){
            // can place in row
            if (this.canPlaceRow(rowInd,val)){
                // col loop 
                for (var colInd=0;colInd<9;colInd++){
                    // can place cell
                    if (this.canPlaceCell(rowInd,colInd)){
                        // can place col
                        if (this.canPlaceCol(colInd,val)){
                            //can place cube
                            if(this.canPlaceCube(rowInd,colInd,val)){
                                /// place value
                                this.pzzleClass.recUpdateBoard(colInd,rowInd,val);
                                valueCount++;
                                // purely for visual joy
                                var cellId = rowInd*9+colInd;
                                this.loopdelay++;
                                this.sleep(250*this.loopdelay).then(() => { insertElementColor(cellId,val,true); });
                                // call for next row
                                if (this.recursiveCall(rowInd+1,solveOrder,solved,valueCount)){
                                    return true;
                                }else{
                                    //backtrack
                                    valueCount--;
                                    // unplace value
                                    this.pzzleClass.recUpdateBoard(colInd,rowInd,false);
                                    // purely for visual joy
                                    this.loopdelay ++;
                                    this.sleep(250*this.loopdelay).then(() => { insertElementColor(cellId,'',false); });
                                }
                            }
                        }

                    }
                }
                return false;
            }
            // if cant place row move to next 
            else{
                // row must have value so increment count
                valueCount++;
                if (this.recursiveCall(rowInd+1,solveOrder,solved,valueCount)){
                    return true;
                }
            }
            return false;
            
        }
    }

    sleep(ms) {
        /* this delays the running a function */
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    canPlaceCube(rowInd,colInd,value){
        /* checks if current 3*3 cube contains val

        args: 
            rowInd: the row index of cube
            colInd: the col index of cube
            value: the value searching for
        */
        for (var val of this.pzzleClass.returnCube(colInd,rowInd)){
            if (val == value){
                return false;
            }
        }
        return true
    }

    canPlaceRow(rowInd,value){
        /* checks if current row contains value

        args: 
            rowInd: the index to start at
            value: the value searching for
        */
       for (var val of this.pzzleClass.returnRow(rowInd)){
           if (val == value){
               return false;
           }
       }
       return true

    }

    canPlaceCell(rowInd,colInd){
        /* checks if current cell is empty
        */
        if (typeof(this.pzzleClass.returnCell(colInd,rowInd)) == 'boolean'){
            return true;
        }
        return false;
    }

    canPlaceCol(colInd,value){
         /* checks if current col contains value

        args: 
            colInd: the index to start at
            value: the value searching for
        */
        for (var val of this.pzzleClass.returnCol(colInd)){
            if (val == value){
                return false;
            }
        }
        return true
    }
}