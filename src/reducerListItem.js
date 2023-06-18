export const initialListItemReducer = {
  loading: false,
  error: '',
  context: undefined,
};

export const reducerListItem = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_REQUEST': {
      return { ...state, loading: true };
    }
    case 'UPDATE_SUCCESS': {
      return { ...state, context: payload, loading: false };
    }
    case 'UPDATE_FAIL': {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};
