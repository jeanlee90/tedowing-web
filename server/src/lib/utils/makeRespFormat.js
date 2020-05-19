export const makeSuccessFormat = result => {
  return {
    success: true,
    result: typeof result !== "undefined" ? result : null,
  };
};

export const makeFailureFormat = error => {
  return {
    success: false,
    error,
  };
};
