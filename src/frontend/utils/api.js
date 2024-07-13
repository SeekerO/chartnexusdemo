import axios from "axios";

export default async function api(market_id, list_id) {
  try {
    const URL = `https://livefeed3.chartnexus.com/Dummy/quotes?market_id=${market_id}&list=${list_id}`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
