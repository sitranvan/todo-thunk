import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from '../components/Filters/filtersSlice'
import todoListSlice from '../components/TodoList/todoListSlice'

const rootReducer = {
    todoList: todoListSlice.reducer,
    filters: filtersSlice.reducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store