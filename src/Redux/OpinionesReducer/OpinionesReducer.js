const initialState = {
    cantidadEstrellas: []
}

const OpinionesReducer =  (state = initialState, action) => {
    switch (action.type){
        case 'Votacion toques':
            let array= state.cantidadEstrellas;
            array.push(action.payload);
            return {...state, cantidadEstrellas: array }
        default: 
            return state;
    }
}

export default OpinionesReducer;
