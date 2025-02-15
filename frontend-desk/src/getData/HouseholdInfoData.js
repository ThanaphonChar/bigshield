import React, { useEffect, useState } from "react";
import axios from "axios";

const HouseholdInfosData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHouseholdInfosData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/household-info");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseholdInfosData();
    }, []);

    return { data };
};

export default HouseholdInfosData;