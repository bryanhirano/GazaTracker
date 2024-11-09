import { SET_DATA } from "../actions/palestineData";

export default function data(state = null, action){

    switch(action.type){
        case SET_DATA:
           return action.data

        default: return state
    }


}