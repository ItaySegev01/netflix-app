export const initialListItemReducer = {
  loading: false,
  error: '',
};

export const reducerListItem = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_REQUEST': {
      return { ...state, loading: true, payload: payload };
    }
    case 'UPDATE_SUCCESS': {
      return { ...state, loading: false, payload: payload };
    }
    case 'UPDATE_FAIL': {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};
