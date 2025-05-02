import { Box, Button, Typography } from "@mui/material";

interface ErrorMessageProps {
    apiError: string,
    getData: () => void,
}

export default function ErrorMessage({ apiError, getData }: ErrorMessageProps) {
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px solid lightgrey",
                borderRadius: "24px",
                padding: 2,
            }}>
                <Typography>{apiError}</Typography>
                <Button onClick={getData} sx={{
                    backgroundColor: "#8EBB8E",
                    marginTop: 2,
                    color: "#000",
                    borderRadius: "12px",
                    py: 1,
                    px: 3,
                    "&:hover": {
                        backgroundColor: "#1C771C",
                    }
                }}>
                    Попробовать снова
                </Button>
            </Box>
        </>
    )
}