import { combineReducers } from 'redux';
import skillsSlice from './skillsAdded';
import applicantsSlice from './applicantsList';

export const reducer = combineReducers({
    skillsAdded: skillsSlice,
    applicantsList: applicantsSlice
});
