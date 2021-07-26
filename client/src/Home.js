import React from 'react'
import { Link, useParams } from 'react-router-dom';
import './CSS/HomeStyles.css'

 // Components

// import Content from './components/Content';
// import Progress from './components/Progress';

function Home(props)  {
 
    const { id } = useParams();

 return (
  <Link>
    <div className="body-div">

    <div className="header-div">
      <h2>{props.FundTitle} - { id } No - { props.count}</h2>
    </div>


    <div className="main-div">
      <img className="fundraiser-img" src="img/test.jpg" alt=""></img>
      <p>{props.FundDescription}</p>
    </div>

    <div className="fundraiser-details">       
    
    <button id="withdraw-button" className="hidden">Withdraw Funds</button>
      
      <div className="progress-container" id="progress-container">
        <div className="progress" id="progress">

          <div className="identifiers">
            <span>Raised</span>
            <span>Goal</span>
          </div>

          <div className="duration-wrapper">
            <span className="raised raised-progress"></span>
            <span className="goal goal-progress"></span>
          </div>
          
          <div className="dollar-value-wrapper">
            <span className="raised-dollars raised-progress"></span>
            <span className="goal-dollars goal-progress"></span>
          </div>
        </div>
      </div>
   
      <input className="input" id="contribute-amount" type="number" placeholder="Contribution Amount"  onkeypress="return event.charCode != 45" required>
          </input>
      <button id="contribute-button">Contribute</button>
    </div>

</div>
</Link>

)}
export default Home;