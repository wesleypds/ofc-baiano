import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Button, Checkbox, FormControlLabel } from '@mui/material';
import { DeleteFilled as DeleteIcon } from '@ant-design/icons';

const DataGridOrcamentoServico = ({ servicosDisponiveis, dataForm, setDataForm }) => {
  const [servicos, setServicos] = useState(dataForm.servicos || []);

  const handleServicoChange = (index, field, value) => {
    const updatedServicos = [...servicos];
    updatedServicos[index] = {
      ...updatedServicos[index],
      [field]: value,
    };
    setServicos(updatedServicos);
    setDataForm({ ...dataForm, servicos: updatedServicos });
  };

  const handleAddServico = () => {
    const servicosItem = [...servicos, { servico: { id: '' }, requerido: false }]
    setServicos(servicosItem);
    setDataForm({ ...dataForm, servicos: servicosItem});
  };

  const handleRemoveServico = (index) => {
    const updatedServicos = servicos.filter((_, i) => i !== index);
    setServicos(updatedServicos);
    setDataForm({ ...dataForm, servicos: updatedServicos });
  };

  return (
    <div>
      {servicos.map((item, index) => (
        <Grid container spacing={2} key={index} alignItems="center" className='mt-2'>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Serviço</InputLabel>
              <Select
                variant="standard"
                value={item.servico.id}
                onChange={(e) => handleServicoChange(index, 'servico', { id: e.target.value })}
              >
                {servicosDisponiveis.map((servico) => (
                  <MenuItem key={servico.id} value={servico.id}>
                    {servico.tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              variant="standard"
              control={
                <Checkbox
                  checked={item.requerido}
                  onChange={(e) => handleServicoChange(index, 'requerido', e.target.checked)}
                />
              }
              label="Requerido"
            />
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={() => handleRemoveServico(index)}>
              <DeleteIcon style={{ color: "#f75454" }} />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAddServico} variant="contained" color="primary" className='mt-2'>
        Adicionar Serviço
      </Button>
    </div>
  );
};

export default DataGridOrcamentoServico;
