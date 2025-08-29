import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TicTacToeBoard from "../components/board/TicTacToeBoard";
import type { GameSymbols } from "../utils/enums/game-symbols.enum";
import BoardInfo from "../components/board/BoardInfo";
import WaitingView from "../components/board/WaitingView";

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
  currentPlayerIndex: 0 | 1;
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
    currentPlayerIndex: 1,
    winner: null,
  };

  useEffect(() => {
    console.log("Board code:", boardCode);
  }, [boardCode]);

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <BoardInfo boardCode={boardCode} />
      {gameState.boardState === BoardState.Waiting && <WaitingView />}
      <TicTacToeBoard currentPlayerIndex={gameState.currentPlayerIndex} />
    </Container>
  );
};

export default Board;
