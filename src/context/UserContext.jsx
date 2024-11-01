import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"

const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [usuario, setUsuario] = useState({})
    useEffect(() => {
        setUsuario({
            name:'Ernesto',
            registered: '10/31/2024'
        })
    }, [])

    return (
        <UserContext.Provider value={usuario}>
            {children}
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes = {
    children: PropTypes.node
}

export {UserContext, UserContextProvider}