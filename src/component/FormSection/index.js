

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import { NavLink} from 'react-router-dom';
import Icons from '../Icons/Icons';
import './style.css';

class TechnologiesSection extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      index:0
    };
  }



  componentWillMount(){  
    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.updSlide = this.updSlide.bind(this)
  }

  componentDidMount(){  
    
  }

  prevSlide(){  
    var i = 0;    
    if(0===this.state.index){
        i =  this.props.technology.length-1;
    }else{
        i = this.state.index-1;
    }
    this.setState({index:i})
  }
  
  nextSlide(){  
    var i = 0;
    if( this.props.technology.length-1===this.state.index){
        i = 0;
    }else{
        i = this.state.index+1;
    }
    this.setState({index:i})
  }

  updSlide(i){    
    this.setState({index:i})
  }

  ref = r => {
    this.SM = r
  }
  

  render() {        
      var sliderStyle = {height: 'auto', touchAction: 'pan-y', userSelect: 'none', WebkitUserDrag: 'none', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}
      const {updSlide,nextSlide,prevSlide} = this;
      const {technology} = this.props;
      return (
        <section section-id="Technologies" >        
              <div className="slider-technology"  is-in-viewport="false" style={{}}>
                <div className="controlContainer controlContainer__enabled" >
                    <button className="controlContainer__previous icon icon--svg icon--circle-outer"  onClick={prevSlide}>
                      <Icons name={'arrow_left'} color={'var(--colorText_)'} size={30}/>                        
                    </button>                          
                    <button className="controlContainer__next icon icon--svg icon--circle-outer" onClick={nextSlide}>
                      <Icons name={'arrow_right'} color={'var(--colorText_)'} size={30}/>                        
                    </button>
                </div>
                  <ul className="slider-technology--slides" style={{height: `575px`}}>    
                  { technology.map((sl,i)=>{
                      var cclass = `${sl.class} grid grid-flex o-container`,
                      active_class = ``,
                      active_style = {visibility: 'hidden',opacity:0};
                      if(this.state.index===i){
                        active_class = `active`;
                        active_style = {visibility: 'visible',opacity:1};
                      }
                      var path = { pathname: "/learn" }
                      return(
                        <li className={active_class} data-index={i} style={active_style}  key={i} >
                        {this.state.index===i? 
                          <div className={cclass}>
                            <div className="slider-technology--slide-text grid__item desktop--5-12  tablet--9-12  mobile--11-12 ">
                                <h2 className="alpha">{sl.title}</h2>
                                <p>{sl.description}</p>
                                <a className="btn btn--full btn--blue-o hero-carousel__cta" href={sl.link}>
                                  Apply        
                                </a>                                
                            </div>
                            <div className="grid__item desktop--5-12  tablet--11-12 --auto--margin ">
                                <img src={sl.img} alt=""/>
                            </div>
                          </div> :null}          
                        </li>
                      )
                    })
                  }       
                  </ul>
                  <ul className="slider-technology--controls u-from-desktop-is-hidden slider-technology--controls__enabled">
                  {  this.props.technology.map((sl,i)=>{
                      var active_class = ``;
                      this.state.index===i?active_class = `active`:active_class = ``;
                      return(
                        <li onClick={()=>updSlide(i)}  key={i} ><button sprite-index={i} className={active_class}></button></li>
                      )
                    })
                  }                      
                  </ul>                  
                </div>
          </section>
      );
     
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    technology: state.common.technology
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TechnologiesSection);
