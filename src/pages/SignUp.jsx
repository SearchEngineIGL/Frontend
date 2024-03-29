/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
import { useState ,useContext} from 'react';
import logo from '../assets/LOGO2.png';
import AuthContext from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp =(props)=> {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {registerUser} = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [signUp,setSignUp]=useState(false);
  const handleSetEmail = (value) => {
    console.log(email)
    setEmail(value);
  };
  const handelSetUsername=(value)=>{
    
    setUsername(value);

  }
const handleSetPassword=(value)=>
{
  setPassword(value);
}
const handleSubmit=()=>
{
  console.log(email);
  console.log(username);
  console.log(password);
  registerUser(email, username, password)
  

}
const handleForget=()=>
{

}
// eslint-disable-next-line no-unused-vars
const handleLogin=()=>
{
}
  return (
    <div className=" flex flex-col-reverse  app md:flex-row min-h-full
    w-full items-center 
    justify-around gap-y-0">
        <div className=' flex flex-col sm:items-end justify-center gap-y-7  '>
<p className="lg:w-[450px]  mx-auto text-left w-full text-violet-100 sm:text-[50px] text-[40px] font-bold font-['TT Commons'] ">
       Sign up   
            </p> 
        
        <Input 
          setValue={handelSetUsername}
            placeholder="Username"
            name="username"
          />
        
          <Input 
          setValue={handleSetEmail}
            placeholder="Email"
            name="email"
          />
          
          <Input 
            setValue={handleSetPassword}
            placeholder="Password"
            type="password"
          />
    
   
         <button onClick={handleSubmit} className="lg:w-[450px] h-[50px] sm:h-[70px]    bg-cyan-300 rounded-[10px] flex justify-center md:w-[300px] mx-auto items-center
          text-cyan-950 text-[23px] font-bold font-['TT Commons'] 
          sm:w-[300px]
          w-[258.4px] sm:px-4 box-content" >
            <p>
              Sign up
            
            </p> 
          </button>
          
          <p className='text-violet-100 lg:w-[450px] 
          mx-auto sm:text-xl text-[14px] text-center'>
           <p className='md:inline mr-3'>
         Already have an account ?  
            </p> 
          <button onClick={handleLogin} className="text-cyan-300 sm:text-xl font-semibold  text-[14px] text-right hover:underline font-['TT Commons']">
          <Link to="/Login"> Log In</Link>

        
          </button>   
            </p> 
         
</div>
   <img className=' lg:w-[430px] w-[250px] sm:w-[280px] md:w-[360px]' src={logo} />
        </div> 
   
        
  );
}

