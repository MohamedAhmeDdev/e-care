import { jwtDecode } from 'jwt-decode';

export const getUserInfo = () => {
  const userToken = localStorage.getItem('user');
  
  if (!userToken || userToken === "null" || userToken === "undefined") {
    return null;
  }

  try {
    const decodedToken = jwtDecode(userToken);
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
