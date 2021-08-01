import React from "react"
import { Link } from 'react-router-dom'
// Logo 
import Logo from '../../images/mango.png'
// styles
import {Wrapper , Button , Buttons , MangoLogo , User} from './navbar.styles'

const Nav = (props) => (
      <Wrapper>
         <MangoLogo src={Logo}/>
         <Buttons>
             <Button ><span>Home</span></Button> 
             <Button><Link to="/create">Create a fundraiser</Link></Button>
             <Button><span>Documentation</span></Button>
        </Buttons>
        <User>{props.userAddress}</User>
        <User>{props.IPFSHash}</User>
     </Wrapper>
)

export default Nav;