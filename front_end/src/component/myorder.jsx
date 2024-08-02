import { useValueSelector } from "./context";
import styles from './card.module.css';

export default function MyOrder() {
  const { valueSelect, setValueSelect} = useValueSelector();
  function handelDelete(id){
    setValueSelect( (valueSel) => valueSel.filter((value) => value._id !== id ) )

  }
  return (
    <>
      
      {valueSelect.length > 0 ? (
        valueSelect.map(service => (
          <ServiceDetails key={service._id} service={service } handelDelete={handelDelete} />
        ))
      ) : (
        <p>No orderes  selected.</p>
      )}
      
    </>
  );
}

function ServiceDetails({ service , handelDelete}) {
  return (
    <div className={styles.card}>
    <img
      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      alt="Profile"
    />
    <div className={styles.card_info}>
      <h3>Name:{service.name}</h3>
      <p>Description: {service.description}</p>
      <p>Price: {service.price}</p>
   
      <button onClick={()=>handelDelete(service._id)}> delete card</button>
      {/* Button to select provider */}
    </div>
  </div>
  );
}
// import { useValueSelector } from "./context";
// import styles from './card.module.css';

// export default function MyOrder() {
//   const { valueSelect, setValueSelect } = useValueSelector();

//   function handleDelete(id) {
//     setValueSelect((valueSel) => valueSel.filter((value) => value._id !== id));
//   }

//   return (
//     <>
//       {valueSelect.length > 0 ? (
//         valueSelect.map(provider => (
//           <ProviderDetails key={provider._id} provider={provider} handleDelete={handleDelete} />
//         ))
//       ) : (
//         <p>No providers selected.</p>
//       )}
//     </>
//   );
// }

// function ProviderDetails({ provider, handleDelete }) {
//   return (
//     <div className={styles.card}>
//       <img
//         src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//         alt="Profile"
//       />
//       <div className={styles.card_info}>
//         <h3>{provider.email}</h3>
//         <p>ID: {provider._id}</p>
//         <p>Role: {provider.role}</p>
//         <p>Rate: {provider.rate}</p>
//         <button onClick={() => handleDelete(provider._id)}>Delete Card</button>
//       </div>
//     </div>
//   );
// }
