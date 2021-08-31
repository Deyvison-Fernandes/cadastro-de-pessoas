import React, {useState, useEffect} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { getPessoas, deleteManyPessoas } from '../services/api';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Collapse
} from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Filtros from './Filtros';
import FormPessoa from './FormPessoa';
import Alert from '@material-ui/lab/Alert';
import "moment/locale/pt-br";
import moment from "moment";
import { cpf, cnpj } from 'cpf-cnpj-validator';
  
function ListaPessoas() {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idPessoa, setIdPessoa] = useState(0);
  const [pessoaSelecionada, setPessoaSelecionada] = useState([]);
  const [alerta, setAlerta] = useState({
    tipo: "",
    exibir: false,
    mensagem: ""
  });

  const pesquisarPessoas = (filtros) =>{
    const query = filtros? new URLSearchParams(filtros).toString(): null;
    
    getPessoas(query).then(({data}) => {
      const listaux = [];
  
      data.pessoa.forEach((item) => {
        const {nome, numero, blackList} = item;
        const dataNascimento = item.dataNascimento? moment.utc(item.dataNascimento).format("DD/MM/YYYY"): "";
        
        listaux.push({
          id: item._id, nome, numero, blackList, dataNascimento
        });
      });
  
      setRows(listaux);
    });
  }

  const deletarPessoas = () => {
    if(pessoaSelecionada.length > 0){
      deleteManyPessoas(pessoaSelecionada).then(() => {
        pesquisarPessoas();
        setAlerta({...alert,
          tipo: "success",
          exibir: true,
          mensagem: "Regitros excluídos com sucesso"
        });
      });
    } else {
      setAlerta({...alert,
        tipo: "info",
        exibir: true,
        mensagem: "Selecione pelo menos um registro"
      });
    }
  }

  const columns = [
    { field: "id", hide: true },
    { field: "blackList", hide: true },
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "numero", headerName: "CPF/CNPJ", width: 200 },
    { field: "dataNascimento", headerName: "Nascimento / Registro", width: 250 },
    { 
      field: "blackListIcon", 
      headerName: "Black list",
      disableReorder: true,
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <BallotIcon style={{ color: params.row.blackList? '#000':'#0c2'}}/>
          </div>
        );
      }
    },
    { 
      field: "edit", 
      headerName: "Editar", 
      width: 100,
      disableReorder: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <EditIcon onClick={() => {setIdPessoa(params.row.id); setOpenModal(true);}}/>
          </div>
        );
      }
    }
  ];

  const onSelectionModelChange = (lista) => {
    setPessoaSelecionada(lista);
  }

  const validarNumero = (numero) => {
    if (numero.length == 14) {
        return cpf.isValid(numero);
    } else {
        return cnpj.isValid(numero);
    }
  }

  const clickPesquisar = (filtros) =>{
      if(!filtros.numero || validarNumero(filtros.numero)){
        pesquisarPessoas(filtros);
      }else{
        setAlerta({...alert,
          tipo: "error",
          exibir: true,
          mensagem: "CPF/CNPJ inválido"
        });
      }
  }

  useEffect(() => {
    pesquisarPessoas();
  }, []);

  return (
    <>
    <Collapse in={alerta.exibir}>
        <Alert 
            severity={alerta.tipo}
            className="alerta"
            action={
                <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setAlerta({...alerta, exibir: false});
                }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            {alerta.mensagem}
        </Alert>
      </Collapse>
      <Filtros clickPesquisar={(filtros) => {clickPesquisar(filtros)}}/>
      <div className="action-div">
        <Button variant="contained" className="button-blue" onClick={() => { setOpenModal(true); setIdPessoa(0); }}>
          Incluir
        </Button>
        <Button variant="contained" color="secondary" onClick={deletarPessoas}>
          Excluir
        </Button>
      </div>
      <div className="data-grid">
        <DataGrid rows={rows} columns={columns} checkboxSelection disableSelectionOnClick onSelectionModelChange={onSelectionModelChange}/>
      </div>
      <Dialog open={openModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
          <DialogTitle id="form-dialog-title">
            Cadastrar pessoa
            <IconButton aria-label="close" className="botao-modal-close" onClick={() => { setOpenModal(false)}}>
                <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent><FormPessoa idPessoa={idPessoa} pesquisarPessoas={() => { pesquisarPessoas() }}/></DialogContent>
      </Dialog>
    </>
  );
}

export default ListaPessoas;
