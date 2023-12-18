import React from "react";
import { Box } from "@mui/material";

const Embarcacao = () => {
  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      ></Box>
    </Box>
  );
};

export default Embarcacao;
