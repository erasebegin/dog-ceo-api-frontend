import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(dogsToFetch) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // destructure incoming param and provide fallback
  const {breed, subBreed, imageNum} = dogsToFetch ?? {}
  // first call this function to get profile data
  async function getDoggyPics() {
    await axios
      .get(
        `https://dog.ceo/api/breed/${breed}${
          subBreed ? `/${subBreed}` : ''
        }/images/random/${imageNum}`
      )
      .then((res) => {
        setData(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }

  // this will trigger once on mount and then every time a new userName is passed to the component
  useEffect(() => {
    if (breed && imageNum) {
      setLoading(true);
      setData([]);
      setError('');
      getDoggyPics();
    } else {
      return;
    }
  }, [breed, subBreed, imageNum]);

  return { data, loading, error };
}
