// TokenContext.js
import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();
const TakeContext =createContext();
const OrderContext = createContext();


export function TokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [valueSearch, setValueSearch] = useState('');
  const [valueSelect, setValueSelect] = useState([]);
  return (
    <TokenContext.Provider value={{ accessToken, setAccessToken }}>
      <TakeContext.Provider value={{ valueSearch, setValueSearch }}>
       <OrderContext.Provider value={{valueSelect, setValueSelect}}>
        {children}
       </OrderContext.Provider>
        
      </TakeContext.Provider>
    
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
}
export function useValueSearch() {
  const context = useContext(TakeContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
  
}
export function useValueSelector() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;


}