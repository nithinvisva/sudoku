export interface Solved{
    'true': Solution[];
    'false': Solution[];
}

export interface Solution{
    value: number;
    possibleValues:number[];
    i: number;
    j:number; 
    blockId: number; 
    isSolved: boolean

}