// assessmentSummaryController.js

const db = require('../config/database');

const calculateLevel = (score) => {
    if (score >= 0 && score <= 3) return 0;
    if (score >= 4 && score <= 7) return 1;
    if (score >= 8 && score <= 11) return 2;
    if (score >= 12 && score <= 15) return 3;
    return 0; // default case
};

const assessmentSummaryController = {
    // Get all assessment summaries
    getAllSummaries: async (req, res) => {
        try {
            const result = await db.query(`
                WITH assessment_dates AS (
                    SELECT household_id, assessment_date
                    FROM (
                        SELECT household_id, assessment_date FROM education_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM family_relationships_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM health_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM housing_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM income_employment_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM justice_process_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM security_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM social_service_assessment
                    ) all_dates
                    GROUP BY household_id, assessment_date
                ),
                latest_assessment_date AS (
                    SELECT household_id, MAX(assessment_date) as latest_date
                    FROM assessment_dates
                    GROUP BY household_id
                ),
                latest_assessments AS (
                    SELECT DISTINCT 
                        h.household_id,
                        lad.latest_date as assessment_date,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM education_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as education_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM family_relationships_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as family_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM health_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as health_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM housing_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as housing_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM income_employment_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as income_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM justice_process_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as justice_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM security_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as security_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM social_service_assessment 
                         WHERE household_id = h.household_id
                         AND assessment_date = lad.latest_date) as social_score
                    FROM households h
                    LEFT JOIN latest_assessment_date lad ON h.household_id = lad.household_id
                )
                SELECT 
                    la.*,
                    CASE 
                        WHEN education_score BETWEEN 0 AND 3 THEN 0
                        WHEN education_score BETWEEN 4 AND 7 THEN 1
                        WHEN education_score BETWEEN 8 AND 11 THEN 2
                        WHEN education_score >= 12 THEN 3
                    END as education_level,
                    CASE 
                        WHEN family_score BETWEEN 0 AND 3 THEN 0
                        WHEN family_score BETWEEN 4 AND 7 THEN 1
                        WHEN family_score BETWEEN 8 AND 11 THEN 2
                        WHEN family_score >= 12 THEN 3
                    END as family_level,
                    CASE 
                        WHEN health_score BETWEEN 0 AND 3 THEN 0
                        WHEN health_score BETWEEN 4 AND 7 THEN 1
                        WHEN health_score BETWEEN 8 AND 11 THEN 2
                        WHEN health_score >= 12 THEN 3
                    END as health_level,
                    CASE 
                        WHEN housing_score BETWEEN 0 AND 3 THEN 0
                        WHEN housing_score BETWEEN 4 AND 7 THEN 1
                        WHEN housing_score BETWEEN 8 AND 11 THEN 2
                        WHEN housing_score >= 12 THEN 3
                    END as housing_level,
                    CASE 
                        WHEN income_score BETWEEN 0 AND 3 THEN 0
                        WHEN income_score BETWEEN 4 AND 7 THEN 1
                        WHEN income_score BETWEEN 8 AND 11 THEN 2
                        WHEN income_score >= 12 THEN 3
                    END as income_level,
                    CASE 
                        WHEN justice_score BETWEEN 0 AND 3 THEN 0
                        WHEN justice_score BETWEEN 4 AND 7 THEN 1
                        WHEN justice_score BETWEEN 8 AND 11 THEN 2
                        WHEN justice_score >= 12 THEN 3
                    END as justice_level,
                    CASE 
                        WHEN security_score BETWEEN 0 AND 3 THEN 0
                        WHEN security_score BETWEEN 4 AND 7 THEN 1
                        WHEN security_score BETWEEN 8 AND 11 THEN 2
                        WHEN security_score >= 12 THEN 3
                    END as security_level,
                    CASE 
                        WHEN social_score BETWEEN 0 AND 3 THEN 0
                        WHEN social_score BETWEEN 4 AND 7 THEN 1
                        WHEN social_score BETWEEN 8 AND 11 THEN 2
                        WHEN social_score >= 12 THEN 3
                    END as social_level,
                    h.house_number,
                    h.village_no,
                    h.sub_district
                FROM latest_assessments la
                LEFT JOIN households h ON la.household_id = h.household_id
                ORDER BY la.household_id DESC
            `);
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllSummaries:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get summary by household ID with calculated levels
    getSummaryByHousehold: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(`
                WITH assessment_dates AS (
                    SELECT household_id, assessment_date
                    FROM (
                        SELECT household_id, assessment_date FROM education_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM family_relationships_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM health_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM housing_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM income_employment_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM justice_process_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM security_assessment
                        UNION ALL
                        SELECT household_id, assessment_date FROM social_service_assessment
                    ) all_dates
                    WHERE household_id = $1
                    GROUP BY household_id, assessment_date
                ),
                latest_assessment_date AS (
                    SELECT household_id, MAX(assessment_date) as latest_date
                    FROM assessment_dates
                    GROUP BY household_id
                ),
                latest_scores AS (
                    SELECT 
                        h.household_id,
                        lad.latest_date as assessment_date,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM education_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as education_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM family_relationships_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as family_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM health_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as health_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM housing_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as housing_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM income_employment_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as income_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM justice_process_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as justice_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM security_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as security_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM social_service_assessment 
                         WHERE household_id = $1
                         AND assessment_date = lad.latest_date) as social_score
                    FROM households h
                    LEFT JOIN latest_assessment_date lad ON h.household_id = lad.household_id
                    WHERE h.household_id = $1
                )
                SELECT 
                    ls.*,
                    CASE 
                        WHEN education_score BETWEEN 0 AND 3 THEN 0
                        WHEN education_score BETWEEN 4 AND 7 THEN 1
                        WHEN education_score BETWEEN 8 AND 11 THEN 2
                        WHEN education_score >= 12 THEN 3
                    END as education_level,
                    CASE 
                        WHEN family_score BETWEEN 0 AND 3 THEN 0
                        WHEN family_score BETWEEN 4 AND 7 THEN 1
                        WHEN family_score BETWEEN 8 AND 11 THEN 2
                        WHEN family_score >= 12 THEN 3
                    END as family_level,
                    CASE 
                        WHEN health_score BETWEEN 0 AND 3 THEN 0
                        WHEN health_score BETWEEN 4 AND 7 THEN 1
                        WHEN health_score BETWEEN 8 AND 11 THEN 2
                        WHEN health_score >= 12 THEN 3
                    END as health_level,
                    CASE 
                        WHEN housing_score BETWEEN 0 AND 3 THEN 0
                        WHEN housing_score BETWEEN 4 AND 7 THEN 1
                        WHEN housing_score BETWEEN 8 AND 11 THEN 2
                        WHEN housing_score >= 12 THEN 3
                    END as housing_level,
                    CASE 
                        WHEN income_score BETWEEN 0 AND 3 THEN 0
                        WHEN income_score BETWEEN 4 AND 7 THEN 1
                        WHEN income_score BETWEEN 8 AND 11 THEN 2
                        WHEN income_score >= 12 THEN 3
                    END as income_level,
                    CASE 
                        WHEN justice_score BETWEEN 0 AND 3 THEN 0
                        WHEN justice_score BETWEEN 4 AND 7 THEN 1
                        WHEN justice_score BETWEEN 8 AND 11 THEN 2
                        WHEN justice_score >= 12 THEN 3
                    END as justice_level,
                    CASE 
                        WHEN security_score BETWEEN 0 AND 3 THEN 0
                        WHEN security_score BETWEEN 4 AND 7 THEN 1
                        WHEN security_score BETWEEN 8 AND 11 THEN 2
                        WHEN security_score >= 12 THEN 3
                    END as security_level,
                    CASE 
                        WHEN social_score BETWEEN 0 AND 3 THEN 0
                        WHEN social_score BETWEEN 4 AND 7 THEN 1
                        WHEN social_score BETWEEN 8 AND 11 THEN 2
                        WHEN social_score >= 12 THEN 3
                    END as social_level,
                    h.house_number,
                    h.village_no,
                    h.sub_district
                FROM latest_scores ls
                LEFT JOIN households h ON ls.household_id = h.household_id
            `, [householdId]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No assessments found for this household' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getSummaryByHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get household statistics with calculated levels
    getHouseholdStatistics: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(`
                WITH assessment_dates AS (
                    SELECT household_id, assessment_date
                    FROM (
                        SELECT household_id, assessment_date FROM education_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM family_relationships_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM health_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM housing_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM income_employment_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM justice_process_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM security_assessment WHERE household_id = $1
                        UNION ALL
                        SELECT household_id, assessment_date FROM social_service_assessment WHERE household_id = $1
                    ) all_dates
                    GROUP BY household_id, assessment_date
                ),
                all_scores AS (
                    SELECT 
                        ad.household_id,
                        ad.assessment_date,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM education_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as education_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM family_relationships_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as family_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM health_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as health_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM housing_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as housing_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM income_employment_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as income_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM justice_process_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as justice_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM security_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as security_score,
                        (SELECT COALESCE(SUM(q1_score + q2_score + q3_score + q4_score + q5_score), 0)
                         FROM social_service_assessment 
                         WHERE household_id = $1 AND assessment_date = ad.assessment_date) as social_score
                    FROM assessment_dates ad
                    WHERE ad.household_id = $1
                )
                SELECT 
                    household_id,
                    COUNT(*) as assessment_count,
                    MAX(assessment_date) as latest_assessment,
                    ROUND(AVG(education_score)::numeric, 2) as avg_education_score,
                    ROUND(AVG(family_score)::numeric, 2) as avg_family_score,
                    ROUND(AVG(health_score)::numeric, 2) as avg_health_score,
                    ROUND(AVG(housing_score)::numeric, 2) as avg_housing_score,
                    ROUND(AVG(income_score)::numeric, 2) as avg_income_score,
                    ROUND(AVG(justice_score)::numeric, 2) as avg_justice_score,
                    ROUND(AVG(security_score)::numeric, 2) as avg_security_score,
                    ROUND(AVG(social_score)::numeric, 2) as avg_social_score,
                    MAX(education_score) as max_education_score,
                    MAX(family_score) as max_family_score,
                    MAX(health_score) as max_health_score,
                    MAX(housing_score) as max_housing_score,
                    MAX(income_score) as max_income_score,
                    MAX(justice_score) as max_justice_score,
                    MAX(security_score) as max_security_score,
                    MAX(social_score) as max_social_score,
                    MIN(education_score) as min_education_score,
                    MIN(family_score) as min_family_score,
                    MIN(health_score) as min_health_score,
                    MIN(housing_score) as min_housing_score,
                    MIN(income_score) as min_income_score,
                    MIN(justice_score) as min_justice_score,
                    MIN(security_score) as min_security_score,
                    MIN(social_score) as min_social_score
                FROM all_scores
                GROUP BY household_id
            `, [householdId]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No statistics found for this household' });
            }

            // Calculate levels for average scores
            const stats = result.rows[0];
            const response = {
                ...stats,
                // Calculate levels based on average scores
                avg_education_level: calculateLevel(Math.round(stats.avg_education_score)),
                avg_family_level: calculateLevel(Math.round(stats.avg_family_score)),
                avg_health_level: calculateLevel(Math.round(stats.avg_health_score)),
                avg_housing_level: calculateLevel(Math.round(stats.avg_housing_score)),
                avg_income_level: calculateLevel(Math.round(stats.avg_income_score)),
                avg_justice_level: calculateLevel(Math.round(stats.avg_justice_score)),
                avg_security_level: calculateLevel(Math.round(stats.avg_security_score)),
                avg_social_level: calculateLevel(Math.round(stats.avg_social_score)),
                // Calculate levels based on maximum scores
                max_education_level: calculateLevel(stats.max_education_score),
                max_family_level: calculateLevel(stats.max_family_score),
                max_health_level: calculateLevel(stats.max_health_score),
                max_housing_level: calculateLevel(stats.max_housing_score),
                max_income_level: calculateLevel(stats.max_income_score),
                max_justice_level: calculateLevel(stats.max_justice_score),
                max_security_level: calculateLevel(stats.max_security_score),
                max_social_level: calculateLevel(stats.max_social_score),
                // Calculate levels based on minimum scores
                min_education_level: calculateLevel(stats.min_education_score),
                min_family_level: calculateLevel(stats.min_family_score),
                min_health_level: calculateLevel(stats.min_health_score),
                min_housing_level: calculateLevel(stats.min_housing_score),
                min_income_level: calculateLevel(stats.min_income_score),
                min_justice_level: calculateLevel(stats.min_justice_score),
                min_security_level: calculateLevel(stats.min_security_score),
                min_social_level: calculateLevel(stats.min_social_score)
            };

            res.json(response);
        } catch (err) {
            console.error('Error in getHouseholdStatistics:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = assessmentSummaryController;