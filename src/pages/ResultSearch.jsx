/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { Article } from '../components/Article';
import { Appcontext2 } from '../App';
import pdp from '../assets/pdp.png'
import { Navbar3 } from '../components/Navbar3';
import Filter from '../components/Filter';
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

export const ResultSearch =()=>
{
  const navigate = useNavigate();
const {isConnected} = useContext(AuthContext)
const [ref,setRef]=useState(null);
const [search,setSearch]=useState('');
const [isSticky, setIsSticky] = useState(false);
const [isFilterVisible, setIsFilterVisible] = useState(false);
const { query } = useParams();
const [filteredData, setFilteredData] = useState(null);
const [articles, setArticles] = useState([]);
const truncateText = (text, limit) => {
  const words = text.split(' ');
  const truncatedText = words.slice(0, limit).join(' ')+ '...';
  return truncatedText;
};


const handleFilterClick = () => {
  setIsFilterVisible(!isFilterVisible);
};
const handleFilterChange = (filterValues) => {

  console.log('Filtered Values:', filterValues);
  setFilteredData(filterValues);
  handleSearch({ key: "Enter" });
  
};

const handleSearch=async(e)=>
      {
        if (e.key === "Enter") {
          setSearch(query);
      try {
        const token=localStorage.getItem("access")
        let token2 = token.replace(/"/g, '');
          const response = await fetch(`http://127.0.0.1:8000/search/query=${query}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token2}`,
              "Content-Type": "application/json",
            },body: JSON.stringify(filteredData),
          });
        const data = await response.json();
        console.log("____________________________________")
        console.log(filteredData)
        //setSearchResults(data.results); // Update results based on your API response
        const truncatedArticles = data.map(article => ({
          ...article,
          content: truncateText(article.content, 50),
        }));
  
        setArticles(truncatedArticles);
        console.log(articles)
        navigate(`/ResultSearch/${encodeURIComponent(search)}`);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }}
      }
useEffect(() => {
  setSearch(query);
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("access");
      const token2 = token.replace(/"/g, '');

      const response = await fetch(`http://127.0.0.1:8000/search/query=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token2}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const truncatedArticles = data.map(article => ({
        ...article,
        content: truncateText(article.content, 50),
      }));

      setArticles(truncatedArticles);
      console.log(articles)
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  fetchArticles();
}, [query]);

const handleOffset = (data) => {
      setRef(data);
      console.log('Ref immediately after setRef:', ref); 
    
      console.log('Data:', data);
    };
    useEffect(()=>
    {

    },[isConnected])
     useEffect(() => {
      }, [ref]);
     
      useEffect(() => {
        const handleScroll = () => {
          const offset = window.scrollY;
          console.log(ref);
          console.log(isSticky);
          if(ref)
          {
               setIsSticky(offset > window.innerHeight);

          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [ref]);
      
      const handleChange=(e)=>
      {
          setSearch(e.target.value); 
      }
    return (
    <div  className='w-full h-screen flex flex-col'>
    <Navbar3 func={handleOffset} connected={true} sticky={true}/>
    <div className='flex flex-row space-x-[15%] mt-28  px-10'>
        <div className='w-[78%] h-7 bg-search-col relative'>
          <input value={search} onKeyUp={handleSearch} 
        onChange={(e) => setSearch(e.target.value)}
            className="block w-full xs:h-[38px] h-[30px] p-3 text-sm text-sky-950 border-[3px] text-[15px] rounded-[4px] bg-slate-200 focus:cyan-500 font-medium outline-none placeholder:text-sky-900"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 end-3 flex items-center ps-10 pointer-events-none">
            <svg
              className="w-3 h-3 text-sky-950 mt-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={handleFilterClick}
          className={`sm:w-[110px] w-fit box-border xs:h-[38px] h-[30px] text-white text-[13px] sm:text-[15px] font-medium sm:font-bold  ${
            isFilterVisible ? 'bg-filter-after' : 'bg-filter'
          } font-['TT Commons'] sm:px-4 px-2 sm:rounded-[5px] rounded-[3px]`}
        >
          Filter
        </button>
      </div>
      {isFilterVisible && <Filter onFilterChange={handleFilterChange} onkey={handleSearch}/>}
  
    <h1 className='px-4 sm:px-10 mt-8 font-semibold text-2xl text-blue-950 mb-8'>
    Result
    </h1>
    <div className='px-4 sm:px-10'>
   <hr className='border-2 mb-10 border-blue-950'></hr>
    </div> 
  
    <div className='grid gap-y-12'>
        {articles.map((article, index) => (
          <React.Fragment key={index}>
            <Article date={article.date} article_id={article.article_id} title={article.title} content={article.content} keywords={article.keywords}/>
            <div className='px-4 sm:px-10'>
              <hr className='border-2 border-blue-950'></hr>
            </div>
          </React.Fragment>
        ))}
      </div>
    <div className='h-[70px]'>

    </div>
    
    
  
    </div>)
}
