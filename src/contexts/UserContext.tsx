import axios from "../configs/axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
    user_id: string;
    user_username: string;
    class_id: string;
    user_address: string;
    user_brithday: string;
    user_email: string;
    user_firstname: string;
    user_identity: string;
    user_image: string;
    user_lastname: string;
    user_nameprefix: string;
    user_nickname: string;
    user_password: string;
    user_phone: string;
    user_role: string;
  }

interface UserContextValue {
    userAll:User | any;
    setReload: (reload: boolean) => void
}

const UserContext = createContext<UserContextValue | null>(null)

interface UserContextProps {
    children: ReactNode;
}

function UserContextProvider({ children }: UserContextProps) {

    const [userAll, setUserAll] = useState<User | any>([])
    const [reload, setReload] = useState(false)

    let token = localStorage.getItem('token')

    useEffect( () => {
        const getUser = async () => {
            const rs = await axios.get('/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserAll(rs.data.user)
        }
        getUser()
    }, [reload] )

    const value = { userAll, setReload }

  return <UserContext.Provider value={ value }>{children}</UserContext.Provider>
}

export { UserContextProvider };
export default UserContext;