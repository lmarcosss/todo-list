import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface Props {
    id: string;
    title: string;
    isCompleted: boolean;
    onDeleteTask(id: string): void;
    onChangeIsCompletedTask(id: string): void;
}
export function Task({ id, title, isCompleted, onDeleteTask, onChangeIsCompletedTask }: Props) {
    // const [isChecked, setIsChecked] = useState(isCompleted)
    function handleChangeChecked() {
        onChangeIsCompletedTask(id)
    }

    function handleDeleteTask() {
        onDeleteTask(id)
    }

    return (
        <div className={styles.task}>
            <label className={styles.customCheckbox} htmlFor={`checkboxTask-${id}`}>
                <input
                    id={`checkboxTask-${id}`}
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleChangeChecked}
                />
                <span>{title}</span>
            </label>

            <button onClick={handleDeleteTask} className={styles.deleteButton}>
                <Trash size={16} />
            </button>
        </div>
    )
}