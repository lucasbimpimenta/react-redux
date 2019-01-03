import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import { empresa_reducer } from './empresa.reducer';
import { registropreco_reducer } from './registropreco.reducer';

export const Reducers = combineReducers({
  empresa_reducer
  ,registropreco_reducer
  ,form: formReducer
});
