import { Box } from "@mui/material";
import MenuItem from "./MenuItem";
import { QueryStats, ContactPage, LocalShipping, Badge, Chat, ListAlt, Settings } from '@mui/icons-material';
import ProfileBadge from "./ProfileBadge";

export default function Sidebar() {
  // const [user, setUser] = 
  return (
    <>
      <Box
        sx={{ 
          backgroundColor: "#f0f0f0",
          height: "100%",
          paddingRight: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        >
          
        <MenuItem path="" title="Статистика" icon={<QueryStats />}/>

        <MenuItem path="logists" title="Логисты" icon={<ContactPage />}/>

        <MenuItem path="deliveries/all" title="Перевозки" icon={<LocalShipping />}/>

        <MenuItem path="drivers/all" title="Водители" icon={<Badge />}/>

        <MenuItem path="chat" title="Чат" icon={<Chat />} />

        <MenuItem path="products" title="Товары" icon={<ListAlt />} />

        <MenuItem path="settings" title="Настройки" icon={<Settings />} />

        <Box 
          sx={{ 
            display: "flex",
            marginTop: "auto", 
            marginLeft: 1, 
            marginBottom: 2 
          }}>
          <ProfileBadge />
        </Box>

      </Box>
    </>
  )
}