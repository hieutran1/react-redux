export const userFetch_requested = () => {
  return {
    type: 'USER_FETCH_REQUESTED',
    payload: { userId: 1}
  };
};

export const userFetch_sucess = (data) => {
  return {
    type: 'USER_FETCH_SUCCEEDED',
    data: data
  };
};

export const userFetch_fail = (error) => {
  return {
    type: 'USER_FETCH_FAILED',
    error: error
  };
};