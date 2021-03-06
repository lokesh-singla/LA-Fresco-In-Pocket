import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import SignIn_Modal from '../Components/Sign_in_modal.js';
import SignUp_Modal from '../Components/Sign_up_modal';
import useWindowDimensions from '../Utilities/WindowDimension'
import '../Components/Comp-CSS/Nav.css';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';


function XNav() {

   
  const history = useHistory();
  const signInModalRef = React.useRef();
  const signUpModalRef = React.useRef();
  const openLoginModal = ()=>{
   signInModalRef.current.openModal()
  };
  const openSignupModal = ()=>{
      signUpModalRef.current.openModal()
  };
  const [navStyle, setNavStyle] = React.useState("nav-links");
  const [navPanelStyle, setNPS] = React.useState("navPanel");
  const [shopNameClass, setSNC] = React.useState("shopName");
  const [navClass, setNavClass] = React.useState("");
  const [navSearchOP, setNSOP] = React.useState("nav-search-div");

  const toggleNav = ()=>{
    if(navStyle === "nav-links")
    {
      setNavStyle("nav-links open");
      setNPS("navPanel open");
      setSNC("shopName open");
      setNavClass("nav-open");
          }
    else
    {
      setNavStyle("nav-links");
      setNPS("navPanel");
      setTimeout(() => {
        setSNC("shopName");
      setNavClass("");
      }, 1000);
    }
  }
  const { windowWidth } = useWindowDimensions();
  if(windowWidth>=800 && navSearchOP!=="nav-search-div"){ setNSOP("nav-search-div") }
  const onclickNavSearch = ()=>{
   
    if(windowWidth<=800)
    { setNSOP("nav-search-div open"); }
    
    }

    const onclickNavSearchClose =()=>{
      setNSOP("nav-search-div");
    }
  
    const gotoHome = ()=>{
      history.push('/');
    }
  
  return(
      <>
      <SignIn_Modal ref={signInModalRef}/>
      <SignUp_Modal ref={signUpModalRef}/>
<nav className={navClass}>
    <div className="hamburger" onClick={toggleNav}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
    <img onClick={gotoHome} src='/logo.png' className="logo" />
    <div onClick={gotoHome} className={shopNameClass}>La<br/>Fresco</div>
    <div className="search">
      <div className="searchPanel">
    <input className="inputSearch" placeholder={'Search for Products...'}></input>
    <img onClick={onclickNavSearch} src="https://img.icons8.com/pastel-glyph/64/000000/search--v2.png" className="searchImg" />
    </div>
    <div className="navInfo">
      <img src="https://image.flaticon.com/icons/svg/1216/1216895.svg"/>
      <a href="www.iiti.ac.in" className="loc">IIT INDORE,MP(452020)</a>
      <p>   </p>
      <img src="https://image.flaticon.com/icons/svg/597/597177.svg" />
      <span>07324 306 717</span>
    </div>
    </div>
    <ul className={navStyle}>
      <li><Link to='/'>All Products</Link></li>
      <li><a href='/#Categories'>Categories</a></li>
      <li><Link to='/help'>Help</Link></li>
    </ul>
   {
     Cookies.get('token')
      ?
      <div className={navPanelStyle}>
      <Link to='/basket'><img src="https://image.flaticon.com/icons/svg/126/126083.svg" className="cartLogo"/>Cart</Link>
      <p style={{fontSize:"2vw"}}>|</p>
      <Link to='/logout'>Logout</Link>
    </div>
     :
     <div className={navPanelStyle}>
     <a onClick={openSignupModal}>Sign UP</a>
     <p style={{fontSize:"2vw"}}>|</p>
     <a onClick={openLoginModal}>Log IN</a>
   </div>
   }
  </nav>
  <div className={navSearchOP}>
  <img onClick={onclickNavSearchClose} className="close-nav-search-op" src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png"/>
  <input type="text" className="nav-search-op" placeholder="Search for Products ..."/>
  <img  className="search-nav-search-op" src="https://img.icons8.com/pastel-glyph/64/000000/search--v2.png" />
 </div>
  
      </>
  );
}

export default XNav;