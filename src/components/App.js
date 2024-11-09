import '../App.css';

import useScript from "../hooks/useScript"

import "../assets/bootstrap/css/bootstrap.min.css"
import { Route, Routes, useParams, useLocation, useNavigate, Navigate } from "react-router-dom";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';
import { useEffect } from 'react';

import Loading from './Loading';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars  } from "@fortawesome/free-solid-svg-icons";

import FrontPage from './FrontPage';


function App(props) {

  
  library.add(faBars);

  

  const {loaded} = props


  useEffect(() => {

    props.dispatch(handleInitialData())

},[loaded])



  useScript("/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/bs-init.js")
  useScript("/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/chart.min.js")
  useScript("/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/script.min.js")
  useScript("/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/theme.js")
  useScript("/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/bootstrap/js/bootstrap.min.js")



  return (
    <div className="App">
      <script src="/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/theme.js" type="text/jsx"></script>
      <script src="/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/script.min.js" type="text/jsx"></script>
      <script src="/Users/bryanhirano/Documents/Html/airmans-attic/src/assets/js/theme.js" type="text/jsx"></script>
   
         
          <div id="wrapper">
          
            {!loaded ? (
              <div className="d-flex flex-column" id="content-wrapper">

                <div id="content">

                
                  <Routes>
                    <Route path="*" element={( <Navigate to={("/")} />)}/>
                    <Route exact path='/'  element={<FrontPage />} />
          
                  </Routes>
                </div>
              </div>) : (
              <Loading></Loading>
            )}
          </div>

      </div>


  )
}



const mapStateToProps = ({ authedUser, user, loaded = true }) => {


  return {
    loaded
  }
}

export default connect (mapStateToProps)(App);
