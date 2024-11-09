import { useCallback, useEffect, useRef, useState } from "react"
import { connect } from "react-redux"

import React from "react";




import { calculateDerivatives, formatMonthlyData, generatePush, lastThirtyDaysLabels, monthLabels, monthsSinceConflictStarted, totalChildDeathData, totalDeathData, totalDeathPerMonthData, totalDeathThisMonthDayData, totalPressDeathData, totalWomenDeathData, insightsFromData } from "../backend/helper";
import { useNavigate, useParams } from "react-router";

import RoundGraph from "./Graphs/RoundGraph";

import LineGraph from "./Graphs/LineGraph";
import Header from "./Header";
import BarChart from "./Graphs/BarChart";



const FrontPage = (props) => {



    const cropperRef = useRef < HTMLImageElement > (null);


    const { facilities } = props

    const navigate = useNavigate();
    const { identifier } = useParams();

    const [data, setData] = useState([])

    const [totalChildDeath, setTotalChildDeath] = useState(0)
    const [totalPressDeath, setTotalDeathPress] = useState(0)
    const [totalWomenDeath, setTotalWomenDeath] = useState(0)

    const [weeklyInfo, setWeeklyInfo] = useState([])

    const [squadron, setSquadron] = useState(identifier)

    const [deathLastThirtyDays, setDeathLastThirtyDays] = useState([])
    const [thirtyDaysLineGraphData, setThirtyDaysLineGraphData] = useState([])
    const [labelsDeathLastThirtyDays, setLabelsDeathLastThirtyDays] = useState([])

    const [totalDeath, setTotalDeath] = useState(0)
    const [totalDeathBarGraphData, setTotalDeathBarGraphData] = useState([])
    const [labelsTotalDeath, setLabelsTotalDeath] = useState([])


    const targetElement = useRef();

    const scrollBottom = (event) => {
        const element = targetElement;
        element.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start"
        })
    }

    useEffect(() => {
        try {



            if(props.data){

                if(props.data){
                    setData(props.data)

                    setTotalDeath(totalDeathData(data))

                  


        
                        
                        setDeathLastThirtyDays(totalDeathThisMonthDayData(data))
                        setLabelsDeathLastThirtyDays(lastThirtyDaysLabels(data))
                        setTotalChildDeath(totalChildDeathData(data))
                        setTotalWomenDeath(totalWomenDeathData(data))
                        setTotalDeathPress(totalPressDeathData(data))
                        setWeeklyInfo(insightsFromData(data))
                        console.log(deathLastThirtyDays)
                        setLabelsTotalDeath(monthLabels())

                        setTotalDeathBarGraphData((formatMonthlyData(totalDeathPerMonthData(data), lastThirtyDaysLabels)))
                        console.log(totalDeathBarGraphData)
                       
                }

            
            }

        }
        catch { }



    }, [props.data])




    return (
        <div className="container-fluid p-0">
            <Header totalDeath={totalDeath} onClick={scrollBottom}></Header>

            <section>
                <div className='container'>
                    <div class="row align-items-center pt-5 ">

                        <div  class="col-sm-6 order-lg-1">
                            <div  ref={targetElement} class=""><RoundGraph className='p-2' data={data}></RoundGraph></div>
                        </div>

                        <div class="col-lg-6 order-lg-2 align-self-center">

                            <h1>Of the <strong>{totalDeath}</strong> Casualties: </h1>
                            <h2>{totalChildDeath} Were Children </h2>
                            <h2>{totalWomenDeath} Were Women </h2>
                            <h2>{totalPressDeath} Were Press </h2>
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div  class="container">

                    <div className="row align-items-center p-5">
                        <div class="col-lg-6 order-lg-2">
                            <div class=""><BarChart graphData={totalDeathBarGraphData}
                                labelName={"People Killed in Gaza Since the Israel-Hamas War Started (per month)"}
                                graphName={"Deaths per month"} data={totalDeathPerMonthData(data)}
                                labels={monthLabels()}></BarChart>
                            </div>

                        </div>
                        <div class="col-lg-6 order-lg-1">
                            <h1>Deaths per month</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="row align-items-center pb-5 pl-5">
                        <div class="col-lg-12 order-lg-1">
                            <div class=""><LineGraph graphData={thirtyDaysLineGraphData}
                             labelName={"People Killed in Gaza since the Israel-Hamas last 30 days"} graphName={"Deaths last 30 days"} data={deathLastThirtyDays} labels={labelsDeathLastThirtyDays}   ></LineGraph>
                            </div>

                        </div>

                    </div>
                </div>


            </section>

            <section>
                <div class="container">
                    <div class="row align-items-center pb-5 pl-5">
                     
                            <div class=""> <div class="col-lg-12 order-lg-2">

                                {weeklyInfo.length > 0 ? weeklyInfo.map((r,i) =>

                                    <div key={i}>
                                        <h5>{r}</h5>
                                        <br></br>
                                    </div>) : <p>as</p>}
                            </div>
                           
                        </div>
                    </div>
                </div>


            </section>



            <footer class="py-5 bg-black">
                <div class="container">
                    <p class="text-center text-white m-0 small">Developed by Bryan Hirano</p>
                </div>
            </footer>
        </div>)


}

    const mapStateToProps = ({ data = [] }) => {




    return {
        data
    }


}


export default connect(mapStateToProps)(FrontPage);