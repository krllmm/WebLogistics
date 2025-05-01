import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import { itemService } from "../../services/api/endpoints/item";
 
interface Driver {

}

export default function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>(""); 

  const getData = async () => {
    setLoading(true)
    setApiError("")

    await itemService.getAllDrivers()
      .then(res => {
        
        if(!res){
          throw new Error("Ошибка получения данных о водителях")
        }else{
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
    <>
      {apiError && <div>{apiError}</div>}

      <Box>
        Водители
      </Box>
      <div>drivers page</div>
    </>
  )
}