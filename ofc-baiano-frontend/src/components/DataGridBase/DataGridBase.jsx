import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DataGrid from 'react-data-grid';
import { Button, IconButton } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-data-grid/lib/styles.css';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EditFilled, DeleteFilled, ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import '../../style/components/DataGridBase/DataGridBase.css'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';


function DataGridBase({title, data, baseColumns, routeAddItem, nameExport, deleteMethod, additionalButton}) {

  const [dataRows, setDataRows] = useState(data);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(dataRows.length / itemsPerPage);

  const locationUrl = useLocation();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(`/${routeAddItem}/${id}`, { state: { token, userInfo } });
  };

  const handleDelete = (id) => {
    (async() =>{
      var resposta = await deleteMethod(id);
      console.log(resposta)
      if(resposta.success){
        setDataRows(dataRows.filter(row => row.id !== id));
      }
      else{
        handleOpen()
      }
    })();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const headers = baseColumns.map(col => col.name);
    const body = dataRows.map(row => baseColumns.map(col => row[col.key]));
  
    doc.autoTable({
      head: [headers],
      body: body
    });
  
    doc.save(nameExport+'.pdf');
  };

  const csvHeaders = baseColumns.map(col => ({
    label: col.name,
    key: col.key
  }));

  const handleAdd = () => {
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(`/${routeAddItem}`, { state: { token, userInfo } });
  };


  const columns = [
    {
      key: 'editar',
      name: 'Editar',
      renderCell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleEdit(row.id)}>
            <EditFilled style={{ color: "#3543c4" }} />
          </IconButton>
          {additionalButton && additionalButton(row.id)}
        </div>
      ),
      width: 100,
    },
    ...baseColumns,
    {
      key: 'excluir',
      name: 'Excluir',
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row.id)}>
          <DeleteFilled style={{ color: "#f75454" }} />
        </IconButton>
      ),
      width: 80,
    }
  ];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = dataRows.slice(startIndex, endIndex);

  return (
    <>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "bolder" }}
              >
                Atenção
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "center" }}
              >
                Houve um erro ao deletar o item
              </Typography>
              <Button
                onClick={handleClose}
                sx={{ mt: 2, display: 'flex', alignItems: 'center', mx: 'auto' }}
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
              >
                Fechar
              </Button>
            </Box>
        </Modal>

      <h2><b>{title}</b></h2>
        <div className="white-theme">
          <DataGrid columns={columns} rows={currentRows} rowKeyGetter={row => row.id} className="custom-grid-height" />
        </div>
        <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handlePrevPage} disabled={currentPage === 0} variant="contained">
            <ArrowLeftOutlined/>
          </Button>
          <span style={{ margin: '0 10px', alignSelf: 'center' }}>
            Página {currentPage + 1} de {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages - 1} variant="contained">
            <ArrowRightOutlined/>
          </Button>
        </div>
        <div style={{ margin: '10px 0' }}>
          <Button onClick={handleAdd} variant='contained' style={{ marginRight: '10px' }}>
            Adicionar
          </Button>
          <Button variant="contained" onClick={handleExportPDF} style={{ marginRight: '10px' }}>
            Exportar PDF
          </Button>
          <CSVLink data={dataRows} headers={csvHeaders} filename={nameExport+".csv"}>
            <Button variant="contained">Exportar CSV</Button>
          </CSVLink>
        </div>
      </>
  );
}



export default DataGridBase;
