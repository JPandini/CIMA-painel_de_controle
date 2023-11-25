// PresidenteContext.js
import { createContext, useContext, useState } from 'react';

const PresidenteContext = createContext();

export const PresidenteProvider = ({ children }) => {
  const [idPresidente, setIdPresidente] = useState(null);
  const [idBairroPresidente, setIdBairroPresidente] = useState(null);
  const [codUsuarioPresidente, setCodUsuarioPresidente] = useState(null);
  const [codBairroUsuarioPresidente, setCodBairroUsuarioPresidente] = useState(null); // Adicionado o codBairroUsuarioPresidente

  return (
    <PresidenteContext.Provider value={{ idPresidente, setIdPresidente, idBairroPresidente, setIdBairroPresidente, codUsuarioPresidente, setCodUsuarioPresidente, codBairroUsuarioPresidente, setCodBairroUsuarioPresidente }}>
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
