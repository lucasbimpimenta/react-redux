import React, { Component } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import EmpresaApi from '../../services/EmpresaApi'
import EmpresaForm from '../../components/empresa/EmpresaReduxForm'
import { mascaraCnpj } from '../../helpers/Formatadores'

Modal.setAppElement('#root');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '65%',
        backgroundColor       : 'rgba(255, 255, 255, 1)'
    },
    overlay: {
      backgroundColor: 'rgba(0, 102, 179, 0.36)'
      ,zIndex: 1040
    }
};

export default class EmpresaModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    submitModal = values => {
        
        EmpresaApi.salvar(values)
         .then(response => {
            console.log(response);
            if(response.status === 201) {
                toast.success("Empresa cadastrada com sucesso!" ,{
                    position: toast.POSITION.TOP_CENTER
                });
                this.closeModal();
                this.props.onSuccess({NU_CNPJ: {label: mascaraCnpj(response.data.id) + " - " + values.NO_RAZAO_SOCIAL, value: response.data.id}});

            } else {
                toast.error("Erro ao cadastrar empresa", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        })
        .catch(error => {
            console.log(error);
            toast.error("Erro: " + error, {
                    position: toast.POSITION.TOP_CENTER
                });
        });
    }

    render() {

        return (
                <div>
                    <button className="btn btn-sm btn-default w-100 " type="button" onClick={this.openModal}>Nova</button>
                    <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Empresa"
                            shouldCloseOnOverlayClick={false}
                        >
                            <div className="modal-header p-0 border-0">
                                <h3 className="titulo">Adicionar Empresa</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-0">
                                <EmpresaForm  onSubmit={this.submitModal} modal={this} tipo="add" exibicao="modal"/>
                            </div>
                    </Modal>
                    <ToastContainer />
                </div>
        )
    }
}