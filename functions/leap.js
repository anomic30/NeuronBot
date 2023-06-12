const { Leap } = require("@leap-ai/sdk");

const leapClient = new Leap(process.env.LEAP_API_KEY);
leapClient.usePublicModel("sd-1.5");

async function leap(prompt, size, total, style) {
    if (style) {
        prompt = prompt + ` in ${style.value} style`;
    }
    let dimensions = size.split("x");
    let width = parseInt(dimensions[0]);
    let height = parseInt(dimensions[1]);
    try {
        const result = await leapClient.generate.generateImage({
            prompt: prompt,
            negativePrompt: 'blurry, asymmetric, watermarks, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts',
            numberOfImages: 1,
            width: width,
            height: height,
        });

        if (result) {
            // Print the first image's uri
            console.log(result.data.images);
            return result.data.images;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { leap };