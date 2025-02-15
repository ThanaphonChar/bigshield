const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import core routes
const householdRoutes = require('./routes/householdRoutes');
const householdInfoRoutes = require('./routes/householdInfoRoutes');
const personRoutes = require('./routes/personRoutes');
const respondentRoutes = require('./routes/respondentRoutes');


// Import assessment base
const { validateAssessment, createAssessmentRoutes } = require('./routes/assessmentRoutes');
const createAssessmentController = require('./controllers/assessmentController');

// Create assessment controllers using factory
const educationAssessmentController = createAssessmentController('education_assessment');
const familyRelationshipsAssessmentController = createAssessmentController('family_relationships_assessment');
const healthAssessmentController = createAssessmentController('health_assessment');
const housingAssessmentController = createAssessmentController('housing_assessment');
const incomeEmploymentAssessmentController = createAssessmentController('income_employment_assessment');
const justiceProcessAssessmentController = createAssessmentController('justice_process_assessment');
const securityAssessmentController = createAssessmentController('security_assessment');
const socialServiceAssessmentController = createAssessmentController('social_service_assessment');
const householdSocialWelfareRoutes = require('./routes/householdSocialWelfareRoutes');
const assessmentSummaryRoutes = require('./routes/assessmentSummaryRoutes');

// Create assessment routers
const educationRouter = express.Router();
const familyRelationshipsRouter = express.Router();
const healthRouter = express.Router();
const housingRouter = express.Router();
const incomeEmploymentRouter = express.Router();
const justiceProcessRouter = express.Router();
const securityRouter = express.Router();
const socialServiceRouter = express.Router();


// Setup assessment routes using factory
createAssessmentRoutes(educationRouter, educationAssessmentController, validateAssessment);
createAssessmentRoutes(familyRelationshipsRouter, familyRelationshipsAssessmentController, validateAssessment);
createAssessmentRoutes(healthRouter, healthAssessmentController, validateAssessment);
createAssessmentRoutes(housingRouter, housingAssessmentController, validateAssessment);
createAssessmentRoutes(incomeEmploymentRouter, incomeEmploymentAssessmentController, validateAssessment);
createAssessmentRoutes(justiceProcessRouter, justiceProcessAssessmentController, validateAssessment);
createAssessmentRoutes(securityRouter, securityAssessmentController, validateAssessment);
createAssessmentRoutes(socialServiceRouter, socialServiceAssessmentController, validateAssessment);

// Use core routes
app.use('/api/households', householdRoutes);
app.use('/api/household-info', householdInfoRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/respondents', respondentRoutes);

// Use assessment routes
app.use('/api/education-assessment', educationRouter);
app.use('/api/family-relationships-assessment', familyRelationshipsRouter);
app.use('/api/health-assessment', healthRouter);
app.use('/api/housing-assessment', housingRouter);
app.use('/api/income-employment-assessment', incomeEmploymentRouter);
app.use('/api/justice-process-assessment', justiceProcessRouter);
app.use('/api/security-assessment', securityRouter);
app.use('/api/social-service-assessment', socialServiceRouter);
app.use('/api/household-social-welfare', householdSocialWelfareRoutes);
app.use('/api/assessment-summary', assessmentSummaryRoutes);
// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Household Management API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('\nAvailable endpoints:');

    console.log('\nCore APIs:');
    console.log('\nHouseholds:');
    console.log(`GET    http://localhost:${PORT}/api/households`);
    console.log(`GET    http://localhost:${PORT}/api/households/:id`);
    console.log(`POST   http://localhost:${PORT}/api/households`);
    console.log(`PUT    http://localhost:${PORT}/api/households/:id`);
    console.log(`DELETE http://localhost:${PORT}/api/households/:id`);
    
    console.log('\nHousehold Information:');
    console.log(`GET    http://localhost:${PORT}/api/household-info`);
    console.log(`GET    http://localhost:${PORT}/api/household-info/:id`);
    console.log(`GET    http://localhost:${PORT}/api/household-info/household/:householdId`);
    console.log(`POST   http://localhost:${PORT}/api/household-info`);
    console.log(`PUT    http://localhost:${PORT}/api/household-info/:id`);
    console.log(`DELETE http://localhost:${PORT}/api/household-info/:id`);
    
    console.log('\nPersons:');
    console.log(`GET    http://localhost:${PORT}/api/persons`);
    console.log(`GET    http://localhost:${PORT}/api/persons/:id`);
    console.log(`GET    http://localhost:${PORT}/api/persons/household/:householdId`);
    console.log(`POST   http://localhost:${PORT}/api/persons`);
    console.log(`PUT    http://localhost:${PORT}/api/persons/:id`);
    console.log(`DELETE http://localhost:${PORT}/api/persons/:id`);
    
    console.log('\nRespondents:');
    console.log(`GET    http://localhost:${PORT}/api/respondents`);
    console.log(`GET    http://localhost:${PORT}/api/respondents/:id`);
    console.log(`GET    http://localhost:${PORT}/api/respondents/household/:householdId`);
    console.log(`POST   http://localhost:${PORT}/api/respondents`);
    console.log(`PUT    http://localhost:${PORT}/api/respondents/:id`);
    console.log(`DELETE http://localhost:${PORT}/api/respondents/:id`);

    console.log('\nAssessment APIs:');
    console.log('\nFor each assessment type below, the following endpoints are available:');
    console.log(`GET    /`);
    console.log(`GET    /household/:householdId`);
    console.log(`GET    /:id`);
    console.log(`POST   /`);
    console.log(`PUT    /:id`);
    console.log(`DELETE /:id`);
    
    console.log('\nAssessment types:');
    console.log(`http://localhost:${PORT}/api/education-assessment`);
    console.log(`http://localhost:${PORT}/api/family-relationships-assessment`);
    console.log(`http://localhost:${PORT}/api/health-assessment`);
    console.log(`http://localhost:${PORT}/api/housing-assessment`);
    console.log(`http://localhost:${PORT}/api/income-employment-assessment`);
    console.log(`http://localhost:${PORT}/api/justice-process-assessment`);
    console.log(`http://localhost:${PORT}/api/security-assessment`);
    console.log(`http://localhost:${PORT}/api/social-service-assessment`);
});