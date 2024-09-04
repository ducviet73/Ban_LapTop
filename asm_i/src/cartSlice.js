import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage or initialize with an empty array
const initialState = {
    listSP: JSON.parse(localStorage.getItem('cart')) || []
};

const saveToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    
    reducers: {
        themSP: (state, action) => {
            let sp = action.payload;
            let index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) {
                sp.so_luong = 1;
                state.listSP.push(sp);
            } else {
                state.listSP[index].so_luong++;
            }
            saveToLocalStorage(state.listSP); // Save to localStorage
            console.log("Đã thêm sp. Số SP=", state.listSP.length);
        },
        suaSL: (state, action) => {
            let [id, so_luong] = action.payload;
            let index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP[index].so_luong = Number(so_luong);
                saveToLocalStorage(state.listSP); // Save to localStorage
                console.log("Đã sửa sp ", action.payload);
            }
        },
        xoaSP: (state, action) => {
            let id = action.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP.splice(index, 1);
                saveToLocalStorage(state.listSP); // Save to localStorage
            }
        },
        xoaGH: (state) => {
            state.listSP = [];
            saveToLocalStorage(state.listSP); // Save to localStorage
        },
    },
});

export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions;

export default cartSlice.reducer;
