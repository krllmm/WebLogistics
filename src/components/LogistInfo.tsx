import { Box, Button, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { itemService } from "../../services/api/endpoints/item";

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

interface Driver {
  _id: string,
  first_name: string,
  second_name: string,
}

interface LogistProps {
  login: string,
  _id: string,
  super_rights: string,
  drivers: string[],
  freeDrivers: Driver[],
  resetPassword: () => void
}

export default function LogistInfo({ login, _id, super_rights, drivers, freeDrivers, resetPassword }: LogistProps) {
  const [assignDriverModal, setAssignDriverModal] = useState<boolean>(false)
  const [driver, setDriver] = useState('');
  const [assignedDrivers, setAssignedDrivers] = useState<{name: string, second_name: string}>()

  const handleDriverChange = (event: SelectChangeEvent) => {
    setDriver(event.target.value as string);
  };

  const handleAssignDriverToLogist = () => {
    console.log("driver id: ", driver)
    console.log("logist id: ", _id)

    itemService.assignDriverToLogist({"driverId": driver, "logistId": _id})
    .then(res => console.log(res))
    .catch(e => console.log(e))
    .finally(() => { window.location.reload() })
  }
  
  const getDrivers = async () => {
    await itemService.getAllDrivers()
    .then(res => {
      console.log("all:",  res)
      console.log("needed: ", drivers)
      const result = res.filter((item: any) => drivers.includes(item._id["$oid"]));
      console.log("coreect: ", result)

      setAssignedDrivers({name: result[0].first_name, second_name: result[0].second_name})
    })
    .catch()
    .finally()
  }

  useEffect(() => {
    getDrivers()
  }, [])
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          }
        }}>
        <Typography sx={{ flex: 1, marginLeft: 2, marginY: 1 }}>{login}</Typography>
        <Box sx={{
          flex: 1,
          marginLeft: 2,
          marginY: 1,
        }}>
          <Typography sx={{
            backgroundColor: super_rights == "true" ? "#6edd5b" : "#ff4e4e",
            borderRadius: 6,
            paddingX: 2,
            width: "fit-content",
          }}>
            {super_rights == "true" ? "Есть" : "Нет"}
          </Typography>
        </Box>
        <Box sx={{
          flex: 1,
          marginLeft: 2,
          marginY: 1,
        }}>
          {drivers.length !== 0
            ?
            <Typography>
              {assignedDrivers?.name} {assignedDrivers?.second_name}
            </Typography>
            : <Button
              onClick={() => setAssignDriverModal(true)}
              sx={{
                backgroundColor: "#8EBB8E",
                color: "#000",
                borderRadius: "12px",
                px: 2,
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#1C771C",
                  color: "white"
                }
              }}
            >
              Назначить
            </Button>

          }
        </Box>

        <Box sx={{
          flex: 1,
          marginLeft: 2,
          marginY: 1,
        }}>
          <Button
            onClick={() => resetPassword()}
            sx={{
              backgroundColor: "#8EBB8E",
              color: "#000",
              borderRadius: "12px",
              px: 2,
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "#1C771C",
                color: "white"
              }
            }}
          >
            Сброс пароля
          </Button>


        </Box>

      </Box>

      <Modal
        open={assignDriverModal}
        onClose={() => setAssignDriverModal(false)}
        aria-labelledby="assign-driver-modal-title"
        aria-describedby="assign-driver-description"
      >
        <Box sx={{ ...style, borderRadius: 6, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">Выберите водителя</Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleDriverChange}
          >
            {
              freeDrivers.map((driver, index) => (
                <MenuItem value={driver._id} key={index}>{driver.first_name} {driver.second_name}</MenuItem>
              ))
            }
          </Select>

          <Button
            onClick={() => handleAssignDriverToLogist()}
            sx={{
              backgroundColor: "#8EBB8E",
              color: "#363636",
              flex: 1,
              '&:hover': {
                backgroundColor: "#1C771C",
                color: "#f0f0f0",
              },
            }}>
            Назначить
          </Button>
        </Box>
      </Modal>
    </>
  )
}