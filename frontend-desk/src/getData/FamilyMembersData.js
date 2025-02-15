import React, { useEffect, useState } from "react";
import axios from "axios";

const FamilyMembersData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFamilyMembersData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/persons");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilyMembersData();
    }, []);

    return { data };
};

export default FamilyMembersData;