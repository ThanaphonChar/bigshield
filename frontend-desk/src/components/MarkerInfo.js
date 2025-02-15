import { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo.js';
import HouseholdInfosData from '../getData/HouseholdInfoData.js';
import RespondentsData from '../getData/RespondentsData';
import { RadarChartComponent } from "./RadarChartComponent.tsx";
// import RadarChart from './RadarLevel';

import 'bootstrap-icons/font/bootstrap-icons.css';

const MarkerInfo = ({ selectedMarker, setSelectedMarker }) => {
  const [expanded, setExpanded] = useState(null);

  const { data: Respondent } = RespondentsData();
  const RespondentSelected = Respondent.find((data) => data.household_id === selectedMarker.item.household_id);
  const firstLastName = RespondentSelected ? RespondentSelected.first_last_name : "ไม่ทราบชื่อ";
  const age = RespondentSelected ? RespondentSelected.age : "ไม่ทราบอายุ";

  const { data: HouseholdInfo } = HouseholdInfosData();
  const HouseholdInfoselected = HouseholdInfo.find((data) => data.household_id === selectedMarker.item.household_id);
  const residence_status = HouseholdInfoselected ? HouseholdInfoselected.residence_status : "ไม่ทราบ";
  const rental_type = HouseholdInfoselected ? HouseholdInfoselected.rental_type : "ไม่ทราบ";
  const additional_details = HouseholdInfoselected ? HouseholdInfoselected.additional_details : "ไม่ทราบ";
  const created_at = HouseholdInfoselected ? HouseholdInfoselected.created_at : "ไม่ทราบ";
  const updated_at = HouseholdInfoselected ? HouseholdInfoselected.updated_at : "ไม่ทราบ";
  const house_number = HouseholdInfoselected ? HouseholdInfoselected.house_number : "ไม่ทราบ";
  const village_no = HouseholdInfoselected ? HouseholdInfoselected.village_no : "ไม่ทราบ";


  const handleClose = () => {
    setSelectedMarker(null);
  };

  const handleMore = () => {
    setExpanded(true);
  };

  // useEffect(() => {
  //   console.log("HAHAHA", selectedMarker.item.part1);
  // }, [selectedMarker.item.part1]);

  // const jsonData = {
  //   part2: {
  //     ครอบครัว: { avg: selectedMarker.item.part2.first.avg, score: selectedMarker.item.part2.first.score },
  //     รายได้และงาน: { avg: selectedMarker.item.part2.second.avg, score: selectedMarker.item.part2.second.score },
  //     ความยุติธรรม: { avg: selectedMarker.item.part2.third.avg, score: selectedMarker.item.part2.third.score },
  //     ความปลอดภัย: { avg: selectedMarker.item.part2.fourth.avg, score: selectedMarker.item.part2.fourth.score },
  //     บริการสังคม: { avg: selectedMarker.item.part2.fifth.avg, score: selectedMarker.item.part2.fifth.score },
  //     การศึกษา: { avg: selectedMarker.item.part2.sixth.avg, score: selectedMarker.item.part2.sixth.score },
  //     ที่อยู่อาศัย: { avg: selectedMarker.item.part2.seventh.avg, score: selectedMarker.item.part2.seventh.score },
  //     สุขภาพ: { avg: selectedMarker.item.part2.eighth.avg, score: selectedMarker.item.part2.eighth.score }
  //   }
  // };

  if (!selectedMarker && !HouseholdInfoselected && !RespondentSelected) return null;

  return (
    <div
      className="absolute top-18 right-6 bg-white p-4 rounded-lg shadow-lg max-w-sm w-full z-100 overflow-y-auto"
      style={{ maxWidth: '430px', width: '90%', maxHeight: '93vh' }} // จำกัดความสูงหน้าต่าง
    >
      <button
        onClick={handleMore}
        className="absolute top-3 left-4 text-gray-500 hover:text-gray-700"
      >
        <i className="bi bi-arrows-angle-expand"></i>
      </button>
      <button onClick={handleClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl">
        &times;
      </button>

      {/* Profile Picture Placeholder */}
      <div className="mt-10">
        <div className="flex justify-center mb-10">
          <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400">ภาพ</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <h2 className="text-lg font-bold">
        {firstLastName}, {age} ปี
      </h2>
      <p className="text-ml text-gray-600 mt-2">
        <b>ที่อยู่:</b> {selectedMarker.item.house_number} หมู่ที่ {selectedMarker.item.village_no} {selectedMarker.item.alley} {selectedMarker.item.street}
        ตำบล{selectedMarker.item.sub_district} อำเภอ{selectedMarker.item.district} จังหวัด{selectedMarker.item.province} {selectedMarker.item.postal_code}
      </p>
      <p className="text-ml text-gray-600 mt-2">
        <b>พิกัด:</b> {selectedMarker.item.latitude},{' '}
        {selectedMarker.item.longitude}
      </p>
      <p className="text-ml text-gray-600 mt-2">
        <b>สภาพที่อยู่อาศัย:</b> {additional_details}
      </p>

      {/* <RadarChartComponent data={jsonData} /> */}

      {/* Survey Summary */}
      <div className="mt-2">
        <p className="text-sm ">
          <b>สรุปผลการสำรวจ</b>
        </p>
        <p className="text-sm text-gray-600">{selectedMarker.household_id}</p>
        <p className="text-sm text-gray-500 text-right mt-3">
          สำรวจ ณ วันที่ {selectedMarker.item.household_id}
        </p>
      </div>

      {expanded && (
        <MoreInfo
          setExpanded={setExpanded}
          setSelectedMarker={setSelectedMarker}
          selectedMarker={selectedMarker}
        />
      )}
    </div>
  );
};

export default MarkerInfo;
