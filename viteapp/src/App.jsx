import React, { useState } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { IoCalendarNumberSharp } from "react-icons/io5";

function App() {
    // useState
    const [list, setList] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState("");
    const [showCalendarBtn, setShowCalendarBtn] = useState(false);
    const [openCalendarId, setOpenCalendarId] = useState(null);

    // Comportements
    const Supprimer = (id) => {
        setList(list.filter(task => task.id !== id));
    }

    const Modifier = () => {
        if (editingTaskId !== null && editingTaskTitle.trim() !== "") {
            setList(list.map(task => {
                if (task.id === editingTaskId) {
                    return { ...task, title: editingTaskTitle };
                }
                return task;
            }));
            setEditingTaskId(null);
            setEditingTaskTitle("");
        }
    }

    const Ajouter = () => {
        if (newTask.trim() !== "") {
            const newId = list.length > 0 ? list[list.length - 1].id + 1 : 1;
            setList([...list, { id: newId, title: newTask, status: false, date: null }]);
            setNewTask("");
            setShowCalendarBtn(true);
        }
    }

    const SelecionDate = (id, date) => {
        setList(list.map(task => {
            if (task.id === id) {
                return { ...task, date: date };
            }
            return task;
        }));
        setOpenCalendarId(null); // Ferme le calendrier après la sélection de la date
        alert(`Date sélectionnée pour la tâche ${id}: ${date.toDateString()}`);
    }

    const StatusTache = (id) => {
        setList(list.map(task => {
            if (task.id === id) {
                return { ...task, status: !task.status };
            }
            return task;
        }));
    }

    return (
        <>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nouvelle Tache"
            />
            <button onClick={Ajouter}>Ajouter</button>
            <ul>
                {list.map((task) => (
                    <li key={task.id} className={`task ${task.status ? 'completed' : ''}`}>
                        <input type="checkbox" checked={task.status} onChange={() => StatusTache(task.id)} />
                        {task.id === editingTaskId ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTaskTitle}
                                    onChange={(e) => setEditingTaskTitle(e.target.value)}
                                />
                                <button onClick={Modifier}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{task.title}</span>
                                <button onClick={() => setEditingTaskId(task.id)}>Modifier</button>
                                <button onClick={() => Supprimer(task.id)}>Supprimer</button>
                                <button onClick={() => setOpenCalendarId(openCalendarId === task.id ? null : task.id)}>
                                    <IoCalendarNumberSharp />
                                    {openCalendarId === task.id && (
                                        <Calendar onChange={(date) => SelecionDate(task.id, date)} value={selectedDate} />
                                    )}
                                </button>
                                {task.date && <span>Date: {task.date.toDateString()}</span>}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App;
