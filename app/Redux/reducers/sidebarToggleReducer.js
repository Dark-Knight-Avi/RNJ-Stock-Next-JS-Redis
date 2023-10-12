import { createReducer } from "@reduxjs/toolkit";

const initialPageState = {
    toggleMenu: true
}

const sidebarToggleReducer = createReducer(initialPageState, {
    toggle: (state) => {
        state.toggleMenu = !state.toggleMenu
    }
})


export default sidebarToggleReducer