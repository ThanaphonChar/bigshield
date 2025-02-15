import React, { useEffect, useState } from "react";
import axios from "axios";

const AssessmentSummaryData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssessmentSummaryData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/assessment-summary");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAssessmentSummaryData();
    }, []);

    return { data };
};

export default AssessmentSummaryData;