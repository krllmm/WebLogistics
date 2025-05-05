import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { NavLink } from "react-router-dom";

export default function Delivery() {
    return (
        <Box sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
        }}>
            <Header title="Перевозки" />
            <NavLink to="/deliveries/add" style={{
              alignSelf: "flex-end"
            }}>
              <Button sx={{
                backgroundColor: "#8EBB8E",
                marginTop: 2,
                color: "#000",
                borderRadius: "12px",
                py: 1,
                px: 3,
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#1C771C",
                }
              }}>
                Добавить перевозку
              </Button>
            </NavLink>
        </Box>
    )
}