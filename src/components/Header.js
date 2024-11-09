import { CountUp } from 'countup.js';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import pic from "../assets/img/mohammed-al-bardawil.jpg";
import { totalDeathPerMonthData } from '../backend/helper';
const Header = (props) =>  {

    const [text, setText] = useState("")



    useEffect(() => {
        try {
           if(props.totalDeath){
            animation(props.totalDeath)
       
            
           }
        }
        catch { }



    }, [props])

    function learnMore(e){
        props.onClick(e)
    }

    function changeText(){
        setText("People killed in Gaza since the war started")
    }

    const options = {
        duration: 3,
        suffix: " People killed in Gaza",
        
    }

    function animation(killed) {
        let demo = new CountUp('targetEle', killed, options);
        if (!demo.error) {
            demo.start();
           
           
        } else {
            console.error(demo.error);
        }
    }


return (
    <div className="container-fluid  p-0">


        <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark   navbar-custom">
            <div class="container"><a class="navbar-brand" href="#">Casualties in Gaza</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navbarResponsive"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#"></a></li>
                        <li class="nav-item"><a class="nav-link" href="#"></a></li>
                    </ul>
                </div>
            </div>
        </nav>


        <header className="text-center text-white" style={{
            backgroundImage: `url(${pic})`,
            width: "100%",
            height: "100vh",
            paddingTop: 'calc(20rem + 55px)',
            paddingBottom: '10rem',
            
           
        }}>


            <div className="masthead-content">

                <div class="container mb-6">

                    <h1 class="masthead-heading mb-0" id={'targetEle'}>{ }</h1>
                    
                 <h2 class="masthead-subheading mb-0" id={'text'}>{text}</h2><a onClick={learnMore} class="btn btn-primary btn-xl rounded-pill mt-5" role="button">Learn More</a>
                </div>
            </div>



        </header>
    </div>
)
    }
const mapStateToProps = ({ }, { totalDeath , onClick}) => {



    return { totalDeath, onClick } 


}

export default connect(mapStateToProps)(Header)