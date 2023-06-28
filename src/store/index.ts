import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { player } from "./slices/player";

export const store = configureStore({
    reducer:{
        player,
    }
})


export type RootState = ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // essas duas linhas são para tipar 
export const useAppDispatch: () => AppDispatch =  useDispatch // essa daqui é pra usar o thank, ou seja, para fazer requisisões assincronasç.