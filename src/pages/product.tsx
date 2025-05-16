import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { itemService } from "../../services/api/endpoints/item";
import Header from "../components/Header";

interface Product {
  name: string,
  description: string,
  quantity: number,
  weight: number,
  dimentions: string,
  storage_id: number,
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = async () => {
    await itemService.getProducts()
      .then(res => {
        console.log(res)
        setProducts(res)
      })
      .catch(e => console.log(e))
      .finally(() => { })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <Box sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}>
        <Header title="Товары" />

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
            <Typography sx={{ flex: 3, margin: 2,  fontSize: 18, fontWeight: 700 }}>Название</Typography>
            <Typography sx={{ flex: 2.5, margin: 2, fontSize: 18, fontWeight: 700 }}>Описание</Typography>
            <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Габариты</Typography>
            <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Количество</Typography>
            <Typography sx={{ flex: 1, margin: 2, fontSize: 18, fontWeight: 700 }}>Вес</Typography>
          </Box>

          {products.map((product, index) => (
            <Box
              key={index} 
              sx={{
                display: "flex",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                }
              }}>
              <Typography sx={{ flex: 3, margin: 2 }}>{product.name}</Typography>
              <Typography sx={{ flex: 2.5, margin: 2 }}>{product.description}</Typography>
              <Typography sx={{ flex: 1, margin: 2 }}>{(product.dimentions).split(", ").join("см, ")}см</Typography>
              <Typography sx={{ flex: 1, margin: 2 }}>{product.quantity}</Typography>
              <Typography sx={{ flex: 1, margin: 2}}>{product.weight} кг</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}