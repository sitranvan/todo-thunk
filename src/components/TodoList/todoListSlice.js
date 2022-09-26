import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const todoListSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] },
    reducers: {
        addTodoList(state, action) {
            state.push(action.payload)
        },
        toggleCompleted(state, action) {
            const currentTodo = state.find(todo => todo.id === action.payload)
            currentTodo.completed = !currentTodo.completed
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading' // hiển thị bên UI
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                // state.todos = action.payload
                state.status = 'idle'
            })
            .addCase(addNewTodos.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(updateTodos.fulfilled, (state, action) => {
                let currentTodo = state.todos.find(todo => todo.id === action.payload.id)
                currentTodo.completed = action.payload.completed
            })
    }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch('api/todos')
    const data = await res.json()
    return data
})

export const addNewTodos = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    const res = await fetch('api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
    })
    const data = await res.json()
    return data.todos
})

export const updateTodos = createAsyncThunk('todos/updateTodo', async (updateTodo) => {
    const res = await fetch('api/updateTodo', {
        method: 'POST',
        body: JSON.stringify(updateTodo)
    })
    const data = await res.json()
    console.log(data.todos)
    return data.todos
})
// => todo/fetchTodos/pending
// => todo/fetchTodos/fullfilled
// => todo/fecthTodos/rejected

export const { addTodoList, toggleCompleted } = todoListSlice.actions
export default todoListSlice

// Ví dụ đơn giản
// export const addTodos = (data) => { // thunk function - thunk action
//     return function addTodosThunk(dispatch, getState) {
//         console.log('addTodoThunk', getState()) // getState() trả về tất cả dữ liệu todoList, filters
//         console.log({ data });
//         data.name = 'Si idol' // trước khi gửi đi 1 action có thể can thiệp vào dữ liệu
//         dispatch(todoListSlice.actions.addTodoList(data)) // dispatch 1 action thật sự
//     }
// }

// action (object) và action creators() => { return action }
// thunk action (function) và thunk action creators() => { return thunk action }