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
    let newSchool = new School({
        name: req.body.name
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

    const schoolid = req.body._id;
    School
        .findById(schoolid)
        .exec((err, school) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                school.statistics.push({
                    year: parseInt(req.body.year),
                    week: parseInt(req.body.week),
                    month: parseInt(req.body.month),
                    elect_eur: parseFloat(req.body.elect_eur),
                    elect_kwh: parseFloat(req.body.elect_kwh),
                    heating_eur: parseFloat(req.body.heating_eur),
                    heating_kwh: parseFloat(req.body.heating_kwh),
                    water_eur: parseFloat(req.body.water_eur),
                    water_litres: parseFloat(req.body.water_litres)
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
    if (req.params && req.params.schoolid && req.params.statisticid) {
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
                if (school.statistics && school.statistics.length > 0) {
                    console.log("school =");
                    console.log(school);
                    console.log("statistics =");
                    console.log(school.statistics);
                    const statistic = school.statistics.id(req.params.statisticid);
                    console.log(statistic);
                    if (!statistic) {
                        res.status(404)
                            .json({
                                "message": "statisticid not found"
                        });
                    } else {
                        response = {
                            school: {
                                name: school.name,
                                _id: req.params.schoolid
                            },
                            statistic:statistic
                        };
                        res.status(200)
                            .json({"data":response, "message":"success"});
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            "message": "No statistics found"
                        });
                }
            });
    } else {
        res.status(404)
            .json({
                "message": "Not found, schoolid and statisticid are both required"
            });
    }
};

const statisticsUpdateOne = function (req, res) {
    if (!req.params.schoolid || !req.params.statisticid) {
        res.status(404)
            .json({
                "message": "Not found, schoolid and statisticid are both required"
            });
            return;
    }
    School
        .findById(req.params.schoolid)
        .select('statistics')
        .exec((err, school) => {
            if (!school) {
                res.status(404)
                .json({
                    "message": "school not found"
                });
                return;
            } else if (err) {
                res.status(400)
                .json(err);
                return;
            }
            if (school.statistics && school.statistics.length > 0) {
                let thisStatistic = school.statistics.id(req.params.statisticid);
                if (!thisStatistic) {
                    res
                        .status(404)
                        .json({
                            "message": "statisticid not found"
                        });
                } else {
                    thisStatistic.year = parseInt(req.body.year);
                    thisStatistic.week = parseInt(req.body.week);
                    thisStatistic.month = parseInt(req.body.month);
                    thisStatistic.elect_eur = parseFloat(req.body.elect_eur);
                    thisStatistic.elect_kwh = parseFloat(req.body.elect_kwh);
                    thisStatistic.heating_eur = parseFloat(req.body.heating_eur);
                    thisStatistic.heating_kwh = parseFloat(req.body.heating_kwh);
                    thisStatistic.water_eur = parseFloat(req.body.water_eur);
                    thisStatistic.water_litres = parseFloat(req.body.water_litres);
                    school.save((err, school) => {
                        if (err) {
                            res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(200)
                                .json(thisStatistic);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({"message": "No statistic to update"});
            }
        });
};

const statisticsDeleteOne = function (req, res) {
    if (!req.params.schoolid || !req.params.statisticid) {
        res
            .status(404)
            .json({
                "message": "Not found, schoolid and statisticid are both required"
            })
        return;
    }
    School
        .findById(req.params.schoolid)
        .select('statistics')
        .exec((err, school) => {
            if (!school) {
                res
                    .status(404)
                    .json({
                        "message" : "schoolid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            if (school.statistics && school.statistics.length > 0) {
                if (!school.statistics.id(req.params.statisticid)) {
                    res
                        .status(404)
                        .json({
                            "message": "statisticid not found"
                        });
                } else {
                    school.statistics.id(req.params.statisticid).remove();
                    school.save((err) => {
                        if (err) {
                            res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({
                        "message": "No statistic to delete"
                    });
            }
        });
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

