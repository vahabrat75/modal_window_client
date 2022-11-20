import React from 'react'
import s from './DropDown.module.scss'


export default function DropDown (props) {


    const setOption = (item, flag) => {
        props.setDayOption(item);

        props.setFlag(!flag)
    }

    return (
        <div className={s.packageTypeContainer}>

             <div className = {s.editedPackageTypeContainer} onClick = {()=>{props.setFlag(!props.flag)}}>
                 <span className = {s.editedPackageType}>{props.selectedDayOption}</span>
                 <span className = {props.flag ? s.upArrow : s.downArrow}></span>
             </div>
             {
             props.flag
             ?
             <div className = {s.packageTypeListContainer}>

                 <ul className={s.packageTypeList}>
                      {
                      props.days.map((item, index) => {return(<li className={s.packageTypeItem} key= {index} onClick = {() => {setOption(item.value, props.flag)}}>{item.value}</li>)})

                      }
                 </ul>
             </div>
             :
             null
             }
        </div>
    )
}