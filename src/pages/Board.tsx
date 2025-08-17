import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TicTacToeBoard from "../components/TicTacToeBoard";
import type { GameSymbols } from "../utils/enums/game-symbols.enum";

enum BoardState {
  Waiting = 0,
  InProgress = 1,
  Finished = 2,
}

interface Player {
  id: string;
  username: string;
  symbol: GameSymbols;
}

interface GameState {
  boardState: BoardState;
  boardCode: string;
  players: Player[];
  turnIndex?: 0 | 1;
  winner?: Player | null;
}

const Board = () => {
  const { boardCode } = useParams<{ boardCode: string }>();
  if (!boardCode) {
    console.error("Board code is required");
    return <Typography>Error: Invalid Board code</Typography>;
  }

  const INITIAL_GAME_STATE: GameState = {
    boardState: BoardState.Waiting,
    boardCode: boardCode!,
    players: [],
    turnIndex: 1,
    winner: null,
  };

  useEffect(() => {
    console.log("Board code:", boardCode);
  }, [boardCode]);

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  return (
    <Container>
      <Typography>Board: {boardCode}</Typography>
      {/* <TicTacToeBoard turnIndex={gameState.turnIndex} /> */}
    </Container>
  );
};

export default Board;
