import { GET_EMPRESA } from '../actions/empresa.actions';

const initialState = {
    loading: false,
    error: false,
    detail: {}
};

export const empresa_reducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_EMPRESA:
            state.detail = action.payload
            return state;

        default:
            return state;
    }
};