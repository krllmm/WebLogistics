import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { itemService } from "../../services/api/endpoints/item";

interface Logist {
  login: string,
  super_rights: string,
}

export default function Logist() {
  const [logists, setLogists] = useState<Logist[]>([])
  const [loading, setLoading] = useState(false)

  const getLogists = async () => {
    setLoading(true)
    await itemService.getLogists()
      .then(res => {
        console.log(res)
        setLogists(res)
      })
      .catch(e => console.log(e))
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }

  useEffect(() => {
    getLogists()
  }, [])

  return (
    <Box sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
    }}>
      <Header title="Логисты" />

      <Box sx={{
        overflow: 'hidden',
        borderRadius: "16px",
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)'
      }}>
        <Box sx={{
          display: "flex",
          backgroundColor: "#f0f0f0",
          borderStartStartRadius: "16px",
          borderStartEndRadius: "16px",
        }}>
          <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Логин</Typography>
          <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Расширенные права</Typography>
        </Box>
        {
          loading ?
            <Box sx={{
              display: "flex",
              justifyContent: "center"
            }}>
              <CircularProgress size={40} sx={{ color: "#1C771C", marginBlock: 2 }} />
            </Box> :

            logists.map((logist, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  }
                }}>
                <Typography sx={{ flex: 1, marginLeft: 2, marginY: 1 }}>{logist.login}</Typography>
                <Box sx={{
                  flex: 1,
                  marginLeft: 2,
                  marginY: 1, 
                }}>
                  <Typography sx={{
                    backgroundColor: logist.super_rights == "true" ? "#6edd5b" : "#ff4e4e",
                    borderRadius: 6,
                    paddingX: 2,
                    width: "fit-content",
                  }}>
                    {logist.super_rights == "true" ? "Есть" : "Нет"}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
    </Box>
  )
}