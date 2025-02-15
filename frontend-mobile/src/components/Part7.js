import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Part7 = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [answers, setAnswers] = useState({
    q1: { value: '', note: '' },
    q2: { value: '', note: '' },
    q3: { value: '', note: '' },
    q4: { value: '', note: '' },
    q5: { value: '', note: '' },
  });

  // ฟังก์ชันสำหรับเปลี่ยนค่าของคำตอบในแต่ละข้อ
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.type === 'note') {
      setAnswers({
        ...answers,
        [name]: { ...answers[name], note: value },
      });
    } else {
      setAnswers({
        ...answers,
        [name]: { ...answers[name], value },
      });
    }
  };

  // ฟังก์ชันคำนวณคะแนนรวม
  const calculateScore = () => {
    return Object.values(answers).reduce((total, { value }) => total + parseInt(value || 0, 10), 0);
  };

  // ฟังก์ชันสำหรับการส่งข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = calculateScore(); // คำนวณคะแนนรวม
    console.log('คะแนนรวมทั้งหมด:', totalScore);
    console.log('หมายเหตุ:', answers);
    navigate('/part8'); // เปลี่ยนหน้าไปยังหน้าถัดไป
  };

  // ฟังก์ชันสร้างคำถามแบบหลายตัวเลือก
  const renderRadioButtons = (question, name) => (
    <div style={{ marginBottom: '20px' }}>
      <label>{question}</label>
      <p>คำตอบ</p>
      <div>
        {[0, 1, 2, 3].map((value) => (
          <label key={value} style={{ display: 'block', marginBottom: '5px' }}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={answers[name].value === value.toString()}
              onChange={handleChange}
            />{' '}
            {value === 0
              ? '0 น้อยที่สุด'
              : value === 1
              ? '1 น้อย'
              : value === 2
              ? '2 ปานกลาง'
              : '3 มาก'}
          </label>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>หมายเหตุ:</label>
        <textarea
          name={name}
          data-type="note"
          value={answers[name].note}
          onChange={handleChange}
          rows="1"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
        ส่วนที่ 2 - การประเมินสภาวะครอบครัว
      </h1>
      <p>
      3. กระบวนการยุติธรรม
นิยาม ช่องทางทางกฎหมายในการคุ้มครอง
ประชาชนทุกคน ซึ่งเป็นสิ่งสําคัญที่ทุกคนควรจะรู้ 
เพื่อสิทธิที่เท่าเทียม
      </p>

      <div style={{
        border: '1px solid #000',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        margin: '20px 0'
      }}>
        <p style={{ margin: '5px 0' }}>ค่าคะแนน</p>
        <p style={{ margin: '5px 0' }}>3 = ได้รับการคุ้มครองสิทธิ เสรีภาพและความเป็นธรรมในทางกฎหมาย</p>
        <p style={{ margin: '5px 0' }}>2 = ได้รับความคุ้มครองสิทธิ เสรีภาพและความเป็นธรรมแค่บางส่วน</p>
        <p style={{ margin: '5px 0' }}>1 = ไม่ได้รับความคุ้มครองสิทธิ เสรีภาพและความเป็นธรรม แต่มีเจ้าหน้าที่ให้คําแนะนํา</p>
        <p style={{ margin: '5px 0' }}>0 =  ไม่ได้รับความคุ้มครองสิทธิ เสรีภาพและความเป็นธรรม </p>
      </div>

      <form onSubmit={handleSubmit}>
        {renderRadioButtons(
          '1. สมาชิกในครอบครัวของท่านมีความสามารถจัดการความขัดแย้งระหว่างครอบครัวตนเองและผู้อื่นได้',
          'q1'
        )}
        {renderRadioButtons(
          '2.สมาชิกในครอบครัวของท่านเคยมีข้อพิพาทและมีความสามารถในการจัดการกับข้อพิพาทด้วยตนเอง',
          'q2'
        )}
        {renderRadioButtons(
          '3. สมาชิกในครอบครัวของท่านเคยได้รับความช่วยเหลือจากหน่วยงานในการจัดการข้อพิพาท',
          'q3'
        )}
        {renderRadioButtons(
          '4. สมาชิกในครอบครัวของท่านมีญาติ พี่น้องที่มีความรู้ด้านกฎหมายที่สามารถปรึกษาได้',
          'q4'
        )}
        {renderRadioButtons(
          '5. สมาชิกในครอบครัวของท่านมีงบประมาณเพียงพอในการจัดการกรณีเกิดข้อพิพาท',
          'q5'
        )}

        <div>
          <p>คะแนนเฉลี่ย {calculateScore()}</p>
        </div>
      </form>
    </div>
  );
};

export default Part7;
