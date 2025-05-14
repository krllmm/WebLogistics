import { useEffect, useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Modal, TextField } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProfileBadge() {
  const [username, setUsername] = useState()
  // const [loginModal, setLoginModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setLogin("")
    setPassword("")
  }, [])

  const handleLogin = () => {
    alert("войти")
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const checkAuth = async () => {
    const login = await JSON.parse(localStorage.getItem('user') || `{"username": "none"}`)

    console.log(login["username"])
    setUsername(login["username"])
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            value={login}
            onChange={e => setLogin(e.target.value)}
            variant="outlined"
          />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button onClick={() => handleLogin()}>
            Войти
          </Button>
        </Box>
      </Modal>
      {
        username === "none" ?
          <Box>
            <Button onClick={() => setOpenModal(true)}>Войти</Button>
          </Box>
          : 
          <Box>
            <AccountCircleIcon fontSize="large" />
          </Box>
      }
    </>
  )
}