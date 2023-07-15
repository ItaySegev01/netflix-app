export const initialLoginPageReducer = {
  loading: false,
  error: '',
};

export const reducerLoginPage = (state, { type, payload }) => {
  switch (type) {
    case 'POST_REQUEST': {
      return { ...state, loading: true };
    }
    case 'POST_SUCCESS': {
      return { ...state, loading: false };
    }
    case 'POST_FAIL': {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};
