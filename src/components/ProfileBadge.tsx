import { useEffect, useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { authService } from "../../services/api/endpoints/auth"
import LogoutIcon from '@mui/icons-material/Logout';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

interface Agent {
  login: string,
  super_rights: boolean,
}

export default function ProfileBadge() {
  const [user, setUser] = useState<Agent>({"login": "none", "super_rights": false})
  const [openModal, setOpenModal] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  const handleClose = () => {
    setOpenModal(false)
    setLogin("")
    setPassword("")    
  }

  const checkAuth = async () => {
    const user = await JSON.parse(localStorage.getItem("user") || `{"login": "none", "super_rights": "false"}`)
    setUser({"login": user["login"], "super_rights": user["super_rights"]})
    console.log("login: ", user)
  }

  const handleLogin = async () => {
    console.log(login, password)

    await authService.loginLogist({login: login, password: password})
      .then(res => {
        console.log(res.user["login"])
        localStorage.setItem("user", JSON.stringify(
          {
            "login": res.user["login"], 
            "super_rights": res.user["super_rights"]
          }
        ))
      })
      .catch(() => console.log("Ошибка соединения"))
      .finally(() => { window.location.reload() })

  }

  const handleLogout = async () => {
    await localStorage.removeItem("user")
    window.location.reload();
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={{ ...style, borderRadius: 6, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">Войдите в систему</Typography>
          <TextField
            value={login}
            placeholder="Логин"
            onChange={e => setLogin(e.target.value)}
            variant="outlined"
            autoComplete='off'
          />
          <TextField
            value={password}
            placeholder="Пароль"
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            autoComplete='off'
          />
          <Button 
            onClick={() => handleLogin()} 
            sx={{
              backgroundColor: "#8EBB8E",
              color: "#363636",
              flex: 1,
              '&:hover':{
                backgroundColor: "#1C771C",
                color: "#f0f0f0",
              },
            }}>
            Войти
          </Button>
        </Box>
      </Modal>
      {
        user.login === "none" ?
          <Button
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: "#8EBB8E",
              color: "#363636",
              flex: 1,
              borderRadius: 3,
              '&:hover':{
                backgroundColor: "#1C771C",
                color: "#f0f0f0",
              },
            }}>
            Войти
          </Button>
          :
          <Box 
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}>
            <AccountCircleIcon fontSize="large"  sx={{ marginRight: 1 }} />
            <Typography variant="h6">{user.login}</Typography>
            <LogoutIcon 
              fontSize="large"
              onClick={() => handleLogout()} 
              sx={{ color: "black", marginLeft: "auto" }}/>
          </Box>
      }
    </>
  )
}