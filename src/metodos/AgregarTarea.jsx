import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CreateTaskPopup = ({ modal, toggle, save }) => {

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [replacementName, setReplacementName] = useState('');
    const [status, setStatus] = useState('pendiente');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "replacementName") {
            setReplacementName(value);
        }
    };

    const handleSave = (e) => {

        e.preventDefault();
        let taskObj = {};
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        taskObj["DueDate"] = dueDate;
        taskObj["ReplacementName"] = replacementName;
        taskObj["Status"] = status;
        save(taskObj);
    };

    return (

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
                    <label>Fecha de Finalizacion</label>
                    <br />
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Fecha de Finalizacion</label>
                    <br />
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="form-control" />
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
                        <option value="Completada">Completada</option>
                        <option value="Incompleta">Incompleta</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;