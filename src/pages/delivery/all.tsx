import { Box, Button, Skeleton, Typography } from "@mui/material";
import Header from "../../components/Header";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { itemService } from "../../../services/api/endpoints/item";
import { Driver } from "../driver/all";
import DeliveryCard from "../../components/DeliveryCard";
import ErrorMessage from "../../components/ErrorMessage";

export default function Delivery() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const getData = async () => {
    setLoading(true)
    setApiError("")

    await itemService.getAllDrivers()
      .then(async res => {
        if (!res) {
          console.log(res)
          throw new Error("Ошибка")
        } else {
          console.log(res)
          setDrivers(res)
        }
      })
      .catch(() => {
        setApiError("Не удалось получить список водителей, потому что сервер на данный момент недоступен");
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
    }}>
      <Header title="Перевозки" />
      {
        (apiError != "") && !loading ?
          <>
            <ErrorMessage apiError={apiError} getData={getData} />
          </>
          : ""
      }
      {
        loading
          ?
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="rectangular" animation="wave" height={150} sx={{ borderRadius: "30px" }} />
            <Skeleton variant="rectangular" animation="wave" height={150} sx={{ borderRadius: "30px" }} />
          </Box>
          :
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            {
              drivers.map((driver, index) => (
                <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography>Водитель: {driver.first_name} {driver.second_name}</Typography>
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      marginBottom: 2,
                    }}
                  >
                    {
                      (driver.delivery).length === 0 ?
                        <Typography>Нет доставок</Typography>
                        :
                        driver.delivery.map((delivery, index) => (
                          <DeliveryCard delivery={delivery} key={index} />
                        ))
                    }
                  </Box>
                </Box>
              ))
            }

            {
              !apiError &&
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
            }
          </Box>
      }
    </Box>
  )
}