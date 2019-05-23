

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import Icons from '../Icons/Icons';
import WithScroll from '../scroll-decorator';
import { NavLink} from 'react-router-dom';
import * as Util from '../../state/Util';
import { InputDate, Calendar, SelectPopup} from '../CalendarComponent';
import HRCards from '../Cards';
import ApplyMentorForm from '../applyMentorForm';
import ApplyHireForm from '../applyHireForm';
import TechnologiesSection from '../Technology';
import './style.css';



var dataSlider = [
  {
    "id":"5WC7i_xQ3vlZUePv",
    "title":"Authentication",
    "description":"Autentica y administra usuarios!",
    "img":"https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png",
    "color":"#ab60b8"
  },
  {
    "id":"DRbrG504jaH4lMCy",
    "title":"Test Lab",
    "description":"Haz pruebas en varios dispositivos",
    "img":"https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/testlab.png",
    "color":"#00b098"   
  },  
  {
    "id":"N4tObEMiwqxQM7Tf",
    "title":" Dynamic Links",
    "description":"Usa enlaces profundos para dirigir a los usuarios al lugar más adecuado de tu aplicación",
    "img":"https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/dynamiclinks.png",
    "color":"#de5b87"   
  },
  {
    "id":"T0QoYKpo5oAHp7k0",
    "title":"Cloud Firestore",
    "description":"La nueva generación de Realtime Database",
    "img":"https://www.gstatic.com/mobilesdk/180815_mobilesdk/discoverycard_firestore.png",
    "color":"#ef6c00"   
  },
  {
    "id":"5ABhG1I9yb9MJdDO",
    "title":"Performance",
    "description":"Obtén información valiosa sobre el rendimiento de tu aplicación",
    "img":"https://www.gstatic.com/mobilesdk/180326_mobilesdk/discoverycards/performance.png",
    "color":"#394aa5"   
  },
  {
    "id":"VB_JgepNVSi95g3v",
    "title":"Predictions",
    "description":"Actúa en función del comportamiento predicho de los usuarios",
    "img":"https://www.gstatic.com/mobilesdk/171010_mobilesdk/discovery/predictions.png",
    "color":"#714dad"
  }

  
]

