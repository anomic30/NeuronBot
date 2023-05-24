const User = require('../models/user.model');

async function saveImagesToDatabase(userId, array) {
    const user = await User.findOne({ userId });

    //push cid in user.images
    for (let cid of array) {
        user.images.push(cid.toString());
    }
    
    //save user
    await user.save();
}

module.exports = { saveImagesToDatabase };