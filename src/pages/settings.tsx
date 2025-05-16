import { Box } from "@mui/material";
import Header from "../components/Header";

export default function Settings() {
    return (
        <Box sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
        }}>
            <Header title="Настройки" />

        </Box>
    )
}