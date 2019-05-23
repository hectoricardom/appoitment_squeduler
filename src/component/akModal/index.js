import React, { Component } from 'react';
import * as Util from '../../state/Util';
import './style.css';




export default class AKModal extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      height:0,
      orientation:false
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    this.Open = this.Open.bind(this);
    this.Close = this.Close.bind(this);
  }



  Open(){    
    var _th6 = this;    
    _th6.setState({visible:true});     
    setTimeout(()=>{  
        _th6.setState({display:true});
        //Util.disableScroll()
        Util.bodyOverflow(true);  
      },25)    
  }

  Close(e){
    var _th6 = this;      
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false});
        //Util.enableScroll()
        Util.bodyOverflow(false);     
    },25)
  }
  


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { children,overlay, orientation } = this.props;
    var sty = {} //{marginTop: `3000px`}
    var classN =  `ak-modal ak-modal--exit`;  
    if(this.state.visible){
        classN =  `ak-modal ak-modal--enter ak-modal--enabled ak-modal--visible`;
        sty = {}
    } 
      return (
        <div className={classN} style={sty} >
         {this.state.visible? 
          <div>
            <div className="ak-modal-x-bx">
              <div className="flexSpace"/>
              <div className="ak-modal-x" aria-label="Close" onClick={this.Close.bind(this)}  role="button">
              <span>X</span>
              </div>              
            </div>                      
            <div className="ak-modal-content ak-modal-mask" >          
              {children}
            </div>
          </div>
          :null} 
        </div>
      ) 
  }
}
