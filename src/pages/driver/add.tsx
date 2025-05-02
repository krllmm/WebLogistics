import { Box, Typography } from "@mui/material";

export default function AddDriver() {
    return (
        <>
        <Box sx={{ 
            border: "2px solid lightgrey",
            borderRadius: "24px",
            padding: 2,
        }}>
            <Typography>Добавить нового водителя в систему</Typography>
            </Box>
        </>
    )
}