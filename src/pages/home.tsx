import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { itemService } from "../../services/api/endpoints/item";

interface Delivery {
    id: string,
    from: string,
    from_address: string,
    to: string,
    to_address: string,
    product_id: number,
    amount: number,
    date: string,
  }

export default function Home() {
    const [deliveryHistory, setDeliveryHistory] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const getData = async () => {
    setLoading(true)
    setApiError("")

    await itemService.getDeliveryHistory()
      .then(async res => {
        if (!res) {
          console.log(res)
          throw new Error("Ошибка")
        } else {
          console.log(res)
          setDeliveryHistory(res)
        }
      })
      .catch(() => {
        setApiError("Не удалось получить историю перевозок");
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }

  useEffect(() => {
    getData()
  }, [])
    
    return (
        <>
            <Box sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
            }}>
                <Header title="Статистика" />
                {
                    deliveryHistory.map((item, index) => (
                        <Box key={index}>
                            <Typography>{item.id}</Typography>
                        </Box>
                    ))
                }
            </Box>
        </>
    )
}