import { Box, Typography } from "@mui/material";

interface HeaderProps {
    title: string
}

export default function Header({ title }: HeaderProps) {
    return (
        <>
            <Box sx={{
                marginBottom: 2,
            }}>
                <Typography variant="h4">
                    {title}
                </Typography>
            </Box>
        </>
    )
}