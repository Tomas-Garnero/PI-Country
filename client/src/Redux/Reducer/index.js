const initialState = {
    countries: [],
    allCountries: [],
    detail: {},
    activities: [],
    allActivities: [],
    actDetail: {},
    paginado: {},
    paginado1: {}    
}

function rootReducer (state = initialState, action){

    switch(action.type) {

        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };

        case "GET_COUNTRY_NAME":
            // const country = [...action.payload];
            return {
                ...state,
                countries: action.payload
            };

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            };
        
        case "CLEAR_DETAIL":
            return {
                ...state,
                detail: action.payload,
                actDetail: action.payload
            }

        case "DELETE_COUNTRY_ACT":
            return {
                ...state,
                activities: action.payload
            }

        case "GET_ACTIVITIES":
            return {
                ...state,
                activities: action.payload,
                allActivities: action.payload
            }

        case "GET_ACT_DETAIL": 
            return {
                ...state, 
                actDetail: {...action.payload, loading: true}
            }

        case "POST_ACTIVITY":
            return {
                ...state,
                activities: [...state.activities, action.payload]
            };

        case "UPDATE_ACTIVITY": 
            return {
                ...state,
                activities: [...state.activities, action.payload]
            };

        case "FILTER_BY_CONTINENT":
            const countriesContinent = [...state.allCountries];
            const countriesSorted = 
                action.payload === "All" 
                    ? countriesContinent 
                    : countriesContinent.filter(e => e.continent === action.payload);
            return{
                ...state,
                countries: countriesSorted
            };

        case "ORDER_BY_NAME":
            const countriesName = [...state.allCountries]
            const sortedByName = action.payload === "Asc" 
                ? countriesName.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }) 
                : action.payload === "Desc" 
                    ? countriesName.sort((a, b) => {
                        if (a.name < b.name) return 1;
                        if (a.name > b.name) return -1;
                        return 0;
                }) 
                : countriesName;
            return {
                ...state,
                countries: sortedByName
            };

        case "ORDER_BY_POPULATION":
            const countriesPopulation = [...state.allCountries]
            const sortedByPopulation = action.payload === "Asc" 
                ? countriesPopulation.sort((a, b) => a.population - b.population) 
                : action.payload === "Desc" 
                    ? countriesPopulation.sort((a, b) => b.population - a.population) 
                    : countriesPopulation;
            return {
                ...state,
                countries: sortedByPopulation
            };
        
        case "FILTER_ACTIVITY":
            const allAct = [...state.allActivities]
            const activitySorted = action.payload === "All"
                ? allAct
                : allAct.filter(a => a.name === action.payload)
            return{
                    ...state,
                    activities: activitySorted
                };

        case "SET_PAGINADO":
            return {
                ...state,
                paginado: action.payload
            }
        
        case "SET_PAGINADO1":
            return {
                ...state,
                paginado1: action.payload
            }

        default: 
            return state;
    }
};

export default rootReducer;