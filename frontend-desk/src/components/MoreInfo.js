import React, { useState } from 'react';
import HouseholdInfosData from '../getData/HouseholdInfoData.js';
import RespondentsData from '../getData/RespondentsData';
import FamilyMembersData from '../getData/FamilyMembersData.js';
import AssessmentSummaryData from '../getData/AssessmentSummaryData.js';
import SocialWelfareData from '../getData/SocialWelfareData.js';
import { RadarChartComponent } from "./RadarChartComponent.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MoreInfo = ({ setExpanded, setSelectedMarker, selectedMarker }) => {
    const [isSection1Open, setIsSection1Open] = useState(false);
    const [isSection2Open, setIsSection2Open] = useState(false);
    const [isSection3Open, setIsSection3Open] = useState(false);
    const [isSection4Open, setIsSection4Open] = useState(false);
    const [isSection5Open, setIsSection5Open] = useState(false);

    const { data: Respondent } = RespondentsData();
    const RespondentSelected = Respondent.find((data) => data.household_id === selectedMarker.item.household_id);
    const firstLastName = RespondentSelected ? RespondentSelected.first_last_name : "ไม่ทราบชื่อ";
    const updated = RespondentSelected ? RespondentSelected.updated_at : "ไม่ทราบอายุ";

    const { data: HouseholdInfo } = HouseholdInfosData();
    const HouseholdInfoselected = HouseholdInfo.find((data) => data.household_id === selectedMarker.item.household_id);

    const { data: AssessmentSummary } = AssessmentSummaryData();
    const AssessmentSummaryselected = AssessmentSummary.find((data) => data.household_id === selectedMarker.item.household_id);

    const { data: FamilyMember } = FamilyMembersData();

    const { data: SocialWelfare } = SocialWelfareData();
    const SocialWelfareSelected = SocialWelfare.find((data) => data.household_id === selectedMarker.item.household_id);

    console.log("halo welcome naja", SocialWelfareSelected);


    const items = [
        { key: "elderly_allowance", label: "เบี้ยยังชีพผู้สูงอายุ" },
        { key: "elderly_fund", label: "กองทุนผู้สูงอายุ" },
        { key: "elderly_support", label: "การสงเคราะห์ผู้สูงอายุ" },
        { key: "elderly_funeral", label: "เงินสงเคราะห์ค่าจัดการศพผู้สูงอายุตามประเพณี" },
        { key: "elderly_housing", label: "ปรับสภาพที่อยู่อาศัยสำหรับผู้สูงอายุ" },
        { key: "elderly_care_center", label: "การอุปการะผู้สูงอายุในสถานสงเคราะห์" },
    ];

    const handleClose = () => {
        setSelectedMarker(null);
    };

    const handleLess = () => {
        setExpanded(null);
    };

    const toggleSection = (section) => {
        switch (section) {
            case 1:
                setIsSection1Open(!isSection1Open);
                break;
            case 2:
                setIsSection2Open(!isSection2Open);
                break;
            case 3:
                setIsSection3Open(!isSection3Open);
                break;
            case 4:
                setIsSection4Open(!isSection4Open);
                break;
            case 5:
                setIsSection5Open(!isSection5Open);
                break;


            default:
                break;
        }
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        const dayDifference = today.getDate() - birth.getDate();

        // ปรับอายุถ้าเดือนหรือวันยังไม่ถึงวันเกิดในปีนี้
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }
        return age;
    };


    const jsonData = {
        part2: {
            ครอบครัว: { avg: AssessmentSummaryselected.family_relationship_score, score: AssessmentSummaryselected.family_relationship_score },
            รายได้และงาน: { avg: AssessmentSummaryselected.income_employment_score, score: AssessmentSummaryselected.income_employment_score },
            ความยุติธรรม: { avg: AssessmentSummaryselected.justice_process_score, score: AssessmentSummaryselected.justice_process_score },
            ความปลอดภัย: { avg: AssessmentSummaryselected.security_score, score: AssessmentSummaryselected.security_score },
            บริการสังคม: { avg: AssessmentSummaryselected.social_service_score, score: AssessmentSummaryselected.social_service_score },
            การศึกษา: { avg: AssessmentSummaryselected.education_score, score: AssessmentSummaryselected.education_score },
            ที่อยู่อาศัย: { avg: AssessmentSummaryselected.housing_score, score: AssessmentSummaryselected.housing_score },
            สุขภาพ: { avg: AssessmentSummaryselected.health_score, score: AssessmentSummaryselected.health_score }
        }
    };


    return (
        <div className="fixed inset-0 p-3 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full h-full p-8 shadow-lg overflow-y-auto relative flex flex-col">
                {/* Expand/Collapse Button */}
                <button onClick={handleLess} className="absolute top-4 left-6 text-gray-500 hover:text-gray-700">
                    <i className="bi bi-arrows-angle-contract"></i>
                </button>
                {/* Close Button */}
                <button onClick={handleClose} className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl">
                    &times;
                </button>

                <h2 className="text-center text-2xl font-bold mb-3">ข้อมูลแบบสำรวจ</h2>
                <h1 className="text-center text-ml mb-8">สำรวจ ณ วันที่ {updated}</h1>

                {/* Collapsible Sections */}
                <div className="mt-4">

                    <div className="mb-4">
                        <button
                            onClick={() => toggleSection(1)}
                            className="w-full bg-gray-200 p-4 text-left font-semibold rounded-lg flex justify-between items-center transition duration-300 ease-in-out"
                        >
                            ส่วนที่ 1 ข้อมูลทั่วไปของครัวเรือน
                            <span>{isSection1Open ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>
                        </button>
                        {isSection1Open && (
                            <div className="p-4 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out">
                                <h3><b>1. ข้อมูลผู้ตอบแบบสอบถาม</b></h3>
                                <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4">
                                    <p className="text-ml text-gray-600 mt-2">
                                        <b>ชื่อ</b>&nbsp;&nbsp;&nbsp;{firstLastName.split(' ')[0] === null ? '-' : firstLastName.split(' ')[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>นามสกุล</b>&nbsp;&nbsp;&nbsp;{firstLastName.split(' ')[1] === null ? '-' : firstLastName.split(' ')[1]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>เลขบัตรประชาชน</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.national_id === null ? '-' : RespondentSelected.national_id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>กรณีไม่มีเนื่องจาก</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.no_national_id_reason === null ? '-' : RespondentSelected.no_national_id_reason}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p className="text-ml text-gray-600 mt-4">
                                        <b>วัน/เดือน/ปีเกิด</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.birth_date === null ? '-' : RespondentSelected.birth_date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>อายุ</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.age === null ? '-' : RespondentSelected.age}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>เพศ</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.gender === 'female' ? 'หญิง' : RespondentSelected.gender === 'male' ? 'ชาย' : RespondentSelected.gender === null ? '-' : RespondentSelected.gender}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>ลักษณะความสัมพันธ์</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.relationship === null ? '-' : RespondentSelected.relationship}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>ระดับการศึกษา</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.education_level === null ? '-' : RespondentSelected.education_level}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p className="text-ml text-gray-600 mt-4">
                                        <b>โทรศัพท์</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.phone === null ? '-' : RespondentSelected.phone}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>โทรศัพท์มือถือ</b>&nbsp;&nbsp;&nbsp;{RespondentSelected.mobile_phone === null ? '-' : RespondentSelected.mobile_phone}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                </div>

                                <h3><b>2. ที่อยู่ปัจจุบัน</b></h3>
                                <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4">
                                    <p className="text-ml text-gray-600 mt-2">
                                        <b>พิกัด GPS:</b>&nbsp;&nbsp;&nbsp;
                                        ละติจูด&nbsp;&nbsp;&nbsp;{selectedMarker.item.latitude}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        ลองจิจูด&nbsp;&nbsp;&nbsp;{selectedMarker.item.longitude}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>รหัสประจำบ้าน</b>&nbsp;&nbsp;&nbsp;{firstLastName === null ? '-' : firstLastName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p className="text-ml text-gray-600 mt-4">
                                        <b>ที่อยู่</b>&nbsp;&nbsp;&nbsp;{selectedMarker.item.house_number === null ? '-' : selectedMarker.item.house_number}&nbsp;&nbsp;หมู่ที่ {selectedMarker.item.village_no === null ? '-' : selectedMarker.item.village_no}&nbsp;&nbsp;{selectedMarker.item.alley === null ? '-' : selectedMarker.item.alley}&nbsp;&nbsp;{selectedMarker.item.street === null ? '-' : selectedMarker.item.street}
                                        &nbsp;&nbsp;ตำบล{selectedMarker.item.sub_district === null ? '-' : selectedMarker.item.sub_district}&nbsp;&nbsp;อำเภอ{selectedMarker.item.district === null ? '-' : selectedMarker.item.district}&nbsp;&nbsp;จังหวัด{selectedMarker.item.province === null ? '-' : selectedMarker.item.province}&nbsp;&nbsp;{selectedMarker.item.postal_code === null ? '-' : selectedMarker.item.postal_code}
                                    </p>
                                </div>

                                <h3><b>3. สภาพที่อยู่อาศัย</b></h3>
                                <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4">
                                    <p className="text-ml text-gray-600 mt-4">
                                        <b>สภาพที่อยู่อาศัย</b>&nbsp;&nbsp;&nbsp;{HouseholdInfoselected.additional_details === null ? '-' : HouseholdInfoselected.additional_details}
                                    </p>
                                    <p className="text-ml text-gray-600 mt-4">
                                        <b>ลักษณะที่อยู่อาศัย</b>&nbsp;&nbsp;&nbsp;{HouseholdInfoselected.rental_type === null ? '-' : HouseholdInfoselected.rental_type}
                                    </p>
                                </div>


                                <h3><b>4. สมาชิกครอบครัว</b></h3>
                                <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4">
                                    <table className="table-auto w-full text-left border-collapse border border-gray-300">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-2 text-center">ที่</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">เลขบัตรประชาชน</th>
                                                <th className="border border-gray-300 px-2 py-2 text-center">วัน/เดือน/ปีเกิด</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">อายุ</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">เพศ</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">ลักษณะความสัมพันธ์</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">อาชีพ</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">รายได้ต่อเดือน</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">สภาพร่างกาย</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">ช่วยเหลือตัวเอง</th>
                                                <th className="border border-gray-300 px-4 py-2 text-center">หมายเหตุ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {FamilyMember.filter(
                                                (id) => id.household_id === selectedMarker.item.household_id
                                            ).map((member, id) => (
                                                <tr key={member.id} className="hover:bg-gray-200">
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{id + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.national_id === null ? '-' : member.national_id}</td>
                                                    <td className="border border-gray-300 px-2 py-2 text-center">{member.birth_date === null ? '-' : member.birth_date}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{calculateAge(member.birth_date) === null ? '-' : calculateAge(member.birth_date)}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.gender === "female" ? "หญิง" : member.gender === "male" ? "ชาย" : member.gender === null ? '-' : member.gender}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.relationship === null ? '-' : member.relationship}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.occupation === null ? '-' : member.occupation}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.monthly_income === null ? '-' : member.monthly_income === '0.00' ? '-' : member.monthly_income}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.physical_status === null ? '-' : member.physical_status}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.self_care === null ? '-' : member.self_care === true ? 'ได้' : member.self_care === false ? 'ไม่ได้' : member.self_care}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{member.is_respondent === null ? '-' : member.is_respondent}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        )}
                    </div>


                    <div className="mb-4">
                        <button
                            onClick={() => toggleSection(2)}
                            className="w-full bg-gray-200 p-4 text-left font-semibold rounded-lg flex justify-between items-center"
                        >
                            ส่วนที่ 2 การประเมินสภาวะครอบครัว
                            <span>{isSection1Open ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>
                        </button>
                        {isSection2Open && (
                            <div className="grid grid-cols-1 gap-2 p-4 bg-gray-100 rounded-lg">
                                <div className="grid grid-cols-2 gap-2 p-4 justify-items-center">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4" style={{ maxWidth: '300vh', width: '99%', maxHeight: '100vh' }}>
                                        <div className="mt-3 grid" style={{ gridTemplateColumns: '12% 35% 25% 25%', gap: '20px 0' }}>
                                            <span className="text-center"><b>ที่</b></span>
                                            <span className="text-center"><b>การประเมินแต่ละด้าน</b></span>
                                            <span className="text-center"><b>คะแนนเฉลี่ย</b></span>
                                            <span className="text-center"><b>ค่าคะแนนแต่ละด้าน</b></span>
                                        </div>
                                        <div className="grid mt-4" style={{ gridTemplateColumns: '12% 35% 25% 25%', gap: '20px 0' }}>
                                            <span className="text-center">1.</span>
                                            <span>ด้านสัมพันธภาพในครอบครัว</span>
                                            <span className="text-center">{AssessmentSummaryselected.family_relationship_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.family_relationship_score}</span>

                                            <span className="text-center">2.</span>
                                            <span>ด้านการมีรายได้และมีงานทำ</span>
                                            <span className="text-center">{AssessmentSummaryselected.income_employment_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.income_employment_score}</span>

                                            <span className="text-center">3.</span>
                                            <span>ด้านกระบวนการยุติธรรม</span>
                                            <span className="text-center">{AssessmentSummaryselected.justice_process_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.justice_process_score}</span>

                                            <span className="text-center">4.</span>
                                            <span>ด้านความมั่นคงปลอดภัย</span>
                                            <span className="text-center">{AssessmentSummaryselected.security_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.security_score}</span>

                                            <span className="text-center">5.</span>
                                            <span>ด้านการบริการสังคม</span>
                                            <span className="text-center">{AssessmentSummaryselected.social_service_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.social_service_score}</span>

                                            <span className="text-center">6.</span>
                                            <span>ด้านการศึกษา</span>
                                            <span className="text-center">{AssessmentSummaryselected.education_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.education_score}</span>

                                            <span className="text-center">7.</span>
                                            <span>ด้านที่อยู่อาศัย</span>
                                            <span className="text-center">{AssessmentSummaryselected.housing_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.housing_score}</span>

                                            <span className="text-center">8.</span>
                                            <span>ด้านสุขภาพ</span>
                                            <span className="text-center">{AssessmentSummaryselected.health_score}</span>
                                            <span className="text-center">{AssessmentSummaryselected.health_score}</span>
                                        </div>
                                    </div>


                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4 " style={{ maxWidth: '300vh', width: '100%', maxHeight: '300vh' }}>
                                        <div className="grid mt-2 justify-items-center items-center" style={{ gridTemplateColumns: '3% 48% 3% 48%', gap: '20px 0' }}>
                                            <div className="w-full">
                                                <RadarChartComponent data={jsonData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-4" style={{ maxWidth: '950px', width: '100%', maxHeight: '500vh' }}>
                                    <div className="flex justify-end">
                                        <div className="w-full">
                                            <RadarChartComponent data={jsonData} />
                                        </div>
                                    </div>
                                </div> */}

                                <h3><b>ค่าคะแนน</b></h3>

                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.bedridden_rehabilitation ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนฟื้นฟูสมรรถภาพ</span>

                                            <span className="text-center">{SocialWelfareSelected.bedridden_ltc ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนฟื้นฟูในระบบพึ่งพิง (LTC)</span>

                                            <span className="text-center">{SocialWelfareSelected.bedridden_transport ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>บริการรถรับ-ส่งผู้ป่วย</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={() => toggleSection(3)}
                            className="w-full bg-gray-200 p-4 text-left font-semibold rounded-lg flex justify-between items-center"
                        >
                            ส่วนที่ 3 การเข้าถึงและสวัสดิการสังคมที่ได้รับ
                            <span>{isSection1Open ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>                        </button>
                        {isSection3Open && (

                            <div className="p-4 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out">

                                <h3><b>1. เด็กและเยาวชน</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.child_social_security ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินอุดหนุนเด็กแรกเกิด</span>

                                            <span className="text-center">{SocialWelfareSelected.child_social_security ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินสงเคราะห์บุตรประกันสังคม</span>

                                            <span className="text-center">{SocialWelfareSelected.child_poverty ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินสงเคราะห์เด็กยากจน</span>

                                            <span className="text-center">{SocialWelfareSelected.child_foster ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินอุดหนุนช่วยเหลือค่าเลี้ยงดูในครอบครัวอุปถัมภ์</span>

                                            <span className="text-center">{SocialWelfareSelected.child_protection_fund ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินกองทุนคุ้มครองเด็ก</span>

                                            <span className="text-center">{SocialWelfareSelected.child_council ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>สภาเด็กและเยาวชน</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>2. ผู้สูงอายุ</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.elderly_allowance ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เบี้ยยังชีพผู้สูงอายุ</span>

                                            <span className="text-center">{SocialWelfareSelected.elderly_fund ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนผู้สูงอายุ</span>

                                            <span className="text-center">{SocialWelfareSelected.elderly_support ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การสงเคราะห์ผู้สูงอายุ</span>

                                            <span className="text-center">{SocialWelfareSelected.elderly_funeral ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินสงเคราะห์ค่าจัดการศพผู้สูงอายุตามประเพณี</span>

                                            <span className="text-center">{SocialWelfareSelected.elderly_housing ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>ปรับสภาพซ่อมแซมที่อยู่อาศัยสำหรับผู้สูงอายุ</span>

                                            <span className="text-center">{SocialWelfareSelected.elderly_care_center ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การอุปการะผู้สูงอายุในสถานสงเคราะห์</span>

                                            <span className="text-center">{SocialWelfareSelected.elderly_school ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>โรงเรียนสร้างสุข สามฝั่งแกน (โรงเรียนผู้สูงอายุ)</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>3. ผู้พิการ</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.disabled_card ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>บัตรประจําตัวคนพิการ</span>

                                            <span className="text-center">{SocialWelfareSelected.disabled_allowance ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เบี้ยความพิการ</span>

                                            <span className="text-center">{SocialWelfareSelected.disabled_loan ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินทุนหมุนเวียนให้คนพิการกู้ยืมประกอบอาชีพ</span>

                                            <span className="text-center">{SocialWelfareSelected.disabled_housing ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>ปรับสภาพซ่อมแซมที่อยู่อาศัยสำหรับผู้พิการ</span>

                                            <span className="text-center">{SocialWelfareSelected.disabled_employment ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การจ้างงานคนพิการ</span>

                                            <span className="text-center">{SocialWelfareSelected.disabled_assistant ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>บริการผู้ช่วยคนพิการ</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>4. ผู้ป่วยติดเตียง</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.bedridden_rehabilitation ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนฟื้นฟูสมรรถภาพ</span>

                                            <span className="text-center">{SocialWelfareSelected.bedridden_ltc ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนฟื้นฟูในระบบพึ่งพิง (LTC)</span>

                                            <span className="text-center">{SocialWelfareSelected.bedridden_transport ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>บริการรถรับ-ส่งผู้ป่วย</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>5. สตรีและครอบครัว</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.women_oscc ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินสงเคราะห์ครอบครัว</span>

                                            <span className="text-center">{SocialWelfareSelected.women_family_support ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนพัฒนาบทบาทสตรี</span>

                                            <span className="text-center">{SocialWelfareSelected.women_fund ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กลุ่มองค์กรสตรีแม่บ้าน</span>

                                            <span className="text-center">{SocialWelfareSelected.women_group ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การให้ความช่วยเหลือผ่าน OSCC ศูนย์ช่วยเหลือทางสังคม 1300</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>6. ผู้ป่วยเอดส์</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 30% 3% 30% 3% 30%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.aids_allowance ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เบี้ยผู้ป่วยเอดส์</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>7. ทหารผ่านศึก</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 48% 3% 48%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.veteran_pension ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การสงเคราะห์เงินเลี้ยงชีพพิเศษ</span>

                                            <span className="text-center">{SocialWelfareSelected.veteran_family_support_1 ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินช่วยเหลือรายเดือนทหารผ่านศึกนอก ประจําการบัตรชั้นที่ 2,3,4</span>

                                            <span className="text-center">{SocialWelfareSelected.veteran_support_234 ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การสงเคราะห์เงินช่วยเหลือรายเดือนแก่ครอบครัวทหารผ่านศึก บัตรชั้นที่ 1</span>

                                            <span className="text-center">{SocialWelfareSelected.veteran_visit ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การสงเคราะห์เยี่ยมเยียนทหารผ่านศึกและครอบครัวเป็นครั้งคราว</span>
                                        </div>
                                    </div>
                                </div>

                                <h3><b>8. ประชาชนทั่วไป</b></h3>
                                <div className="grid grid-cols-1 gap-2 p-4">
                                    <div className="p-4 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out mb-2">
                                        <div className="grid mt-2" style={{ gridTemplateColumns: '3% 48% 3% 48%', gap: '20px 0' }}>
                                            <span className="text-center">{SocialWelfareSelected.public_healthcare ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>หลักประกันสุขภาพแห่งชาติ หรือ บัตรทอง (30 บาทรักษาทุกโรค)</span>

                                            <span className="text-center">{SocialWelfareSelected.public_education ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>สิทธิทางการศึกษาขั้นพื้นฐานไม่น้อยกว่า 12 ปี (เรียนฟรี 15 ปี)</span>

                                            <span className="text-center">{SocialWelfareSelected.public_social_security ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>กองทุนประกันสังคม</span>

                                            <span className="text-center">{SocialWelfareSelected.public_nsf ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>เงินสมทบกองทุนการออมแห่งชาติ</span>

                                            <span className="text-center">{SocialWelfareSelected.public_vocational ? (<i className="fa-regular fa-square-check"></i>) : (<i className="fa-regular fa-square"></i>)}</span>
                                            <span>การฝึกอาชีพ</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={() => toggleSection(4)}
                            className="w-full bg-gray-200 p-4 text-left font-semibold rounded-lg flex justify-between items-center"
                        >
                            ส่วนที่ 4 ผังครอบครัว (Family Genograms)
                            <span>{isSection1Open ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>                        </button>
                        {isSection4Open && (
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p>เนื้อหาในส่วนที่ 4</p>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={() => toggleSection(5)}
                            className="w-full bg-gray-200 p-4 text-left font-semibold rounded-lg flex justify-between items-center"
                        >
                            ส่วนที่ 5 ภาพถ่ายที่อยู่อาศัย
                            <span>{isSection1Open ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>                        </button>
                        {isSection5Open && (
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p>เนื้อหาในส่วนที่ 5</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
};

export default MoreInfo;
