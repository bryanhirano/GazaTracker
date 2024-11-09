
import { SET_COLLAPSE } from "../actions/menuCollapse";


export default function collapsed (state={}, action){

    switch(action.type){
        case SET_COLLAPSE:
            return action.collapse;
              
            default:
                return false;
        

    }

    

}