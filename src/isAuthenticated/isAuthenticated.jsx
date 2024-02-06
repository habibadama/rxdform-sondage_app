//Fonction qui vérifie si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
