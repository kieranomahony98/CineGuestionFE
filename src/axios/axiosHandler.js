import axios from 'axios'
//api call handler, all calls will go through these functions.
export async function getRequest(apiRoute, token = null, errorNeeded = false) {
    const route = await getRoute();
    const config = await getConfig(token);

    return await axios.get(`${route}${apiRoute}`, config)
        .then((res) => {
            if (res.status !== 200) return false;
            return res.data;
        }).catch((err) => {
            throw err;
        });
}

export async function postRequest(apiRoute, body, token = null, errorNeeded = false) {
    const route = await getRoute();
    const config = await getConfig(token);
    return await axios.post(`${route}${apiRoute}`, body, config)
        .then((res) => {
            if (res.status !== 200) return false;
            return res.data;
        }).catch((err) => {
            throw err;
        });
}


const getRoute = async () => {
    return (process.env.NODE_ENV) === "production" ? "https://cineguestion-be.herokuapp.com" : "http://localhost:8080";
}

const getConfig = async (token) => {
    if (!token) {
        return {
            headers: {
                "Content-type": "application/json"
            }
        }
    }
    return {
        headers: {
            "Content-type": "application/json",
            'x-auth-token': token
        }
    }

}