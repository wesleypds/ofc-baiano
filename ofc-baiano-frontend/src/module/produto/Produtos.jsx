import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DataGrid from 'react-data-grid';
import LayoutBase from '../../components/layout/LayoutBase.jsx';
import { Button, IconButton } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-data-grid/lib/styles.css';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EditFilled, DeleteFilled, ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import '../../style/components/DataGrid/DataGrid.css'; 

const Produtos = () => {
  const [rows, setRows] = useState([
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' },
    { id: 2, title: 'Example' },
    { id: 3, title: 'Demo' },
    { id: 4, title: 'Example' },
    { id: 5, title: 'Demo' },
    { id: 6, title: 'Example' },
    { id: 7, title: 'Demo' },
    { id: 8, title: 'Example' },
    { id: 9, title: 'Demo' },
    { id: 10, title: 'Example' },
    { id: 11, title: 'Demo' },
    { id: 12, title: 'Example' },
    { id: 13, title: 'Demo' },
    { id: 14, title: 'Example' },
    { id: 15, title: 'Demo' }
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const locationUrl = useLocation();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(`/produto/edit/${id}`, { state: { token, userInfo } });
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Title']],
      body: rows.map(row => [row.id, row.title])
    });
    doc.save('produtos.pdf');
  };

  const redirect = () => {
    const token = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate('/produto', { state: { token, userInfo } });
  };

  useEffect(() => {
    if (locationUrl.state.token !== "7f08f0ae81840a4a1887d3bdf9201efb") {
      navigate('/');
    }
  }, [navigate, locationUrl.state.token]);

  const columns = [
    {
      key: 'editar',
      name: 'Editar',
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleEdit(row.id)}>
          <EditFilled style={{ color: "#3543c4" }} />
        </IconButton>
      ),
      width: 80,
    },
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
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
  const currentRows = rows.slice(startIndex, endIndex);

  return (
    <LayoutBase userInfo={locationUrl.state.userInfo}>
      <h2><b>Produtos cadastrados</b></h2>
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
        <Button onClick={redirect} variant='contained' style={{ marginRight: '10px' }}>
          Adicionar
        </Button>
        <Button variant="contained" onClick={handleExportPDF} style={{ marginRight: '10px' }}>
          Export PDF
        </Button>
        <CSVLink data={rows} headers={[{ label: 'ID', key: 'id' }, { label: 'Title', key: 'title' }]} filename={"produtos.csv"}>
          <Button variant="contained">Export CSV</Button>
        </CSVLink>
      </div>
    </LayoutBase>
  );
};

export default Produtos;
