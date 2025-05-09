import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";

export default function Sidebar() {
  return (
    <>
      <Stack 
        spacing={2} 
        sx={{ 
          backgroundColor: "#f0f0f0",
          height: "100%",
          paddingRight: 2
        }}
        >
          {/* <div>Logo</div> */}
        <MenuItem path="" title="Главная" />

        <MenuItem path="logists" title="Логисты" />

        <MenuItem path="deliveries/all" title="Перевозки" />

        <MenuItem path="drivers/all" title="Водители" />

      </Stack>
    </>
  )
}