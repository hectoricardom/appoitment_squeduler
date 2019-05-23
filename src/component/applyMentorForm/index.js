import React, { Component } from 'react';
import InputText from '../InputText';
import AKDropDown from '../dropDownBox';
import WeekDayPicker from '../weekDayPicker';
import * as Util from '../../state/Util';
import './style.css';




export default class ApplyMentorForm extends Component {
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
    var track_list = ["Front-End",".NET","Android","Full-stack Javascript","iOS (Swift)","Java","PHP","Python","Ruby"]
    const {dark} = this.props; 
      return (
          <div className={`mntGFkZElucHV0`}>
            <div className="tab-label-title"><span>Become a mentor</span></div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'mentor'} field={`name`}  placeholder={'Name'} dark={dark}/>
              </div>              
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'mentor'} field={`email`} email={true} placeholder={'Email'} dark={dark}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <AKDropDown icon={'success'} form={'mentor'} field={`track `} list={track_list} title={'Which track would you like to mentor?'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <WeekDayPicker form={'mentor'} field={`days `}/>
              </div>
              
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'mentor'} field={`developer`}  placeholder={'How long have you been a developer?'} dark={dark}/>
              </div>  
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'mentor'} field={`employer`}  placeholder={'Current employer?'} dark={dark}/>
              </div> 

              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'mentor'} field={`question`}  placeholder={'Do you have any questions for us?'} dark={dark}/>
              </div>                     
          </div>
      ) 
  }
}
