const User = require('../models/user.model');

async function checkChat(userId) {
    const user = await User.findOne({ userId });

    if (!user) {
        // Create a new user with 20 credits
        const newUser = new User({
            userId,
            chatCredits: 20,
            dalleCredits: 10,
            lastRefillDate: new Date(),
            images: [],
        });

        await newUser.save();
        return { chatCredits: newUser.chatCredits, canUse: true };
    }

    if (user.chatCredits < 1) {
        // User does not have enough credits to use the bot
        return {chatCredits: user.chatCredits, canUse: false};
    }

    // Decrement the credits by 1 and save the user
    user.chatCredits -= 1;
    await user.save();

    // Check if the credits need to be refilled
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
    const timeSinceLastRefill = Date.now() - user.lastRefillDate.getTime();
    if (timeSinceLastRefill >= oneWeekInMillis) {
        // Refill the credits and update the lastRefillDate
        user.chatCredits = 20;
        user.dalleCredits = 10;
        user.lastRefillDate = new Date();
        await user.save();
    }

    //return true and the credits
    return { chatCredits: user.chatCredits, canUse: true };
}

async function checkDalle(userId) {
    const user = await User.findOne({ userId });

    if (!user) {
        // Create a new user with 20 credits
        const newUser = new User({
            userId,
            chatCredits: 20,
            dalleCredits: 10,
            lastRefillDate: new Date(),
            images: [],
        });

        await newUser.save();
        return { dalleCredits: newUser.dalleCredits, canUse: true };
    }

    if (user.dalleCredits < 1) {
        // User does not have enough credits to use the bot
        return {dalleCredits: user.dalleCredits, canUse: false};
    }

    // Decrement the credits by 1 and save the user
    user.dalleCredits -= 1;
    await user.save();

    // Check if the credits need to be refilled
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
    const timeSinceLastRefill = Date.now() - user.lastRefillDate.getTime();
    if (timeSinceLastRefill >= oneWeekInMillis) {
        // Refill the credits and update the lastRefillDate
        user.chatCredits = 20;
        user.dalleCredits = 10;
        user.lastRefillDate = new Date();
        await user.save();
    }

    //return true and the credits
    return { dalleCredits: user.dalleCredits, canUse: true };
}

module.exports = { checkChat, checkDalle };