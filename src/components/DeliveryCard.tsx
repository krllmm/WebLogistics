import { Box, Chip, Typography } from "@mui/material";
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Статус</Typography>
            <Chip sx={{ marginLeft: "auto" }} label="Статус"/>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
            <Typography>Из:</Typography>
            <Typography variant="h6">{delivery.from}, {delivery.from_address}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography>В:</Typography>
            <Typography variant="h6">{delivery.to}, {delivery.to_address}</Typography>

            </Box>
          </Box>

          <Typography variant="h6">Товар: {delivery.product_id}</Typography>
          <Typography variant="h6">Количество: {delivery.amount}</Typography>
          <Typography variant="h6">Дата и время: {new Date(delivery.date["$date"]).toLocaleString('ru-RU')}</Typography>
        </Box>
      </Box>
    </>
  )
}