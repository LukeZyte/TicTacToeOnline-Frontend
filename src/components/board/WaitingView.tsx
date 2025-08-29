import { Container, Box, Typography } from "@mui/material";

const WaitingView = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "yellow",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 0, // ważne przy flexboxie
        py: 0,
      }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
          Waiting for other player to join the game.
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Let them join the game using the board code at the top.
        </Typography>
      </Box>
    </Container>
  );
};

export default WaitingView;
