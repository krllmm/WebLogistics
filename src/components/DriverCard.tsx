import { Box, Typography } from "@mui/material";
import { Driver } from "../pages/driver/all";

interface DriverProps{
    driver: Driver,
}

export default function DriverCard({ driver }: DriverProps) {
    return (
        <>
        <Box sx={{ 
            border: "2px solid lightgrey",
            borderRadius: "24px",
            padding: 2,
        }}>
            <Typography variant="h6">Имя: {driver.first_name}</Typography>
            <Typography variant="h6">Фамилия: {driver.second_name}</Typography>
            <Typography variant="h6">Опыт работы: {driver.experince}</Typography>
            <Typography variant="h6">Возраст: {driver.age}</Typography>
            <Typography variant="h6">Водительская категория: {driver.category}</Typography>
        </Box>
        </>
    )
}