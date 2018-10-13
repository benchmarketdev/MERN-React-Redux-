const express = require('express');
const router = express.Router();
const ctrlSchools = require('../controllers/schools');
const ctrlUsers = require('../../users/users.controller');

//schools
router
    .route('/schools')
    .get(ctrlSchools.schoolsHome);

router
    .route('/schools/add')
    .get(ctrlSchools.schoolsAdd)
    .post(ctrlSchools.schoolsCreate);

router
    .route('/school/:schoolid')
    .get(ctrlSchools.statisticsList);

router
    .route('/schools/statistics')
    .get(ctrlSchools.statisticsCreate)
    .post(ctrlSchools.statisticsSave);

router
    .route('/school/:schoolid/statistics/:statisticid')
    .get(ctrlSchools.statisticsEdit)
    .post(ctrlSchools.statisticsUpdateOne)
    .delete(ctrlSchools.statisticsDeleteOne);



module.exports = router;