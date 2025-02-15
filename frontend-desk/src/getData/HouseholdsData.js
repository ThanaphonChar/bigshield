import React, { useEffect, useState } from "react";
import axios from "axios";

const HouseholdsData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHouseholdData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/households");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseholdData();
    }, []);

    return { data };
};

export default HouseholdsData;