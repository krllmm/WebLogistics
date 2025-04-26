import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";

export default function Sidebar() {
  return (
    <>
      {/* <div>Logo</div> */}
      <Stack 
        spacing={2} 
        sx={{ 
          backgroundColor: "red",
          height: "100%"
        }}
        >
        <MenuItem path="" title="Home" />

        <MenuItem path="logists" title="Logists" />

        <MenuItem path="deliveries" title="Deliveries" />

        <MenuItem path="driver" title="Driver" />
      </Stack>
    </>
  )
}