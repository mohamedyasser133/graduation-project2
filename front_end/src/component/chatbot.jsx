// import { useEffect, useState } from "react";
import styles from "./card.module.css";
import { useToken, useValueSearch, useValueSelector } from "./context";





import React, { useState,useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Cards from './card';


const Message = ({ message, isUser }) => (
  <ListItem>
    <Paper elevation={3} style={{ padding: '10px', backgroundColor: isUser ? '#e0f7fa' : '#f0f0f0', marginLeft: isUser ? 'auto' : 0 }}>
      <ListItemText primary={message} style={{ textAlign: isUser ? 'right' : 'left' }} />
    </Paper>
  </ListItem>
);

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'welcome', isUser: false },
    { text: 'How can i help you', isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (message) => {
    if (message.trim() === '') return;

    const newMessage = { text: message, isUser: true };
    setMessages([...messages, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    switch (message.toLowerCase()) {
      case'plumber':
        return <Card2 choose={"سباك"} />;
      case 'painter':
        return <Card2 choose={"نقاش"} />;
      case 'cleaner':
        return<Card2 choose={"تنضيف"} />;
      case 'carprenter':
        return <Card2 choose={"نجار"} />;
      default:
        return <Cards/>;
    }
  };

  const renderMessages = (message, isUser) => {
    return typeof message === 'string' ? (
      <Message key={message} message={message} isUser={isUser} />
    ) : (
      <ListItem key={message} style={{ textAlign: isUser ? 'right' : 'left' }}>
        {message}
      </ListItem>
    );
  };

  const options = [
   'plumber',
    'cleaner',
    'painter',
   'All Services'
  ];

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h5" align="center" gutterBottom>Chat Bot</Typography>
        <Paper style={{ padding: '20px', height: '400px', overflowY: 'scroll' }}>
          <List>
            {messages.map((msg, index) => renderMessages(msg.text, msg.isUser))}
          </List>
        </Paper>
        <Box mt={2}>
          {options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleSendMessage(option)}
              style={{ marginBottom: '10px' }}
            >
              {option}
            </Button>
          ))}
        </Box>
      </Box>
    </Container>
  );
};


function Card2({choose}) {
    const { accessToken } = useToken();

    const [dataService, setDataService] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const filterServices = choose
      ? dataService.filter((service) => service.description.includes(choose))
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
export default Chatbot;