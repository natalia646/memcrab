import { useState } from "react";
import "./App.css";

type CellId = number;
type CellValue = number; // three digit random number

type Cell = {
  id: CellId;
  amount: CellValue;
};

let idCounter = 0;

function App() {
  const [rows, setRows] = useState<number | null>(null);
  const [colums, setColums] = useState<number | null>(null);

  const randomAmount = () => Math.floor(100 + Math.random() * 900);

  const generateMatrix = (rowsValue: number, columsValue: number): Cell[][] => {
    return Array.from({ length: rowsValue }, () =>
      Array.from({ length: columsValue }, () => {
        return {
          id: idCounter++,
          amount: randomAmount(),
        };
      }),
    );
  };
  const matrix = rows && colums && generateMatrix(rows, colums);

  return (
    <div>
      <input
        placeholder="rows"
        value={rows || ""}
        min={0}
        max={10}
        onChange={(event) => {
          const value = +event.target.value;
          setRows(Math.min(100, Math.max(0, value)));
        }}
      />
      <input
        placeholder="colums"
        min={0}
        max={10}
        value={colums || ""}
        onChange={(event) => {
          const value = +event.target.value;
          setColums(Math.min(100, Math.max(0, value)));
        }}
      />
      {matrix && (
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              {Array.from({ length: colums }, (_, i) => (
                <th scope="col">Cell Values N = {i + 1}</th>
              ))}
              <th>Sum values</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, j) => (
              <tr>
                <th>Cell Value M = {j + 1}</th>
                {row.map((column) => (
                  <td key={column.id} onClick={() => column.amount++}>
                    {column.amount}
                  </td>
                ))}
                <td>{row.reduce((sum, cell) => sum + cell.amount, 0)}</td>
                <td><button >- Remove row</button></td>
              </tr>
            ))}
            <tr>
              <th>60th percentile</th>
            </tr>
          </tbody>
        </table>
      )}
      <button className="add-row" onClick={() => setRows((prev) => prev && prev + 1)}>+ Add row</button>
    </div>
  );
}

export default App;
