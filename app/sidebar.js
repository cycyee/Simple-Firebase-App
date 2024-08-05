import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Import your desired icon

const Sidebar = () => {
  const [showText, setShowText] = useState(false);

  return (
    <Box
      sx={{
        width: 240, // Width of the sidebar
        height: '50vh', // Full viewport height
        position: 'fixed', // Fixed position on the right
        top: 0,
        right: 0, // Position the sidebar on the right
        bgcolor: 'background.paper', // Background color of the sidebar
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2, // Padding around content
        borderRight: '1px solid #ddd' // Border to separate from the main content
      }}
    >
      <IconButton onClick={() => setShowText(!showText)}>
        <InfoIcon />
      </IconButton>
      {showText && (
        <Typography variant="body1" mt={2} color = {"797ef6"}>
          This is a pantry tracker.
          If there is no food, add some items. 
          You can delete or add inventory whenever you want. 
        </Typography>
      )}
    </Box>
  );
};

export default Sidebar;
