import React, { useState } from 'react';
import { useToken} from './context';
function CreateService() {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const { accessToken } = useToken();
console.log(accessToken.token);
  // Replace with the actual token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/brand/create?brandId=${accessToken.id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.token}`
        },
        body: JSON.stringify(serviceData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Service created successfully:', result);
      } else {
        console.error('Failed to create service:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={serviceData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={serviceData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Service</button>
      
      </form>
    </div>
  );
}

export default CreateService;
