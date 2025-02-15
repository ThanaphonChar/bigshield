import React, { useState } from 'react';

const Part3 = () => {
  const [formData, setFormData] = useState({
    currentResidence: '',
    specificDescription: '',
    rentalOption: '',
  });

  const handleResidenceChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      currentResidence: event.target.value,
    }));
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      rentalOption: value,
      currentResidence: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ flex: 1, textAlign: 'center', fontSize: '18px', margin: 0 }}>
          ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
        </h1>
      </div>

      {/* Content */}
      <div style={{ margin: '20px auto', width: '100%' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>3. สถานภาพที่อยู่อาศัย</h3>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>(แนบรูปถ่ายที่อยู่อาศัยถ้ามี)</p>

        <form>
          {/* Radio Buttons for Residence Status */}
          <div style={{ marginBottom: '10px' }}>
            {[
              'มีที่อยู่อาศัยเป็นของตนเองและมั่นคงถาวร',
              'มีที่อยู่อาศัยเป็นของตนเองแต่ไม่มั่นคงถาวร',
              'อาศัยอยู่กับผู้อื่น',
              'อยู่ในที่ดินบุคคลอื่น',
              'พื้นที่สาธารณะ',
              'บ้านเช่า',
            ].map((option, index) => (
              <label key={index} style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="currentResidence"
                  value={option}
                  checked={formData.currentResidence === option}
                  onChange={handleResidenceChange}
                  style={{ marginRight: '8px' }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Nested Radio Options for "บ้านเช่า" */}
          {formData.currentResidence === 'บ้านเช่า' && (
            <div style={{ marginLeft: '20px', marginTop: '5px' }}>
              {['เช่าซื้อ', 'เช่ารายเดือน'].map((subOption, subIndex) => (
                <label key={subIndex} style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  <input
                    type="radio"
                    name="rentalOption"
                    value={subOption}
                    checked={formData.rentalOption === subOption}
                    onChange={handleRadioChange}
                    style={{ marginRight: '8px' }}
                  />
                  {subOption}
                </label>
              ))}
            </div>
          )}

          {/* Specific Description */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
              โปรดระบุลักษณะที่อยู่อาศัย
            </label>
            <input
              type="text"
              name="specificDescription"
              value={formData.specificDescription}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Part3;
