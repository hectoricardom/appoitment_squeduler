
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';
import Icons from '../../Icons/Icons';
import {Calendar ,MobileCalendar, Util} from '..'
import './style.css';




class InputDate extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      removeOption:false,
      dy:null,
      hourly:false,
      squedule_hourly:null,
      confirm_secction:false,
      am_pm:'AM',
      hour:null
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
    this.loadValidation = this.loadValidation.bind(this);
  }
  componentDidMount() {  
    const {form,field} = this.props;
    this.props._commonActions.UpdateForm(form,field,'');
    this.loadValidation();
  }

  handleBack = e => {   
    this.setState({hourly:false,hour:null,confirm_secction:false,squedule_hourly:null});  
    this.props.closePop();  
  };
  

  handleClick = e => {    
    const {form,field} = this.props;    
    console.log('handleClick','')
    this.props._commonActions.UpdateForm(form,field,e.id); 
    this.setState({drowndropInputText:'',hourly:true});      
    this.props.closePop();  
  };  

/*

  handleStatus= e => {
    var _this = this;
    var y = document.getElementsByClassName('inputStyleC');    
    var elmX = null;   
    for(var i in y){
      var inP = y[i];
      if(inP.childNodes){
        if(inP.contains(e.target)){
          elmX = inP;break;
        }
      }
    }; 
    if(elmX){
      var fC  = document.getElementsByClassName('formContainer')[0];
      var b = elmX.getBoundingClientRect();
      var cnt = fC.getBoundingClientRect();
      _this._TextPopup.Open(b,cnt.right);
    }  
  }
  */

  handleChange =(e,d) => {  
    const {form,field} = this.props;    
    this.props._commonActions.UpdateForm(form,field,e); 
    this.setState({hourly:true,dy:d.dy});     
    //this.setState({drowndropInputText:e.target.value});    
    //this.props.closePop();           
  };


  closePop = e => {  
    const {form,field} = this.props;
    if (typeof this.props.closePop === 'function') {     
      this.props.closePop();
    }       
  };

  
  loadValidation = e => {
    const {form,field,validation,placeholder} = this.props; 
    var _field = {}   
    if(validation){      
      _field['required']={};
      _field['required']['value']=true;    
      _field['required']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(62)}`;      
    }
    //this.props._commonActions.UpdateValidationForm(form,field,_field);
  }
 
  handleUpdChange = e => { 
    const { form,field } = this.props;
    const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
    const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/g
    if (validDateMMDDYYYY.test(e.target.value)) {     
      this.props._commonActions.UpdateForm(form,field,e.target.value); 
      console.log(`valid date format DD/MM/YYYY`);
    }else if (validDateDDMMYYYY.test(e.target.value)) {
      this.props._commonActions.UpdateForm(form,field,e.target.value); 
      console.log(`valid date format MM/DD/YYYY`);
    }
    else{
      console.log(`no valid date format`);
    }
    this.updState({key:`drowndropInputText`,value:e.target.value});       
  }
      
  
  handleDelete(){
    const {forms,form,field} = this.props;
    var dt = SumDays('fe',0);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._commonActions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate());
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1);
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear());
    this.setState({hourly:false,hour:null,confirm_secction:false,squedule_hourly:null});   
  }



  handleConfirm(){
    const {formsAll,form,field} = this.props;
    var _formSquedule = formsAll['squedules']?formsAll['squedules']['date']:{};
    const {am_pm,squedule_hourly,dy} = this.state;
    var _hour_ = parseInt(squedule_hourly.split(':')[0]);
    var _pm = am_pm==='AM'?0:12;
    var _hour = _pm + _hour_;
    var _shift = parseInt(squedule_hourly.split(':')[1])/15;
    if(!_formSquedule[dy]){
      _formSquedule[dy]={}
    }
    if(!_formSquedule[dy][_hour]){
      _formSquedule[dy][_hour]={}
    }
    if(!_formSquedule[dy][_hour][_shift]){
      _formSquedule[dy][_hour][_shift]=true;
    }
    var dt = SumDays('fe',0);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._commonActions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate());
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1);
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear());
    this.setState({hourly:false,hour:null,confirm_secction:false,squedule_hourly:null}); 
    this.props._commonActions.UpdateForm('squedules','date',_formSquedule);
    
    this.props.closePop();
  }

  setSquedule(r){
    this.setState({hourly:false,hour:null,confirm_secction:true,squedule_hourly:r}); 
  }

  setAM_PM(){  
    if(this.state.am_pm==='AM'){
      this.setState({am_pm:'PM'}); 
    }else{
      this.setState({am_pm:'AM'}); 
    }    
  }


  handleNextDay(){
    const {forms,form,field} = this.props;    
    var f_label = forms?forms[field]:null;
    var dt = SumDays(f_label,1);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._commonActions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate())   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1)
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear())
  }
  
  handlePrevDay(){
    const {forms,form,field} = this.props;    
    var f_label = forms?forms[field]:null;    
    var dt = SumDays(f_label,-1);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._commonActions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate())   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1)
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear())
  }

  updateState(e){    
    this.setState({[e.key]:e.value});
  }
  refT = r => {
    this._TextPopup = r
  }

  setHour = (e,h) => {
    this.setState({hour:e});
  }

  ref = r => {
    this.Elm = r
  }

  render() {     
    const {forms,formsAll,form,field,placeholder, isMobile,icon, color, colorRGBA,weekPicker, formObserve } = this.props; 
    const {hourly, hour, confirm_secction, squedule_hourly,am_pm,dy} = this.state; 
    var _formSquedule = formsAll['squedules']?formsAll['squedules']['date']:{}; 
    var _DayHourly = {max:17,min:9};    
    var _pm = am_pm==='AM'?0:12;
    var f_label = forms?forms[field]:null;
    var labelField = f_label || placeholder || '';
    var clockL = Array.from(Array(Math.floor(12)).keys());
    var clockL1_4 = Array.from(Array(Math.floor(4)).keys());
    var _CalendaR = null;
    if(isMobile){
        var heightStyle = {height:`100vh`}
        _CalendaR = <div className="DateContainerBox" style={heightStyle}>          
        <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>
          <div className="inputWrapperCalendar">
            <div className="center--Container Icon" onClick={this.handleBack.bind(this)}>
              <Icons name={'arrowBack'} color={'#777'} size={24}/>
            </div>
            <div className={`dateFormated ${squedule_hourly?'time':''}`}    style={{marginLeft: '65px'}}  >  
              <div>{date2pretyfy(labelField)}</div>
                {squedule_hourly?<div>{`${squedule_hourly} ${am_pm} `}</div>:null}               
              </div> 
              <div className="flexSpace"/> 
              {!confirm_secction?
              <div className="center--Container Arrows" onClick={this.handlePrevDay.bind(this)}>
                <Icons name={'arrow_left'} color={'#777'} size={24}/>
              </div>
              :null}
              {!confirm_secction?
              <div className="center--Container Arrows"  onClick={this.handleNextDay.bind(this)}>
                <Icons name={'arrow_right'} color={'#777'} size={24}/>
              </div>
              :null}
              {confirm_secction?
              <div className="center--Container grayStyle" onClick={this.handleConfirm.bind(this)}>
                <div className="hoverDiv blueStyle "/>
                <span className="text2D blueStyle">{`confirm`}</span>              
              </div>
              :null}
          </div>        
                            
        </div>
        <div className="flexContainerH"  style={{maxWidth: `360px`}}>
        <div className="flexContainerSldH" style={{transform: `translate3d(${confirm_secction?'-200%':hourly?'-100%':'0'}, 0px, 0px)`}}>
            <div className={`OptionContM ismounthly ${hourly?'':'active_'}`} style={{minWidth: `360px`}}>   
              <MobileCalendar date={f_label} valueUpdate={this.handleChange} currentColorTheme={color} colorRGBA={colorRGBA}  weekPicker={false}/>   
            </ div>            
            <div className={`OptionContM ishourly ${hourly?'active_':''}`}  style={{minWidth: `360px`}}>
              <ul style={{height: `24%`}}> 
              {
                clockL.map(cl=>{
                  var _hh_ = cl+_pm;
                  var trs = {'transform':'rotate(' + (cl*360/12) + 'deg)'}
                  if(_hh_>=_DayHourly.min && _hh_<=_DayHourly.max){
                    return (<li style={trs}  onClick={this.setHour.bind(this,cl>0?cl:12)}><i>{cl>0?cl:12}</i></li>)
                  }else{
                    return (<li style={trs}><i className="disabled">{cl>0?cl:12}</i></li>)
                  }  

                  
                  
                })
              }
              </ul>
              {hour?
              <div className="quarterHour2Squedule" style={{top: `40%`}} >
              {
                clockL1_4.map(qh=>{
                  var _hh_ = hour+_pm;
                  if(_formSquedule[dy] && _formSquedule[dy][_hh_] && _formSquedule[dy][_hh_][qh]){                   
                    return (<div className="quarter_hour disabled" >{`${hour}:${hour2pretyfy(qh*15)}`}</div>)
                  }
                  else{
                    return (<div className="quarter_hour" onClick={this.setSquedule.bind(this,`${hour}:${hour2pretyfy(qh*15)}`)}>{`${hour}:${hour2pretyfy(qh*15)}`}</div>)
                  }                  
                 
                })
              }
              </div>   
              :null}
              <div className={'am--pm--sty'} onClick={this.setAM_PM.bind(this)}>{am_pm}</div>        
            </div>
            <div className={`OptionContM _confirm ${confirm_secction?'active_':''}`}  style={{minWidth: `360px`}}>
              CONFIRM
            </div>
          </div>
          </div>
      </div>;
      }else{
        _CalendaR = 
        <div className="DateContainerBox">          
          <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>        
            <div className="center--Container grayStyle" onClick={this.handleDelete.bind(this)}>
              <div className="hoverDiv"/>
              <span className="text2D">{`borrar`}</span>              
            </div>
            <div className="inputWrapperCalendar">
              <div className="center--Container Icon" >
                <Icons name={icon} color={'#777'} size={24}/>
              </div>
              <div className={`dateFormated ${squedule_hourly?'time':''}`} >  
                <div>{date2pretyfy(labelField)}</div>
                {squedule_hourly?<div>{`${squedule_hourly} ${am_pm} `}</div>:null}               
              </div> 
              <div className="flexSpace"/> 
              {!confirm_secction?
              <div className="center--Container Arrows" onClick={this.handlePrevDay.bind(this)}>
                <Icons name={'arrow_left'} color={'#777'} size={24}/>
              </div>
              :null}
              {!confirm_secction?
              <div className="center--Container Arrows"  onClick={this.handleNextDay.bind(this)}>
                <Icons name={'arrow_right'} color={'#777'} size={24}/>
              </div>
              :null}
              {confirm_secction?
              <div className="center--Container grayStyle" onClick={this.handleConfirm.bind(this)}>
                <div className="hoverDiv blueStyle "/>
                <span className="text2D blueStyle">{`confirm`}</span>              
              </div>
              :null}
            </div>        
                              
          </div>
          <div className="flexContainerH">
          <div className="flexContainerSldH" style={{transform: `translate3d(${confirm_secction?'-200%':hourly?'-100%':'0'}, 0px, 0px)`}}>
            <div className={`InputDateContainer ismounthly ${hourly?'':'active_'}`}>
              <Calendar date={f_label} valueUpdate={this.handleChange} currentColorTheme={color} colorRGBA={colorRGBA} />
            </ div>              
            <div className={`InputDateContainer ishourly ${hourly?'active_':''}`}>
              <ul>
              {
                clockL.map(cl=>{
                  var _hh_ = cl+_pm;
                  var trs = {'transform':'rotate(' + (cl*360/12) + 'deg)'}
                  if(_hh_>=_DayHourly.min && _hh_<=_DayHourly.max){
                    return (<li style={trs}  onClick={this.setHour.bind(this,cl>0?cl:12)}><i>{cl>0?cl:12}</i></li>)
                  }else{
                    return (<li style={trs}><i className="disabled">{cl>0?cl:12}</i></li>)
                  }
                })
              }
              </ul>
              {hour?
              <div className="quarterHour2Squedule">
              {
                clockL1_4.map(qh=>{
                  var _hh_ = hour+_pm;                  
                  if(_formSquedule[dy] && _formSquedule[dy][_hh_] && _formSquedule[dy][_hh_][qh]){                   
                    return (<div className="quarter_hour disabled" >{`${hour}:${hour2pretyfy(qh*15)}`}</div>)
                  }
                  else{
                    return (<div className="quarter_hour" onClick={this.setSquedule.bind(this,`${hour}:${hour2pretyfy(qh*15)}`)}>{`${hour}:${hour2pretyfy(qh*15)}`}</div>)
                  }  
                })
              }
              </div>   
              :null}
              <div className={'am--pm--sty'} onClick={this.setAM_PM.bind(this)}>{am_pm}</div>        
            </div>
            <div className={`InputDateContainer _confirm ${confirm_secction?'active_':''}`}>
              
            </div>
          </div>
          </div>
        </div>;
      }

      return (    
        <div className="inputStyle" style={{"--calendar--back--color--":colorRGBA}}>
          {_CalendaR}
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    formsAll: state.common.forms,
    forms: state.common.forms[ownProps.form],
    formObserve: state.common.formObserve,
    validationForms:state.common.validationForms[ownProps.form],
    isMobile:state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {    
    _commonActions: bindActionCreators(commonActions, dispatch),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputDate);



function date2pretyfy(dt) {
  var y = new Date(dt);
  var date = isNaN(y.getTime())?new Date():y;
  return `${Util._dayLargeNames['es'][date.getDay()].slice(0,3)}, ${date.getDate()} ${Util.monthsList_Short[date.getMonth()+1]}`;  
}

function SumDays(dt,days) {
  var y = new Date(dt);
  var result = isNaN(y.getTime())?new Date():y;  
  result.setDate(result.getDate() + days);
  return result;
}

function hour2pretyfy(y) { 
  return `${y>10?y:`0${y}`}`;  
}