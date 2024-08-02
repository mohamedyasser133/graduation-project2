
import Search from "./search";
import styles from "./navbar.module.css";


export default function NavBar({setState}){
  function handleclick(event){
    setState(event.target.value)
    console.log(event.target.value)
  }
    return<>
      <nav >
      <ul  className={styles.navbar}>
        <li >
         
          <button value='home' onClick={(e)=>handleclick(e)}>HOME</button>
        </li>
        <li>
        <button value='profile' onClick={(e)=>handleclick(e)}>PROFILE</button>
        </li>
        <li className={styles.Search}>
          <Search/>
        </li>
        <li>
        <button value='myorder' onClick={(e)=>handleclick(e)}>MYORDER</button>
        </li>
      </ul>
    </nav></>
}