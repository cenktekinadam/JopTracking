import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    jobs: [],
    isLoading: false,
    error: null,
}
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setError: (state, action) => {
            state.isLoading = false,
                state.error = action.payload
        },
        setJobs: (state, action) => {
            state.isLoading = false,
                state.error = null,
                state.jobs = action.payload
        },
        createJobs: (state, action) => {
            state.jobs.push(action.payload)
        },
        deletejob: (state, action) => {
            const index = state.jobs.findIndex(i => i.id === action.payload)
            state.jobs.splice(index, 1)
        },
        filterBySearch: (state, action) => { }
    }
})

export default jobSlice.reducer;
export const { setError, setJobs, setLoading, createJobs, deletejob } = jobSlice.actions