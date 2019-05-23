import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import './style.css';



class WeekDayPicker extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      data :{}, 
      list:['s','m','t','w','t','f','s'],
      days:["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"]      
    };
  }
  componentDidMount() {      
    
  }  
  
  componentWillMount(){
    const _th = this;
    const {forms,form,field} = _th.props;    
    var i = forms[form]?forms[form][field]:{}; 
    i && _th.setState({data:i});   
    this.handleSetItem = this.handleSetItem.bind(this)
  }


  handleSetItem(k,v){   
    const {data,days} = this.state;  
    var d = data;
    const {form,field} = this.props;
    if(v){
      d[days[k]]=true;
    }else{
      delete d[days[k]]
    }
    this.setState({data:d});
    this.props.actions.UpdateForm(form,field,d);
  }

  render() {
     const {list} = this.state;
      return (                         
              <div className={`day--week-picker`}>
              <div className={`title`}> {`Which day(s) are you available to mentor?`} </div>
                <div className="day--week-picker-header">
                {list.map((dw,i)=>{                 
                  var act = this.state.data[this.state.days[i]];                  
                  return(<WeekDay title={dw} key={`${dw}--${i}`} setDay={this.handleSetItem.bind(this)} index={i} init={act}/>)
                })}
                                  
                </div>
              </div>
      ) 
  }
}


function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekDayPicker);




class WeekDay extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false         
    };
  }
  componentDidMount() {  
    this.handleDay = this.handleDay.bind(this);
    this.props.init && this.setState({active:this.props.init});
  }  
  
  componentWillMount(){
    this.handleDay = this.handleDay.bind(this)
  }

  handleDay(){
    const {active} = this.state;    
    const {index} = this.props;
    if(typeof this.props.setDay === "function"){
      this.props.setDay(index,!active);
      this.setState({active:!active});
    }
    
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() { 
     const {title} = this.props;
     const {active} = this.state;
      return (  
            <div className={`DayWk ${active?"selected":""} `} onClick={()=>{this.handleDay()}}>
                <div className="active">{title}</div>                               
                <div className="default">{title}</div> 
            </div>
      ) 
  }
}