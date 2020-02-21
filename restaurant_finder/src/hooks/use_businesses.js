import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [businesses, set_businesses] = useState([]);
  const [error, set_error] = useState("");

  const business_search = async term => {
    try {
      let res = await yelp.get("/search", {
        params: {
          limit: 50,
          term,
          location: "Hamilton, Ontario, Canada"
        }
      });

      set_businesses(res.data.businesses);
    } catch (error) {
      set_error(error.message);
      console.log(error.message);
    }
  };

  // Call business search function when component first mounts
  useEffect(() => {
    business_search("pasta");
  }, []);

  return [business_search, businesses, error];
};
