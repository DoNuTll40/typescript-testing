import axios from "../../configs/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { setUser } = useAuth()!;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: ""
  });

  const hdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.username === "" || input.password === "") {
      alert("Please enter your fill");
      return;
    }

    try {
      const rs = await axios.post('/auth/adminLogin', input);
      localStorage.setItem('token', rs.data.token);

      const rs1 = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${rs.data.token}`
        }
      });

      if (rs1.status === 200) {
        setUser(rs1.data);
        navigate('/')
        location.reload();
      }
    } catch (err: any) {
      // console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="bg-[url('https://cdn.hero.page/wallpapers/6dc32bbc-f757-43a6-929a-5ea6ec7abab3-pastel-colored-skylines-wallpaper-3.png')] bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center">
      <div className="p-5 h-[500px] w-[450px] bg-white/70 backdrop-blur-md rounded-lg shadow-lg flex justify-between flex-col">
        <div className="flex justify-center items-center h-1/6 font-bold text-lg">เข้าสู่ระบบ</div>
        <form onSubmit={hdlSubmit} className="flex flex-col justify-between h-[300px] py-3">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm" htmlFor="username">ชื่อผู้ใช้งาน</label>
              <input 
                id="username"
                name="username"
                value={input.username}
                onChange={hdlChange}
                className="w-full p-2 rounded-md border-none focus:outline-pink-400 focus:outline-offset-2 focus:ring-transparent" 
                type="text" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm" htmlFor="password">รหัสผ่าน</label>
              <input 
                id="password"
                name="password"
                value={input.password}
                onChange={hdlChange}
                className="w-full p-2 rounded-md border-none focus:outline-pink-400 focus:outline-offset-2 focus:ring-transparent" 
                type={showPassword ? "text" : "password"} 
              />
            </div>
            <label className="text-sm font-semibold flex items-center select-none cursor-pointer w-fit">
              <input 
                className="text-pink-500 w-5 h-5 mr-2 focus:ring-pink-400 focus:ring-opacity-25 border border-gray-300 rounded-full" 
                type="checkbox" 
                checked={showPassword} 
                onChange={() => setShowPassword(prev => !prev)} 
              />
              <span>แสดงรหัสผ่าน</span>
            </label>
          </div>
          <div>
            <input 
              className="bg-pink-700 p-2 w-full rounded-md text-white font-bold" 
              type="submit" 
              value="เข้าสู่ระบบ" 
            />
          </div>
        </form>
        <hr />
        <div className="flex gap-2 flex-col pt-3">
          <button className='bg-white p-1 w-full rounded-md' onClick={() => navigate('/')}>ย้อนกลับ</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
