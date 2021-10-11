import React,{useContext,useEffect,useState} from 'react'
import GithubContext from '../context/github/githubContext'
import Slider from "react-slick";
import axios from "axios";

function Display() {
    const githubContext = useContext(GithubContext);
    const {loading,users,user,image}=githubContext;
    const [allImages,setAllImages]=useState([]);
    useEffect(()=>{
        if(user.length>0){
        let users = [];
        let promises = [];
        
        for (let i = 0; i < user.length; i++) {
        promises.push(
        axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${user[i]}`).then(response => {
      // do something with response
      users.push(response);
    })
  )
}

Promise.all(promises).then(() => {console.log(users); setAllImages(users)});
    }},[user])    
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
        {allImages.map(url=> (
            
         <div>
             <img src={url.data.primaryImage}/>
         </div>
))}  
        </div>
    )
}

export default Display
