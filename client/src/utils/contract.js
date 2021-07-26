import React , { Component, useEffect, useState } from "react";
import FundingCreator from  "../client/src/contracts/FundingCreator.json";
import getWeb3 from "./getWeb3";

const contractInit = async () => {
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

      //  this.setState({ web3, accounts, contract: instance }, this.runExample);
    
return web3 , accounts , instance
   } catch (error) {
   // Catch any errors for any of the above operations.
     alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
     ); 
      console.error(error);
   } 
}

export  {contractInit };
