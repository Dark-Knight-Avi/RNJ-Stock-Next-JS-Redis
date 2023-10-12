import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    category: ''
}

const addCategoryreducer = createReducer(initialState, {
    setCategory: (state, action) => {
        state.category = action.payload.category
    }
})

export default addCategoryreducer