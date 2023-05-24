// import {
//     create,
//     urlSource
// } from 'ipfs-http-client';

//use require instead of import
const {
    create,
    urlSource
} = require('ipfs-http-client');

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64'
)}`;

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
});

//EXPORTS
async function uploadToIpfs(url) {
    try {
        const result = await ipfs.add(urlSource(url));
        return result.cid;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function downloadFromIpfs(path) {
    try {
        const result = await ipfs.get(path);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function uploadArrayToIpfs(array) {
    try {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(await uploadToIpfs(array[i].url));
        }
        return result;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    uploadArrayToIpfs,
};