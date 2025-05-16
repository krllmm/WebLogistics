import { Box } from "@mui/material";
import Header from "../components/Header";

export default function Chat() {
    return (
        <Box sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
        }}>
            <Header title="Чат" />

        </Box>
    )
}