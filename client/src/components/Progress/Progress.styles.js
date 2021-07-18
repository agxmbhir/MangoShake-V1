import styled from 'styled-components'


export const Wrapper = styled.div`
position: absolute;
top: 200px;
right: 30px;
background-color: var(--secondary-color);
padding: 50px;
width: 40%;
text-align: center;
`
export const Number = styled.h4``

export const Head = styled.h3`  
      position: relative;
      bottom: 46px ;
      display: flex;
      justify-content: space-between;`


export const ProgressWrapper = styled.div`
     width: 500px;
     background: #fff;
     border-radius: 8px;
     cursor: default;
     margin-left: 14px;
     margin-top: 80px;
     margin-bottom: 72px;
     height: 10px;

     `

export const Content = styled.div`
     background: orange;
     border-radius: 5px;
     height: 100%;
     /* change this to show progress */
     width: 50%;
     max-width: 100%;
     transition: width 0.1s linear;
`

export const Button = styled.button`
   width: max-content;
   padding: 5px;
   border-radius: 10px;
   cursor: pointer;

   :hover {
        background-color: lightblue;
   }
`
