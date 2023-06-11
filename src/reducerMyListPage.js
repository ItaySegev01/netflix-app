export const initialMyListPageReducer = {
    loading: true,
    error:"",
    list:[]
}

export const reducerMyListPage = (state,{type,payload})=>{

    switch(type){
        case "GET_REQUEST":{
            return {...state,loading:true}
        }
        case "GET_SUCCESS":{
            return {...state,list:payload,loading:false}
        }
        case "GET_FAIL":{
            return {...state,loading:false,error:payload}
        }
        default:
        return state
    }
}