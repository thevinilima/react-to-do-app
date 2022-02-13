import React, { useEffect, useState } from 'react'
import Task from '../components/Task'
import { useTasks } from '../hooks/useTasks'
import { TaskModel } from '../util/models/TaskModel'

import './../styles/home.scss'

export default function Home() {

  const { tasks, createNewTask, tasksUpdated } = useTasks()

  const [checkedTasks, setCheckedTasks] = useState([] as TaskModel[])
  const [uncheckedTasks, setUncheckedTasks] = useState([] as TaskModel[])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    updateTasks()
  }, [tasksUpdated])

  const updateTasks = () => {
    let checked = tasks.filter(task => task.checked)
    setCheckedTasks(checked)

    let unchecked = tasks.filter(task => !task.checked)
    setUncheckedTasks(unchecked)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!newTask) return

    createNewTask({
      id: '',
      name: newTask,
      checked: false
    })
    setNewTask('')
  }

  const TasksList = () => (
    <>
      {uncheckedTasks.length === 0
        ?
        <span className="message">Tarefas zeradas 🎉</span>
        :
        <section id="unchecked-tasks">
          {
            uncheckedTasks.map((task, index) => (
              <Task key={index} task={task} />
            ))
          }
        </section>
      }
      {checkedTasks.length === 0 ? null :
        <>
          <div id="list-divider" />
          <section id="checked-tasks">
            {
              checkedTasks.map((task, index) => (
                <Task key={index} task={task} />
              ))
            }
          </section>
        </>
      }
    </>
  )

  return (
    <div id="home-container">
      <main>
        <div className="title">
          <h2>
            Suas tarefas
          </h2>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nova tarefa"
              value={newTask}
              onChange={event => setNewTask(event.target.value)}
            />
          </form>
        </div>
        <div id="tasks-container">
          <TasksList />
        </div>
      </main>
    </div>
  )
}
