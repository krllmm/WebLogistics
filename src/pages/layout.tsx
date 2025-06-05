import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Agent {
  login: string,
  super_rights: boolean,
}

export default function Layout() {
  const [user, setUser] = useState<Agent>({ "login": "none", "super_rights": false })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const user = await JSON.parse(localStorage.getItem("user") || `{"login": "none", "super_rights": "false"}`)
    setUser({ "login": user["login"], "super_rights": user["super_rights"] })
  }

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        <Box sx={{ overflow: 'auto', minWidth: 200 }}>
          <Sidebar />
        </Box>

        <Box sx={{ flexGrow: 1, padding: "12px" }}>
          {
            user.login === "none" ?
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography sx={{ fontSize: 20, }}>
                    Для просмотра данных необходимо войти в систему
                  </Typography>
                </Box>
              </Box>
              // <Outlet />
              : <Outlet />
          }
        </Box>

      </Box>
    </>
  )
}