import React, { useEffect, useRef, useState } from 'react'
import "./Category.css"
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import DiamondIcon from '@mui/icons-material/Diamond';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookIcon from '@mui/icons-material/Book';
import InterestsIcon from '@mui/icons-material/Interests';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import FactoryIcon from '@mui/icons-material/Factory';
import HistoryIcon from '@mui/icons-material/History';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from 'react-router-dom';
let ITEM_WIDTH=250;

function Category({onCategoryChange}) {
    const [scrollPosition,setScrollPosition]=useState(0);
    const containerRef=useRef();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
};
  
    
      

    const handleScroll=(scrollAmount)=>{
        let newScrollPosition=scrollPosition+scrollAmount;
        setScrollPosition(newScrollPosition);
        containerRef.current.scrollLeft =newScrollPosition;
    }
    const categories = [
        { name: 'All', displayName: 'Home', icon: <LanguageIcon /> },
        { name: 'Travel', displayName: 'Travel', icon: <ConnectingAirportsIcon /> },
        { name: 'Fashion', displayName: 'Fashion', icon: <DiamondIcon /> },
        { name: 'Health', displayName: 'Health', icon: <HealthAndSafetyIcon /> },
        { name: 'Education', displayName: 'Education', icon: <BookIcon /> },
        { name: 'Tech', displayName: 'Tech', icon: <PrecisionManufacturingIcon /> },
        { name: 'Art', displayName: 'Art', icon: <ColorLensIcon /> },
        { name: 'Agriculture', displayName: 'Agriculture', icon: <AgricultureIcon /> },
        { name: 'Industry', displayName: 'Industry', icon: <FactoryIcon /> },
        { name: 'Society', displayName: 'Society', icon: <InterestsIcon /> },
        { name: 'Marketing', displayName: 'Marketing', icon: <ShowChartIcon /> },
        { name: 'History', displayName: 'History', icon: <HistoryIcon /> },
        { name: 'Quotes', displayName: 'Quotes', icon: <FormatQuoteIcon /> },
        { name: 'Others', displayName: 'Others', icon: <OtherHousesIcon /> },
    ];
    return (
        <>
        <div className='filters' >
        <button className="btn" onClick={()=>{handleScroll(-ITEM_WIDTH)}}> <ArrowLeftIcon /></button>
        <div className='categories2' ref={containerRef}>
            {categories.map((category) => (
                <div
                key={category.name}
                className={`filter ${selectedCategory === category.name ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category.name)} 
                >
                {category.icon}
                <a className='cname' >{category.displayName}</a>
                </div>
            ))}
                </div>
        
        <button className='btn' onClick={()=>{handleScroll(ITEM_WIDTH)}}><ArrowRightIcon/></button>
        </div>
        
        </>
    )
}

export default Category
