import React, { useEffect, useState } from 'react';
import CreateTask from '../metodos/AgregarTarea'
import { Card } from './Carta';

export const TaskList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    return (
        <>
            <div className="header text-center">
                <div className="left-content">
                    <img src="./src/assets/almacenadoraLogo.png" width="100px" height="100%" alt="Descripción de la imagen" />
                </div>
                <div className="right-content">
                    <h3>Tareas de Almacenadora</h3>
                    <p>Este es el area de gestion para las tareas de la almacenadora</p>
                    <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Crear Tarea</button>
                </div>
            </div>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
    
};
