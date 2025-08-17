import { Alert, OutlinedInput, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, useState } from "react";
import { joinBoard } from "../api/services/signalR.service";
import { useNavigate } from "react-router";
import { NavigationRoutes } from "../utils/enums/navigation-routes.enum";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface JoinBoardDialogProps {
  open: boolean;
  onClose: (boardCode: null | string) => void;
}

const JoinBoardDialog: React.FC<JoinBoardDialogProps> = ({ open, onClose }) => {
  const [value, setValue] = useState<string>("");
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setInvalidCode(false);
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, "").slice(0, 6);

    setValue(digitsOnly);
  };

  const onClear = () => {
    setValue("");
  };

  const onJoin = async () => {
    if (value.length !== 6) {
      console.error("Board code must be 6 digits long");
      return;
    }

    const response = await joinBoard(value);
    console.log(response);
    if (!response.success) {
      console.error("Failed to join board");
      setError(true);
      return;
    }

    if (response === false) {
      setInvalidCode(true);
      return;
    }

    console.log(`${NavigationRoutes.Board}/${value}`);
    onClose(value);
    console.log(response);
  };

  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle textAlign="center">Enter the board code</DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          {error && (
            <Alert severity="error">
              Something went wrong. Please try again later
            </Alert>
          )}
          {invalidCode && (
            <Alert severity="error">
              Invalid board code. Fill the valid code
            </Alert>
          )}
          <OutlinedInput
            id="board-code-input"
            autoFocus
            placeholder="000000"
            inputMode="numeric"
            value={value}
            onChange={onInputChange}
            fullWidth
            sx={{
              input: {
                letterSpacing: "8px",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              },
            }}
          />
        </Stack>
      </DialogContent>
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          gap: 2,
          px: 3,
          pb: 2,
        }}
      >
        <Button
          disabled={value.length !== 6}
          variant="contained"
          onClick={onJoin}
          fullWidth
          sx={{
            padding: 2,
          }}
        >
          Join the board
        </Button>
        <Stack direction="row" spacing={2}>
          <Button onClick={onClear} fullWidth>
            Clear
          </Button>
          <Button onClick={onClose} fullWidth>
            Close
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default JoinBoardDialog;
