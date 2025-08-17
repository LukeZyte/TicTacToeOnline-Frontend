import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface TocTacToeBoardProps {
  turnIndex: 0 | 1;
}

const TicTacToeBoard = ({ turnIndex }: TocTacToeBoardProps) => {
  interface BoardTile {
    selected: boolean;
    value: 0 | 1 | null;
  }

  const board: BoardTile[][] = [
    [
      { selected: false, value: null },
      { selected: false, value: null },
      { selected: false, value: null },
    ],
    [
      { selected: false, value: null },
      { selected: false, value: null },
      { selected: false, value: null },
    ],
    [
      { selected: false, value: null },
      { selected: false, value: null },
      { selected: false, value: null },
    ],
  ];

  const [boardState, setBoardState] = useState(board);

  const onTileClick = (rowIndex: number, colIndex: number) => {
    const tile = boardState[rowIndex][colIndex];
    if (!tile.selected) {
      setBoardState((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[rowIndex][colIndex] = {
          ...newBoard[rowIndex][colIndex],
          selected: true,
          value: turnIndex,
        };
        return newBoard;
      });
      tile.selected = true;
      //   tile.value = currentPlayer;
      //   setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  return boardState.map((row, rowIndex) => (
    <Box key={rowIndex} style={{ display: "flex" }}>
      {row.map((tile, colIndex) => (
        <Box
          key={colIndex}
          sx={[
            {
              width: 150,
              height: 150,
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            },
            !tile.selected && {
              ":hover": {
                cursor: "pointer",
              },
            },
          ]}
          onClick={() => onTileClick(rowIndex, colIndex)}
        >
          <Typography variant="h3" color={tile.value === 1 ? "red" : "blue"}>
            {tile.value !== null && (tile.value === 1 ? "X" : "O")}
          </Typography>
        </Box>
      ))}
    </Box>
  ));
};

export default TicTacToeBoard;
