import { createReducer } from "@reduxjs/toolkit";

const initialPageState = {
    page: 1
}

const pageChangeReducer = createReducer(initialPageState, {
    nextPage: (state) => {
        state.page += 1
    },
    previousPagew: (state) => {
        state.page = state.page === 1 ? state.page : state.page - 1
    },
    goToPage1: (state) => {
        state.page = 1
    }
})


export default pageChangeReducer