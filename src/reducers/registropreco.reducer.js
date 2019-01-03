import { LOAD } from '../actions/registropreco.actions';

export const registropreco_reducer = (state = {}, action) => {

    switch (action.type) 
    {
        case LOAD:
            //console.log(action.data);
            return {
                data: action.data
            }
        default:
            return state
    }
}
