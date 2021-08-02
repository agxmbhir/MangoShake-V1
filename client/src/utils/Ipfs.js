
const { create } = require('ipfs-http-client')


// IPFS setup ( A little messy )
  const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };

 let ipfs
    ipfs = create(infura);
    console.log('IPFS connected: ',ipfs)

 
// Convert Binary Into JSON 
export var binArrayToJson = function(binArray)
{
    var str = "";
    for (var i = 0; i < binArray.length; i++) {
        str += String.fromCharCode(parseInt(binArray[i]));
    }
    return JSON.parse(str)
}

// Get File Function 
export async function getFile(cid){
  let chunks 
      for await (const chunk of ipfs.cat(cid)) {

          chunks = binArrayToJson(chunk);
      }
      return chunks;
}
