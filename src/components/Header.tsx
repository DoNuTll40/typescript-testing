import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Banner from "./Banner";

function Header() {
  const { user, logout } = useAuth()!;

    const navigate = useNavigate();

    const hdlLogout = () => {
        navigate('/')
        logout()
    }

  return (
    <>
        <Banner />
        <div className="h-14 bg-pink-600/70 backdrop-blur-sm flex items-center justify-between sticky-header px-5 border-b border-gray-100 z-0">
            <div className="w-[200px] flex justify-start">
                {user !== null ? (
                <p className="text-white font-bold drop-shadow-md">ชื่อผู้เข้าระบบ {user?.user_firstname}</p>
                ) : ""}
            </div>
            <div className="w-[200px] flex justify-center flex-col">
                <p className="text-white text-lg font-bold text-center">TypeScript</p>
                <p className="text-white text-sm font-bold text-center">How to coding typescript</p>
            </div>
            <div className="w-[200px] flex justify-end">
                {user !== null ? (
                    <button className="p-2 rounded-md border-2 border-white text-white font-bold shadow-md hover:bg-white hover:text-pink-400 transition ease-in-out duration-200" onClick={hdlLogout}>ออกจากระบบ</button>
                ) : (
                    <button className="p-2 rounded-md border-2 border-white text-white font-bold shadow-md hover:bg-white hover:text-pink-400 transition ease-in-out duration-200" onClick={ () => navigate('/login')}>เข้าสู่ระบบ</button>
                )}
            </div>
        </div>
    </>
  );
}

export default Header;
