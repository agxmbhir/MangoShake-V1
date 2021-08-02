import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './CSS/HomeStyles.css'
import CrowdFundingContract from "./contracts/CrowdFunding.json"
import { getFile } from './utils/Ipfs';
// Components

// import Content from './components/Content';
// import Progress from './components/Progress';

function Home(props)  {


  // Loaders
  const [ donating , setDonating] = useState()

  // Data to be set By contract 
 const [ fundAmount , setFundAmount ] = useState()
 const [ fundGoal , setFundGoal ] = useState()
 const [ address , setAddress ] = useState()
// Data to be set by IPFS 
const [ fundTitle , setFundTitle ] = useState()
const [ fundDescription , setFundDescription ] = useState()
const [ fundImg , setFundImg ] = useState()

 const [ CrowdFunding , setCrowdFunding ] = useState()


 const { id } = useParams();

// // Initialises the contract 
// async function getFundAddress(Instance, Web3) {

 
// }

useEffect(() => {
  async function getFundAddress() {

   const address = await props.creatorContract.methods.getFundingContractAddress(id).call()

  const fundraiserInstance = new props.web3.eth.Contract(
    CrowdFundingContract.abi,
    address
  );  

  // Gets some Data
  const Hash = await fundraiserInstance.methods.data().call()
  const raisedAmount = await fundraiserInstance.methods.raisedAmount().call()
  const Goal = await  fundraiserInstance.methods.goal().call()

  //Sets some states
  setFundAmount(raisedAmount)
  setFundGoal(Goal)
  setAddress(address)
  setCrowdFunding(fundraiserInstance);

  // Gets some more Data and sets some more states :D 
  const Data = await getFile(Hash)
  setFundTitle(Data.title)
  setFundDescription(Data.description)
  setFundImg(Data.file)

  }
getFundAddress()
} , [])


// Contribute Function (DUH)
async function contribute(account , Web3) {
  setDonating(true)
  let reciept
  const amount = document.getElementById("contribute-amount").value
  console.log(amount)
  await CrowdFunding.methods.contribute().send({from : account[0] , value: Web3.utils.toWei(amount).toString()}).then((r) => {
    reciept = r 
    setDonating(false)
  })

  alert("You are a good man " + account + +"Here's yout reciept"+ reciept )
}




if (donating === true) {
  return <div>Good things take time...</div>
}
 return (

    <div className="body-div"  >
    <button>Get data</button>
    <div className="header-div">
      <h2>{fundTitle}</h2>
    </div>


    <div className="main-div">
      <img className="fundraiser-img" src= {`https://ipfs.io/ipfs/${fundImg}`} alt=""></img>
      <p>{fundDescription}</p>
    </div>

    <div className="fundraiser-details">       
    
    <button id="withdraw-button" className="hidden">Withdraw Funds</button>
      
      <div className="progress-container" id="progress-container">
        <div className="progress" id="progress">

          <div className="identifiers">
            <span>Raised {fundAmount}</span>
            <span>Goal {fundGoal}</span>
          </div>

          <div className="duration-wrapper">
            <span className="raised raised-progress"></span>
            <span className="goal goal-progress"></span>
          </div>
          
          <div className="dollar-value-wrapper">
            <span className="raised-dollars raised-progress">{address}</span>
            <span className="goal-dollars goal-progress"></span>
          </div>
        </div>
      </div>
   
      <input className="input" id="contribute-amount" type="number" placeholder="Contribution Amount"  required>
          </input>
      <button id="contribute-button" onClick={()=>  contribute(props.account , props.web3)}>Contribute</button>
    </div>

</div>


)}
export default Home;