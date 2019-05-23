

import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';
import Icons from '../Icons/Icons';
import AKModal from '../akModal';
import SlideMenu from '../SlideMenu';
import WithScroll from '../scroll-decorator';
import ApplyContainer from '../applyContainer';
import ApplyForm from '../applyForm';

import './style.css';





class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      screen_size:0,
      totalHeight:0,
      path:'',
      toScroll:false,
      index:0
    };
  }



  componentWillMount(){  
    this.OpenSlideMenu = this.OpenSlideMenu.bind(this);
    this.CloseSLideMenu = this.CloseSLideMenu.bind(this);
    this.UpdateIndex = this.UpdateIndex.bind(this);
    this.TabIndicator = this.TabIndicator.bind(this);
    this.scrollhandler = this.scrollhandler.bind(this);
    this.reCalcSection = this.reCalcSection.bind(this);
    this.OpenForm = this.OpenForm.bind(this);
  }

  componentDidMount(){
      
    setTimeout(()=>{
      this.TabIndicator();      
    },25);
  }

  reCalcSection(){
    var listH = [];
    var sumH=0;
    var section_list = document.querySelectorAll('[section-id]');    
    for(var i =0;i<section_list.length;i++){
        var hh = section_list[i];
        var lastS = sumH;
        //sumH+=hh.getBoundingClientRect().height;
        sumH += hh.offsetTop-60;
        listH.push({s:hh.offsetTop-60,e:sumH,id:hh.getAttribute('section-id'),name:Util.Base64.decode(hh.getAttribute('section-id'))});
    }
    this.props.commonActions.sectionList(listH);
  }


  TabIndicator(){
    var els = document.querySelectorAll('[tab-nav-index]');
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

  OpenSlideMenu(){
    if(this.SM && this.SM.state.visible){
      this.SM.Close();      
    }else{
      this.SM.Open();      
    } 
  }

  OpenForm(){
    if(this.akm && this.akm.state.visible){
      this.akm.Close();      
    }else{
      this.akm.Open();      
    }
  }

  
  completeHandler() {
    var _th = this;
    _th.setState({toScroll:false})
  }

  scrollgsap(topY) {    
    var _th = this;
    _th.setState({toScroll:true})
    window.TweenMax.to(window, 0.5, {scrollTo:{y:topY, offsetY:50,autoKill:!1},ease:window.Power1.easeInOut,onComplete:_th.completeHandler.bind(_th)});
  }



  UpdateIndex(i,s,m){        
    var toScroll = document.querySelector(`[section-id="${s.id}"]`);
    var topY = toScroll.offsetTop;
    this.scrollgsap(topY);    
    this.setState({index:i*1});
    if(m){this.CloseSLideMenu()}
    else{this.TabIndicator()}
    
  }


  CloseSLideMenu(){
    if(this.SM){
      this.SM.Close();
    }    
  }

  changetheme(){
    Util.changetheme();
  }

  scrollhandler(i){
    if(!this.state.toScroll && this.props.sections.length){
      var rt = i;
      var ind = null;
      for(var sp in this.props.sections){        
        if(rt>=this.props.sections[sp].s){ind = sp;} 
      }      
      if(ind){this.setState({index:ind*1});}      
    }
  }

  totop(){
    this.scrollgsap(0);
  }

   ref = r => {
    this.SM = r
  }

  ref_akm = r => {
    this.akm = r
  }

  render() {
      const {scrollhandler, changetheme, OpenForm} = this;
      const {screen_size,path,sections} = this.props;
      if(screen_size!==this.state.screen_size){
        this.setState({screen_size:screen_size});
      }
      if(path!==this.state.path){
        this.setState({path:path});
        this.reCalcSection()
        setTimeout(()=>{
          this.TabIndicator();          
        },25);
        
      }
      var svgRules = {fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:'1.41421'};
      var indcatorSize = this.state.widthList?this.state.widthList[this.state.index]:null;
      var tabIndicator = {width: `0px`, left: `0px`};
      if(indcatorSize){
        tabIndicator = {width: `${indcatorSize.w}px`, left: `${indcatorSize.l}px`}
      }

      var data={
        "title":"Apply to Code Louisville",
        "name":"Code Louisville Agreement",
        "description":"By submitting this form, I agree, understand and/or acknowledge that: The submitted information above is true and complete to the best of my knowledge. The submitted information will be entered into the Code Louisville / KentuckianaWorks database, managed by @WorkSolutions. Code Louisville is funded through a U.S. Department of Labor Workforce Innovation Fund Grant, and the information above will be used to evaluate the Code Louisville program for reporting and improvement purposes. As a result, I am part of a long-term study. Code Louisville / KentuckianaWorks will NOT report my identifying information for the long-term study. Any data reported in the long-term study will be void of name, address, or other identifying information. Code Louisville / KentuckianaWorks has my permission to use the above information for follow up (enrollment) activities related to the program. Neither Code Louisville nor KentuckianaWorks discriminate on the basis or race, color, national origin, sex, religion, age or disability in employment or provision of services."
      }
      return ( 
        <div> 
          <SlideMenu ref={this.ref}>
            <div className="headerMobileLogo">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 247 31" version="1.1" style={svgRules}><g><path d="M0,18.35l16.2,-6.9l0,3.4l-11.7,4.8l11.7,4.8l0,3.4l-16.2,-6.9l0,-2.6l0,0Z" /><path d="M36.3,29c-1,0.5 -3.1,1.2 -5.8,1.2c-6.1,0 -10.1,-4.1 -10.1,-10.3c0,-6.2 4.3,-10.8 10.9,-10.8c2.2,0 4.1,0.5 5.1,1.1l-0.8,2.8c-0.9,-0.5 -2.3,-1 -4.3,-1c-4.6,0 -7.1,3.5 -7.1,7.7c0,4.7 3,7.6 7,7.6c2.1,0 3.5,-0.5 4.5,-1l0.6,2.7Z"/><path d="M46.9,30.2c-5.4,0 -9.7,-4 -9.7,-10.4c0,-6.8 4.5,-10.7 10,-10.7c5.8,0 9.7,4.2 9.7,10.4c0.1,7.4 -5.1,10.7 -10,10.7l0,0ZM47.1,27.4c3.5,0 6.1,-3.3 6.1,-7.9c0,-3.4 -1.7,-7.7 -6.1,-7.7c-4.3,0 -6.2,4 -6.2,7.8c0.1,4.5 2.6,7.8 6.2,7.8Z"/><path d="M77.5,0.1l0,24.4c0,1.8 0,3.8 0.2,5.2l-3.3,0l-0.2,-3.5l-0.1,0c-1.1,2.3 -3.5,4 -6.8,4c-4.9,0 -8.7,-4.1 -8.7,-10.3c0,-6.8 4.2,-10.9 9.1,-10.9c3.1,0 5.2,1.5 6.1,3l0.1,0l0,-12l3.6,0l0,0.1ZM73.8,17.8c0,-0.5 0,-1.1 -0.2,-1.6c-0.5,-2.3 -2.5,-4.2 -5.3,-4.2c-3.8,0 -6.1,3.3 -6.1,7.8c0,4.1 2,7.5 6,7.5c2.5,0 4.7,-1.7 5.4,-4.4c0.1,-0.5 0.2,-1 0.2,-1.6l0,-3.5l0,0Z" /><path d="M84,20.3c0.1,5 3.2,7 6.9,7c2.6,0 4.3,-0.5 5.6,-1l0.7,2.6c-1.3,0.6 -3.5,1.3 -6.8,1.3c-6.2,0 -9.9,-4.1 -9.9,-10.2c0,-6.1 3.6,-10.9 9.5,-10.9c6.6,0 8.3,5.8 8.3,9.5c0,0.8 0,1.3 -0.1,1.8l-14.2,-0.1ZM94.7,17.6c0,-2.3 -1,-6 -5.1,-6c-3.8,0 -5.3,3.4 -5.6,6l10.7,0Z" /><path d="M120.3,20.95l-16.2,6.9l0,-3.4l11.7,-4.8l-11.7,-4.8l0,-3.4l16.2,6.9l0,2.6Z" /></g><path d="M246.1,4.8l-119.7,0l0,25.4l119.7,0l0,-25.4ZM178.6,22.3c0.6,0.3 1.7,0.6 2.5,0.6c1.4,0 2.1,-0.7 2.1,-1.7c0,-1.1 -0.7,-1.6 -2,-2.5c-2.1,-1.3 -2.9,-2.9 -2.9,-4.2c0,-2.4 1.6,-4.4 4.8,-4.4c1,0 2,0.3 2.4,0.5l-0.5,2.5c-0.4,-0.3 -1.1,-0.5 -1.9,-0.5c-1.3,0 -1.9,0.8 -1.9,1.6c0,0.9 0.4,1.4 2.1,2.4c2,1.2 2.7,2.7 2.7,4.3c0,2.8 -2,4.6 -5,4.6c-1.2,0 -2.4,-0.3 -2.9,-0.6l0.5,-2.6l0,0ZM153.6,17.5c0,5.7 -2,8 -4.9,8c-3.4,0 -4.8,-3.6 -4.8,-7.8c0,-4.1 1.6,-7.7 5,-7.7c3.6,0 4.7,4 4.7,7.5ZM231.9,25.4l6.8,0l0,-2.6l-3.9,0l0,-4.1l3.5,0l0,-2.3l-3.4,0l0,-3.5l3.6,0l0,-2.6l-6.6,0l0,15.1ZM210.3,10.2l2.9,0l0,12.6l3.9,0l0,2.5l-6.8,0l0,-15.1l0,0ZM174.1,10.2l0,15.1l-2.9,0l0,-15.1l2.9,0ZM134.4,25.3l6.8,0l0,-2.5l-3.9,0l0,-12.6l-2.9,0l0,15.1ZM205.4,10.2l0,15.1l-2.9,0l0,-15.1l2.9,0ZM221.1,25.3l6.8,0l0,-2.5l-3.9,0l0,-12.6l-2.9,0l0,15.1ZM146.9,17.7c0,3.4 0.7,5.2 1.8,5.2c1.3,0 1.7,-2.2 1.7,-5.3c0,-2.7 -0.4,-5.1 -1.8,-5.1c-1,0.1 -1.7,2 -1.7,5.2l0,0ZM160.5,10.2l0,9.8c0,2.2 0.7,2.9 1.4,2.9c0.9,0 1.5,-0.6 1.5,-2.9l0,-9.8l2.9,0l0,9.3c0,3.9 -1.5,6 -4.4,6c-3.2,0 -4.4,-2.2 -4.4,-6l0,-9.3l3,0ZM192.2,25.3l-3.4,-15.1l3.3,0l1.1,6.5c0.2,1.6 0.6,3.5 0.8,5.3c0.2,-1.8 0.4,-3.6 0.7,-5.3l1,-6.5l3.2,0l-3.5,15.1l-3.2,0Z"/></svg>           
            </div>
            <nav className="navSlideBox" id="navigation" role="navigation" aria-hidden="false">
              <ul role='menubar'>
                {sections.map((tb,i)=>{
                  var active_Style ={};
                  if(this.state.index===i){
                    active_Style = {color:'var(--color-base--hover)',fontWeight: 'normal'};
                  }
                  return(
                    <li onClick={()=>this.UpdateIndex(i,tb,true)}  tab-slide-index={i} key={i}>
                      <a role="slide_item" style={active_Style}>
                        {tb.name}
                      </a>
                    </li>
                  )
                })
                }                                             
              </ul>                
            </nav>
          </SlideMenu>   
          {this.state.path==='/learn'?
          <AKModal ref={this.ref_akm} >
            <ApplyContainer title={data.title} name={data.name} description={data.description} form={'learn'} field={`agree`} ><ApplyForm/></ApplyContainer>
          </AKModal>
          :null}   
          <header className="left_Header is-fixed in-transition" role="banner">               
            <button className="c-toggle"  onClick={this.OpenSlideMenu}>
              <svg className="" fill="#888" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </button>
            <WithScroll scrollhandler={scrollhandler}/>            
            <NavLink  onClick={this.totop.bind(this)}  to={{pathname: "/"}} className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="200px" viewBox="0 0 247 31" version="1.1"  style={svgRules}>
                <g>
                  <path d="M0,18.35l16.2,-6.9l0,3.4l-11.7,4.8l11.7,4.8l0,3.4l-16.2,-6.9l0,-2.6l0,0Z" />
                  <path d="M36.3,29c-1,0.5 -3.1,1.2 -5.8,1.2c-6.1,0 -10.1,-4.1 -10.1,-10.3c0,-6.2 4.3,-10.8 10.9,-10.8c2.2,0 4.1,0.5 5.1,1.1l-0.8,2.8c-0.9,-0.5 -2.3,-1 -4.3,-1c-4.6,0 -7.1,3.5 -7.1,7.7c0,4.7 3,7.6 7,7.6c2.1,0 3.5,-0.5 4.5,-1l0.6,2.7Z" />
                  <path d="M46.9,30.2c-5.4,0 -9.7,-4 -9.7,-10.4c0,-6.8 4.5,-10.7 10,-10.7c5.8,0 9.7,4.2 9.7,10.4c0.1,7.4 -5.1,10.7 -10,10.7l0,0ZM47.1,27.4c3.5,0 6.1,-3.3 6.1,-7.9c0,-3.4 -1.7,-7.7 -6.1,-7.7c-4.3,0 -6.2,4 -6.2,7.8c0.1,4.5 2.6,7.8 6.2,7.8Z" />
                  <path d="M77.5,0.1l0,24.4c0,1.8 0,3.8 0.2,5.2l-3.3,0l-0.2,-3.5l-0.1,0c-1.1,2.3 -3.5,4 -6.8,4c-4.9,0 -8.7,-4.1 -8.7,-10.3c0,-6.8 4.2,-10.9 9.1,-10.9c3.1,0 5.2,1.5 6.1,3l0.1,0l0,-12l3.6,0l0,0.1ZM73.8,17.8c0,-0.5 0,-1.1 -0.2,-1.6c-0.5,-2.3 -2.5,-4.2 -5.3,-4.2c-3.8,0 -6.1,3.3 -6.1,7.8c0,4.1 2,7.5 6,7.5c2.5,0 4.7,-1.7 5.4,-4.4c0.1,-0.5 0.2,-1 0.2,-1.6l0,-3.5l0,0Z" />
                  <path d="M84,20.3c0.1,5 3.2,7 6.9,7c2.6,0 4.3,-0.5 5.6,-1l0.7,2.6c-1.3,0.6 -3.5,1.3 -6.8,1.3c-6.2,0 -9.9,-4.1 -9.9,-10.2c0,-6.1 3.6,-10.9 9.5,-10.9c6.6,0 8.3,5.8 8.3,9.5c0,0.8 0,1.3 -0.1,1.8l-14.2,-0.1ZM94.7,17.6c0,-2.3 -1,-6 -5.1,-6c-3.8,0 -5.3,3.4 -5.6,6l10.7,0Z" />
                  <path d="M120.3,20.95l-16.2,6.9l0,-3.4l11.7,-4.8l-11.7,-4.8l0,-3.4l16.2,6.9l0,2.6Z" />
                </g>
                <path d="M246.1,4.8l-119.7,0l0,25.4l119.7,0l0,-25.4ZM178.6,22.3c0.6,0.3 1.7,0.6 2.5,0.6c1.4,0 2.1,-0.7 2.1,-1.7c0,-1.1 -0.7,-1.6 -2,-2.5c-2.1,-1.3 -2.9,-2.9 -2.9,-4.2c0,-2.4 1.6,-4.4 4.8,-4.4c1,0 2,0.3 2.4,0.5l-0.5,2.5c-0.4,-0.3 -1.1,-0.5 -1.9,-0.5c-1.3,0 -1.9,0.8 -1.9,1.6c0,0.9 0.4,1.4 2.1,2.4c2,1.2 2.7,2.7 2.7,4.3c0,2.8 -2,4.6 -5,4.6c-1.2,0 -2.4,-0.3 -2.9,-0.6l0.5,-2.6l0,0ZM153.6,17.5c0,5.7 -2,8 -4.9,8c-3.4,0 -4.8,-3.6 -4.8,-7.8c0,-4.1 1.6,-7.7 5,-7.7c3.6,0 4.7,4 4.7,7.5ZM231.9,25.4l6.8,0l0,-2.6l-3.9,0l0,-4.1l3.5,0l0,-2.3l-3.4,0l0,-3.5l3.6,0l0,-2.6l-6.6,0l0,15.1ZM210.3,10.2l2.9,0l0,12.6l3.9,0l0,2.5l-6.8,0l0,-15.1l0,0ZM174.1,10.2l0,15.1l-2.9,0l0,-15.1l2.9,0ZM134.4,25.3l6.8,0l0,-2.5l-3.9,0l0,-12.6l-2.9,0l0,15.1ZM205.4,10.2l0,15.1l-2.9,0l0,-15.1l2.9,0ZM221.1,25.3l6.8,0l0,-2.5l-3.9,0l0,-12.6l-2.9,0l0,15.1ZM146.9,17.7c0,3.4 0.7,5.2 1.8,5.2c1.3,0 1.7,-2.2 1.7,-5.3c0,-2.7 -0.4,-5.1 -1.8,-5.1c-1,0.1 -1.7,2 -1.7,5.2l0,0ZM160.5,10.2l0,9.8c0,2.2 0.7,2.9 1.4,2.9c0.9,0 1.5,-0.6 1.5,-2.9l0,-9.8l2.9,0l0,9.3c0,3.9 -1.5,6 -4.4,6c-3.2,0 -4.4,-2.2 -4.4,-6l0,-9.3l3,0ZM192.2,25.3l-3.4,-15.1l3.3,0l1.1,6.5c0.2,1.6 0.6,3.5 0.8,5.3c0.2,-1.8 0.4,-3.6 0.7,-5.3l1,-6.5l3.2,0l-3.5,15.1l-3.2,0Z" />
              </svg>         
            </NavLink>
            <div className="flexSpace"> </div>
            <nav className="navBox" role="navigation" aria-hidden="false">
              <ul role="menubar" ref={this.ref_tab}>
                {sections.map((tb,i)=>{
                    var active_Style ={};
                    if(this.state.index===i){
                      //active_Style = {color:'var(--color-base--hover)',fontWeight: 'normal'};
                    }
                    return(
                      <li onClick={()=>this.UpdateIndex(i,tb)} tab-nav-index={i} key={i}>                      
                        <a role="menuitem" style={active_Style}>
                        {tb.name}
                        </a>
                      </li>
                    )
                  })
                }                             
              </ul>
              <span id="header-tabs-nav__indicator" className="c-tabs-nav__indicator" style={tabIndicator}></span>
            </nav>
            {this.state.path==='/learn'?<div id="primary-icon" className="toggle-theme"  onClick={OpenForm}>
              <Icons name={'send'} size={24}/>
            </div>:null}                      
            <div id="primary-icon" className="toggle-theme"  onClick={changetheme}>
              <svg viewBox="0 0 24 24" style={{pointerEvents: 'none', display: 'block', position: 'relative', width: '24px', height: '24px'}}>
                <g className="style-scope yt-icon">
                  <path d="M280.485281,201.514719 L284,198 L287.514719,201.514719 L292.485281,201.514719 L292.485281,206.485281 L296,210 L292.485281,213.514719 L292.485281,218.485281 L287.514719,218.485281 L284,222 L280.485281,218.485281 L275.514719,218.485281 L275.514719,213.514719 L272,210 L275.514719,206.485281 L275.514719,201.514719 L280.485281,201.514719 Z M283.726536,215.86375 C287.116026,215.86375 289.86375,213.251451 289.86375,210.029016 C289.86375,206.806581 287.116026,204.194281 283.726536,204.194281 C283.073662,204.194281 282.164855,204.396254 281.000116,204.800201 C282.532112,206.378393 283.29811,208.121331 283.29811,210.029016 C283.29811,211.9367 282.444938,213.635948 280.738594,215.126758 C282.007413,215.618086 283.003393,215.86375 283.726536,215.86375 Z" transform="translate(-272, -198)" className="style-scope yt-icon"></path>
                </g>
              </svg>
            </div>
          </header>
          </div>
        );
     
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    sections: state.common.sections,
    screen_size: state.common.screen_size,
    path: state.common.path,
  };
}
function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);





