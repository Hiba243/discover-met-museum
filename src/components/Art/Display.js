import React, { useContext, useEffect, useState } from 'react'
import ArtContext from '../../context/metart/artContext';

import axios from "axios";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

function Display() {
  const cancelTokenSource = axios.CancelToken.source();
  const artContext = useContext(ArtContext);
  const { objectID } = artContext;
  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (objectID.length > 0 && allImages.length <= 0) {
      let promises = [];
      for (let i = 0; i < objectID.length; i++) {
        promises.push(
          axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID[i]}`, {
            cancelToken: cancelTokenSource.token
          }).then(response => {
            // do something with response
            let obj = { src: response.data.primaryImage }
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
  }, [objectID])
  return (
    <div>
      {artContext.department}
      <div className='carousel-container'>
        <Carousel images={allImages} />
      </div>
    </div>
  )
}

export default Display
