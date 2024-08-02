import { useEffect, useState } from "react";
import styles from "./card.module.css";
import { useToken, useValueSearch, useValueSelector } from "./context";

export default function Cards({choose}) {
  const { accessToken } = useToken();
  const { valueSearch,setValueSearch } = useValueSearch();
  const [dataService, setDataService] = useState([]);
  const [loading, setLoading] = useState(false);
  async function setAtDataBase(serviceId) {
    
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ serviceid : serviceId }),
      });
      console.log(accessToken);
      console.log(response);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Cart created successfully:", data);
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  }
  const { valueSelect, setValueSelect } = useValueSelector();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/brand/services", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${accessToken.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.services);
          setDataService(data.services);
        } else {
          console.error("Failed to fetch data");
          const errorData = await response.json();
          console.error("Error:", errorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [accessToken]);

  const filterServices = valueSearch
    ? dataService.filter((service) => service.description.includes(valueSearch))
    : dataService;

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        filterServices.map((service) => (
          <Card
            key={service._id}
            service={service}
            onSelect={() => {
              setAtDataBase(service._id);
              // setSelectedProvider(provider)
              setValueSelect([...valueSelect, service]);
            }} // Pass function to set selected provider
          />
        ))
      )}
      {/* {selectedProvider && <ProviderDetails provider={selectedProvider} />} */}
    </div>
  );
}

function Card({ service, onSelect }) {
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
     
        <button onClick={onSelect}>Order Now</button>{" "}
        {/* Button to select provider */}
      </div>
    </div>
  );
}


