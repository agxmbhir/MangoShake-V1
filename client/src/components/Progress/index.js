import React from 'react'
import { Wrapper , Content, ProgressWrapper , Button, Number, Head } from './Progress.styles';
const Progress = (props) => (
   <Wrapper>
  <Head>Raised</Head>
  <Head>Goal</Head>
   <Number>{props.raised}</Number>
   <Number>{props.Goal}</Number>
<ProgressWrapper>
    <Content/>
</ProgressWrapper>
       <Button>Contribute</Button>
   </Wrapper>
   
)
export default Progress;