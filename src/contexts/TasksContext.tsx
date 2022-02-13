import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { TaskModel } from '../util/models/TaskModel'

type TasksContextData = {
  tasks: TaskModel[]
  toggleTaskChecked(task: TaskModel): void
  createNewTask(task: TaskModel): void
  clearCheckedTasks(): void
  tasksUpdated: number
}

type TasksProviderProps = {
  children: ReactNode
}

const TasksContext = createContext<TasksContextData>({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {

  const [tasks, setTasks] = useState([] as TaskModel[])
  const [tasksUpdated, setTasksUpdated] = useState(0)

  useEffect(() => {
    const getStoragedTasks = () => {
      const storagedTasks = localStorage.getItem('tasks')
      if (storagedTasks) setTasks(JSON.parse(storagedTasks))
    }
    getStoragedTasks()
  }, [])

  const createNewTask = (task: TaskModel) => {
    if (!task) return

    task.id = (tasks.length + 1).toString()

    setTasks([...tasks, task])
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]))
    setTasksUpdated(tasksUpdated + 1)
  }

  const toggleTaskChecked = (task: TaskModel) => {
    let updatedTasks = tasks
    updatedTasks.forEach(t => {
      if (t.id === task.id) t = task
    })
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    setTasksUpdated(tasksUpdated + 1)
  }

  const clearCheckedTasks = () => {
    let oldTasks = tasks
    let updatedTasks = [] as TaskModel[]
    oldTasks.forEach(task => {
      if (!task.checked) updatedTasks.push(task)
    })
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    setTasksUpdated(tasksUpdated + 1)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleTaskChecked,
        createNewTask,
        clearCheckedTasks,
        tasksUpdated,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContext
