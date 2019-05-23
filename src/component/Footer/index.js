import React, { Component } from 'react';
import './style.css';




export default class Footer extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,      
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
  
  }

  render() {      
      return (
        <div>
          <div className="footer_conatiner">
            <div  className="footer_menu">
              <div className="info">
                apply@codelouisville.org             
              </div>
              <div className="info">
                Phone: (502) 569-0391              
              </div>
              <div className="info">
                © 2019 KentuckianaWorks. 
              </div>
            </div>
          </div>
        </div>
      ) 
  }
}
















