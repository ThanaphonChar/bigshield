const db = require('../config/database');

const householdSocialWelfareController = {
    // Get all records
    getAllWelfare: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT w.*, h.house_number, h.village_no, h.sub_district
                FROM household_social_welfare w
                LEFT JOIN households h ON w.household_id = h.household_id
                ORDER BY w.record_id DESC
            `);
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllWelfare:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get records by household ID
    getWelfareByHousehold: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(
                `SELECT * FROM household_social_welfare 
                WHERE household_id = $1 
                ORDER BY assessment_date DESC`,
                [householdId]
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getWelfareByHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get record by ID
    getWelfareById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                `SELECT w.*, h.house_number, h.village_no, h.sub_district
                FROM household_social_welfare w
                LEFT JOIN households h ON w.household_id = h.household_id
                WHERE w.record_id = $1`,
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Record not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getWelfareById:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create new record
    createWelfare: async (req, res) => {
        try {
            const {
                household_id,
                assessment_date,
                child_benefit,
                child_social_security,
                child_poverty,
                child_foster,
                child_protection_fund,
                child_council,
                elderly_allowance,
                elderly_fund,
                elderly_support,
                elderly_funeral,
                elderly_housing,
                elderly_care_center,
                elderly_school,
                disabled_card,
                disabled_allowance,
                disabled_loan,
                disabled_housing,
                disabled_employment,
                disabled_assistant,
                bedridden_rehabilitation,
                bedridden_ltc,
                bedridden_transport,
                women_oscc,
                women_family_support,
                women_fund,
                women_group,
                aids_allowance,
                veteran_pension,
                veteran_family_support_1,
                veteran_support_234,
                veteran_visit,
                public_healthcare,
                public_social_security,
                public_vocational,
                public_education,
                public_nsf
            } = req.body;

            // Validate if household exists
            const householdExists = await db.query(
                'SELECT household_id FROM households WHERE household_id = $1',
                [household_id]
            );

            if (householdExists.rows.length === 0) {
                return res.status(400).json({ message: 'Household does not exist' });
            }

            const result = await db.query(
                `INSERT INTO household_social_welfare (
                    household_id,
                    assessment_date,
                    child_benefit,
                    child_social_security,
                    child_poverty,
                    child_foster,
                    child_protection_fund,
                    child_council,
                    elderly_allowance,
                    elderly_fund,
                    elderly_support,
                    elderly_funeral,
                    elderly_housing,
                    elderly_care_center,
                    elderly_school,
                    disabled_card,
                    disabled_allowance,
                    disabled_loan,
                    disabled_housing,
                    disabled_employment,
                    disabled_assistant,
                    bedridden_rehabilitation,
                    bedridden_ltc,
                    bedridden_transport,
                    women_oscc,
                    women_family_support,
                    women_fund,
                    women_group,
                    aids_allowance,
                    veteran_pension,
                    veteran_family_support_1,
                    veteran_support_234,
                    veteran_visit,
                    public_healthcare,
                    public_social_security,
                    public_vocational,
                    public_education,
                    public_nsf
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                    $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                    $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
                    $31, $32, $33, $34, $35, $36, $37, $38
                ) RETURNING *`,
                [
                    household_id, assessment_date,
                    child_benefit, child_social_security, child_poverty,
                    child_foster, child_protection_fund, child_council,
                    elderly_allowance, elderly_fund, elderly_support,
                    elderly_funeral, elderly_housing, elderly_care_center,
                    elderly_school, disabled_card, disabled_allowance,
                    disabled_loan, disabled_housing, disabled_employment,
                    disabled_assistant, bedridden_rehabilitation,
                    bedridden_ltc, bedridden_transport, women_oscc,
                    women_family_support, women_fund, women_group,
                    aids_allowance, veteran_pension, veteran_family_support_1,
                    veteran_support_234, veteran_visit, public_healthcare,
                    public_social_security, public_vocational,
                    public_education, public_nsf
                ]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error in createWelfare:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update record
    updateWelfare: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                household_id,
                assessment_date,
                child_benefit,
                child_social_security,
                child_poverty,
                child_foster,
                child_protection_fund,
                child_council,
                elderly_allowance,
                elderly_fund,
                elderly_support,
                elderly_funeral,
                elderly_housing,
                elderly_care_center,
                elderly_school,
                disabled_card,
                disabled_allowance,
                disabled_loan,
                disabled_housing,
                disabled_employment,
                disabled_assistant,
                bedridden_rehabilitation,
                bedridden_ltc,
                bedridden_transport,
                women_oscc,
                women_family_support,
                women_fund,
                women_group,
                aids_allowance,
                veteran_pension,
                veteran_family_support_1,
                veteran_support_234,
                veteran_visit,
                public_healthcare,
                public_social_security,
                public_vocational,
                public_education,
                public_nsf
            } = req.body;

            // Validate if household exists
            if (household_id) {
                const householdExists = await db.query(
                    'SELECT household_id FROM households WHERE household_id = $1',
                    [household_id]
                );

                if (householdExists.rows.length === 0) {
                    return res.status(400).json({ message: 'Household does not exist' });
                }
            }

            const result = await db.query(
                `UPDATE household_social_welfare SET
                    household_id = $1,
                    assessment_date = $2,
                    child_benefit = $3,
                    child_social_security = $4,
                    child_poverty = $5,
                    child_foster = $6,
                    child_protection_fund = $7,
                    child_council = $8,
                    elderly_allowance = $9,
                    elderly_fund = $10,
                    elderly_support = $11,
                    elderly_funeral = $12,
                    elderly_housing = $13,
                    elderly_care_center = $14,
                    elderly_school = $15,
                    disabled_card = $16,
                    disabled_allowance = $17,
                    disabled_loan = $18,
                    disabled_housing = $19,
                    disabled_employment = $20,
                    disabled_assistant = $21,
                    bedridden_rehabilitation = $22,
                    bedridden_ltc = $23,
                    bedridden_transport = $24,
                    women_oscc = $25,
                    women_family_support = $26,
                    women_fund = $27,
                    women_group = $28,
                    aids_allowance = $29,
                    veteran_pension = $30,
                    veteran_family_support_1 = $31,
                    veteran_support_234 = $32,
                    veteran_visit = $33,
                    public_healthcare = $34,
                    public_social_security = $35,
                    public_vocational = $36,
                    public_education = $37,
                    public_nsf = $38,
                    updated_at = CURRENT_TIMESTAMP
                WHERE record_id = $39
                RETURNING *`,
                [
                    household_id, assessment_date,
                    child_benefit, child_social_security, child_poverty,
                    child_foster, child_protection_fund, child_council,
                    elderly_allowance, elderly_fund, elderly_support,
                    elderly_funeral, elderly_housing, elderly_care_center,
                    elderly_school, disabled_card, disabled_allowance,
                    disabled_loan, disabled_housing, disabled_employment,
                    disabled_assistant, bedridden_rehabilitation,
                    bedridden_ltc, bedridden_transport, women_oscc,
                    women_family_support, women_fund, women_group,
                    aids_allowance, veteran_pension, veteran_family_support_1,
                    veteran_support_234, veteran_visit, public_healthcare,
                    public_social_security, public_vocational,
                    public_education, public_nsf, id
                ]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Record not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in updateWelfare:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete record
    deleteWelfare: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'DELETE FROM household_social_welfare WHERE record_id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Record not found' });
            }

            res.json({ message: 'Social welfare record deleted successfully' });
        } catch (err) {
            console.error('Error in deleteWelfare:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = householdSocialWelfareController;