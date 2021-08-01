import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './CSS/HomeStyles.css'
import CrowdFundingContract from "./contracts/CrowdFunding.json"

// Components

// import Content from './components/Content';
// import Progress from './components/Progress';

function Home(props)  {

 const [ fundHash , setFundHash ] = useState()
 const [ fundAmount , setFundAmount ] = useState()
 const [ fundGoal , setFundGoal ] = useState()
 const [ address , setAddress ] = useState()
 const [ CrowdFunding , setCrowdFunding ] = useState()

 const [ donating , setDonating] = useState(false)

 const { id } = useParams();

async function getFundAddress(Instance, Index , Web3) {

  let address
  const contract = await Instance.methods.getFundingContractAddress(id).call().then((value) => {
   address = value
  })

  const fundraiserInstance = new Web3.eth.Contract(
    CrowdFundingContract.abi,
    address
  );  

  const Hash = await fundraiserInstance.methods.data().call()
  const raisedAmount = await fundraiserInstance.methods.raisedAmount().call()
  const Goal = await  fundraiserInstance.methods.goal().call()

  setFundAmount(raisedAmount)
  setFundGoal(Goal)
  setFundHash(Hash)
  setAddress(address)
  setCrowdFunding(fundraiserInstance); 

}
async function contribute() {
  setDonating(true)
  const amount = document.getElementById("contribute-amount")
  await 
}

getFundAddress(props.creatorContract , props.Index , props.web3)

 return (

    <div className="body-div"  >
    <button>Get data</button>
    <div className="header-div">
      <h2>{fundHash} - { id } No - {fundAmount}</h2>
    </div>


    <div className="main-div">
      <img className="fundraiser-img" src={props.img} alt=""></img>
      <p>{props.FundDescription}</p>
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
   
      <input className="input" id="contribute-amount" type="number" placeholder="Contribution Amount"  onkeypress="return event.charCode != 45" required>
          </input>
      <button id="contribute-button" onClick={()=>  props.contributeFunction}>Contribute</button>
    </div>

</div>


)}
export default Home;