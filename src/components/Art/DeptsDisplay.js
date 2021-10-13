import React, { useContext, useEffect, useState } from 'react'
import DeptCategory from './DeptCategory'
import { Spinner } from '../layout/Spinner'
import ArtContext from '../../context/metart/artContext'
import Navbar from '../layout/Navbar'
import axios from "axios";

const DeptsDisplay = () => {
  const artContext = useContext(ArtContext);
  const { loading, departments } = artContext;
  const [info,setInfo]=useState([]);
  useEffect(() => {
    if (!loading) {
      if( JSON.parse(localStorage.getItem('deptInfo'))){
        setInfo(JSON.parse(localStorage.getItem('deptInfo')));
      }
      else{
      artContext.searchAllDepartments();
      setInfo(departments);
    }
    }
  }, [])
  
  if (loading) return <Spinner />
  else
    return (
      <div className="home">
        <Navbar/>
      <div className="deptFlex">
        <h1 className="landing-page-heading">Discover the Metropolitan Museum of New York</h1>
        <div className="deptColFlex">
        {info.map(object => (
          <DeptCategory key={object.departmentId} obj={object}></DeptCategory>
        ))}
        </div>
      </div>
      </div>
      
    )
}

export default DeptsDisplay
