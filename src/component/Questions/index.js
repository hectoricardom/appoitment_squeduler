

import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
import WithScroll from '../scroll-decorator';
import './style.css';


export default class Questions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      index:0
    };
  }



  componentWillMount(){      
    this.UpdateIndex = this.UpdateIndex.bind(this);  
  }

  componentDidMount(){  
    
  }
  UpdateIndex(ig){
    this.setState({index:ig});    
  }

  ref = r => {
    this.SM = r
  }

  ref_tab = r => {
    this.tabs = r
  }

  render() {
         
      var sty = {alignItems: `normal`};           
      return ( 
        <section section-id="cXVlc3Rpb25z"  className="questions section_faq"> 
          <div className="o-container">
            <div className="left_Section__intro section_faq_width tablet--10-12 --auto--margin tablet--auto--margin">
              <h2 className="text-large">Frequently Asked Questions</h2>              
            </div>
            <div className="c-tabs-content ">
              <div className="left_Section left_SectionTextMedia left_SectionTextMedias lSectionNoPadding center_Tabs_Section">
                  <div className="grid grid--middle u-grid--override center_Tab_Content_Slide faq_grid_width desktop--8-12 tablet--10-12 mobile--11-12 flexWrap --auto--margin" style={sty}>
                  { this.props.data.map((sl,i)=>{
                      var toRight = i%2===0?true : false;                      
                      return(
                        <ItemsFAQ description={sl.description} icon={sl.icon} color={sl.color} question={sl.question} Class={sl.class} toRight={toRight} key={i}/>
                      )
                    })
                  }                  
                  </div>
              </div>
            </div>
          </div>
        </section>
        );
     
  }  
}



class ItemsFAQ extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewport:false,
      index:0
    };
  }



  componentWillMount(){  
    this.scrollhandler = this.scrollhandler.bind(this);   
  }

  scrollhandler(i){
    if(!this.state.viewport){   
      if(Util.isInViewport(this.elm)){
        this.setState({viewport:true});
      }      
    }    
  }

  ref = r => {
    this.elm = r
  }

 
  render() {
      const {scrollhandler} = this;
      const { toRight, Class, description, icon, color, question} = this.props;
      var d =  toRight ? `fade-and-slide--right`: `fade-and-slide--left`; 
      if(this.state.viewport){
      return (         
        <div ref={this.ref} className={`tip__card ${Class} marginHeight fade-and-slide ${d}`} is-in-viewport={`${this.state.viewport}`}>
          
          <h3 className="tip__card-title">{question}</h3>
          <p className="tip__card-body">{description}</p>         
          <a href="https://codelouisville.org/learn#questions" className="tip__learn-more" draggable="false">Learn More<Icons name={icon} color={color} size={38}/>  </a>
            
        </div>
        );
      }else{
        return <div ref={this.ref} className={`tip__card_opacity`}><WithScroll scrollhandler={scrollhandler}/></div>
      }
     
  }  
}