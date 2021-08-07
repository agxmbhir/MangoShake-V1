import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './CSS/HomeStyles.css'
import CrowdFundingContract from "./contracts/CrowdFunding.json"

//utils 
import { getFile } from './utils/Ipfs';
import { toUSD , toETH } from './utils/ethStats'

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

//Amounts in USD
const [ raisedUSD , setRaisedUSD ] = useState()
const [ goalUSD , setGoalUSD ] = useState()
// Data to be set by IPFS 
const [ fundTitle , setFundTitle ] = useState()
const [ fundDescription , setFundDescription ] = useState()
const [ fundImg , setFundImg ] = useState()
//Contract 
const [ CrowdFunding , setCrowdFunding ] = useState()

// Setting some stats 
const [ stats , setStats] = useState( { raised : null , goal : null })

 const { id } = useParams();

 

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
  setFundAmount(props.web3.utils.fromWei(raisedAmount))
  setFundGoal(props.web3.utils.fromWei(Goal))
  setAddress(address)
  setCrowdFunding(fundraiserInstance);

  //
 setRaisedUSD( await toUSD(props.web3.utils.fromWei(raisedAmount)))
 setGoalUSD( await toUSD(props.web3.utils.fromWei(Goal)))

  // Gets some more Data and sets some more states :D 
  const Data = await getFile(Hash)
  setFundTitle(Data.title)
  setFundDescription(Data.description)
  setFundImg(Data.file)

  }
getFundAddress()
} , [])


// getting and setting some stats 


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
<>
    <div className="body">

   <h2 className="title">{fundTitle}</h2>

    <div className="fundraiser">

      <div className = "fundraiser-right">
      <img className="fundraiser-img" src= {`https://ipfs.io/ipfs/${fundImg}`} alt=""></img>
      <p>{fundDescription}</p>
      </div>

      <div className = "fundraiser-left">
      <button className="withdraw-button" >Withdraw Funds</button>
      
      <div className="amounts">
        <span>Raised {fundAmount} || {raisedUSD} </span>
        <span>Goal {fundGoal} || {goalUSD}</span>
      </div>
  
     <input className="contribute-amount" id="contribute-amount" type="number" placeholder="Amount"  required></input>
     <button id="contribute-button" onClick={()=>  contribute(props.account , props.web3)}>Contribute</button>
      </div>

    </div>
</div>
</>


)}
export default Home;