
import CrowdFunding from "./contacts/Crowdfunding.json"
import FundingCreator from  "./contracts/FundingCreator.json";
import getWeb3 from "./getWeb3";
 

export const connect =  () => {
    window.getWeb3().then(async (web3) => {
      const networkId = await web3.eth.net.getId();
  
        const deployedNetwork = FundingCreator.networks[networkId];
        const instance = new web3.eth.Contract(
          FundingCreator.abi,
        deployedNetwork && deployedNetwork.address
        );

        instance.events.FundraiserCreated({}, function(_, event){
          location.replace("/index.html?index=" + event.returnValues.fundraiserIndex);
        })

        window.instance = instance;
  
  
  
          const deployedNetwork = FundingCreatorContract.networks[networkId];
          const instance = new web3.eth.Contract(
            FundingCreatorContract.abi,
            deployedNetwork && deployedNetwork.address
          );
        
          const urlSearchParams = new URLSearchParams(window.location.search);
          const params = Object.fromEntries(urlSearchParams.entries());
          (async () => {
            const address = await instance.methods.getFundingContractAddress(params.index).call();
            const fundraiserInstance = new web3.eth.Contract(
              CrowdFundingContract.abi,
              address
            );});
      });

    }
  

