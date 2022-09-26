import { createSlice } from "@reduxjs/toolkit";


const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priorty: []
    },
    reducers: {
        filterSearch(state, action) {
            state.search = action.payload
        },
        filterStatus(state, action) {
            state.status = action.payload
        },
        filterPriorty(state, action) {
            state.priorty = action.payload
        }
    },
})



export const { filterSearch, filterStatus, filterPriorty } = filtersSlice.actions
export default filtersSlice