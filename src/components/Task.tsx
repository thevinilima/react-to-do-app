import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useTasks } from '../hooks/useTasks'
import { TaskModel } from '../util/models/TaskModel'

import './../styles/task.scss'

type TaskProps = {
  task: TaskModel
}

export default function Task({ task }: TaskProps) {

  const { toggleTaskChecked, deleteTask } = useTasks()

  const [checked, setChecked] = useState(task.checked)

  const handleCheck = () => {
    if (checked)
      task.checked = false
    else
      task.checked = true
    toggleTaskChecked(task)
    setChecked(!checked)
  }

  return (
    <div className="task-container">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
        />
        <span className={`task-name ${checked}`}>
          {task.name}
        </span>
      </label>
      <div className="categories">
      </div>
      {task.checked ? null :
        <button
          className="icon-btn delete-task-btn"
          title="Excluir"
          onClick={() => deleteTask(task)}
        >
          <MdClear size={24} color="#777" />
        </button>
      }
    </div>
  )
}
