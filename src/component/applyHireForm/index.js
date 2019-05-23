import React, { Component } from 'react';
import InputText from '../InputText';
import AKDropDown from '../dropDownBox';
import * as Util from '../../state/Util';
import './style.css';




export default class ApplyHireForm extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false        
    };
  }
  componentDidMount() {  
  
  }  
  componentWillUnmount(){
    
  }

 

  ref = r => {
    this.MS_Elem = r
  }
  render() {
    var involv_list = ["Looking for talent","Willing to provide mentors","Willing to host in employer space","Willing to sponsor events"]
    const {dark} = this.props;
      return (
          <div className={`hirecGFkZElucHV0`}>
            <div className="tab-label-title"><span>Learn more</span></div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'hire'} field={`name`}  placeholder={'Name'} dark={dark}/>
              </div>              
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'hire'} field={`email`} email={true} placeholder={'Email'} dark={dark}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'hire'} field={`organization`}  placeholder={'Organization'} dark={dark}/>
              </div> 
              <div className={Util.getClassCode('paddInput')}>            
                <AKDropDown icon={`success`} form={'hire'} field={`involvement`} list={involv_list} title={'Involvement'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'hire'} field={`Message`}  placeholder={'Message?'} dark={dark}/>
              </div>                            
          </div>
      ) 
  }
}
