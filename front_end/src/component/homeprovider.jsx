import { useState } from "react";
import styles from "./navbar.module.css";
import CreateService from "./createserves";
import OrdersList from "./providerorder";

export default function Homeprovider({ tok, isAuth }) {
  const [state, setState] = useState("");
  return (
    <>
   
    <Navbar setState={setState} />
    
      <div>
        <div className="home-container">
        {state === 'create' && <CreateService/>}
      {state=== 'order' && <OrdersList/>}
        </div>
      </div>
    </>
  );
}
function Navbar({setState}) {
    function handleclick(event){
        setState(event.target.value)
        console.log(event.target.value)
      }
  return <>
   <nav >
      <ul  className={styles.navbar}>
        <li >
         
          <button value='create' onClick={(e)=>handleclick(e)}>create</button>
        </li>
        <li>
        <button value='order' onClick={(e)=>handleclick(e)}>order</button>
        </li>
    
      </ul>
    </nav>
  </>;
}
