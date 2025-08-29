import {
  Container,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

type BoardInfoProps = {
  boardCode: string;
};

const BoardInfo: React.FC<BoardInfoProps> = ({ boardCode }) => {
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(boardCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 1500);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        py={1}
      >
        <Typography variant="h5" fontWeight={600} color="text.primary">
          TicTacToe Online
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Board Code:</Typography>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
            sx={{
              fontFamily: "monospace",
              letterSpacing: 1,
              bgcolor: "#f5f5f5",
              px: 1,
              py: 0.2,
              borderRadius: 1,
              fontSize: "1rem",
            }}
          >
            {boardCode}
          </Typography>
          <Tooltip title={codeCopied ? "Copied!" : "Copy code"}>
            <IconButton onClick={handleCopy} size="small" color="primary">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
    </Container>
  );
};

export default BoardInfo;
