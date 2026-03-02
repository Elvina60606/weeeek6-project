import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
    },
    reducers: {
        createMessage( state, actions ){
            state.messages.push({
                id: actions.payload.id,
                type: actions.payload.success ? "success" : "danger",
                title: actions.payload.success ? "成功" : "失敗",
                text: actions.payload.message,
            })
        },
        removeMessage( state, actions ){
            state.messages = state.messages.filter(msg => msg.id !== actions.payload)
        },
    }
});

export const getAsyncMessage = createAsyncThunk(
    'message/getAsyncMessage',
    async( payload, { dispatch, requestId } ) => {
        dispatch(messageSlice.actions.createMessage({
            ...payload,
            id: requestId,
        }));
        setTimeout(()=>{
            dispatch(messageSlice.actions.removeMessage(requestId));
        }, 2000);
    }
);


export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;