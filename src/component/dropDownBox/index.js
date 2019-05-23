import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import './style.css';



class AKDropDown extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false, 
      agree :false,
      index:null,
      tab_visible :false,    
    };
  }
  componentDidMount() {  
    const _th = this;
    const {forms,form,field} = _th.props;    
    var i = forms[form]?forms[form][field]:null; 
    i && _th.setState({index:i});
    setTimeout(()=>{
      _th.setState({active:true});
    },250);
  }  
  
  componentWillUnmount(){
    
  }

  OpenTabView(){
    const {tab_visible} = this.state;
    this.setState({tab_visible:!tab_visible});
  }


  handleSetItem(i){
    const {tab_visible} = this.state;
    const {form,field} = this.props;
    this.setState({tab_visible:!tab_visible,index:i});
    this.props.actions.UpdateForm(form,field,i);
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() { 
     const {title,list} = this.props;
     const {index} = this.state;
      return (                         
              <div className={`drop-box-container mqn2-be2 ${this.state.active?"active":""} ${this.state.index?"selected":""} ${this.state.tab_visible?'dp-open':''}`}>
                <div className="drop-box-header" onClick={this.OpenTabView.bind(this)}>
                  <div className="leftIcon">      
                    <div className="material-icons"><Icons name={'success'} className="material-icons" color={'#4285f4'} size={24}/></div>                               
                    <div className="qty">{list.length}</div>
                  </div>
                  <div className="center-label">
                    <span>{index?index:title}</span>             
                  </div>
                  <div className="status-Icon">
                    <div className="material-icons"><Icons name={'arrow_right'} className="material-icons" color={'#7e7e7e'} size={24}/></div>
                  </div>
                </div>
                <div className="dp-open--box">
                  {list.map((s,i)=>{
                    return(
                      <div key={i} className="info--wrapper ak--dp--items" mqn-inview-fade-in=""  onClick={()=>this.handleSetItem(s)}>
                        <span className="info">  
                        {s}                    
                        </span>  
                      </div>     
                    )
                  })
                  }                         
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

export default connect(mapStateToProps, mapDispatchToProps)(AKDropDown);
