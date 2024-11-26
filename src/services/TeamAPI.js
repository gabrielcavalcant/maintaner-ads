import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5001/api", // Ajuste para o endereço da sua API
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Exemplo de autenticação com token
    },
});

export const getTeams = async (params) => {
    const { data } = await api.get("/team", { params });
    return data;
};

export const createTeam = async (teamData) => {
    const { data } = await api.post("/team", teamData);
    return data;
};

export const updateTeam = async (teamId, teamData) => {
    const { data } = await api.patch(`/team/${teamId}`, teamData);
    return data;
};

export const deleteTeam = async (teamId) => {
    const { data } = await api.delete(`/team/${teamId}`);
    return data;
};