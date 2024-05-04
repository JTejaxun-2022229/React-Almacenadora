import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [replacementName, setReplacementName] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (e) => {

        const { name, value } = e.target
        
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


    }

    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(taskObj.Description)
        setStartDate(taskObj.startDate ? new Date(taskObj.startDate) : null)
        setDueDate(taskObj.DueDate ? new Date(taskObj.DueDate) : null)
        setReplacementName(taskObj.ReplacementName)
        setStatus(taskObj.Status)
    }, [])

    const handleUpdate = (e) => {

        e.preventDefault();
        let taskObj = {};
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        taskObj["startDate"] = startDate;
        taskObj["DueDate"] = dueDate;
        taskObj["ReplacementName"] = replacementName;
        taskObj["Status"] = status;
        updateTask(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
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
                        <option value="Cancelada">Cancelada</option>
                        <option value="Completada">Completada</option>
                        <option value="Incompleta">Incompleta</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};
