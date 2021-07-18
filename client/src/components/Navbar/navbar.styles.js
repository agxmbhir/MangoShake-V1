import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position:sticky;
  height: 50px;
  box-shadow: -70px 11px 19px 0px rgb(0 0 0 30% );
  cursor: default;
  padding: 10px;
`;
export const Buttons = styled.div`
   margin-left: auto;
   margin-right: auto;
   display: flex;
   align-items: center;
   `


export const Button = styled.h4`
  display: inline;
  margin-left: 50px;
  cursor: pointer;
 transition-duration: 0.2s;
  :hover {
      /* transform: translate(4px); */
      font-size:  17px;
  }
`;

export const MangoLogo = styled.img`
  padding-left: 20px ;
  cursor: pointer;
  transition-duration: 0.2s;
  :hover {
      
     transform : rotate(10deg)
  }
`;

export const User = styled.h3`

     display: inline-block;
     cursor: pointer;
     font-size: 14px;
     border-radius: 20px;
     padding:5px;
     margin-top: 10px;
     height: max-content;
     box-shadow: 1px 2px 4px 1px rgb(0, 0, 0, 0.4);
`
