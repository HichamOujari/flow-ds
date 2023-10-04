import env from "react-dotenv";
const getApiDomain = () => env.host;
const config = {
  FETCH_DATA: `${getApiDomain()}/stock/stats/`,
  PREDICTION: `${getApiDomain()}/stock/prediction/`,
};

export default config;
