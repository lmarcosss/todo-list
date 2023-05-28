import { ChangeEvent, SetStateAction, useState } from "react"
import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import { TaskType } from "../App"

import styles from './CreateTaskForm.module.css'

interface Props {
    setTasks: React.Dispatch<SetStateAction<TaskType[]>>;
}

export function CreateTaskForm({ setTasks }: Props) {
    const [newTask, setNewTask] = useState('')
    
    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }
    
    function handleCreateNewTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()

    setTasks((previousTasks) => [...previousTasks, {
        id: uuidv4(),
        title: newTask,
        isCompleted: false,
    }])

        setNewTask("")
    }

    return (
        <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
          <input 
            type="text"
            value={newTask}
            onChange={handleNewTaskChange}
            placeholder="Adicione uma nova tarefa"
          />
          <button disabled={!newTask} type="submit">
            Criar
            <PlusCircle size={18} />
          </button>
        </form>
    )
}