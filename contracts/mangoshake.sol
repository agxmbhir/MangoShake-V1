// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract FundingCreator {
    mapping(uint => CrowdFunding) public fundings;
    uint fundingindex = 0;
    event FundraiserCreated(uint fundraiserIndex);

    function createFunding(uint inputGoal, uint inputDeadline) public {
        CrowdFunding newFunding = new CrowdFunding(inputGoal, inputDeadline, msg.sender);
        fundingindex = fundingindex + 1;
        fundings[fundingindex] = newFunding;
        emit FundraiserCreated(fundingindex);
    }

     function getFundingContract(uint _fundingindex) public view returns (uint) {
        CrowdFunding funding = fundings[_fundingindex];
        return funding.goal();
    }

     function getFundingContractAddress(uint _fundingindex) public view returns (address) {
        CrowdFunding funding = fundings[_fundingindex];
        return address(funding);
    }
}

contract CrowdFunding {
    
    mapping(address => uint) public contributors;
    
    address payable public admin;
    uint public numberOfContributors;
    uint public minimumContribution;
    uint public deadline;
    uint public goal;
    uint public raisedAmount;

    
    event ContributeEvent(address _sender, uint _value);
    event fundsWithdrawn( uint _value);

    
    constructor(uint _goal, uint _deadline, address eoa)  {
        goal = _goal * (1 ether);
        deadline = block.timestamp + _deadline;
        admin = payable(eoa);
        
        minimumContribution = 100 wei;
    }
    
    function contribute() public payable {
        require(block.timestamp < deadline, "deadline has passed!");
        require(msg.value >= minimumContribution, "Minimum Contribution Not Met!");
        
        // payable(address(this)).transfer(msg.value);

        if(contributors[msg.sender] == 0){  
            numberOfContributors++;
            } 
            
        contributors[msg.sender] += msg.value;
      
        raisedAmount += msg.value;
        emit ContributeEvent(msg.sender , msg.value);
     }
     
    receive() payable external {
        contribute();
    }
    
    function getBalance() public view returns(uint){
        return address(this).balance;
    }
    

        modifier onlyAdmin() {
        require(msg.sender == admin,"Only Admin Can Call This Function!");
        _;
    }
    
    function withdrawFunds() public onlyAdmin{
        require(raisedAmount >= goal);
        admin.transfer(raisedAmount);
        emit fundsWithdrawn(raisedAmount);
        raisedAmount = 0;
    }
    
}