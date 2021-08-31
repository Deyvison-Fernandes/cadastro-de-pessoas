import React, { useState } from "react";
import { 
    TextField, 
    Paper, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextFielCpfCnpj from "@react-br-forms/cpf-cnpj-mask";

function Filtros(props) {
    const [filtros, setFiltros] = useState({
        nome: "",
        numero: "",
        blackList: null
    });

    const handleChange = (e) => {
        setFiltros({...filtros, [e.target.name]: e.target.value});
    };

    const tratarFiltro = (filtros) => {
        let filtroTratado = Object.fromEntries(Object.entries(filtros).filter(([_, x]) => x != null && x !== ''));
        return filtroTratado;
    }

    return (
    <Paper className="div-filtros">
        <TextField label="Nome" value={filtros.nome} name="nome" onChange={handleChange} color="primary" className="input-filtro"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <FormControl style={{minWidth: 120}} className="input-filtro">
            <InputLabel id="demo-simple-select-label" shrink={true}>Restrição</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="blackList"
            defaultValue="2"
            onChange={(e) => {
                if(e.target.value === '2'){
                    setFiltros({...filtros, blackList: null});
                }else{
                    handleChange(e);
                }
            }}
            >
                <MenuItem value="2">Todos</MenuItem>
                <MenuItem value={true}>Blacklist</MenuItem>
                <MenuItem value={false}>Whitelist</MenuItem>
            </Select>
        </FormControl>

        <FormControl>
            <InputLabel htmlFor="cpf" shrink={true}>CPF/CNPJ</InputLabel>
            <div class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                <TextFielCpfCnpj
                    value={filtros.numero}
                    name="numero"
                    id="cpf"
                    onChange={handleChange}
                    className="MuiInputBase-input MuiInput-input"
                />
            </div>
        </FormControl>

        <IconButton aria-label="delete" onClick={() => {props.clickPesquisar(tratarFiltro(filtros))}}
            color="primary" 
            size="medium" 
            style={{float: "right", color:'#303965'}}
        >
            <SearchIcon />
        </IconButton>
    </Paper>
    );
}

export default Filtros;