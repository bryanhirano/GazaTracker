

import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { calculateDerivatives, monthComparison, monthLabels, monthsSinceConflictStarted, totalDeathThisMonthDayData } from "../../backend/helper";
import { setData } from "../../actions/palestineData";

const LineGraph = (props) => {
    const [graphName, setGraphName] = useState("")
    const [labelName, setLabelName] = useState("")
    const [values, setValues] = useState([])
    const [labels, setLabels] = useState([])
    const [dataSet,setDataSet] = useState([])
  


    
   const chart = (( <Line data={
        {
        "labels": labels,
        "datasets": dataSet
       
    }}/>))

    

    useEffect(() => {
      

        if(props.data){
          
            
            setLabels(props.labels)
            setGraphName(props.graphName)
            setValues(props.data)
            setLabelName(props.labelName)
            console.log(props.labels)
          
            setDataSet(calculateDerivatives(values,labels))
            console.log(dataSet)
        
        }


  

    }, [props])


    useEffect(() => {
      

        if(props.data){
            setDataSet(calculateDerivatives(values,labels))
        }


  

    }, [values])




  
    return (
       
        <div className="col-md-12 ">
            <div className="card shadow">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-muted fw-bold m-0">{graphName}</h6>
                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>

                    </div>
                </div>

            
                 
                  {chart}
                    
         


            </div>
        </div>
        )

}

const mapStateToProps = ({} , {data = [], labels = [], graphName="", labelName="", graphData = []}) => {

   



    return {
        data,
        labels,
        graphName,
        labelName,
        graphData
    }


}

export default connect(mapStateToProps)(LineGraph)