export async function getRoute() {
    return (process.env.NODE_ENV) === "production" ? "https://cineguestion-be.herokuapp.com" : "http://localhost:8080";

}