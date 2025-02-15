import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับเปลี่ยนเส้นทาง

const Part1 = () => {
  const navigate = useNavigate(); // เรียกใช้ useNavigate สำหรับการเปลี่ยนหน้า

  const [formData, setFormData] = useState({
    name: '',
    idCard: '',
    reason: '',
    birthDate: '',
    age: '',
    gender: '',
    relationship: '',
    education: '',
    phone: '',
    mobilePhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ข้อมูลฟอร์มที่กรอก:', formData);
    navigate('/part2'); // เปลี่ยนเส้นทางไปยัง Part2 ทันที
  };

  const handleBack = () => {
    navigate(-1); // พาย้อนกลับไปยังหน้าก่อนหน้า
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: '18px', margin: 0 }}>
          ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
        </h1>
      </div>
      <h3 style={{ marginBottom: '10px' }}>1. ข้อมูลผู้ตอบแบบสอบถาม</h3>
      <p style={{ color: 'red' }}>(ข้อมูลที่กรอกจะเป็นความลับทั้งหมด)</p>
      <form onSubmit={handleSubmit}>
        <label>ชื่อ - นามสกุล:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>เลขที่บัตรประชาชน:</label>
        <input
          name="idCard"
          value={formData.idCard}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>กรณีไม่มี เนื่องจาก:</label>
        <input
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>วัน/เดือน/ปีเกิด:</label>
        <input
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>อายุ:</label>
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>เพศ:</label>
        <input
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>ลักษณะความสัมพันธ์:</label>
        <input
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>ระดับการศึกษา:</label>
        <input
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>โทรศัพท์:</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>โทรศัพท์มือถือ:</label>
        <input
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </form>
    </div>
  );
};

export default Part1;
