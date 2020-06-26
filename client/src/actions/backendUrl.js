console.log(process.env.NODE_ENV)
var BACKEND_URL = "http://ec2-3-17-185-75.us-east-2.compute.amazonaws.com";

if (process.env.NODE_ENV != 'production') {
    BACKEND_URL = "http://localhost:5000"
}
// export const BACKEND_URL = (process.env.NODE_ENV == 'production') ? "ec2-3-17-185-75.us-east-2.compute.amazonaws.com" : "http://localhost:5000"
export {BACKEND_URL};