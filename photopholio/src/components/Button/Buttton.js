import styled from 'styled-components';
//reusable styled component button with dynamic styles
const Button= styled.button`
color:${(props)=>props.color?props.color:'white'};
background-color:${(props)=>props.bg?props.bg:'blue'};
margin:10px;
padding:10px;
border-radius:7px;
font-size:1.2rem;
font-weight:bold;
border:0;
box-shadow: 0 3px 8px rgba(0,0,0,.24);
`
export default Button