import { useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import type { Cell } from "./types/Cell.type";



let idCounter = 0;

function App() {
  const [rows, setRows] = useState(0);
  const [colums, setColums] = useState(0);

  const [matrix, setMatrix] = useState<Cell[][]>([]);

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

  return (
    <div>
      <Input
        placeholder="rows"
        value={rows || ""}
        onChange={(event) => {
          const value = +event.target.value;
          setRows(Math.min(100, Math.max(0, value)));
        }}
      />
      <Input
        placeholder="colums"
        value={colums || ""}
        onChange={(event) => {
          const value = +event.target.value;
          setColums(Math.min(100, Math.max(0, value)));
        }}
      />
      <button
        disabled={!rows && !colums}
        onClick={() =>
          rows && colums && setMatrix(generateMatrix(rows, colums))
        }>
        Generate matrix
      </button>

      {!!matrix.length && (
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
                  <td key={column.id}>{column.amount}</td>
                ))}
                <td>{row.reduce((sum, cell) => sum + cell.amount, 0)}</td>
                <td>
                  <button>- Remove row</button>
                </td>
              </tr>
            ))}
            <tr>
              <th>60th percentile</th>
            </tr>
          </tbody>
        </table>
      )}
      <div>
        <button
          className="add-row"
          onClick={() => setRows((prev) => prev && prev + 1)}>
          + Add row
        </button>
      </div>
    </div>
  );
}

export default App;
