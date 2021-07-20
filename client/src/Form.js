import React, { useState, useEffect } from 'react';
import './FormStyles.css'
import {pinByHash} from './utils/pinataPinner';
const { create } = require('ipfs-http-client')

function Form(){
  const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
  const [uploading, setUploading] = useState(false);
  const [created, setCreated] = useState();

  let ipfs
  useEffect(()=>{ // persistent ipfs node.. optional
    ipfs = create(infura);
    console.log('IPFS connected: ',ipfs)
  },[])

  async function submitData(){
    setUploading(true);
    let title = document.getElementById('Title').value;
    let goal = document.getElementById('Goal').value;
    let description = document.getElementById('description').value;
    let file = document.getElementById('file').files[0]
    // console.log(title, goal, description, file)
    let fileCID = await ipfs.add(file, {pin:true,}); // file
    pinByHash(fileCID);
    let objectStruct = JSON.stringify({title:title, goal:goal, description:description, file:fileCID.path})
    let dataCID = await ipfs.add(objectStruct, {pin: true,}) // object
    pinByHash(dataCID);
    console.log('saved: ',dataCID.path);
    setUploading(false);
    setCreated(dataCID.path);
    return dataCID;
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
        <button onClick={()=>submitData()}>Create</button>
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
