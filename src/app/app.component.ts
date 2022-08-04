import { Component } from '@angular/core';
import * as _ from 'lodash';
import { SUDOKU } from './constants/constants';
import { Solution, Solved } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sudoku';
  array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  allowedNumbersInCell: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  sudoku: Array<number[]> = _.cloneDeep(SUDOKU.empty)
  isSolved: boolean = false;
  isGivenCorrect: boolean = true;
  solution: Array<Solution> = []
  prevSolution: Array<Solution> = []

  constructor() {
  }
  sudokuSolver() {
    this.sudoku.map((data, i) => {
      data.map((box, j) => {
        const sol = {
          'value': box,
          'possibleValues': [],
          'i': i,
          'j': j,
          'blockId': this.getBlockId(i, j),
          'isSolved': box == 0 ? false : true
        }
        this.solution.push(sol);
      })
    })
    this.updatePossibleValues();
  }
  getBlockId(i: number, j: number): any {
    switch (i) {
      case 0:
      case 1:
      case 2:
        if (j < 3) {
          return 0
        }
        else if (j < 6) {
          return 1
        }
        else if (j < 9) {
          return 2
        }
        break;
      case 3:
      case 4:
      case 5:
        if (j < 3) {
          return 3
        }
        else if (j < 6) {
          return 4
        }
        else if (j < 9) {
          return 5
        }
        break;
      case 6:
      case 7:
      case 8:
        if (j < 3) {
          return 6
        }
        else if (j < 6) {
          return 7
        }
        else if (j < 9) {
          return 8
        }
        break;
      default:
        return 10
    }
  }
  updatePossibleValues() {
    this.solution.map((data) => {
      if (data.value == 0) {
        const possibleFromColumn: number[] = this.checkColumnRow(data.i, true);
        const possibleFromRow: number[] = this.checkColumnRow(data.j, false);
        const possibleFromBox: number[] = this.checkBox(data.blockId);
        data.possibleValues = this.removeCommon(possibleFromColumn, possibleFromRow, possibleFromBox)
      }
      if (data.possibleValues.length == 1) {
        data.value = data.possibleValues[0];
        this.sudoku[data.i][data.j] = data.possibleValues[0]
      }
    })
    const solved: any = _.groupBy(this.solution, 'isSolved')
    if (solved.false) {
      if (this.prevSolution && _.isEqual(this.prevSolution, this.solution)) {
        this.isGivenCorrect = false;
      }
      if (this.isGivenCorrect) {
        this.prevSolution = _.cloneDeep(this.solution)
        this.solution = [] as Solution[]
        this.sudokuSolver();
      }
    } else {
      this.isSolved = true;
    }
  }
  checkColumnRow(index: number, isColumn: boolean) {
    const arr = [];
    for (let i of this.array) {
      if (isColumn ? this.sudoku[index][i] != 0 : this.sudoku[i][index] != 0) {
        arr.push(isColumn ? this.sudoku[index][i] : this.sudoku[i][index])
      }
    }
    return this.compArray(this.allowedNumbersInCell, arr)
  }
  compArray(first: number[], second: number[]): number[] {
    return first.filter(item => {
      return !(_.includes(second, item))
    })
  };
  removeCommon(first: number[], second: number[], third: number[]): number[] {
    const spread = _.union(_.union(first, second), third);
    return spread.filter(item => {
      return (first.includes(item) && second.includes(item) && third.includes(item))
    })
  };
  checkBox(blockId: number) {
    const arr: number[] = []
    const block = _.groupBy(this.solution, 'blockId');
    block[blockId].map((data) => {
      if (data.value != 0) {
        arr.push(data.value)
      }
    })
    return this.compArray(this.allowedNumbersInCell, arr)
  }
  reloadSudoku() {
    this.resetFields();
    this.sudoku = SUDOKU.empty;
  }
  loadExample() {
    this.resetFields();
    this.sudoku = _.cloneDeep(SUDOKU.example);
  }
  resetFields() {
    this.isSolved = false;
    this.isGivenCorrect = true;
    this.solution = [];
    this.prevSolution = [];
  }
  keyEvent(event: KeyboardEvent,i:number,j: number) {
    if(_.includes([0,1,2,3,4,5,6,7,8,9], _.toNumber(event.key))){
      if(_.toString(this.sudoku[i][j]).length >= 1){
        this.sudoku[i][j] = _.toNumber(event.key)

      }
    }
  }
}

