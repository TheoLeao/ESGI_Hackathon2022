import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        addCampaign: (state, action) => {
            state.push(action.payload);
        },
        removeCampaign: (state, action) => {
            state.splice(
                state.findIndex((item) => {
                    return item.id === action.payload.id;
                }),
                1
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { addCampaign, removeCampaign } = campaignSlice.actions;

export default campaignSlice.reducer;
