import { useState, useEffect } from "react";

const Map = ({ map, surveyData, setSelectedMarker }) => {
    const [filter, setFilter] = useState("all"); // เก็บค่าตัวกรอง

    useEffect(() => {
        if (map && surveyData.length > 0) {
            // ลบ Marker เดิมทั้งหมดก่อน
            map.markers?.forEach(marker => marker.setMap(null));
            map.markers = [];

            surveyData.forEach((item) => {
                let color;
                const score = item.part2.average.score;

                if (score >= 15) {
                    color = "#28a745"; // Green
                } else if (score >= 10) {
                    color = "#ffc107"; // Yellow
                } else if (score >= 5) {
                    color = "#fd7e14"; // Orange
                } else {
                    color = "#dc3545"; // Red
                }

                // ตรวจสอบว่าตรงกับ filter หรือไม่
                if (filter !== "all") {
                    if (
                        (filter === "green" && score < 15) ||
                        (filter === "yellow" && (score < 10 || score >= 15)) ||
                        (filter === "orange" && (score < 5 || score >= 10)) ||
                        (filter === "red" && score >= 5)
                    ) {
                        return; // ข้าม marker ที่ไม่ตรง
                    }
                }

                const svgIcon = {
                    path: "M256 8C119 8 8 119 8 256s248 248 248 248 248-111 248-248S393 8 256 8zm0 272c-28.6 0-52-23.4-52-52s23.4-52 52-52 52 23.4 52 52-23.4 52-52 52z",
                    fillColor: color,
                    fillOpacity: 2,
                    strokeWeight: 0,
                    scale: 0.06,
                    anchor: new window.google.maps.Point(12, 24),
                };

                const marker = new window.google.maps.Marker({
                    position: {
                        lat: parseFloat(item.part1.Address.latitude),
                        lng: parseFloat(item.part1.Address.longitude),
                    },
                    map,
                    title: item.part1.Info.name,
                    icon: svgIcon,
                });

                const infoWindow = new window.google.maps.InfoWindow({
                    content: `<div style="font-size:14px;"><b>${item.part1.Info.name}</b><br>${item.part1.Address.address}</div>`,
                });

                marker.addListener("mouseover", () => {
                    infoWindow.open(map, marker);
                });

                marker.addListener("mouseout", () => {
                    infoWindow.close();
                });

                marker.addListener("click", () => {
                    setSelectedMarker({
                        item,
                    });
                });

                // เก็บ Marker ลงในแผนที่
                map.markers.push(marker);
            });
        }
    }, [map, surveyData, filter]); // เพิ่ม filter ใน dependency array

    return (
        <div className="absolute top-8 left-8 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex space-x-2">
                <button
                    className={`p-2 rounded-full ${filter === "all" ? "bg-gray-700 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button
                    className={`p-2 rounded-full ${filter === "green" ? "bg-green-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("green")}
                >
                    Green
                </button>
                <button
                    className={`p-2 rounded-full ${filter === "yellow" ? "bg-yellow-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("yellow")}
                >
                    Yellow
                </button>
                <button
                    className={`p-2 rounded-full ${filter === "orange" ? "bg-orange-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("orange")}
                >
                    Orange
                </button>
                <button
                    className={`p-2 rounded-full ${filter === "red" ? "bg-red-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("red")}
                >
                    Red
                </button>
            </div>
        </div>
    );
};

export default Map;
