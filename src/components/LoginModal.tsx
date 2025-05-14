import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function LoginModal() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        setLogin("")
        setPassword("")
    }, [])

    return (
        <>
            <Box>
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
            </Box>
        </>
    )
}