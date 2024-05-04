import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CreateTask = ({ modal, toggle, save }) => {

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [replacementName, setReplacementName] = useState('');
    const [status, setStatus] = useState('pendiente');
    const [isCreateDisabled, setIsCreateDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "startDate") {
            setStartDate(value);
        } else if (name === "dueDate") {
            setDueDate(value);
        } else if (name === "replacementName") {
            setReplacementName(value);
        } else if (name === "status") {
            setStatus(value);
        }
    };

    const resetFields = () => {
        setTaskName('');
        setDescription('');
        setStartDate(null);
        setDueDate(null);
        setReplacementName('');
        setStatus('pendiente');
    };

    useEffect(() => {

        const allFieldsFilled = taskName && description && startDate && dueDate && replacementName && status;
        setIsCreateDisabled(!allFieldsFilled);

    }, [taskName, description, startDate, dueDate, replacementName, status]);

    const handleSave = (e) => {

        e.preventDefault();

        if (!taskName || !description || !startDate || !dueDate || !replacementName || !status) {

            setErrorMessage("Todos los campos son requeridos");
        } else {

            setErrorMessage('');
            let taskObj = {
                Name: taskName,
                Description: description,
                startDate: startDate,
                DueDate: dueDate,
                ReplacementName: replacementName,
                Status: status
            };
            save(taskObj);
            resetFields();
        }
    };

    return (

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Crear Tarea</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Nombre de la Tarea</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Descripcion de la Tarea</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
                <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <br />
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Fecha de Finalizacion</label>
                    <br />
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Autor de la Tarea</label>
                    <input type="text" className="form-control" value={replacementName} onChange={handleChange} name="replacementName" />
                </div>
                <div className="form-group">
                    <label>Estado</label>
                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Completada">Completada</option>
                        <option value="Incompleta">Incompleta</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave} disabled={isCreateDisabled}>Crear</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;

// metodo para agregar