class Involved extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewport:false,
      widthList:[],
      active_content:false,
      dy:null,
      hourly:false,
      squedule_hourly:null,
      confirm_secction:false,
      am_pm:'AM',
      hour:null,
      index:0
    };
  }



  componentWillMount(){      
    this.UpdateIndex = this.UpdateIndex.bind(this);  
    this.scrollhandler = this.scrollhandler.bind(this); 
  }

  componentDidMount(){  
    this.scrollhandler();
  }



  scrollhandler(i){
    if(!this.state.viewport){   
      if(Util.isInViewport(this.elm)){
        this.setState({viewport:true});
      }      
    }    
  }

  openContent(){
    this.setState({active_content:true});
    setTimeout(()=>{    
      var toScroll = document.querySelector(`[content-data-id="${dataSlider[this.state.index].id}"]`);
      var topY = toScroll.offsetTop;
      Util.scrollgsap(topY-10);
    },50)     
  }

  closeContent(){
    this.setState({active_content:false,active_content:false,
      hourly:false,
      hour:null,
      confirm_secction:false,
      squedule_hourly:null});
    Util.scrollgsap(0);
  }


  UpdateIndex(ig){
    this.setState({
      index:ig,
      active_content:false,
      hourly:false,
      hour:null,
      confirm_secction:false,
      squedule_hourly:null
    });
     
  }

  totop(){
    Util.scrollgsap(0);
  }

  handleBack = e => {   
    this._TextPopup.Close(); 
  };

  setHour = (e,h) => {
    this.setState({hour:e});
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

  datePicker= e => {
   
    var _Id = Util.Base64.encode(`datePickbutton${984823}`);
    var _this = this;    
    var elmX = document.querySelector(`[btn-dt-id="${_Id}"]`);
    if(elmX){
      var fC  = document.getElementsByClassName('left_Section__text')[0];
      var b = elmX.getBoundingClientRect();
      var cnt = fC.getBoundingClientRect();
      _this._TextPopup.Open(b,cnt.right);
    }  
  }


  handleChange =(e,d) => {  
    const {form,field} = this.props;    
    //this.props._commonActions.UpdateForm(form,field,e); 
    this.setState({hourly:true,dy:d.dy});     
    //this.setState({drowndropInputText:e.target.value});    
    //this.props.closePop();           
  };




  handleConfirm(){
    const {formsAll,form,field} = this.props;
    var _formSquedule = formsAll['squedules']?formsAll['squedules']['date']:{};
    const {am_pm,squedule_hourly,dy} = this.state;
    var _hour_ = parseInt(squedule_hourly.split(':')[0]);
    var _pm = am_pm==='AM'?0:12;
    var _hour = _hour_;
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
    var dt = Util.SumDays('fe',0);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;    
    this.props._commonActions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate());
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1);
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear());
    this.setState({hourly:false,hour:null,confirm_secction:false,squedule_hourly:null}); 
    this.props._commonActions.UpdateForm('squedules','date',_formSquedule);
  }


  refT = r => {
    this._TextPopup = r
  }

  ref = r => {
    this.elm = r
  }

  render() {
    var colorTheme = '13, 71, 161';  
    colorTheme = '48, 79, 254';  
    const { isMobile, formsAll, formObserve } = this.props;
    const { active_content,
      dy,
      hourly,
      squedule_hourly,
      confirm_secction,
      am_pm,
      hour,
      index} = this.state;
    var colorThemeRGB = `rgba(${colorTheme},1)`;
    var colorThemeRGBA = `rgba(${colorTheme},0.15)`;
    var _DayHourly = {max:17,min:9};    
    var _formSquedule = formsAll['squedules']?formsAll['squedules']['date']:{}; 
    var _pm = am_pm==='AM'?0:12;
    const {UpdateIndex,scrollhandler} = this;     
    var iconBack = <div className="IconInputTextModal" onClick={this.handleBack}><Icons name={`arrowBack`} color={'#777'} size={24}/></div>
    var clockL = Array.from(Array(Math.floor(24)).keys());
    var clockL1_4 = Array.from(Array(Math.floor(4)).keys());
    var _wCrd = isMobile?360:420;       
 
    var dComp = [
        <div className="flexContainerH">
                <div className="flexContainerSldH" style={{transform: `translate3d(${confirm_secction?`-${_wCrd*2}px`:hourly?`-${_wCrd}px`:'0'}, 0px, 0px)`}}>
                  <div className={`InputDateContainer ismounthly ${hourly?'':'active_'}`}>
                  <Calendar  form={'calendar'}  field={'date'} isMobile={isMobile} currentColorTheme={dataSlider[this.state.index].color} closePop={this.handleBack.bind(this)} valueUpdate={this.handleChange.bind(this)} />
                  </ div>              
                  <div className={`InputDateContainer ishourly ${hourly?'active_':''}`}>
                  <div className={`Horly_container_flex`}  style={{"--color-hourly--":dataSlider[this.state.index].color}}>
                   {false? <ul>
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
                    </ul>:clockL.map(cl=>{
                        var _hh_ = cl+_pm;
                        var trs = {'transform':'rotate(' + (cl*360/12) + 'deg)'}
                        if(_hh_>=_DayHourly.min && _hh_<=_DayHourly.max){
                          return (
                            <div className={`hours_2_Squed ${hour===cl?'active_hour':''}`} onClick={this.setHour.bind(this,cl)}>
                              <div className={`hourCalendar`}>
                                <div className={'hours_2_'}>{cl>12?cl-12:cl}</div>
                                <div className={'pm_2_'}>{cl>11?'PM':'AM'}</div>
                              </div>
                              {hour===cl?<div className="quarterHour2Squedule">
                                {
                                  clockL1_4.map(qh=>{
                                    var _hh_ = hour+_pm;                  
                                    if(_formSquedule[dy] && _formSquedule[dy][_hh_] && _formSquedule[dy][_hh_][qh]){                   
                                      return (<div className="quarter_hour disabled" >{`${hour>12?hour-12:hour }:${Util.hour2pretyfy(qh*15)} ${hour>11?'PM':'AM' }`}</div>)
                                    }
                                    else{
                                      return (<div className="quarter_hour" onClick={this.setSquedule.bind(this,`${hour}:${Util.hour2pretyfy(qh*15)}`)}>{`${hour>12?hour-12:hour }:${Util.hour2pretyfy(qh*15)} ${hour>11?'PM':'AM' }`}</div>)
                                    }  
                                  })
                                }
                                </div> :null}
                              
                            </div>
                          )
                        }else{
                          return (null)
                        }
                      })}
                    
                   {/*<div className={'am--pm--sty'} onClick={this.setAM_PM.bind(this)}>{am_pm}</div>*/} 
                    </div>      
                  </div>
                  <div className={`InputDateContainer _confirm ${confirm_secction?'active_':''}`}>
                  {confirm_secction?
                    <div className="center--Container grayStyle" onClick={this.handleConfirm.bind(this)} style={{"--color-tab--base--hover":'#fff',"--color-tab--base--hover":'#fff'}}>
                      <div className="hoverDiv c_Style "/>
                      <span className="text2D c_Style">{`confirm`}</span>              
                    </div>
                    :null
                  }
                  </div>
                </div>
                </div>,
                <div className="flexContainerH _formH" style={{"--color-form--":dataSlider[this.state.index].color}}>
                  <ApplyMentorForm dark={true}/>
                </div>,
                <div className="flexContainerH _formH" style={{"--color-form--":dataSlider[this.state.index].color}}>
                  <ApplyHireForm dark={true}/>
                </div>,
                <div className="flexContainerH _formH" style={{"--color-form--":dataSlider[this.state.index].color}}>
                  <ApplyMentorForm dark={true}/>
                </div>,
                <div className="flexContainerH _formH" style={{"--color-form--":dataSlider[this.state.index].color}}>
                  <ApplyHireForm dark={true}/>
                </div>,
                <div className="flexContainerH _formH" style={{"--color-form--":dataSlider[this.state.index].color}}>
                  <ApplyMentorForm dark={true}/>
                </div>


]; 




     
      return ( 
          <section section-id="Z2V0IGludm9sdmVk" className="section_involved">
                    <div className="o-container" style={{"--color-tab--base--hover":dataSlider[this.state.index].color}}>
                      <div className="left_Section__intro section_involved_width tablet--10-12 --auto--margin">
                        <h2 className="text-large"></h2>
                        <p className="text-normal"> </p>
                      </div>
                      <TabsInvolved data={['calendar','supervisor','hire','filterList','contract','hire']} UpdateIndex={UpdateIndex} _color={dataSlider[this.state.index].color}/>                        
                      
                      {/*    Get Involved Presentations    */}

                      <WithScroll scrollhandler={scrollhandler}/>
                      <div ref={this.ref} className="c-tabs-content"  is-in-viewport={`${this.state.viewport}`}>

                                     {/*    Get Involved Presentation Learn   */}

                                    {  dataSlider.map((sl,i)=>{
                                      var ariaHidden =  false;
                                      if(this.state.index===i){
                                        ariaHidden =  true;
                                      }                                      
                                      var path = { pathname: sl.link }
                                      return (
                                            <div className="left_Section left_SectionTextMedia left_SectionTextMedias lSectionNoPadding center_Tabs_Section" aria-hidden={ariaHidden} aria-labelledby="" key={i} role="tabpanel">
                                             {this.state.index===i? <div className="--auto--margin grid--middle u-grid--override center_Tab_Content_Slide  desktop--6-12 tablet--8-12 mobile--11-12">
                                                  <div className="grid__item desktop--7-12 tablet--12-12">
                                                    <div className="left_Section__media left_Section__media--raised u-text-align-center fade-and-slide fade-and-slide--right --auto--margin ">
                                                        <div className="left_Section__media-wrapper left_Section__media-wrapper--wear left_Section__media-wrapper--wear">
                                                        <HRCards _src={sl.img} _title={sl.title} _description={sl.description} _color={sl.color} _action={this.openContent.bind(this)}/>                      
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="grid__item desktop--4-12 tablet--12-12">
                                                    <div className="left_Section__text cascade-text desktop--10-12 tablet--8-12 --auto--margin">
                                                      <h3 className="beta cascade-text__item" onClick={this.datePicker.bind(this)}  btn-dt-id={`${Util.Base64.encode(`datePickbutton${984823}`)}`}>{sl.title}</h3>
                                                      <p className="text-normal cascade-text__item">{sl.description}</p>                                                                                                        
                                                      <NavLink  to={path} className="btn btn--text cascade-text__item" ><span onClick={this.totop.bind(this)} >see details</span> </NavLink>                                                                                           
                                                    </div>
                                                  </div>
                                                </div>:null}

                                          </div>
                                        )
                                      })
                                    }                          
                      </div>
                    </div>
                    <SelectPopup ref={this.refT} isMobile={isMobile}>
                      <InputDate  form={'calendar'}  field={'date'} isMobile={isMobile} color={colorThemeRGB} colorRGBA={colorThemeRGBA} closePop={this.handleBack.bind(this)}/>
                    </SelectPopup>

                    <div content-data-id={dataSlider[this.state.index].id} className={`content_H ${this.state.active_content?"_active":""}`} style={{backgroundImage: `url(//www.gstatic.com/mobilesdk/180530_mobilesdk/zerostates/prediction_back@2x.png)`,backgroundColor:dataSlider[this.state.index].color}}>
                      <div className="center--Container Arrows"  onClick={this.closeContent.bind(this)} style={{float:'right'}}>
                        <Icons name={'cancel'} color={'#eee'} size={24}/>
                      </div>
                      <div className={'content_Calendar'}>
                          {dComp[this.state.index]}


                       
                      </div>
                    </div>                    

                </section>

        );
     
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    involved: state.common.involved,
    formsAll: state.common.forms,
    isMobile: state.common.isMobile,
  };
}


