
export const getToken = () => localStorage.getItem('token');

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};



