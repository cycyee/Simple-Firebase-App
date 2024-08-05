import React from 'react';
import { Box, Typography } from '@mui/material';
import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
const Header = () => {
    return (
    <Box
        sx={{
            position: 'absolute', // Position it relative to the nearest positioned ancestor
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            padding: 5, // Adjust padding as needed
            //bgcolor: 'background.paper', // Optional: background color
            borderBottom: '1px solid #ddd', // Optional: bottom border
            zIndex: 500 // Ensure it stays on top of other elements
        }}
    >
    <KitchenRoundedIcon sx={{ fontsize: 140, mr: 1, color: "0797ef6" }} /> {/* Icon with margin-right  sx={{ fontSize: 'large', mr: 1 }}*/}
        <Typography variant="h5" component="div" color="#797ef6">
            Pantry Tracker
            <Typography variant = "h6" sx={{ fontStyle: 'italic', color: "797ef6" }}>
                A dynamically-updated kitchen tool
            </Typography>
        </Typography>
    </Box>
    );
};

export default Header;
