import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, IconButton, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { itemService } from "../../services/api/endpoints/item";
import { slugify } from "transliteration";
import { authService } from "../../services/api/endpoints/auth";
import AddIcon from '@mui/icons-material/Add';
import LogistInfo from "../components/LogistInfo";

interface Logist {
  _id: string,
  login: string,
  first_name: string,
  second_name: string,
  super_rights: string,
  drivers: string[],
}

interface Driver {
  _id: string,
  first_name: string,
  second_name: string,
}

export default function Logist() {
  const [firstName, setFirstName] = useState<string>("")
  const [secondName, setSecondName] = useState<string>("")
  const [logists, setLogists] = useState<Logist[]>([])
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [addLogistSectionOpen, setAddLogistSectionOpen] = useState<boolean>(false)
  const [freeDrivers, setFreeDrivers] = useState<Driver[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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

  const getFreeDrivers = async () => {
    await itemService.getFreeDrivers()
      .then(res => {
        console.log("no logist: ", res)
        setFreeDrivers(res)
      })
      .catch(e => console.log(e))
    // .finally(() => setTimeout(() => setLoading(false), 1000))
  }

  useEffect(() => {
    getLogists()
    getFreeDrivers()
  }, [])

  function generateSecurePassword(length: number = 10): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const result = [];
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i++) {
      const index = values[i] % charset.length;
      result.push(charset.charAt(index));
    }

    return result.join('');
  }

  const handleAddLogist = () => {
    const login = slugify(`${firstName}-${secondName}`).toLowerCase();
    const password = generateSecurePassword();

    authService.registerLogist({
      first_name: firstName,
      second_name: secondName,
      login: login,
      password: password,
      super_rights: checked.toString(),
    })
      .then(res => console.log(res))
      .catch(e => console.log(e))
      .finally(() => { window.location.reload() })
  }

  const resetPassword = () => {
    alert("сброс пароля")
  }

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
          <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Водители</Typography>
          <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Сброс пароля</Typography>
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
              <LogistInfo
                key={index}
                login={logist.login}
                _id={logist._id}
                drivers={logist.drivers}
                freeDrivers={freeDrivers}
                super_rights={logist.super_rights}
                resetPassword={resetPassword}
              />
            ))}
      </Box>

      {
        addLogistSectionOpen ?
          <>
            <Box sx={{ marginTop: 4 }}>
              <TextField label="Имя" autoComplete="off" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <TextField label="Фамилия" autoComplete="off" variant="outlined" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={checked}
                  onChange={handleChange} />} label="Назначить расширенные права" />
              </FormGroup>

            </Box>
            <Button onClick={() => handleAddLogist()}>Добавить</Button>
          </> : <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }} >
            <IconButton size="large" onClick={() => { setAddLogistSectionOpen(true) }}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Box>
      }
    </Box>
  )
}