import * as enums from '../../utils/enums/Task'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateFilter = {
  term?: string
  criteria?: 'priority' | 'status' | 'all'
  value?: enums.Priority | enums.Status
}

const initialState: StateFilter = {
  term: '',
  criteria: 'all'
}

const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload
    },
    changeFilter: (state, action: PayloadAction<StateFilter>) => {
      state.criteria = action.payload.criteria
      state.value = action.payload.value
    }
  }
})

export const terms = FilterSlice.actions.changeTerm
export const filter = FilterSlice.actions.changeFilter
export default FilterSlice.reducer
