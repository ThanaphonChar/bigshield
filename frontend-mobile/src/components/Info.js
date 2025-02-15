import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // สำหรับการเปลี่ยนเส้นทาง
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';
import Part5 from './Part5';
import Part6 from './Part6';
import Part7 from './Part7';
import Part8 from './Part8';
import Part9 from './Part9';
import Part10 from './Part10';
import Part11 from './Part11';
import Part12 from './Part12';
import Part13 from './Part13';


const Info = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const navigate = useNavigate(); // เรียกใช้ useNavigate สำหรับการเปลี่ยนเส้นทาง

  const nextPart = () => {
    if (currentPart < 13) {
      setCurrentPart(currentPart + 1); // เพิ่ม Part ถัดไป
    }
  };

  const prevPart = () => {
    if (currentPart === 1) {
      navigate('/home'); // เมื่ออยู่ใน Part1 และกด ← จะไปที่หน้า Home
    } else if (currentPart > 1) {
      setCurrentPart(currentPart - 1); // ย้อนกลับไปส่วนก่อนหน้า
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial', position: 'relative' }}>
      {currentPart === 1 && <Part1 />}
      {currentPart === 2 && <Part2 />}
      {currentPart === 3 && <Part3 />}
      {currentPart === 4 && <Part4 />}
      {currentPart === 5 && <Part5 />}
      {currentPart === 6 && <Part6 />}
      {currentPart === 7 && <Part7 />}
      {currentPart === 8 && <Part8 />}
      {currentPart === 9 && <Part9 />}
      {currentPart === 10 && <Part10 />}
      {currentPart === 11 && <Part11 />}
      {currentPart === 12 && <Part12 />}
      {currentPart === 13 && <Part13 />}

      {/* ปุ่ม ← ที่มุมซ้ายบน */}
      <button 
        onClick={prevPart} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '20px'
        }}
      >
        ←
      </button>

      {/* ปุ่ม ถัดไป ที่มุมขวาล่าง */}
      <button 
        onClick={nextPart} 
        disabled={currentPart === 13} // Disable the "Next" button when you're on Part 7
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '15px'
        }}
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Info;
