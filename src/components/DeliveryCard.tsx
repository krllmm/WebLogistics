import { Box, Chip, Typography } from "@mui/material";
import { DriverDeliveries } from "../pages/driver/all";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface DeliveryProps {
  delivery: DriverDeliveries,
}

export default function DeliveryCard({ delivery }: DeliveryProps) {

  const date: string = new Date(delivery.date["$date"]).toLocaleString('ru-RU');

  return (
    <>
      <Box sx={{
        border: "2px solid lightgrey",
        borderRadius: "24px",
        padding: 2,
      }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Статус: </Typography>
            <Chip label="Статус"/>
          </Box>

          <Box sx={{ backgroundColor: "lightgrey", height: 2, marginY: 2 }}/>

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

          {/* <Box sx={{ backgroundColor: "lightgrey", height: 2, marginY: 2 }}/> */}

          <Typography variant="h6">Товар: {delivery.product_id}</Typography>
          <Typography variant="h6">Количество: {delivery.amount}</Typography>

          {/* <Box sx={{ backgroundColor: "lightgrey", height: 2, marginY: 2 }}/> */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon/>
            <Typography variant="h6"> Ожидается: {date}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}