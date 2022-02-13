import React, { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TaskModel } from '../util/models/TaskModel'

import './../styles/task.scss'

type TaskProps = {
  task: TaskModel
}

export default function Task({ task }: TaskProps) {

  const { toggleTaskChecked } = useTasks()

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
        <span>{task.name}</span>
      </label>
      <div className="categories">
      </div>
    </div>
  )
}
