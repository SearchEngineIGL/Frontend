// Content component (content.js)
import React, { Fragment, useState ,useContext,useEffect} from "react";
import LinkAdded from "../components/LinkAdded";
import Popup from "../components/popupU";
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
import Wait from "../components/Wait";
import { toast } from "react-toastify";
function Content() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [LinksUploaded, setLinksUploaded] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  
 
  
  const handleChange = (event) => {
    setNewLink(event.target.value);
    console.log(newLink)
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      addLink();
    }
  };

  const addLink = async() => {
    if (!newLink) return;
    const link = {
      id: LinksUploaded.length === 0 ? 1 : LinksUploaded.length + 1,
      link: newLink,
    };
    setLinksUploaded([...LinksUploaded, link]);
    try {
      const formData = new FormData();
      formData.append('link', newLink);
      console.log(newLink)
      const token=localStorage.getItem("access")
      let token2 = token.replace(/"/g, '');
      setIsUploading(true)
      const response = await fetch("http://127.0.0.1:8000/manage/articles/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token2}`,
          
        },
        body: formData
      });
      console.log(response.status)
      if (response.status===200) {
        setIsUploading(false)
        setShowPopup(true);
        // You may also update the local state or perform any other actions
      } else {
        setIsUploading(false)
        // Handle error
        const errorText = await response.text();
        toast.error("There was an issue.Please, try again .")
      }
    } catch (error) {
      setIsUploading(false)
      toast.error("There was an issue.Please, try again .")
    }
  };
    
    
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [showpopup, setShowpopup]=useState(false);

  return (
    <div className='admin flex flex-row w-screen h-[100vh] bg-page-col '>
      <Sidebar />

      <div className="flex flex-auto flex-col relative ml-[5%] mt-8 mr-[5%]">

      <h1 className="text-person-col text-5xl">Upload Articles</h1>

      <div className="bg-sidebar mt-10 h-52 rounded-md shadow p-9 pt-12">
        <h3 className=" text-[25px] text-person-col mb-4">Paste here your articles URL</h3>
        <div className="AddArticle w-[100%]">
          <input
            className="bg-page-col text-item-col h-11 w-[100%] rounded-md pl-3 outline-none"
            placeholder="Articles URL"
            onChange={handleChange}
            onKeyUp={handleEnterKey}
          />
            
        </div>
      </div>
      
      <div className="flex flex-auto flex-col place-items-end" >
      
      <button

className="absolute right-0  bottom-20 w-[110px]  box-border xs:h-[38px] h-[30px] text-[13px] sm:text-[15px] font-medium sm:font-bold  text-sidebar  bg-person-col font-['TT Commons'] sm:px-4 px-2 sm:rounded-[5px] rounded-[3px]"
      
        onClick={addLink} 
      >
        Upload
      </button>
      </div>
      <Popup visible={showPopup} onClose={() => setShowPopup(false)} />
  
      {isUploading && < Wait />}
    </div>
    </div>
  );
}

export default Content;

/**
 * {LinksUploaded.length > 0 && (
        <div className="List">
          {LinksUploaded.map((Link) => (
            <LinkAdded key={Link.id} link={Link.link} />
          ))}
        </div>
      )}
 */