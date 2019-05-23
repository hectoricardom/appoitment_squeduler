

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import Icons from '../Icons/Icons';
import WithScroll from '../scroll-decorator';
import { NavLink} from 'react-router-dom';
import * as Util from '../../state/Util';
import { InputDate,SelectPopup} from '../CalendarComponent';
import './style.css';



var dataSlider = [
  {
    "title":"Learn",
    "description":"Are you ready to upgrade your career? Begin your journey with us!",
    "link":"https://codelouisville.org/learn",
    "img":"https://hectoricardom.github.io/img/developer.png",
    "class":""
  },
  {
    "title":"Mentors",
    "description":"Are you a software developer who wants to coach and mentor future developers? Join us!",
    "link":"https://codelouisville.org/mentor",
    "img":"https://hectoricardom.github.io/img/mentors.png",
    "class":""
  },
  {
    "title":"Be a Part of the Solution!",
    "description":"Looking for junior software talent? Check out our graduates!",
    "link":"https://codelouisville.org/learn/hire",
    "img":"https://hectoricardom.github.io/img/partners.png",
    "class":""
  }
]

class HRCards extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewport:false,
      widthList:[],
      index:0
    };
  }



  componentWillMount(){      
   
  }

  componentDidMount(){  
    
  }

  action(){
    var _th6 = this;
    if (typeof _th6.props._action === 'function') {     
      _th6.props._action();
    } 
  }


  render() {     
      const { _src, _title, _description, _color } = this.props;  
      var _st2={background: _color}  
      return ( 
        <a className="" mat-cell="4" onClick={this.action.bind(this)} style={{"cursor": "pointer"}}>
          <div className={`hrm-card`}>
            <div className="mat-card hrm-card-auth" style={_st2}>
              <img alt="" className="hrm-card-image" src={_src}/>
              <div className="hrm-card-header">
                <div className="hrm-card-title">{_title}</div>
                <div className="hrm-card-subtitle">{_description}</div>
              </div>
            </div>
          </div>
        </a>
      );
     
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    isMobile: state.common.isMobile,
  };
}

export default connect(mapStateToProps)(HRCards);

