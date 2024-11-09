

import { Doughnut, Line, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { monthComparison, monthLabels, monthsSinceConflictStarted } from "../../backend/helper";

const RoundGraph = (props) => {
    const {data} = props
    const [graphName, setGraphName] = useState("")
    const [labelName, setLabelName] = useState("")
    const [values, setValues] = useState([])
    const [labels, setLabels] = useState([])
    const [deathChildren, setDeathChildren] = useState(0)
    const [deathWomen, setDeathWomen] = useState(0)
    const [deathPress, setDeathPress] = useState(0)
    const currentYear = new Date().getFullYear();



    

    const chart = ( <Doughnut className="p-2" data={
        {
            labels: [
                'Children Killed in Gaza',
                'Women Killed in Gaza',
                'Press Killed in Gaza'
              ],
              datasets: [{
                label: 'Accumulated death',
                data: [deathChildren, deathWomen, deathPress],
                backgroundColor: [
                  '	rgb(64,64,64)',
                  '	rgb(115,115,115)',
                  'rgb(166,166,166)'
                ],
                borderDashOffset: 2,
                hoverOffset: 4,
                hoverBackgroundColor: "rgba(255, 51, 42,0.9)" 
              }]
    }}/>)

    useEffect(() => {
      

        setValues(props.data)

        if(data){
            setDeathChildren(data.ext_killed_children_cum)
            setDeathWomen(data.ext_killed_women_cum)
            setDeathPress(data.ext_press_killed_cum)
        }
        
     
       
       

    }, [props])




  
    return (
       
        <div className="col-sm-12 p -5">
            <div className="card shadow mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-muted fw-bold m-0">{"Children and Women Killed"}</h6>
                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>
                        <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                           
                            <div className="dropdown-divider"></div>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                 
                  {chart}
                    
                   
                </div>


            </div>
        </div>
        )

}

const mapStateToProps = ({}, {data = []}) => {

    
    let lastDataLog = data[(data.length - 1)]

    return {
        data: data? lastDataLog : []
    }


}

export default connect(mapStateToProps)(RoundGraph)