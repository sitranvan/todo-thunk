import { createSelector } from '@reduxjs/toolkit'

const todoListSelector = state => state.todoList.todos
const filterSearchSelector = state => state.filters.search
const filterStatusSelector = state => state.filters.status
const filterPriortySelector = state => state.filters.priorty

const todoListFilter = createSelector(
    todoListSelector, filterSearchSelector, filterStatusSelector, filterPriortySelector,
    (todoList, search, status, priorty) => {
        return todoList.filter(todo => {
            if (status === 'All') {
                return priorty.length ? todo.name.includes(search)
                    && priorty.includes(todo.priorty) : todo.name.includes(search)
            }
            //  todo.completed=true, ! todo.completed=false
            return todo.name.includes(search)
                && (status === 'Completed' ? todo.completed : !todo.completed)
                && (priorty.length ? priorty.includes(todo.priorty) : true)
        })
    })

export default todoListFilter