const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('app_api/models/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
                  
async function authenticate({ email, password }) {
    let user = await User.findOne({ email });
    console.log('========auth======');
    console.log(user);
    console.log(user.email);
    console.log(user.password);
    // Return the authenticated user that was returned by the mongoose promise

    let result = await bcrypt.compare(password, user.password);
    // console.log('========result=======');
    // console.log(result);
    if ( result ) {
      return {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        token: jwt.sign({ sub: user._id }, 'secretcode_jasndkasjdbajhsbdjhbasjd')
      };
    } else {
      throw Error();
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    // hash password
   
    if (userParam.password) {
        // user.hash = bcrypt.hashSync(userParam.password, 10);
        user.password = await bcrypt.hash(userParam.password, 10);
    }
    console.log('----------------------------------')
    console.log(user);

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);
    console.log('------------service update------------');
    console.log(user)
;    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}