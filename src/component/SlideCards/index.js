

import React, { Component } from 'react';
import './style.css';


export default class SlideCards extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      matrix:0,
      last_index:1,
      next_index:1,
      index:0
    };
  }



  componentWillMount(){  
    this.updSlide = this.updSlide.bind(this)
  }

  componentDidMount(){  
   
  }

 
  updSlide(i){   
    var _th = this;    
    if(i!==_th.state.index){
      var tr = _th.state.index-i>0?980:-980;
      _th.setState({matrix:tr,next_index:i})
      setTimeout(()=>{
        var nI = i+1<_th.props.data.length?i+1:0;
        var lnI = _th.state.next_index;
        _th.setState({index:i,next_index:nI,matrix:0,last_index:lnI})
      },100);
    }    
  }

  ref = r => {
    this.SM = r
  }
  

  render() {     
    var _th = this;   
    var hh = _th.props.h || 200;
    var slides_container = {overflow: 'hidden', position: 'relative', padding: '25px 0', height: `${hh}px`}
    var slides_control = {position: 'relative', transform: `matrix(1, 0, 0, 1, 0, 0)`}
    const {next_index, index, matrix} = _th.state;
    const {updSlide} = _th;
    return (
        <section section-id="cHJvZ3JhbSBzdHJ1Y3R1cmU=" style={{marginTop:'60px'}} className="section_slider-cards">  
          <div className="intro-label-title tablet--10-12 --auto--margin tablet--auto--margin">
              <h2 >{_th.props.title}</h2>              
          </div> 
          <div className="slides-container" style={slides_container}>
            <div className="slides-control" style={slides_control}>
            {_th.props.data.map((sl,i)=>{
              var classN = `tabs-tab`
              var sliderStyle = {display: 'none', zIndex: 0,  visibility: 'hidden', opacity: 0, transform: 'matrix(1, 0, 0, 1, 0, 0)'};
              if(0===i){
                classN += ` tabs-tab-first`             
              } 
              if(index===i){
                sliderStyle = {display: 'block', zIndex: 10, visibility: 'inherit', opacity: 1, transform: `matrix(1, 0, 0, 1, ${matrix}, 0)`};  
                classN += ` tab-is-active`             
              }
              if(next_index===i){
                sliderStyle = {display: 'block', zIndex: 0, visibility: 'hidden', opacity: 1, transform: `matrix(1, 0, 0, 1, ${matrix*-1}, 0)`};
              }
              return(
                  <div key={i} className={classN} data-card-index={`${i}`} style={sliderStyle}>
                  {index===i?
                    <div className="tabs-label js-tab-text">
                      {sl.img?
                      <div>
                        <img src={sl.img} alt="" width="300px"/>
                      </div>
                      :null}
                      <div className="tab-label-title"><span >{sl.title}</span></div>
                      {sl.description?sl.description.map((des,ix)=>{
                        return(
                            <span key={ix} className="tabs-label-caption">{des}</span>
                        )
                      }):null}                      
                    </div>:null}
                  </div>
                )
            })}
            </div>
            </div>
            <ul className="slides-pagination" style={{zIndex: 100}}>
              {_th.props.data.map((sl,i)=>{
                var classN = index===i?"slides-pagination-item active":"slides-pagination-item";                
                return(
                  <li  key={i} className={classN}>
                    <a className="slides-pagination-link" data-slides-pagination-item={`${i}`} onClick={()=>updSlide(i)}></a>
                  </li>
                )
              })}
            </ul>
            <div style={{height:'100px'}}>             
            </div>
          </section>
      );
     
  }  
}



