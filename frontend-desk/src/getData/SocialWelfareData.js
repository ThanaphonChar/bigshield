import React, { useEffect, useState } from "react";
import axios from "axios";

const SocialWelfareData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocialWelfareData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/household-social-welfare");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSocialWelfareData();
    }, []);

    return { data };
};

export default SocialWelfareData;