import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import { itemService } from "../../../services/api/endpoints/item";
import Header from "../../components/Header";
import DriverCard from "../../components/DriverCard";
import { Button, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

export interface DriverDeliveries {
  from: string,
  from_address: string,
  to: string,
  to_address: string,
  product_id: number,
  amount: number
}

export interface Driver {
  first_name: string,
  second_name: string,
  experince: number,
  age: number,
  category: string,
  delivery: DriverDeliveries[],
}

export default function Driver() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const getData = async () => {
    setLoading(true)
    setApiError("")

    await itemService.getAllDrivers()
      .then(async res => {

        if (!res) {
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
      <Header title="Водители" />
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
          }}>

            {drivers.map((driver, index) => (
              <DriverCard key={index} driver={driver} />
            ))}

            <NavLink to="/drivers/add" style={{
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
                Добавить водителя
              </Button>
            </NavLink>

          </Box>
      }
    </Box>
  )
}