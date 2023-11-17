import axios from "axios";

const boardBaseUrl="https://api.quicksell.co/v1/internal/frontend-assignment";

const getBodyData = () => {
    return axios.get(boardBaseUrl);
};

export default getBodyData;