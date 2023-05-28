import './global.css'
import { v4 as uuidv4 } from 'uuid'
import { Header, TaskList, CreateTaskForm } from './components'
import { useState } from 'react'

import styles from './App.module.css'

const tasksDB = [
  {
    id: uuidv4(),
    title: 'Terminar o desafio',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Estudar TypeScript',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Estudar Javascript',
    isCompleted: true,
  }
]

export interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(tasksDB)

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <CreateTaskForm setTasks={setTasks} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </>
  )
}

export default App
