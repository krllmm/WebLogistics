import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import { itemService } from "../../services/api/endpoints/item";
import Header from "../components/Header";
import DriverCard from "../components/DriverCArd";

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
      .then(res => {

        if (!res) {
          throw new Error("Ошибка получения данных о водителях")
        } else {
          console.log(res)
          setDrivers(res)
        }
      })
      .catch((err: Error) => {
        setApiError(err.message || "Произошла неизвестная ошибка");
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box sx={{
      padding: 2,
    }}>
      {apiError && <div>{apiError}</div>}

      <Header title="Водители" />

      {drivers.map((driver, index) => (
        <DriverCard key={index} driver={driver}/>
      ))}
      
    </Box>
  )
}