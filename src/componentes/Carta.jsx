import React, { useState } from 'react';
import { EditTask } from '../metodos/EditarTarea';
import '../styles/card.css';

export const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    ];

    const toggle = () => setModal(!modal);

    const updateTask = (obj) => updateListArray(obj, index);

    const handleDelete = () => deleteTask(index);

    // Formatear la fecha de inicio
    const formattedStartDate = taskObj.startDate ? new Date(taskObj.startDate).toLocaleDateString() : "";

    // Formatear la fecha de vencimiento
    const formattedDueDate = taskObj.DueDate ? new Date(taskObj.DueDate).toLocaleDateString() : "";

    return (
        <div className="custom-card">
            <div className="custom-card-header" style={{ backgroundColor: colors[index % 5].primaryColor }}>{taskObj.Name}</div>
            <div className="custom-card-body">
                <p>{taskObj.Description}</p>
                <p>Author: {taskObj.Author}</p>
                <p>Start Date: {formattedStartDate}</p>
                <p>Due Date: {formattedDueDate}</p>
                <p>Status: {taskObj.Status}</p>
                <br></br>
                <div className="custom-card-actions">
                    <button className="edit-btn" onClick={() => setModal(true)}>Editar</button>
                    <button className="delete-btn" onClick={handleDelete}>Eliminar</button>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};