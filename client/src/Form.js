import React, { useState, useEffect } from 'react';

import './CSS/FormStyles.css'
import {pinByHash} from './utils/pinataPinner';
const { create } = require('ipfs-http-client')


function Form(props){ 


// IPFS setup ( A little messy )
  const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
  const [uploading, setUploading] = useState(false);
  const [created, setCreated] = useState();
  const [imgHash , setImgHash ] = useState();
  let ipfs
  useEffect(()=>{ // persistent ipfs node.. optional
    ipfs = create(infura);
    console.log('IPFS connected: ',ipfs)
  },[])

// Convert Binary Into JSON 
  var binArrayToJson = function(binArray)
  {
      var str = "";
      for (var i = 0; i < binArray.length; i++) {
          str += String.fromCharCode(parseInt(binArray[i]));
      }
      return JSON.parse(str)
  }



  // Get File Function 
  async function getFile(cid){
  
    let chunks 

 
        for await (const chunk of ipfs.cat(cid)) {

            chunks = binArrayToJson(chunk);
        }

        return chunks;
    }
    
  async function submitData(){

    setUploading(true);

    let title = document.getElementById('Title').value;
    let goal = document.getElementById('Goal').value;
    let description = document.getElementById('description').value;
    let file = document.getElementById('file').files[0]

    let fileCID = await ipfs.add(file, {pin:true,}); // file
    pinByHash(fileCID);

    let objectStruct = JSON.stringify({title:title, goal:goal, description:description, file:fileCID.path})
    let dataCID = await ipfs.add(objectStruct, {pin: true,}) // object

    pinByHash(dataCID);

    console.log('saved: ',dataCID.path);
    setUploading(false);

    setCreated(dataCID.path);
  const finalData =  await getFile(dataCID.path)
    setImgHash(finalData.file)

    return dataCID;
  }

 async function CreateFundraiser(instance , account) {
   const ipfsHash = await submitData() 
   let goal = document.getElementById('Goal').value;

  instance.methods.createFunding( goal , 17800, ipfsHash.path ).send({from: account[0]}).then((value) => console.log(value))
 

 }
 
   return (
     <div className="form">
      <form >
        <div className="form-control">
          <label>Title</label>
          <input type="text" name="Title" id="Title" />
        </div>
        <div className="form-control">
          <label>Goal</label>
          <input type="number" name="Goal" id="Goal" />
        </div>
        <div>
            <label>Description</label>
            <textarea  name="description" id="description" />
        </div>
        <div>
            <label>Upload File</label>
            <input type="file" name="description" id='file' />
        </div>

      </form>
      {ipfs || !uploading?
        <button onClick={()=> CreateFundraiser(props.contract , props.account)}>Create</button>
        :'loading IPFS or data'}
        <br />
      {created?
        <div>
          Object created!:<br />
          {created}<br />
          take a look in: https://ipfs.io/ipfs/{created} <br /> 
          and then grab the file CID (Qm..) and search for it
        </div>
        :'open your console'}
    </div>

   )
}

export default Form;
