import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const response = await fetch('/LoginData.json'); // ใช้เส้นทางนี้ถ้าไฟล์อยู่ใน public
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        setLoginData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    fetchLoginData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบว่าข้อมูลที่กรอกตรงตามที่ดึงมาหรือไม่
    const user = loginData.find(item => 
      (item.email === email || item.username === email) && item.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      navigate('/'); // ไปยังหน้า Map หรือ Home
    } else {
      alert('Please, Login again');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[]">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-12">Sign In</h2>

        {/* ฟิลด์ email/username */}
        <div className="relative mb-4">
          <label
            className={`absolute left-3 top-2 transition-all ${
              emailFocused || email ? '-translate-y-6 text-sm text-gray-600' : 'text-gray-400'
            }`}
          >
            Enter Email or Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#1B0F33] mb-6"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown} // ตรวจจับการกด Enter
          />
        </div>

        {/* ฟิลด์ password */}
        <div className="relative mb-6">
          <label
            className={`absolute left-3 top-2 transition-all ${
              passwordFocused || password ? '-translate-y-6 text-sm text-gray-600' : 'text-gray-400'
            }`}
          >
            Enter Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#1B0F33] mb-6"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // ตรวจจับการกด Enter
          />
        </div>

        {/* ปุ่ม Sign In */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#1B0F33] text-white py-2 rounded-md hover:bg-[#1B0F33] transition mb-3"
        >
          Sign In
        </button>

        {/* ลิงก์ Forgot Password */}
        <p className="text-center text-sm text-gray-600 mt-4">Forgot password?</p>
      </div>
    </div>
  );
};

export default Login;
