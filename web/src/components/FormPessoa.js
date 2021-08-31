import React, { useState, useEffect } from "react";
import {
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    IconButton,
    Collapse,
    Button,
    FormControl,
    InputLabel
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import TextFielCpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import "moment/locale/pt-br";
import moment from "moment";
import { postPessoas, getPessoa } from '../services/api';

function FormPessoa({...props}) {
    const [maskCpf, setMaskCpf] = useState(true);
    const getPessoaModel = () => {
        return {
            nome: "",
            numero: "",
            blackList: false,
            dataNascimento: null
        };
    }
    
    const [pessoa, setPessoa] = useState(getPessoaModel());
    const [alert, setAlert] = useState({
        severity: "",
        show: false,
        message: ""

    });

    const handleChange = (e) => {
        setPessoa({...pessoa, [e.target.name]: e.target.value});
    };
    
    function validarDocumento() {
        if (maskCpf) {
            return cpf.isValid(pessoa.numero);
        } else {
            return cnpj.isValid(pessoa.numero);
        }
    }

    function salvar() {
        if (validarDocumento()) {
            postPessoas(pessoa, props.idPessoa).then(() => {
                setAlert({
                    ...alert,
                    severity: "success",
                    show: true,
                    message: "Salvo com sucesso"
                });
                props.pesquisarPessoas();
            });
        } else {
            setAlert({
                ...alert,
                severity: "error",
                show: true,
                message: "CPF/CNPJ invalido"
            });
        }
    }

    const getPessoaId = (idPessoa) => {
        getPessoa(idPessoa).then(({data}) => {
            console.log(data.pessoa.nome);
            let {nome, numero, dataNascimento, blackList} = data.pessoa;
            dataNascimento = moment.utc(dataNascimento).format("YYYY-MM-DD");
            setPessoa({nome, numero, dataNascimento, blackList});
        });
    }

    useEffect(() => {
        if (props.idPessoa !== 0){
            getPessoaId(props.idPessoa);
        }else{
            setPessoa(getPessoaModel());
        }
    }, [props.idPessoa]);

    return (
        <>
            <Collapse in={alert.show}>
                <Alert 
                    severity={alert.severity}
                    action={
                        <IconButton
                        aria-label="close"
                        size="small"
                        onClick={() => {
                            setAlert({...alert, show: false});
                        }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {alert.message}
                </Alert>
            </Collapse>
            <Grid container xs={12} spacing={2} direction="column" >

                <Grid item>
                    <TextField label="Nome" value={pessoa.nome} name="nome" onChange={handleChange} color="primary" className="input-filtro" fullWidth 
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="cpf" shrink={true}>CPF/CNPJ</InputLabel>
                        <div class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                            <TextFielCpfCnpj
                                value={pessoa.numero}
                                name="numero"
                                id="cpf"
                                onChange={(e, type) => {
                                    setMaskCpf(type === "CPF");
                                    handleChange(e);
                                }}
                                className="MuiInputBase-input MuiInput-input"
                            />
                        </div>
                    </FormControl>
                </Grid>

                <Grid item>
                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="pt-br">
                    <DatePicker
                        disableFuture
                        openTo="year"
                        format="DD/MM/yyyy"
                        label="Data de nascimento / Registro"
                        views={["year", "month", "date"]}
                        value={pessoa.dataNascimento}
                        onChange={ date => setPessoa({...pessoa, dataNascimento: date})}
                        invalidDateMessage="Data inválida"
                        cancelLabel="Cancelar"
                        clearable
                        clearLabel="Limpar"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox name="checkedA" checked={pessoa.blacklist} onChange={(e) => setPessoa({...pessoa, blackList: e.target.checked})} />
                        }
                        label="Adicionar na blacklist"
                    />
                </Grid>

                <Grid item>
                    <Button variant="contained" className="button-blue" onClick={() => { salvar() }}>
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default FormPessoa;