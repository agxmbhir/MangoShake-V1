import React , {useEffect , useState} from "react"
import CrowdFundingContract from "./contracts/CrowdFunding.json"
import { getFile } from "./utils/Ipfs"
import './CSS/Browse.css'
import ProgressBar from './components/ProgressBar'
import { Link } from 'react-router-dom'
function Browse(props) {


const fundAddressArray = []
const [fundraiserData , setFundraiserData ] = useState([])

useEffect(() => {

  async function browseInit() {

// Calls the public function in creator Contract 
  const noOfFundraisers = await props.contract.methods.fundingindex().call()

  // Loops through the number of FUndraisers and Gets each of their addresses 
  for(var i = 1; i <= noOfFundraisers ; i++ ) {
     const address = await props.contract.methods.getFundingContractAddress(i).call()
     console.log(address)
     fundAddressArray.push(address)

    // Creates a fundraiser Instance Using Given Instance 
     const fundraiserInstance = new props.web3.eth.Contract(
      CrowdFundingContract.abi,
      address
    ); 
    
    // Gets data from Contract 
    let ImageHash 
    let Description 
    let Title 
    const raisedAmount = await fundraiserInstance.methods.raisedAmount().call()
    const Goal = await  fundraiserInstance.methods.goal().call()

    // Gets Hash From Contract and gets file from Hash // IPFS to the moon
    const DataHash = await fundraiserInstance.methods.data().call().then(async (h) => {
      const Data = await getFile(h)
      Title = Data.title
      Description = Data.description.slice(0,10)
      ImageHash = Data.file 
    })
  
    setFundraiserData(prevFundraiserData => {
      const newFundraiserData = [...prevFundraiserData, {
              Id : prevFundraiserData.length++,
              title: Title,
              description: Description,
              imageHash: ImageHash,
              goal : Goal,
             raised : raisedAmount
            }]
      return newFundraiserData
    })

 }

 }
 browseInit()
}, [])

    return (    
<div className="fundraiser-div">
  { fundraiserData.map((data) =>
  <div key= {data.Id} className="fund-item">
    <h1>{data.title}</h1>
      <img src= {`https://ipfs.io/ipfs/${data.imageHash}`}></img>
      <p>{data.description}</p>
      <p>{props.web3.utils.fromWei(data.raised)}||{props.web3.utils.fromWei(data.goal)}</p>
      <ProgressBar completed={(data.raised / data.goal) * 100} bgColor={"black"}></ProgressBar>
      <button><Link to= {`/Index/${data.Id + 1}`}>Donate</Link></button>
  </div>
   )}
</div>
    )
}
export default Browse;