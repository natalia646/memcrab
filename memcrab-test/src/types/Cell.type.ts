export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export interface Row {
  id: number;
  cells: Cell[];
}


export type InputValues = {
  rows: CellValue;
  columns: CellValue;
  nearestValue: CellValue;
};