import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Task'
import Task from '../../models/Task'

type TaskState = {
  itens: Task[]
}

const initialState: TaskState = {
  itens: [
    {
      id: 1,
      title: 'Estudar JS',
      description: 'Estudar Js',
      priority: enums.Priority.NORMAL,
      status: enums.Status.CONCLUIDA
    },
    {
      id: 2,
      title: 'Estudar HTML',
      description: 'Estudar bootstrap',
      priority: enums.Priority.IMPORTANTE,
      status: enums.Status.PENDENTE
    },
    {
      id: 3,
      title: 'Estudar CSS',
      description: 'Estudar SASS',
      priority: enums.Priority.URGENTE,
      status: enums.Status.CONCLUIDA
    }
  ]
}
const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    delete: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((task) => task.id !== action.payload)
      ]
    },
    edit: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.itens[taskIndex] = action.payload
      }
    },
    register: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const taskExist = state.itens.find(
        (task) =>
          task.title.toLowerCase() === action.payload.title.toLowerCase()
      )
      if (taskExist) {
        alert('Já existe uma tarefa com este nome')
      } else {
        const lastTask = state.itens[state.itens.length - 1]
        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.itens.push(newTask)
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; finalized: boolean }>
    ) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.itens[taskIndex].status = action.payload.finalized
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const deleted = TaskSlice.actions.delete
export const edit = TaskSlice.actions.edit
export const register = TaskSlice.actions.register
export const changeStatus = TaskSlice.actions.changeStatus
export default TaskSlice.reducer
