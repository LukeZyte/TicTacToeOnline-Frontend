import { useEffect, useState } from "react";
import {
  connectToHub,
  createBoard,
  joinBoard,
} from "../api/services/signalR.service";
import { Button, OutlinedInput } from "@mui/material";

const Board = () => {
  const [boardCode, setBoardCode] = useState<string | null>(null);

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await connectToHub();
      } catch (error) {
        console.error("Error connecting to hub:", error);
      }
    };
    initializeConnection();
  }, []);

  const onCreateBoardClick = async () => {
    const response = await createBoard();
    if (response) {
      setBoardCode(response);
      console.log("Board created successfully:", response);
    } else {
      console.error("Failed to create board");
    }
  };

  const onJoinBoardClick = async () => {
    if (!boardCode) {
      console.error("No board code available to join");
      return;
    }
    const response = await joinBoard(boardCode);
    if (response) {
      console.log("Board joined successfully:", response);
    } else {
      console.error("Failed to join board");
    }
  };

  return (
    <div>
      <Button onClick={onCreateBoardClick}>Create Board</Button>
      <OutlinedInput
        value={boardCode || ""}
        onChange={(e) => setBoardCode(e.target.value)}
        placeholder="Enter board code"
      />
      <Button onClick={onJoinBoardClick}>Join Board</Button>
    </div>
  );
};

export default Board;
