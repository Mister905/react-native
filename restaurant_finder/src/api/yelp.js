import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer qTqiXIjmNpMXCYldIq7McBpSM-ZhR-1YLPFgchSXNQ6cM7d8uh-dcxyNCapMcTLAxi3h8dSBphIbFICa-tw1sOJg9j9SPxtdwO7HadtJ2mQzPY7OEZZ6gY7dz6FAXnYx"
  }
});
