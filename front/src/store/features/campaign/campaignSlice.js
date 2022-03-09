import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        addCampaign: (state, action) => {
            console.log('add');
            state.push(action.payload);
        },
        removeCampaign: (state, action) => {
            // state.push(action.payload);
            // state = ['fuck'];
            //  state.campaign = state.campaign.filter(item => {console.log(item.id, action.payload.id,item.id !== action.payload.id );return item.id !== action.payload.id});
        }
    },
})

// Action creators are generated for each case reducer function
export const { addCampaign, removeCampaign} = campaignSlice.actions

export default campaignSlice.reducer