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

export interface Column {
  id: CellId;
  cells: CellValue[];
}
