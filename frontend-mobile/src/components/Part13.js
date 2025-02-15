import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Part13 = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [answers, setAnswers] = useState({});
  const [otherInput, setOtherInput] = useState(''); // State for "อื่นๆ" input field

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: {
        ...prevAnswers[name],
        [value]: checked,
      },
    }));
  };

  const handleOtherInputChange = (e) => {
    setOtherInput(e.target.value);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      'อื่นๆ': e.target.value, // Add "อื่นๆ" input to the answers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('คำตอบทั้งหมด:', answers);
    navigate('/next-page');
  };

  const renderCheckboxGroup = (groupName, options) => (
    <div style={{ marginBottom: '20px' }}>
      <h3>{groupName}</h3>
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              name={groupName}
              value={option}
              onChange={handleCheckboxChange}
            />
            {option}
          </label>
          {option === 'อื่นๆ' && answers[groupName]?.['อื่นๆ'] && (
            <div style={{ marginTop: '10px', marginLeft: '20px' }}>
              <input
                type="text"
                placeholder="กรุณาระบุ"
                value={otherInput}
                onChange={handleOtherInputChange}
                style={{ width: '100%', padding: '8px', fontSize: '14px' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
        ส่วนที่ 3 - การเข้าถึงและสวัสดิการสังคมที่ได้รับ
      </h1>
      <form onSubmit={handleSubmit}>
        {renderCheckboxGroup('1. กลุ่มเป้าหมาย เด็กและเยาวชนสวัสดิการสังคมที่ได้รับ', [
          'เงินอุดหนุนเด็กแรกเกิด',
          'เงินสงเคราะห์บุตรประกันสังคม',
          'เงินสงเคราะห์เด็กยากจน',
          'เงินอุดหนุนช่วยเหลือค่าเลี้ยงดูในครอบครัวอุปถัมภ์',
          'เงินกองทุนคุ้มครองเด็ก',
          'สภาเด็กและเยาวชน',
        ])}

        {renderCheckboxGroup('2. กลุ่มเป้าหมาย ผู้สูงอายุสวัสดิการสังคมที่ได้รับ', [
          'เบี้ยยังชีพผู้สูงอายุ',
          'กองทุนผู้สูงอายุ',
          'การสงเคราะห์ผู้สูงอายุ',
          'เงินสงเคราะห์ค่าจัดการศพผู้สูงอายุตามประเพณี',
          'ปรับสภาพซ่อมแซมที่อยู่อาศัยสําหรับผู้สูงอายุ',
          'การอุปการะผู้สูงอายุในสถานสงเคราะห์',
          'โรงเรียนสร้างสุข สามฝั่งแกน(โรงเรียนผู้สูงอายุ)',
        ])}

        {renderCheckboxGroup('3. กลุ่มเป้าหมาย ผู้พิการสวัสดิการสังคมที่ได้รับ', [
          'บัตรประจําตัวคนพิการ',
          'เบี้ยความพิการ',
          'เงินทุนหมุนเวียนให้คนพิการกู้ยืมประกอบอาชีพ',
          'ปรับสภาพซ่อมแซมที่อยู่อาศัยสําหรับผู้พิการ',
          'การจ้างงานคนพิการ',
          'บริการผู้ช่วยคนพิการ',
        ])}

        {renderCheckboxGroup('4. กลุ่มเป้าหมาย ผู้ป่วยติดเตียงสวัสดิการสังคมที่ได้รับ', [
          'กองทุนฟื้นฟูสมรรถภาพ',
          'กองทุนฟื้นฟูในระบบพึ่งพิง (LTC)',
          'บริการรถรับ-ส่งผู้ป่วย',
        ])}

        {renderCheckboxGroup('5. กลุ่มเป้าหมาย สตรีและครอบครัวสวัสดิการสังคมที่ได้รับ', [
          'การให้ความช่วยเหลือผ่าน OSCC ศูนย์ช่วยเหลือทางสังคม 1300',
          'เงินสงเคราะห์ครอบครัว',
          'กองทุนพัฒนาบทบาทสตรี',
          'กลุ่มองค์กรสตรีแม่บ้าน',
        ])}

        {renderCheckboxGroup('6. กลุ่มเป้าหมาย ผู้ป่วยเอดส์สวัสดิการสังคมที่ได้รับ', [
          'เบี้ยผู้ป่วยเอดส์',
        ])}

        {renderCheckboxGroup('7. กลุ่มเป้าหมาย ทหารผ่านศึกสวัสดิการสังคมที่ได้รับ', [
          'การสงเคราะห์เงินเลี้ยงชีพพิเศษ',
          'การสงเคราะห์เงินช่วยเหลือรายเดือนแก่ครอบครัวทหารผ่านศึก บัตรชั้นที่ 1',
          'เงินช่วยเหลือรายเดือนทหารผ่านศึกนอกประจําการบัตรชั้นที่ 2,3,4',
          'การสงเคราะห์เยี่ยมเยียนทหารผ่านศึกและครอบครัวเป็นครั้งคราว',
        ])}

        {renderCheckboxGroup('8. กลุ่มเป้าหมาย ประชาชนทั่วไปสวัสดิการสังคมที่ได้รับ', [
          'หลักประกันสุขภาพแห่งชาติ หรือ บัตรทอง(30 บาทรักษาทุกโรค)',
          'กองทุนประกันสังคม',
          'การฝึกอาชีพ',
          'สิทธิทางการศึกษาขั้นพื้นฐานไม่น้อยกว่า 12 ปี(เรียนฟรี 15 ปี)',
          'เงินสมทบกองทุนการออมแห่งชาติ',
          'อื่นๆ',
        ])}
      </form>
    </div>
  );
};

export default Part13;
