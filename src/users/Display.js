import React, { useContext, useEffect, useState } from 'react'
import GithubContext from '../context/github/githubContext'

import axios from "axios";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

function Display() {
  const cancelTokenSource = axios.CancelToken.source();

  const githubContext = useContext(GithubContext);
  const { loading, users, user, image } = githubContext;
  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (user.length > 0 && allImages.length<=0) {
      console.log(user.length);
      console.log(allImages);
      let users = [];
      let promises = [];

      for (let i = 0; i < user.length; i++) {
        promises.push(
          axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${user[i]}`, {
            cancelToken: cancelTokenSource.token
          }).then(response => {
            // do something with response
            let obj = { src: response.data.primaryImage }
            setAllImages(prevState => [...prevState, obj]);
          })
        )
        console.log("here");
      }

      Promise.allSettled(promises).then(() => { console.log("done") });
    }
    return () => {
      // Anything in here is fired on component unmount.
      cancelTokenSource.cancel();
  }
  }, [user])
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };
  return (
    <div>
      {githubContext.department}
      <div className='carousel-container'>
        <Carousel images={allImages} />
      </div>
    </div>
  )
}

export default Display
