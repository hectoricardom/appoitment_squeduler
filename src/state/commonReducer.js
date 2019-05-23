import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.common, action) {
  switch (action.type) {

    case types.APPLOADED_SUCCESS:
      return {
        ...state,
        appLoaded: action.appLoaded
      };

    case types.ISMOBILE_SUCCESS:
      return {
        ...state,isMobile: action.isMobile
      };   

    
    case types.SCREEN_SIZE:
      return {
        ...state,
        screen_size: action.screen_size
      };

    case types.TECHNOLOGY_SUCCESS:
      return {
        ...state,
        technology: action.technology
      };

    case types.INVOLVED_SUCCESS:
      return {
        ...state,
        involved: action.involved
      };

    case types.LEARN_SUCCESS:
      return {
        ...state,
        learn: action.learn
      };
    case types.MENTOR_SUCCESS:
      return {
        ...state,
        mentor: action.mentor
      };
    case types.HIRE_SUCCESS:
      return {
        ...state,
        hire: action.hire
      };

    case types.SECTION_LIST:
      return {
        ...state,
        sections: action.sections
      };

    case types.CURRENT_PATH:
      return {
        ...state,
        path: action.path
      };
    case types.FORMS_SUCCESS:
      return {
        ...state,
        forms: action.forms
      };

    case types.FORMS_OBSERVES:
      return {
        ...state,
        formObserve: action.formObserve
      };
      
    case types.CALENDAR_FORMS_SUCCESS:
      return {
        ...state,
        calendar: action.calendar
      };

    case types.CALENDAR_OBSERVES:
      return {
        ...state,
        calendarObserve: action.calendarObserve
      };
      
    default:
      return state;
  }
}


