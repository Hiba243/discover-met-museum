import React, { useContext, useEffect, useState } from 'react'
import DeptCategory from './DeptCategory'
import { Spinner } from '../layout/Spinner'
import ArtContext from '../../context/metart/artContext'

import axios from "axios";

const DeptsDisplay = () => {
  const artContext = useContext(ArtContext);
  const { loading, departments } = artContext;
  useEffect(() => {
    if (!loading) {
      artContext.searchAllDepartments();
    }
  }, [])
  
  if (loading) return <Spinner />
  else
    return (
      <div className="deptFlex">
        {departments.map(object => (
          <DeptCategory key={object.departmentId} obj={object}></DeptCategory>
        ))}
      </div>
    )
}

export default DeptsDisplay
