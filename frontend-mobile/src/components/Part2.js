import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Part2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    placeName: '',
    houseCode: '',
    houseNumber: '',
    village: '',
    subDistrict: '',
    alley: '',
    road: '',
    district: '',
    province: '',
    postalCode: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/http://localhost:3000/api/households', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Response from server:', result);

      setStatusMessage('ข้อมูลถูกบันทึกสำเร็จ!');
      navigate('/part3'); // เปลี่ยนเส้นทางไป Part3
    } catch (error) {
      console.error('Error submitting data:', error);
      setStatusMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
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
      <h3 style={{ marginBottom: '10px' }}>2. ที่อยู่ปัจจุบัน</h3>

      <form onSubmit={handleSubmit}>
        <label>พิกัด GPS</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input name="latitude" placeholder="" value={formData.latitude} onChange={handleChange} />
          <input name="longitude" placeholder="" value={formData.longitude} onChange={handleChange} />
        </div>

        <label>ชื่อสถานที่/ชื่ออาคาร/ชื่อหมู่บ้าน:</label>
        <input name="placeName" placeholder="" value={formData.placeName} onChange={handleChange} />

        <label>รหัสประจำบ้าน:</label>
        <input name="houseCode" placeholder="" value={formData.houseCode} onChange={handleChange} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <label>บ้านเลขที่:</label>
            <input name="houseNumber" placeholder="" value={formData.houseNumber} onChange={handleChange} />
          </div>
          <div>
            <label>หมู่ที่:</label>
            <input name="village" placeholder="" value={formData.village} onChange={handleChange} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <label>ตรอก:</label>
            <input name="alley" placeholder="" value={formData.alley} onChange={handleChange} />
          </div>
          <div>
            <label>ซอย:</label>
            <input name="subDistrict" placeholder="" value={formData.subDistrict} onChange={handleChange} />
          </div>
        </div>

        <label>ถนน:</label>
        <input name="road" placeholder="" value={formData.road} onChange={handleChange} />

        <label>ตำบล/แขวง:</label>
        <input name="district" placeholder="" value={formData.district} onChange={handleChange} />

        <label>อำเภอ/เขต:</label>
        <input name="province" placeholder="" value={formData.province} onChange={handleChange} />

        <label>จังหวัด:</label>
        <input name="province" placeholder="" value={formData.province} onChange={handleChange} />

        <label>รหัสไปรษณีย์:</label>
        <input name="postalCode" placeholder="" value={formData.postalCode} onChange={handleChange} />

        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>บันทึกข้อมูล</button>
      </form>

      {statusMessage && <p style={{ color: 'red', marginTop: '10px' }}>{statusMessage}</p>}
    </div>
  );
};

export default Part2;
