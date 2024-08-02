import {  useValueSearch } from "./context";
import styles from "./search.module.css";
export default function Search(){
    

    const {setValueSearch } = useValueSearch();
    return <div>
        <input type="search" className={styles.Search}
        onChange={(e)=>setValueSearch(e.target.value)}/>
    </div>
}