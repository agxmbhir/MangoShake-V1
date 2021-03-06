import React , { useEffect, useState  } from "react";
import FundingCreatorContract from  "./contracts/FundingCreator.json";
import getWeb3 from "./getWeb3";


import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom'
import './index.css'

// Components
import Navbar from './components/Navbar';
import Home from "./Home";
import Form  from "./Form"
import Browse from "./Browse"
function App() {
  
 const [ Web3 , setWeb3] = useState()
 const [ accounts ,setAccounts] = useState(null)
 const [ ContractInstance , setContractInstance ] = useState()

 const [ fundraiser , setFundraiser] = useState(false) 
 const [ fundIndex , setfundIndex] = useState(null)



useEffect(() => {

 async function ContractInit() {
    try {
       const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

     // Get the contract instance.
       const networkId = await web3.eth.net.getId();
       const deployedNetwork = FundingCreatorContract.networks[networkId];
       const instance = new web3.eth.Contract(
       FundingCreatorContract.abi,
       deployedNetwork && deployedNetwork.address,
      );


     setContractInstance(instance)
     setWeb3(web3)
     setAccounts(accounts)
   
    
   } catch (error) {
   // Catch any errors for any of the above operations.
     alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
     ); 
      console.error(error);
   }

}
ContractInit()

}, [] )

// Setting the event listener for ContractInstance
//Waits for setState to set Contract Instance
if (ContractInstance) {

  ContractInstance.events.FundraiserCreated({},(_, event) => {
    setFundraiser(true)
    setfundIndex(event.returnValues.fundraiserIndex)
  }) 
  }


   if (!Web3) {
     return <div>Loading Web3, accounts, and contract...</div>;
   }

   if (fundraiser === true) {
     return  (
       <Router>
      <Redirect to={"/Index/" + fundIndex} />
      </Router>
   )}

   return (
    <>
  <Router>
  <Navbar userAddress = {accounts}/>
    <Route path='/Index/:id' exact >
         <Home 
         account = {accounts}
         creatorContract = { ContractInstance }
         Index = {fundIndex}
         web3 = { Web3 }
         />
   </Route>
    <Route path='/Create' >
    <Form 
    contract= {ContractInstance} 
    account = {accounts} 

    />
    </Route>

    <Route path='/Browse' >
      <Browse
        contract= {ContractInstance}
       fundIndex = {fundIndex}
       web3 = { Web3 }
        />
    </Route>
  </Router>

  </>
   )
} 

export default App;
