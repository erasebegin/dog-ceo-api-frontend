import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // first call this function to get profile data
  async function getDoggyData() {
    await axios
      .get(`https://dog.ceo/api/breeds/list/all`)
      .then((res) => {
        setData(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err)
        setError(err);
        setLoading(false);
      });
  }

  // this will trigger once on mount and then every time a new userName is passed to the component
  useEffect(() => {
    setLoading(true);
    setData({})
    setError('')
    getDoggyData();
  },[]);

  return { data, loading, error };
}
