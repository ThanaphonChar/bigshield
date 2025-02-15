import React, { useEffect, useState } from 'react';
import HouseholdsData from '../getData/HouseholdsData';
import RespondentsData from '../getData/RespondentsData';
import MarkerInfo from '../components/MarkerInfo';
import LogoutButton from '../components/LogoutButton';
import SearchButton from '../components/SearchButton';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Map = (expanded) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showGreen, setShowGreen] = useState(true);
  const [showYellow, setShowYellow] = useState(true);
  const [showOrange, setShowOrange] = useState(true);
  const [showRed, setShowRed] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcD8_LBxWKWLw1l0IWDl75uSfWa_LAqNY&libraries=places';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const { data: Household } = HouseholdsData();
  const { data: Respondent } = RespondentsData();

  const handleSearchFocus = () => {
    setExpand(!expand);
  };

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 18.267514, lng: 99.502561 },
      zoom: 10,
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
      ],
      disableDefaultUI: true
    });
    setMap(mapInstance);
  };

  const createMarkers = () => {
    if (!Household || !Array.isArray(Household)) {
      console.error("Household data is undefined or not an array");
      return [];
    }
    if (!Respondent || !Array.isArray(Respondent)) {
      console.error("Respondent data is undefined or not an array");
      return [];
    }

    return Household.map((item) => {
      const score = item.household_id;
      const relatedData = Respondent.find((data) => data.household_id === item.household_id);
      const firstLastName = relatedData ? relatedData.first_last_name : "ไม่ทราบชื่อ";
      const age = relatedData ? relatedData.age : "ไม่ทราบอายุ";

      let color;
      if (score >= 15 && showGreen) color = '#28a745';
      else if (score >= 10 && score < 15 && showYellow) color = '#ffc107';
      else if (score >= 5 && score < 10 && showOrange) color = '#fd7e14';
      else if (score < 5 && showRed) color = '#dc3545';
      if (!color) return null;

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
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
        },
        map,
        icon: svgIcon,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-size:14px;">
            <b style="font-size:16px;">${firstLastName}, ${age}</b>
            <p style="font-size:14px;">${item.house_number} หมู่ที่ ${item.village_no} ${item.alley} ${item.street} ตำบล${item.sub_district}</p>
            <p style="font-size:14px;">อำเภอ${item.district} จังหวัด${item.province} ${item.postal_code}</p>
          </div>
        `,
      });

      marker.addListener("mouseover", () => infoWindow.open(map, marker));
      marker.addListener("mouseout", () => infoWindow.close());
      marker.addListener("click", () => setSelectedMarker({ item }));

      return marker;
    }).filter(Boolean);
  };

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => marker.setMap(null)); // Remove previous markers
      const newMarkers = createMarkers(); // Create new markers
      newMarkers.forEach((marker) => marker.setMap(map)); // Add them to the map
      setMarkers(newMarkers); // Save the markers to state
    }
  }, [map, Household, showGreen, showYellow, showOrange, showRed]);

  return (
    <div className="relative h-screen w-full bg-gray-100 flex items-center justify-center">
      <div id="map" className="absolute inset-0 h-full w-full"></div>
      <SearchButton map={map} />
      <LogoutButton />

      {expand && (
        <div className="flex items-center absolute top-16 left-1/3 bg-white p-3 shadow-md z-10 rounded-lg">
          <p className="flex items-center mb-2">ความเสี่ยง:&nbsp;&nbsp;</p>
          <div className="flex items-center space-x-2">
            <label
              className={`flex items-center space-x-2 px-3 py-1 rounded-full shadow cursor-pointer ${showGreen ? "bg-gray-100" : "bg-gray-200"
                }`}
            >
              <div className={`w-3 h-3 rounded-full ${showGreen ? "bg-green-500" : "bg-gray-400"}`}></div>
              <input
                type="checkbox"
                checked={showGreen}
                onChange={() => setShowGreen(!showGreen)}
                className="hidden"
              />
              <span className={`text-sm ${showGreen ? "text-gray-700" : "text-gray-400"}`}>ไม่มี</span>
            </label>

            <label
              className={`flex items-center space-x-2 px-3 py-1 rounded-full shadow cursor-pointer ${showYellow ? "bg-gray-100" : "bg-gray-200"
                }`}
            >
              <div className={`w-3 h-3 rounded-full ${showYellow ? "bg-yellow-500" : "bg-gray-400"}`}></div>
              <input
                type="checkbox"
                checked={showYellow}
                onChange={() => setShowYellow(!showYellow)}
                className="hidden"
              />
              <span className={`text-sm ${showYellow ? "text-gray-700" : "text-gray-400"}`}>น้อย</span>
            </label>

            <label
              className={`flex items-center space-x-2 px-3 py-1 rounded-full shadow cursor-pointer ${showOrange ? "bg-gray-100" : "bg-gray-200"
                }`}
            >
              <div className={`w-3 h-3 rounded-full ${showOrange ? "bg-orange-500" : "bg-gray-400"}`}></div>
              <input
                type="checkbox"
                checked={showOrange}
                onChange={() => setShowOrange(!showOrange)}
                className="hidden"
              />
              <span className={`text-sm ${showOrange ? "text-gray-700" : "text-gray-400"}`}>ค่อนข้างสูง</span>
            </label>

            <label
              className={`flex items-center space-x-2 px-3 py-1 rounded-full shadow cursor-pointer ${showRed ? "bg-gray-100" : "bg-gray-200"
                }`}
            >
              <div className={`w-3 h-3 rounded-full ${showRed ? "bg-red-500" : "bg-gray-400"}`}></div>
              <input
                type="checkbox"
                checked={showRed}
                onChange={() => setShowRed(!showRed)}
                className="hidden"
              />
              <span className={`text-sm ${showRed ? "text-gray-700" : "text-gray-400"}`}>สูง</span>
            </label>
          </div>
        </div>

      )}

      {selectedMarker && (
        <MarkerInfo
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
        />
      )}

      <SearchButton
        map={map}
        Household={Household} // ส่งข้อมูล Household ไปยัง SearchButton
        setSelectedMarker={setSelectedMarker} // ตั้งค่า marker ที่เลือกเมื่อพบข้อมูล
        onSearchFocus={handleSearchFocus}
      // onBlurFocus={handleSearchFocus}
      />

    </div>
  );
};

export default Map;
