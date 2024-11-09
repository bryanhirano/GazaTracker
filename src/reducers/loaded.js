import { SET_LOADED } from "../actions/loaded";


export default function loaded(state = null, action) {

    switch (action.type) {
        case SET_LOADED:
            return action.isLoaded;

       

        default:
            return state;
    }


}