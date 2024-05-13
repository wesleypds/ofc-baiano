import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { AiFillWarning } from "react-icons/ai";

import "../style/components/NotImplemented.css";

const NotImplemented = ({ active,onClose, msg }) => {
  const [isOpen, setIsOpen] = useState(active);

  useEffect(() => {
    setIsOpen(active);
  }, [active]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay-not-implemented">
          <div className="modal-content-not-implemented">
            <AiFillWarning style={{ fontSize: '70px', color: 'gray' }} /> 
            <p>{msg?msg:"Esta funcionalidade não foi implementada ainda"}</p>
            <Button variant="contained" color="error" onClick={onClose} className='close-button'>
              Fechar
             </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotImplemented;
