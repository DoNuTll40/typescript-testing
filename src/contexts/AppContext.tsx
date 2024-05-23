
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

interface AppContextValue {
  user: User | null;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppContextProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProps) {

  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const rs = await axios.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (rs.status === 200) {
        setUser(rs.data);
      }

    } catch (err: any) {
    
      console.log(err)

      if(err.response.data.message === "TokenExpiredError"){
        alert("ผู้ใช้งานของคุณหมดอายุ โปรดเข้าสู่ระบบใหม่")
        localStorage.removeItem('token')

      }else{
          alert("Fetch unsuccess!");
      }

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const value = { user, logout, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContextProvider };
export default AppContext;