function mapDispatchToProps(dispatch) {
  return {    
    _commonActions: bindActionCreators(commonActions, dispatch),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Involved);














class TabI extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      screen_size:0,
      index:0
    };
  }



  componentWillMount(){  
    
    this.UpdateIndex = this.UpdateIndex.bind(this);
    this.TabIndicator = this.TabIndicator.bind(this);
  }

  componentDidMount(){  
    setTimeout(()=>{
      this.TabIndicator();
    },25);
  }

  TabIndicator(){
    var els = document.querySelectorAll('[data-item]'); 
    var listTabH = [],sumTH = 0;
    for(var ss =0;ss<els.length;ss++){
      var hh =els[ss].getBoundingClientRect().width;
      if(hh<200){
        listTabH.push({l:sumTH,w:hh});
        sumTH+=hh; 
      }     
    }
    this.setState({widthList:listTabH});
  }


  UpdateIndex(i){
    this.setState({index:i});
    this.TabIndicator();
    if(typeof this.props.UpdateIndex === "function" ){
      this.props.UpdateIndex(i);
      if(window.outerWidth<=600){
        //Util.scrollgsap(160);
      }    
    }
  }

  ref = r => {
    this.SM = r
  }

  ref_tab = r => {
    this.tabs = r
  }

  render() {
      const {screen_size, data , _color} = this.props;
      if(screen_size!==this.state.screen_size){
        this.TabIndicator();
        this.setState({screen_size:screen_size});
      }
      var indcatorSize = this.state.widthList?this.state.widthList[this.state.index]:null;
      var tabIndicator = {width: `0px`, left: `0px`};
      if(indcatorSize){
        tabIndicator = {width: `${indcatorSize.w}px`, left: `${indcatorSize.l}px`}
      }      
      return (          
            <div className="c-tabs-nav " data-active-item="1" data-default-key="0" data-c-tabs-nav="" data-ca-category="device-tray">
              <ul className="center_Tab_Nav_Items" role="tablist">
                { data.map((tbI,i)=>{   
                  var color = _color || 'var(--tab--nav-Color--)';
                  var activeClass = 'center_Tab_Nav_Item';
                  if(this.state.index===i){
                    color = _color || 'var(--color-base--hover)';
                    activeClass = 'center_Tab_Nav_Item is-active';
                    }                                        
                    return(                          
                      <li className={activeClass} data-item={i} role="presentation" onClick={()=>this.UpdateIndex(i)} key={i}>
                        <a className="center_Tab_Nav_Link" role="tab"  data-tab-index={i}>
                          <Icons name={tbI} color={color} size={38}/>                                                         
                        </a>
                      </li>
                      )
                  })
                }                         
              </ul>
              <span id="header-tabs-nav__indicator" className="c-tabs-nav__indicator" style={tabIndicator}></span>
            </div>  

        );
     
  }  
}


function mapStateToProps2(state, ownProps) {
  return {       
    screen_size: state.common.screen_size,
  };
}
function mapDispatchToProps2(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

export const TabsInvolved = connect(mapStateToProps2,mapDispatchToProps2)(TabI);




