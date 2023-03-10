import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "ef8e5f3a440148d69ebe56217ed1e85c";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export const removeToken = (token) => { // export function from module 
  localStorage.removeItem(token);
}

export default apiClient;
