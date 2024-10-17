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

    const handleScroll=(scrollAmount)=>{
        let newScrollPosition=scrollPosition+scrollAmount;
        setScrollPosition(newScrollPosition);
        containerRef.current.scrollLeft =newScrollPosition;
    }
    return (
        <>
        <div className='filters' >
        <button className="btn" onClick={()=>{handleScroll(-ITEM_WIDTH)}}> <ArrowLeftIcon /></button>
        <div className='categories2' ref={containerRef}>
        
        <div className='filter'>
            <LanguageIcon />
            <a className='cname' onClick={() => onCategoryChange('All')}>Home</a>
        </div>
        <div className='filter'>
            <ConnectingAirportsIcon/>
            <a className='cname' onClick={() => onCategoryChange('Travel')}>Travel</a>
        </div>
        <div className='filter'>
            <DiamondIcon/>
            <a className='cname' onClick={() => onCategoryChange('Fashion')}>Fashion</a>
        </div>
        <div className='filter'>
            <HealthAndSafetyIcon/>
            <a className='cname' onClick={() => onCategoryChange('Health')}>Health</a>
        </div>
        <div className='filter'>
            <BookIcon/>
            <a className='cname' onClick={() => onCategoryChange('Education')}>Education</a>
        </div>
        <div className='filter'>
            <PrecisionManufacturingIcon/>
            <a className='cname' onClick={() => onCategoryChange('Tech')}>Tech</a>
        </div>
        <div className='filter'>
            <ColorLensIcon/>
            <a className='cname' onClick={() => onCategoryChange('Art')}>Art</a>
        </div>
        <div className='filter'>
            <AgricultureIcon/>
            <a className='cname' onClick={() => onCategoryChange('Agriculture')}>Agriculture</a>
        </div>
        <div className='filter'>
            <FactoryIcon/>
            <a className='cname' onClick={() => onCategoryChange('Industry')}>Industry</a>
        </div>
        <div className='filter'>
            <InterestsIcon/>
            <a className='cname' onClick={() => onCategoryChange('Society')}>Society</a>
        </div>
        <div className='filter'>
            <ShowChartIcon/>
            <a className='cname' onClick={() => onCategoryChange('Marketing')}>Marketing</a>
        </div>
        <div className='filter'>
            <HistoryIcon/>
            <a className='cname' onClick={() => onCategoryChange('History')}>History</a>
        </div>
        <div className='filter'>
            <FormatQuoteIcon/>
            <a className='cname' onClick={() => onCategoryChange('Quotes')}>Quotes</a>
        </div>
         <div className='filter'>
            <OtherHousesIcon/>
            <a className='cname' onClick={() => onCategoryChange('Others')}>Others</a>
        </div> 
        
        </div>
        <button className='btn' onClick={()=>{handleScroll(ITEM_WIDTH)}}><ArrowRightIcon/></button>
        </div>
        
        </>
    )
}

export default Category
