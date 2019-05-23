import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import './style.css';



class ApplyContainer extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false, 
      agree :false,
      tab_visible :false,    
    };
  }
  componentDidMount() {  
    const _th = this;
    const {forms,form,field} = this.props;
    setTimeout(()=>{
      _th.setState({active:true});      
      setTimeout(()=>{
        var i = forms[form]?forms[form][field]:null;      
        i && _th.setState({agree:i});
      },150);
    },250);

  }  
  componentWillUnmount(){
    
  }




  OpenTabView(){
    const {agree,tab_visible} = this.state;
    agree===false && this.setState({tab_visible:!tab_visible});
  }


  handleAgreed(){
    const {agree} = this.state;
    const {form,field} = this.props;
    agree===false && this.setState({agree:!this.state.agree});
    agree===false && this.props.actions.UpdateForm(form,field,true);
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() { 
    


    const {title,name,description} = this.props;
    var titelSty = {}
    var backSty = {}      
    return (
            <div style={backSty} className={`mqn2-al0  ${this.state.active?"active":""} ${this.state.agree===false?this.state.tab_visible?'mqn2-bdv':'':'mqn2-bdr'}`}>
              <div className="title--wrapper" mqn-inview-fade-in="">
                <span className="title" style={titelSty}>
                  {title}                    
                </span>
              </div>              
                <div className={`mqn2-bdq mqn2-be2`}>
                <div className="mqn2-bds" onClick={this.OpenTabView.bind(this)}>
                  <div className="mqn2-bdt">      
                    <div className="material-icons"><Icons name={'ckeck-circle'} className="material-icons" color={'#4285f4'} size={24}/></div>                               
                    <div className="mqn2-bdu">1</div>
                  </div>
                  <div className="mqn2-bdz">
                    <span>{name}</span>                  
                  </div>
                  <div className="mqn2-bdx">
                    <div className="material-icons"><Icons name={'arrow_right'} className="material-icons" color={'#7e7e7e'} size={24}/></div>
                  </div>
                </div>
                <div className="mqn2-bdw">                
                  <div className="info--wrapper" mqn-inview-fade-in="">
                    <div className="overflow--wrapp-info">
                      <span className="info">
                      {description}
                      </span>
                    </div>                  
                    <div className="">
                      <div className="mqn2-b2k mqn2-b2m">
                        <span onClick={this.handleAgreed.bind(this)}>agree</span>
                      </div>
                    </div>  
                  </div>                               
                </div>
              </div>
              <div className={`scndFrom`}>
              {this.state.agree?
              <div className={`mqn2-Form--brd mqn2-be2 `}>     
                <div className={`mqn2-fa3l`}>           
                  {this.props.children}   
                </div>
              </div>
              :null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplyContainer);

