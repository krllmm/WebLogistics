import { Box, Typography } from "@mui/material";
import { DriverDeliveries } from "../pages/driver/all";

interface DeliveryProps {
  delivery: DriverDeliveries,
}

export default function DeliveryCard({ delivery }: DeliveryProps) {

  return (
    <>
      <Box sx={{
        border: "2px solid lightgrey",
        borderRadius: "24px",
        padding: 2,
      }}>
        <Box>
          <Typography variant="h6">Город от: {delivery.from}</Typography>
          <Typography variant="h6">Адрес от: {delivery.from_address}</Typography>
          <Typography variant="h6">Город в: {delivery.to}</Typography>
          <Typography variant="h6">Адрес в: {delivery.to_address}</Typography>
          <Typography variant="h6">Товар: {delivery.product_id}</Typography>
          <Typography variant="h6">Количество: {delivery.amount}</Typography>
          <Typography variant="h6">Дата и время: {new Date(delivery.date["$date"]).toLocaleString('ru-RU')}</Typography>
        </Box>
      </Box>
    </>
  )
}