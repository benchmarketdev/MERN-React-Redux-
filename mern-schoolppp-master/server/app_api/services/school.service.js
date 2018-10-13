const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const School = require('../models/school.model');

exports.createdSchool = async function (school) {

  // Creating a new Mongoose Object by using the new keyword
  let newSchool = new School({
    schoolName: school.schoolName,
    schoolData: [
      { year: '' , month: '' , week: '', elecEuro: '' , elecKwh: '',  heatEuro: '', heatKwh: '' , waterEuro: '' , waterLiter: '' }

    ]
  });
  console.log(newSchool)

  try {
    // Saving the User
    let savedSchool = await newSchool.save();
    return savedSchool;
  } catch (e) {
    // return an Error message describing the reason
    throw Error("Error while Creating User");
  }
};

exports.getSchool = async function (req, res) {

  try {
    let school = await School.find();

    // Return the user list that was returned by the mongoose promise
    return school;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Users');
  }
};



exports.getSchoolById = async function (id) {

  try {
    //Find the old User Object by the Id
    school = await School.findById(id);
    return school;
  } catch (e) {
    throw Error("Error occured while Finding the school");
  }


};

// exports.saveSchool = async function (schoolid) {

//   console.log('school.schoolData')
//   school = await School.findById(schoolid);
//   console.log(school)

//   const ssss = school.schoolData.push({
//           year: parseInt(school.year),
//           month: parseInt(school.month),
//           week: parseInt(school.week),
//           elecEuro: parseInt(school.elecEuro),
//           elecKwh: parseInt(school.elecKwh),
//           heatEuro: parseInt(school.heatEuro),
//           heatKwh: parseInt(school.heatKwh),
//           waterEuro: parseInt(school.waterEuro),
//           waterLiter: parseInt(school.waterLiter)
//   });
  
  // console.log(ssss)
 
  // school.save();

  // // Creating a new Mongoose Object by using the new keyword
  // School.findById(schoolid)
  //   .exec((err, school) => {
  //     if (err) {
  //       res
  //         .status(400)
  //         .json(err);
  //     } else {
  // console.log(school)

  //       school.push({
  //         year: parseInt(school.year),
  //         month: parseInt(school.month),
  //         week: parseInt(school.week),
  //         elecEuro: parseInt(school.elecEuro),
  //         elecKwh: parseInt(school.elecKwh),
  //         heatEuro: parseInt(school.heatEuro),
  //         heatKwh: parseInt(school.heatKwh),
  //         waterEuro: parseInt(school.waterEuro),
  //         waterLiter: parseInt(school.waterLiter)

  //       });

        // school.save((err, school) => {
        //   if (err) {
        //     console.log(err);
        //     res
        //       .status(400)
        //       .json(err);
        //   } else {
        //     res
        //       .status(201)
        //       .json({ "message": "success", "data": school });
        //   }
        // });

  //     }
  //   });


// };

exports.updateUser = async function (user) {
  let id = user.id;
  let oldUser;

  try {
    //Find the old User Object by the Id
    oldUser = await User.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }

  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }

  //Edit the User Object
  oldUser.firstName = user.firstName || oldUser.firstName;
  oldUser.lastName = user.lastName || oldUser.lastName;
  oldUser.avatar = user.avatar || oldUser.avatar;

  try {
    let savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
};

exports.deleteUser = async function (id) {

  // Delete the User
  try {
    let deleted = await User.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("User Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the User")
  }
};