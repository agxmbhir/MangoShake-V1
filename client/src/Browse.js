import React , {useEffect , useState} from "react"
import CrowdFundingContract from "./contracts/CrowdFunding.json"
import { getFile } from "./utils/Ipfs"
import './CSS/Browse.css'
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
    
    let ImageHash 
    let Description 
    let Title 
    const raisedAmount = await fundraiserInstance.methods.raisedAmount().call()
    const Goal = await  fundraiserInstance.methods.goal().call()
    const DataHash = await fundraiserInstance.methods.data().call().then(async (h) => {

      const Data = await getFile(h)
      Title = Data.title
      Description = Data.description
      ImageHash = Data.file 
    })
  
    setFundraiserData(prevFundraiserData => {
      const newFundraiserData = [...prevFundraiserData, {
              title: Title,
              description: Description,
              imageHash: ImageHash,
              goal : Goal,
             raised : raisedAmount
            }]
      return newFundraiserData
    })

    console.log(fundraiserData)
 }

 }

 browseInit()
}, [])

    return (    
<div>
  { fundraiserData.map((data) =>
  <div className="fund-item">
  <h1>{data.title}</h1>
  <img src= {`https://ipfs.io/ipfs/${data.imageHash}`}></img>
  <p>{data.title}</p>
  <p>{data.goal}</p>
  <p>{data.title}</p>
  </div>
   )}
</div>
    )
}
export default Browse;