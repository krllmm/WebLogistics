import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BadgeIcon from '@mui/icons-material/Badge';

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
        <MenuItem path="" title="Статистика" icon={<QueryStatsIcon />}/>

        <MenuItem path="logists" title="Логисты" icon={<ContactPageIcon />}/>

        <MenuItem path="deliveries/all" title="Перевозки" icon={<LocalShippingIcon />}/>

        <MenuItem path="drivers/all" title="Водители" icon={<BadgeIcon />}/>

      </Stack>
    </>
  )
}