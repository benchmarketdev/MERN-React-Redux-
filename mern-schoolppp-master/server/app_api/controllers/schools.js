const mongoose = require('mongoose');
const School = mongoose.model('School');

const schoolsHome = function (req, res) {

    School
        .find()
        .exec((err, school) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res.json(school);
            }
        })
};

const schoolsAdd = function (req, res) {
    // show schoolsAdd window
};

const schoolsCreate = function (req, res) {
    console.log('name')
    console.log(req.body.temp)
    let newSchool = new School({
        schoolName: req.body.temp.schoolName
    });

    newSchool.save((err, school)=>{
        if (err)
        {
            res
                .status(400)
                .json(err);
        } else {
            res.json(school);
        }
    });
    
};

const statisticsList = function (req, res) {
    if (req.params && req.params.schoolid){
        School
            .findById(req.params.schoolid)
            .exec((err, school) => {
                if (!school) {
                    res
                        .status(404)
                        .json({
                            "message": "schoolid not found"
                        });
                    return;                   
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(school);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No schoolid in request"
            })
    }
};

const statisticsCreate = function (req, res) {

    /*     const schoolid = req.params.schoolid;
    if (schoolid) {
        School
            .findById(schoolid)
            .exec((err, school) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    statisticsSave(req, res, school);
                }
            });
    } else {
        res
            .status(404)
            .json({
                "message" : "Not found, schoolid required"
            });
    } */
};

const statisticsSave = function (req, res) {
    console.log(req.body.data)
    const schoolid = req.body.data._id;
    School
        .findById(schoolid)
        .exec((err, school) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                school.schoolData.push({
                    year: parseInt(req.body.data.year),
                    week: parseInt(req.body.data.week),
                    month: parseInt(req.body.data.month),
                    elecEuro: parseFloat(req.body.data.elecEuro),
                    elecKwh: parseFloat(req.body.data.elecKwh),
                    heatEuro: parseFloat(req.body.data.heatEuro),
                    heatKwh: parseFloat(req.body.data.heatKwh),
                    waterEuro: parseFloat(req.body.data.waterEuro),
                    waterLiter: parseFloat(req.body.data.waterLiter)
                });
                school.save((err, school) => {
                    if (err) {
                        console.log(err);
                        res
                            .status(400)
                            .json(err);
                    } else {
                        res
                            .status(201)
                            .json({"message":"success", "data":school});
                    }
                });
            }
        });
    
};

const statisticsEdit = function (req, res) {
    res.json("You can create schools");
};

const statisticsUpdateOne = function (req, res) {
    res.json("You can create schools");
};

const statisticsDeleteOne = function (req, res) {
    res.json("You can create schools");
};

module.exports = {
    schoolsHome,
    schoolsAdd,
    schoolsCreate,
    statisticsList,
    statisticsCreate,
    statisticsSave,
    statisticsEdit,
    statisticsUpdateOne,
    statisticsDeleteOne
}

