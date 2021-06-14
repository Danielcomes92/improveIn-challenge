import axios from 'axios'

const dataActions = {
    getData: (data) => {
        return async (dispatch, getState) => {
            try{
                dispatch({
                    type: 'SET_DATA',
                    payload: action
                })
            }catch(error){
                alert('Internal database error, try in a moment')
                console.log(error)
            }
        }
    },
}

export default dataActions;