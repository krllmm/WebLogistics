import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { itemService } from "../../../services/api/endpoints/item";
import { slugify } from 'transliteration';

export default function AddDriver() {
  const [firstName, setFirstName] = useState<string>("")
  const [secondName, setSecondName] = useState<string>("")
  const [sex, setSex] = useState<string>()
  const [experience, setExperience] = useState<number>()
  const [age, setAge] = useState<number>()
  const [category, setCategory] = useState<string[]>([])

  const handleSexChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSex: string,
  ) => {
    if (newSex !== null) {
      setSex(newSex);
    }
  };

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

  const handleAddDriver = () => {
    console.log("info: " + firstName + secondName, sex, experience, age, category)
    if(sex == undefined) return;
    if(experience == undefined) return;
    if(age == undefined) return;

    const login = slugify(`${firstName}-${secondName}`).toLowerCase();
    const password = generateSecurePassword();

    itemService.addDriver({
      firstName: firstName,
      secondName: secondName,
      sex: sex,
      experience: experience,
      age: age,
      category: category,
      login: login,
      password: password,
    })
    .then(res => console.log(res))
    .catch()
    .finally()
  }

  return (
    <>
      <Box sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}>
        <Header title="Добавить нового водителя в систему"></Header>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          <TextField label="Имя" variant="outlined"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <TextField label="Фамилия" variant="outlined" value={secondName} onChange={(e) => setSecondName(e.target.value)}/>
          <ToggleButtonGroup
            value={sex}
            exclusive
            onChange={handleSexChange}
          >
            <ToggleButton value="male">М</ToggleButton>
            <ToggleButton value="female">Ж</ToggleButton>
          </ToggleButtonGroup>
          <TextField label="Опыт работы" variant="outlined" value={experience} onChange={(e) => setExperience(+e.target.value)}/>
          <TextField label="Возраст" variant="outlined" value={age} onChange={(e) => setAge(+e.target.value)}/>
          <TextField label="Водительские категории(через запятую)" variant="outlined" value={category.join(",")} onChange={(e) => setCategory((e.target.value).split(","))}/>
        </Box>

        <Button
          onClick={() => handleAddDriver()}
          sx={{
            backgroundColor: "#8EBB8E",
            marginTop: 2,
            color: "#000",
            borderRadius: "12px",
            py: 1,
            px: 3,
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#1C771C",
            }
          }}>
          Добавить водителя
        </Button>
      </Box>
    </>
  )
}