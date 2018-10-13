const express = require('express');
const router = express.Router();
const ctrlSchools = require('../controllers/schools');
// const ctrlUsers = require('../controllers/users');

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
    .route('school/:schoolid/statistics/:statisticid')
    .get(ctrlSchools.statisticsEdit)
    .post(ctrlSchools.statisticsUpdateOne)
    .delete(ctrlSchools.statisticsDeleteOne);

//users

// router.post('/users/authenticate', ctrlUsers.authenticate);
// router.post('/users/register', ctrlUsers.register);
// router.get('/users', ctrlUsers.getAll);
// router.get('/users/current', ctrlUsers.getCurrent);
// router.get('/users/:id', ctrlUsers.getById);
// router.put('/users/:id', ctrlUsers.update);
// router.delete('/users/:id', ctrlUsers._delete);

module.exports = router;