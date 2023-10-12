import { configureStore } from "@reduxjs/toolkit";
import pageChangeReducer from "../reducers/pageChangeReducer";
import sidebarToggleReducer from "../reducers/sidebarToggleReducer";
import addCategoryreducer from "../reducers/addCategoryReducer";
const store = configureStore({
    reducer: {
        pageNavigateReducer: pageChangeReducer,
        sidebarToggleReducer: sidebarToggleReducer,
        addCategoryReducer: addCategoryreducer
    }
})

export default store