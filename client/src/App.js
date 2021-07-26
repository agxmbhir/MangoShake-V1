import React , { Component } from "react";
import FundingCreator from  "./contracts/FundingCreator.json";
import getWeb3 from "./getWeb3";


import { useParams , BrowserRouter as Router, Route ,Redirect } from 'react-router-dom'
import './index.css'

// Components
import Navbar from './components/Navbar';
import Home from "./Home";
import Form  from "./Form"

 class App extends Component {
 state = { storageValue: 0, web3: null, accounts: null, contract: null , fundraiser: null , fundIndex: null};


  componentDidMount = async () => {
    try {
       const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

     // Get the contract instance.
       const networkId = await web3.eth.net.getId();
       const deployedNetwork = FundingCreator.networks[networkId];
       const instance = new web3.eth.Contract(
       FundingCreator.abi,
       deployedNetwork && deployedNetwork.address,
      );

       this.setState({ web3, accounts, contract: instance }, this.runExample);
   } catch (error) {
   // Catch any errors for any of the above operations.
     alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
     ); 
      console.error(error);
   }

   this.state.contract.events.FundraiserCreated({},(_, event) => {
     
     // location.replace("/index.html?index=" + event.returnValues.fundraiserIndex);
     this.setState({ fundraiser : true, fundIndex : event.returnValues.fundraiserIndex})
  })     
  };


  render() {
    if (!this.state.web3) {
     return <div>Loading Web3, accounts, and contract...</div>;
   }
   if (this.state.fundraiser == true) {
     return  (
       <Router>
         <Route path='/Index/{:id}' exact >
     <Home withdrawFunction="" contributeFunction="" FundTitle = "Please Help Himalyas" FundDescription ="Lorem Ipsum"/>
   </Route>
      <Redirect to={"/Index/" + this.state.fundIndex} />
      </Router>
   )
   }
   return (
    <>
  <Router>
  <Navbar userAddress = {this.state.accounts} />
  <Route path='/Index/:id' exact >
     <Home withdrawFunction="" contributeFunction="" FundTitle = "Please Help Himalyas" FundDescription ="Lorem Ipsum" />
   </Route>
    <Route path='/Create' >
    <Form contract= {this.state.contract} account = {this.state.accounts} />
    </Route>
  </Router>

  </>
   )
} }

export default App;
