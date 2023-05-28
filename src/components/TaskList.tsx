import { SetStateAction, useMemo } from "react";
import { Task } from "./";
import { TaskType } from "../App";
import clipboard from '../assets/clipboard.svg'

import styles from './TaskList.module.css'

interface Props {
    tasks: TaskType[];
    setTasks: React.Dispatch<SetStateAction<TaskType[]>>;
}

interface ListProps {
    tasks: TaskType[];
    onDeleteTask(id: string): void;
    onChangeIsCompletedTask(id: string): void;
}

function List({ tasks, onDeleteTask, onChangeIsCompletedTask}: ListProps) {
    if (!tasks.length) {
        return (
            <div className={styles.emptyList}>
                <img src={clipboard} />
                <p className={styles.title}>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        )
    }

    return (
        <>
            {tasks.map((task) => (
                <Task
                {...task}
                key={task.id}
                onDeleteTask={onDeleteTask}
                onChangeIsCompletedTask={onChangeIsCompletedTask}
                />
            ))}
        </>
    )
}

export function TaskList({ tasks, setTasks }: Props) {
    function onDeleteTask(id: string) {
        setTasks((previousTasks) => previousTasks.filter(task => task.id != id))
    }

    function onChangeIsCompletedTask(id: string) {
    const formattedTasks = tasks.map(task => {
        if (task.id === id) {
        task.isCompleted = !task.isCompleted
        }

        return task
    })

        setTasks(formattedTasks)
    }

    const tasksQuantity = useMemo(() => tasks.length, [tasks])
  
    const finishedTasksQuantity = useMemo(() => {
      return tasks.reduce((quantity, task) => {
        if (task.isCompleted) {
          quantity++
        }
  
        return quantity
      }, 0)
    },[tasks])

    const finishedTasksText = !tasks.length ? finishedTasksQuantity : `${finishedTasksQuantity} de ${tasksQuantity}`

    return (
        <main className={styles.taskList}>
            <header>
            <span className={styles.createdClasses}>
              Tarefas criadas <span>{tasksQuantity}</span>
            </span>

            <span className={styles.finishedClasses}>
              Concluídas <span>{finishedTasksText}</span>
            </span>
          </header>

            <List
                tasks={tasks}
                onDeleteTask={onDeleteTask}
                onChangeIsCompletedTask={onChangeIsCompletedTask}
            />
        </main>
    )
}