import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import InputText from '../InputText';
import AKDropDown from '../dropDownBox';
import * as Util from '../../state/Util';
import './style.css';




export default class ApplyForm extends Component {
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
    var race_list = ["American Indian / Alaskan Native","Asian","Black","White","Native Hawaiian or Other Pacific Islander","I do not choose to identify"]
    var genre_list = ["Male","Female"]
    var spanic_list = ["yes","No","Unknow"]
    var citizen_list = ["U.S. Citizen","Non-Citizen Eligible for Work","Non-Citizen Ineligible for Work"]
      return (
          <div className={`c`}>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`firstName`}  placeholder={'First Name'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`lastName`}  placeholder={'Last Name'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`email`} email={true} placeholder={'Email'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`ssn`} ssn={true} number={true} placeholder={'SSN'}/>
              </div> 
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`phone`} phone={true} number={true} placeholder={'Phone'}/>
              </div>      
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`dob`} date={true} placeholder={'Birth date'}/>
              </div>  
              <div className={Util.getClassCode('paddInput')}>            
                <InputText icon={`more_vert`} form={'learn'} field={`address`} address={true} placeholder={'Address'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <AKDropDown icon={`'ckeck-circle'`} form={'learn'} field={`genre`} list={genre_list} title={'What is your gender?'}/>
              </div> 
              <div className={Util.getClassCode('paddInput')}>            
                <AKDropDown icon={`'ckeck-circle'`} form={'learn'} field={`race`} list={race_list} title={'What is your race(s)?'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <AKDropDown icon={`'ckeck-circle'`} form={'learn'} field={`spanic`} list={spanic_list} title={'Are you Hispanic?'}/>
              </div>
              <div className={Util.getClassCode('paddInput')}>            
                <AKDropDown icon={`'ckeck-circle'`} form={'learn'} field={`citizenship`} list={citizen_list} title={'Citizenship?'}/>
              </div>                        
          </div>
      ) 
  }
}
