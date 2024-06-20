import React, { useState } from 'react';
import { TextField, MenuItem, IconButton, Button, FormControl, InputLabel, Select, Grid } from '@mui/material';
import { DeleteFilled as DeleteIcon } from '@ant-design/icons';

const DataGridOrcamentoProduto = ({ produtos, dataForm, setDataForm }) => {

  const [produtoOrcamentos, setProdutoOrcamentos] = useState(dataForm.produtoOrcamentos );

  const handleProdutoChange = (index, field, value) => {
    const updatedProdutoOrcamentos = [...produtoOrcamentos];
    updatedProdutoOrcamentos[index] = {
      ...updatedProdutoOrcamentos[index],
      [field]: value,
    };
    setProdutoOrcamentos(updatedProdutoOrcamentos);
    setDataForm({ ...dataForm, produtoOrcamentos: updatedProdutoOrcamentos });
  };

  const handleAddProdutoOrcamento = () => {
    const produtos = [...produtoOrcamentos, { produto: { id: '' }, quantidade: 1 }]
    setProdutoOrcamentos(produtos);
    setDataForm({ ...dataForm, produtoOrcamentos: produtos});

  };

  const handleRemoveProdutoOrcamento = (index) => {
    const updatedProdutoOrcamentos = produtoOrcamentos.filter((_, i) => i !== index);
    setProdutoOrcamentos(updatedProdutoOrcamentos);
    setDataForm({ ...dataForm, produtoOrcamentos: updatedProdutoOrcamentos });
  };
  return (
    <div>
      {produtoOrcamentos.map((item, index) => (
        <Grid container spacing={2} key={index} alignItems="center" className='mt-2'>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Produto</InputLabel>
              <Select
                value={item.produto.id}
                variant="standard"
                onChange={(e) => handleProdutoChange(index, 'produto', { id: e.target.value })}
              >
                {produtos.map((produto) => (
                  <MenuItem key={produto.id} value={produto.id}>
                    {produto.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="number"
              label="Quantidade"
              variant="standard"
              value={item.quantidade}
              onChange={(e) => handleProdutoChange(index, 'quantidade', parseInt(e.target.value, 10))}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={() => handleRemoveProdutoOrcamento(index)}>
              <DeleteIcon style={{ color: "#f75454" }} />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAddProdutoOrcamento} variant="contained" color="primary" className='mt-2'>
        Adicionar Produto
      </Button>
    </div>
  );
};

export default DataGridOrcamentoProduto;
