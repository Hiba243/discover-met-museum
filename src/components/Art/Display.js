import React, { useContext, useEffect, useState } from 'react'
import ArtContext from '../../context/metart/artContext';
import Navbar from '../layout/Navbar';
import axios from "axios";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { Spinner } from '../layout/Spinner';

function Display() {
  const cancelTokenSource = axios.CancelToken.source();
  const artContext = useContext(ArtContext);
  var { objectID } = artContext;
  const [allImages, setAllImages] = useState([]);
  const [info,setInfo]=useState([]);
  const [deptname,setDeptName]=useState([]);
  useEffect(()=>{
    if( JSON.parse(localStorage.getItem('objId'))){
      setInfo(JSON.parse(localStorage.getItem('objId')));
    }
    if( JSON.parse(localStorage.getItem('deptName'))){
      setDeptName(JSON.parse(localStorage.getItem('deptName')));
    }
  },[]);
  useEffect(() => {
    var objIdLength=objectID.length
    if(objIdLength==0) { objectID=info;}
    if (objectID && objectID.length > 0 && allImages.length <= 0) {
      let promises = [];
      for (let i = 0; i < objectID.length; i++) {
        promises.push(
          axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID[i]}`, {
            cancelToken: cancelTokenSource.token
          }).then(response => {
            // do something with response
            let obj = { src: response.data.primaryImage, alt:response.data.title}
            setAllImages(prevState => [...prevState, obj]);
          })
        )
      }
      Promise.allSettled(promises).then(() => { console.log("done") });
    }
    return () => {
      // Anything in here is fired on component unmount.
      cancelTokenSource.cancel();
    }
  }, [info,objectID])
  useEffect(()=>{
    return () => {
    artContext.clearObjects();
    localStorage.removeItem('objId');
    localStorage.removeItem('deptName');
    }
  },[])
  if(!artContext.loading && objectID){
  return (
    <div className="bg-yellow">
      <Navbar style={{position:"relative !important"}}/>
      <h1 className="deptHeading">{artContext.department ? artContext.department : deptname}</h1>
      <p className='text-content'>Click on the maximize button on the top right corner of the image for a better experience.</p>
      <div className='carousel-container'>
        <Carousel images={allImages} autoPlayInterval={4000} hasCaptions="top" hasIndexBoard={false}  hasThumbnails={false} />
      </div>
    </div>
  )
  }
  else{
    return <Spinner/>
  }
}

export default Display
