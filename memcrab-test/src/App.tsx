import { useState } from "react";
import { Input } from "./components/Input";
import type { InputValues, Row } from "./types/Cell.type";
import "./App.css";

let idCellCounter = 0;
let idRowCounter = 0;
const initInputValues = {
  rows: 0,
  columns: 0,
  nearestValue: 0,
};

function App() {
  const [inputValues, setInputValues] = useState<InputValues>(initInputValues);
  const [matrix, setMatrix] = useState<Row[]>([]);

  const { rows, columns, nearestValue } = inputValues;

  const randomAmount = () => Math.floor(100 + Math.random() * 900);

  const generateRow = (): Row => ({
    id: idRowCounter++,
    cells: Array.from({ length: columns }, () => ({
      id: idCellCounter++,
      amount: randomAmount(),
    })),
  });

  const generateMatrix = () => {
    if (rows && columns) {
      idCellCounter = 0;
      idRowCounter = 0;
      setMatrix(Array.from({ length: rows }, generateRow));
    }
  };

  const addRow = () => {
    if (!matrix.length) return;

    const newRow = generateRow();
    setInputValues((prev) => ({ ...prev, rows: prev.rows + 1 }));
    setMatrix((prev) => [...prev, newRow]);
  };

  const removeRow = (id: number) => {
    if (!matrix.length) return;

    const deletedRow = matrix.find((row) => row.id === id);

    setMatrix((prev) => prev.filter((row) => row.id !== deletedRow?.id));
    setInputValues((prev) => ({ ...prev, rows: prev.rows - 1 }));
  };

  const incrementCell = (rowId: number, cellId: number) => {
    setMatrix((prev) =>
      prev.map((row) =>
        rowId === row.id
          ? {
              ...row,
              cells: row.cells.map((cell) =>
                cell.id === cellId
                  ? { ...cell, amount: cell.amount + 1 }
                  : cell,
              ),
            }
          : row,
      ),
    );
  };

  const buildColumns = (matrix: Row[]): number[][] => {
    if (!matrix.length) return [];

    return matrix[0].cells.map((_, colIndex) =>
      matrix.map((row) => row.cells[colIndex].amount),
    );
  };

  const getPercentile = (values: number[], percentile: number) => {
    if (!values.length) return 0;

    const sorted = [...values].sort((a, b) => a - b);
    const pos = (sorted.length - 1) * percentile;
    const lower = Math.floor(pos);
    const upper = Math.ceil(pos);

    if (lower === upper) return sorted[lower];

    return sorted[lower] + (sorted[upper] - sorted[lower]) * (pos - lower);
  };

  const columnsValue = buildColumns(matrix);

  const percentileRow = columnsValue.map((col) => getPercentile(col, 0.6));
  return (
    <div>
      <Input
        placeholder="rows"
        value={rows || ""}
        onChange={(event) => {
          const value = +event.target.value;
          setInputValues((prev) => ({
            ...prev,
            rows: Math.min(100, Math.max(0, value)),
          }));
        }}
      />
      <Input
        placeholder="colums"
        value={columns || ""}
        onChange={(event) => {
          const value = +event.target.value;
          setInputValues((prev) => ({
            ...prev,
            columns: Math.min(100, Math.max(0, value)),
          }));
        }}
      />
      <Input
        placeholder="x"
        value={nearestValue || ""}
        onChange={(event) => {
          const value = +event.target.value;
          setInputValues((prev) => ({
            ...prev,
            nearestValue: Math.min(rows * columns, Math.max(0, value)),
          }));
        }}
      />
      <button disabled={!rows && !columns} onClick={generateMatrix}>
        Generate matrix
      </button>

      <div>
        {!!matrix.length && (
          <button className="add-row" onClick={addRow}>
            + Add row
          </button>
        )}
      </div>

      {!!matrix.length && (
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              {Array.from({ length: matrix[0].cells.length }, (_, i) => (
                <th scope="col">Cell Values N = {i + 1}</th>
              ))}
              <th>Sum values</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map(({ cells, id }, j) => (
              <tr>
                <th key={id}>Cell Value M = {j + 1}</th>
                {cells.map((cell) => (
                  <td key={cell.id} onClick={() => incrementCell(id, cell.id)}>
                    {cell.amount}
                  </td>
                ))}
                <td>{cells.reduce((sum, cell) => sum + cell.amount, 0)}</td>
                <td>
                  <button onClick={() => removeRow(id)}>- Remove row</button>
                </td>
              </tr>
            ))}
            <tr>
              <th>60th percentile</th>
              {percentileRow.map((cell) => (
                <td key={cell}>{cell.toFixed(1)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      <div></div>
    </div>
  );
}

export default App;
