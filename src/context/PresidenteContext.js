// PresidenteContext.js
import { createContext, useContext, useState } from 'react';

const PresidenteContext = createContext();

export const PresidenteProvider = ({ children }) => {
  const [idPresidente, setIdPresidente] = useState(null);
  const [idBairroPresidente, setIdBairroPresidente] = useState(null);

  return (
    <PresidenteContext.Provider value={{ idPresidente, setIdPresidente, idBairroPresidente, setIdBairroPresidente }}>
      {children}
    </PresidenteContext.Provider>
  );
};

export const usePresidente = () => {
  const context = useContext(PresidenteContext);
  if (!context) {
    throw new Error('usePresidente deve ser usado dentro de um PresidenteProvider');
  }
  return context;
};
