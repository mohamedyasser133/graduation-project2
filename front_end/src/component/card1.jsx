// import { useEffect, useState } from 'react';
// import styles from './card.module.css';
// import { useToken, useValueSearch } from './context';



// export default function Cards() {
//   const { accessToken } = useToken();
//   const { valueSearch } = useValueSearch();
//   const [dataProvider, setDataProvider] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3000/brand/providers', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setDataProvider(data.isBrandExsit);
//         } else {
//           console.error('Failed to fetch data');
//           const errorData = await response.json();
//           console.error('Error:', errorData);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [accessToken]);

//   const filteredProviders = valueSearch
//     ? dataProvider.filter(provider => provider._id.includes(valueSearch))
//     : dataProvider;

//   return (
//     <div className="providers-container">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         filteredProviders.map(provider => (
//           <Card key={provider._id} provider={provider} />
//         ))
//       )}
//     </div>
//   );
// }

// function Card({ provider }) {
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
//       </div>
//     </div>
//   );
// }

