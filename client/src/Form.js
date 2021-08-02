import React, { useState, useEffect, useRef } from 'react';

import './CSS/FormStyles.css'
import {pinByHash} from './utils/pinataPinner';
const { create } = require('ipfs-http-client')


function Form(props){ 


// IPFS setup ( A little messy )
  const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
  const [uploading, setUploading] = useState(false);
  const [created, setCreated] = useState();


 const [ isPending , setIsPending ] = useState() 
 const ipfs = useRef(null)
 
  useEffect(()=>{ // persistent ipfs node.. optional
    ipfs.current = create(infura);
    console.log('IPFS connected: ',ipfs)
  },[infura])


  // Submitting the Data to IPFS 
  async function submitData(){

    setUploading(true);

    let title = document.getElementById('Title').value;
    let goal = document.getElementById('Goal').value;
    let description = document.getElementById('description').value;
    let file = document.getElementById('file').files[0]

    let fileCID = await ipfs.current.add(file, {pin:true,}); // file
    pinByHash(fileCID);

    let objectStruct = JSON.stringify({title:title, goal:goal, description:description, file:fileCID.path})
    let dataCID = await ipfs.current.add(objectStruct, {pin: true,}) // object

    pinByHash(dataCID);

    console.log('saved: ',dataCID.path);
    setUploading(false);

    setCreated(dataCID.path);
    return dataCID;
  }

// Creates a Fundraiser 
 async function CreateFundraiser(instance , account) {

  let goal = document.getElementById('Goal').value;

  setIsPending(true)
   const ipfsHash = await submitData() 
   instance.methods.createFunding( goal , 17800, ipfsHash.path ).send({from: account[0]}).then((value) => {
    setIsPending(false)
   }
   )
 }
 


 if (isPending === true) {
   return <div>Grab a mango, by the time ethereum does its magic...</div>
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
      {ipfs.current || !uploading?
        <button onClick={()=> CreateFundraiser(props.contract , props.account )}>Create</button>
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
