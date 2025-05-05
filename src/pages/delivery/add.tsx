import { Box, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Header from "../../components/Header";
import { forwardRef, useState } from "react";
import { itemService } from "../../../services/api/endpoints/item";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddDelivery() {
  const [from, setFrom] = useState<string>("")
  const [fromAddress, setFromAddress] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [toAddress, setToAddress] = useState<string>("")
  const [product, setProduct] = useState<number>()
  const [amount, setAmount] = useState<number>()
  const [datetime, setDatetime] = useState<Date | null>(null);

  const handleAddDelivery = () => {
    console.log(from, fromAddress, to, toAddress, product, amount, datetime)
    if(datetime == null) return;
    if(product == null) return;
    if(amount == null) return;

    itemService.addDelivery({
      from: from,
      from_address: fromAddress,
      to: to, 
      to_address: toAddress,
      product_id: product,
      amount: amount,
      datetime: datetime.toISOString()
    })
    .then(res => console.log(res))
    .catch()
    .finally()
  }

  const CustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
    <Button className="custom-date-button" onClick={onClick} ref={ref} sx={{
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      background: "#fff",
      cursor: "pointer",
    }}>
      {value || "Выберите дату"}
    </Button>
  ));

  return (
    <>
      <Box sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}>
        <Header title="Добавить перевозку"></Header>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          <TextField label="Город отправления" variant="outlined" value={from} onChange={(e) => setFrom(e.target.value)} />
          <TextField label="Адрес отправления" variant="outlined" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />

          <TextField label="Город назначения" variant="outlined" value={to} onChange={(e) => setTo(e.target.value)} />
          <TextField label="Адрес назначения" variant="outlined" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />

          <DatePicker
            showTimeSelect
            dateFormat="dd.MM.yyyy HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Время"
            selected={datetime}
            onChange={(date: Date | null) => setDatetime(date)}
            popperPlacement="top"
            withPortal
            customInput={<CustomInput />}
          />

          <TextField label="Товар" variant="outlined" value={product} onChange={(e) => setProduct(+e.target.value)} />
          <TextField label="Количество" variant="outlined" value={amount} onChange={(e) => setAmount(+e.target.value)} />

        </Box>

        <Button
          onClick={() => handleAddDelivery()}
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
          Добавить перевозку
        </Button>
      </Box>
    </>
  )
}