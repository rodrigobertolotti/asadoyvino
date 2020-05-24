const initialState = {
    asistencias: []
}

const AsistentesReducer =  (state = initialState, action) => {
    switch (action.type){
        case 'Asistir':
            let array= state.asistencias;
            array.push(action.payload);
            return {...state, asistencias: array }
        default: 
            return state;
    }
}

export default AsistentesReducer;
