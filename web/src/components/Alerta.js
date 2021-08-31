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

function Alerta(props) {
    const [alerta, setAlerta] = useState({
        tipo: props.tipo,
        exibir: props.exibir,
        mensagem: props.mensagem

    });

    return (
        <>
            <Collapse in={alerta.exibir}>
                <Alert 
                    severity={props.tipo}
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
        </>
    )
}

export default Alerta;