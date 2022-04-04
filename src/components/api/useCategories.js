import { useEffect, useState } from "react";
import axios from "axios";

const useCategories = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await axios.get("https://opentdb.com/api_category.php");
      setCategories(response.data.trivia_categories);
      setLoading(false);
    };
    getCategories();
  }, []);

  return [loading, categories];
};

export default useCategories;
