
export interface StateContext {
    QRs: [];
    user: string;
    error: string;
    alerts: [];
}

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_QRs':
            return {
                ...state,
                QRs: action.data
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.data
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.data
            };
        case 'ADD_Alert':
            return {
                ...state,
                alerts: state.alerts.concat(action.data)
            }
        case 'REMOVE_Alert':
            return {
                ...state,
                alerts: state.alerts.filter(el => el.key !== action.data)
            };
        default:
            return state;
    }
};

export default Reducer;