
import { getInitialData } from "../backend/api";

import { setLoaded } from "./loaded";
import { setCollapse } from "./menuCollapse";

import { setData } from "./palestineData";



const AUTHED_ID = "";


export function handleInitialData() {

    return (dispatch) => {

        return getInitialData().then(({data}) => {
            dispatch(setLoaded(false))
            dispatch(setCollapse(false))
            dispatch(setData(data))
            console.log(data)
         
        })

    }
}