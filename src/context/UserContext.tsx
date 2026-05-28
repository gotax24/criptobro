import { createContext, useEffect, useState } from "react"
import axios from "axios"

const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const randomNumber = Math.floor(Math.random() * 12) + 1;


    const [usuario, setUsuario] = useState({})
    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${randomNumber}`)
        .then(data => {
            setUsuario(data.data.data)
        })
        .catch(e => console.error(e))
    }, [randomNumber])

    return (
        <UserContext.Provider value={usuario}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}