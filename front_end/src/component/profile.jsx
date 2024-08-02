import styles from './profile.module.css';
 export default function Profile({setState}){
    return<>
    <div className={styles.card}>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt='photo'/>
        <div className={styles.card_info}>
            <h3>name</h3>
            <button onClick={()=>setState('myorder')}>my order</button> 
            <p>My Order</p>
            <button>SITTING</button>
            </div>
    
    </div>
    
    
    </>
}