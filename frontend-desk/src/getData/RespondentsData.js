import React, { useEffect, useState } from "react";
import axios from "axios";

const RespondentsData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRespondentsData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/respondents");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRespondentsData();
    }, []);

    return { data };
};

export default RespondentsData;