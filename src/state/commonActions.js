import * as types from '../constants/ActionTypes';
import { DATA_URL } from '../constants/Api';
import * as _Util from './Util';



/***********************************************************************************     COMMON   ***************************************************************************************************/


//https://hectoricardom.github.io/img/data.json

export function LoadData() {
  return function (dispatch, getState) {    
   
    _Util.fetchGetUrl(DATA_URL) 
    .then(res => {
      if(res){
        if(res['technologies']){
          dispatch(UpdTechnology(res['technologies']));
        }
        if(res['envolved']){
          dispatch(UpdInvolved(res['envolved']));
        }
        if(res['learn']){
          dispatch(UpdLearn(res['learn']));
        }
        if(res['mentor']){
          dispatch(UpdMentor(res['mentor']));
        }
        if(res['hire']){
          dispatch(UpdHire(res['hire']));
        }
        dispatch(appLoaded(true));
      }
    })
    .catch(error => {       
      console.log(error); //eslint-disable-line
    });
  };
}


export function UpdTechnology(res) {
  return {
    type: types.TECHNOLOGY_SUCCESS,
    technology : res
  };
}

export function UpdInvolved(res) {
  return {
    type: types.INVOLVED_SUCCESS,
    involved : res
  };
}



export function UpdLearn(res) {
  return {
    type: types.LEARN_SUCCESS,
    learn : res
  };
}

export function UpdMentor(res) {
  return {
    type: types.MENTOR_SUCCESS,
    mentor : res
  };
}

export function UpdHire(res) {
  return {
    type: types.HIRE_SUCCESS,
    hire : res
  };
}


export function UpdIsMobile(res) {
  return {
    type: types.ISMOBILE_SUCCESS,
    isMobile : res
  };
}


export function appLoaded(res) {
  return {
    type: types.APPLOADED_SUCCESS,
    appLoaded: res
  };
}
 

 

  export function ScreenSize(res) {
    return {
      type: types.SCREEN_SIZE,
      screen_size : res
    };
  }

  export function sectionList(res) {
    return {
      type: types.SECTION_LIST,
      sections: res
    };
  }

  export function setPath(res) {
    return {
      type: types.CURRENT_PATH,
      path: res
    };
  }


  export function UpdateFormbyName(form,v){
    return function (dispatch, getState) { 
      const state = getState().common;
      UpdForm(state,dispatch,form,v);
    }
  }
  
   
  
  export function UpdateForm(form,fld,v){
    return function (dispatch, getState) {   
      const state = getState().common;
      var _forms = state.forms;
      if(!_forms[form]){
        _forms[form] = {}
      }
      _forms[form][fld] =v;    
      UpdForm(state,dispatch,form,_forms[form]);
    }
  }


  function UpdForm(state,dispatch, form,v){
    var __forms = state.forms; 
    var foBs =  state.formObserve + 1;
    if(!__forms[form]){
      __forms[form] = {}
    }
    __forms[form] =v;
    dispatch(retrieveFormSuccess(__forms)); 
    dispatch(retrieveFormOberves(foBs)); 
  }
  

  export function retrieveFormSuccess(res) {
    return {
      type: types.FORMS_SUCCESS,
      forms : res
    };
  }
  

  
export function UpdateCalendarParams(fld,v){
  return function (dispatch, getState) {   
    const state = getState().common;
    var _forms = state.calendar;
    if(!_forms[fld]){
      _forms[fld] = {}
    }
    _forms[fld] =v;
    dispatch(CalendarFormSuccess(_forms)); 
    const tt = state.calendarObserve+1;
    dispatch(CalendarOberves(tt));
  }
}

export function CalendarFormSuccess(res) {
  return {
    type: types.CALENDAR_FORMS_SUCCESS,
    calendar : res
  };
}

export function CalendarOberves(res) {
  return {
    type: types.CALENDAR_OBSERVES,
    calendarObserve : res
  };
}





  export function retrieveFormOberves(res) {
    return {
      type: types.FORMS_OBSERVES,
      formObserve : res
    };
  }
  




