import React, { useEffect, useState, useContext, useRef } from 'react';
import { Appcontext2 } from '../App';
import pdp from '../assets/pdp.png';
import { Navbar3 } from '../components/Navbar3';
import img from '../assets/footer.svg';
import upload from '../assets/upload.png';
import AuthContext from '../context/AuthContext'

export const ChangePictr = () => {
  const { isConnected } = useContext(AuthContext);
  const [ref, setRef] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [user, setuser] = useState({
    FullName: '',
    username: '',
    
    photo: '',
    
    email:'',
      password:'',
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const token=localStorage.getItem("access")
      let token2 = token.replace(/"/g, '');
        const response = await fetch("http://127.0.0.1:8000/settings/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token2}`,
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setuser(userData);
          
          setIsEditMode(true); // Enable edit mode since you have fetched existing user data
          console.log(userData)
        } else {
          // Handle error
          console.error("Error fetching user data");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);


  const handleOffset = (data) => {
    setRef(data);
    console.log('Ref immediately after setRef:', ref);
    console.log('Data:', data);
  };

  useEffect(() => {}, [isConnected]);

  useEffect(() => {
    // Effect to handle scrolling
    const handleScroll = () => {
      const offset = window.scrollY;
      if (ref) {
        setIsSticky(offset > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  const [saveMessage, setSaveMessage] = useState('');

  const handleSaveChanges = async() => {
    if (user.img !== pdp) {
        const formData = new FormData();
        
        formData.append('email', user.email);
        formData.append('username', user.username);
        formData.append('password', user.password || '');  // Password can be empty if not changed
        formData.append('FullName', user.FullName);
        console.log("ablus")
        if (photoChanged){
          
          formData.append('photo', user.photo);  // Append the actual file
        
        }
        
        
        
        const token = localStorage.getItem('access');
        let token2 = token.replace(/"/g, '');
    
        const response = await fetch("http://127.0.0.1:8000/settings/", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token2}`,
          },
          body: formData,
        });
    

      setSaveMessage('Your changes have been saved!');
    } else {
      setSaveMessage('No changes made');
    }
  };
  const [imgUrl,setimgUrl]=useState('')
  const [photoChanged,setphotoChanged]=useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
      const reader = new FileReader();
      reader.onload = () => {
        setuser((prevuser) => ({
          ...prevuser,
          photo: file, // Store the actual file, not the data URL
        }));
      };
      setimgUrl(`http://127.0.0.1:8000/profile_pictures/profile_pictures/${file.name}`)
      setphotoChanged(true)
    
      reader.readAsDataURL(file);
      console.log(file)
    }
  

  return (
    <div className='w-full h-screen flex flex-col'>
      <Navbar3 func={handleOffset} connected={true} sticky={true} />

      <h1 className='px-4 sm:px-10 mt-28 font-semibold text-2xl text-blue-950 mb-8'>
        Settings
      </h1>
      <div className='px-4 sm:px-10'>
        <hr className='border-2 mb-14 border-blue-950'></hr>
      </div>
      <div className='px-4 sm:px-10 items-center justify-center w-full  flex-col sm:items-start sm:hidden flex '>
        <h1 className='text-settings-col sm:text-4xl text-3xl mb-6'>
          Change Profile Picture
        </h1>
        <img src={user.img} alt={user.title} className='h-36 w-36 rounded-full mb-8' />
        <div
          className='bg-page-col px-4 cursor-pointer mb-8 flex flex-row rounded-[4px]  focus:cyan-500 font-medium w-full items-center h-12 sm:h-16'
          onClick={handleButtonClick}
        >
          <span className='text-settings-col text-lg sm:text-xl opacity-50'>Upload your picture </span>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <img className='absolute end-8 sm:end-14 opacity-50' src={upload} alt='Upload' />
        </div> 
        </div>


        <div className='px-4 sm:px-10 items-center space-x-10 justify-star w-full  flex-row  hidden sm:flex '>
          <div className='flex flex-col w-full'>
        <h1 className='text-settings-col sm:text-4xl text-3xl mb-6'>
          Change Profile Picture
        </h1>
       
        <div
          className='bg-page-col px-4 cursor-pointer mb-8 flex flex-row rounded-[4px]  focus:cyan-500 font-medium w-full items-center h-12 sm:h-16 '
          onClick={handleButtonClick}
        >
          <span className='text-settings-col text-lg sm:text-xl'>Upload your picture </span>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <img className='absolute sm:end-64' src={upload} alt='Upload' />
        </div>
        </div>
         <img src={imgUrl ? imgUrl : `http://127.0.0.1:8000${user.photo}`} alt={user.title} className='h-36 w-36 rounded-full mb-8' /> 
        </div>

        <div className='px-4 sm:px-10 '>
        <button
      className='justify-center   items-center  w-full h-12 sm:h-16 bg-search-col text-item-col rounded-[4px] hover:bg-item-col hover:text-sidebar'
      onClick={handleSaveChanges}
    >
      Save
    </button>

    {saveMessage && (
  <div
    className={`${
      saveMessage === 'Your changes have been saved!'
        ? 'text-person-col'
        : 'text-red-500'
    } mt-1 text-sm font-light`}
  >
    {saveMessage}
  </div>
)}
     
    </div>  

      <footer className='h-[70px] w-full absolute bottom-0'>
        <img src={img} alt='footer' />
      </footer>
    </div>
  );
};
