const axios = require('axios');
// manage private data in .env
const Pinata_ApiKey = '646fc9eb84b76aa5fdad' // change this
const Pinata_ApiSecret = '70bdfb585ef311a90aa32b3f0fdb0b247e11a9d2756dd12a61a158d56bf05d50'// change this

export const pinByHash = (hashToPin) => {
  const url = `https://api.pinata.cloud/pinning/pinByHash`;
  const body = {
      hashToPin: hashToPin,
      hostNodes: [
          '/ip4/hostNode1ExternalIP/tcp/4001/ipfs/hostNode1PeerId',
          '/ip4/hostNode2ExternalIP/tcp/4001/ipfs/hostNode2PeerId'
      ],
  };
  return axios
      .post(url, body, {
          headers: {
              pinata_api_key: Pinata_ApiKey,
              pinata_secret_api_key: Pinata_ApiSecret
          }
      })
      .then(function (response) {
          //handle response here
          console.log('Correct!: ', response)
      })
      .catch(function (error) {
          //handle error here
          console.log('Error: ',error)
      });
};
