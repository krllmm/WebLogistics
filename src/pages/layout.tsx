import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        <Box sx={{ overflow: 'auto' }}>
          <Sidebar />
        </Box>

        <Box sx={{ flexGrow: 1, padding: "12px" }}>
          <Outlet />
        </Box>

      </Box>
    </>
  )
}