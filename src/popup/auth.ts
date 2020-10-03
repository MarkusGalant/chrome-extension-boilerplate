export const login = (email: string, password: string) => {
  if (email === 'test@gmail.com' && password === 'test123') {
    return true;
  }

  return false;
};

export const isAuthorized = (email: string, password: string) => {
  if (email === 'test@gmail.com' && password === 'test123') {
    return true;
  }

  return false;
};
