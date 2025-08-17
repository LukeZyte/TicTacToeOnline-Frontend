import { Button, Card, Container, Stack, Typography } from "@mui/material";
import JoinBoardDialog from "../components/JoinBoardDialog";
import { useEffect, useState } from "react";
import { connectToHub, createBoard } from "../api/services/signalR.service";
import { useNavigate } from "react-router";
import { NavigationRoutes } from "../utils/enums/navigation-routes.enum";

const Dashboard = () => {
  const [joinBoardOpen, setJoinBoardOpen] = useState(false);
  const navigate = useNavigate();

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

  const onJoinBoardDialogClose = (boardCode: string | null) => {
    setJoinBoardOpen(false);
    if (boardCode) {
      navigate(`/${NavigationRoutes.Board}/${boardCode}`);
    }
  };
  const onJoinBoardDialogOpen = () => {
    setJoinBoardOpen(true);
  };

  const onCreateBoard = async () => {
    console.log("Creating a new board...");
    const response = await createBoard();
    console.log(response);
    if (response) {
      navigate(`/${NavigationRoutes.Board}/${response}`);
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h4" textAlign="center" style={{ padding: 16 }}>
          TicTacToe Online
        </Typography>
        <Card variant="outlined" style={{ padding: 32 }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
              onClick={onCreateBoard}
            >
              Create a new board
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              onClick={onJoinBoardDialogOpen}
            >
              Join an existing board
            </Button>
          </Stack>
        </Card>
      </Container>
      <JoinBoardDialog open={joinBoardOpen} onClose={onJoinBoardDialogClose} />
    </>
  );
};

export default Dashboard;
