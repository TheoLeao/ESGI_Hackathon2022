import { createSlice, current } from '@reduxjs/toolkit';

// const initialState = [{
//     "id": 1,
//     "name": "Campagne de test sur les crêmes pour la peau",
//     "description": "Description de la campagne de test pour les crêmes destinées à la peau",
//     "state": 1,
//     "products": [{
//         "id": 1,
//         "name": "Crême peau sensible",
//         "mark": "Nivea",
//         "code": "1234123F",
//         "state": "comingsoon", //"coming-soon", "passed" ou "in-progress"
//         "category": "cream"
//     }],
//     "sessions": [{
//         "id": 1,
//         "label": "Session placebo",
//         "description": "Session où les produits fournits sont des placebos"
//     },
//     {
//         "id": 2,
//         "label": "Session reels",
//         "description": "Session avec des reels produits"
//     }
//     ]
// }];
const initialState = [];

export const campaignSlice = createSlice({
    name: 'campaigns',
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
        createSessionCampaign: (state, action) => {
            let { idCampaign } = action.payload;
            let campaign = state.find((session) => {
                return session.id === idCampaign
            });
            campaign.sessions.push(action.payload);
        },
        initCampaigns: (state, action) => {
             state = action.payload;
             return state;
        }

    },
});

// Action creators are generated for each case reducer function
export const { addCampaign, removeCampaign, createSessionCampaign, initCampaigns } = campaignSlice.actions

export default campaignSlice.reducer;
