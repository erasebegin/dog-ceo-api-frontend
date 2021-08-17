import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useFetchBreeds from './hooks/useFetchBreeds';
import useFetchImages from './hooks/useFetchImages';
import Modal from './Modal';

function App() {
  // state
  const [selectedBreed, setSelectedBreed] = useState('');
  const [subBreeds, setSubBreeds] = useState([]);
  const [selectedSubBreed, setSelectedSubBreed] = useState('');
  const [dogsToFetch, setDogsToFetch] = useState({});
  const [imageNum, setImageNum] = useState(0);
  const [selectedImage, setSelectedImage] = useState({});

  // data fetching
  const { data: breeds, loading, error } = useFetchBreeds();
  const {
    data: images,
    loading: imageLoading,
    error: imageError
  } = useFetchImages(dogsToFetch);

  useEffect(() => {
    setSubBreeds(breeds[selectedBreed]);
    setSelectedSubBreed('');
  }, [selectedBreed]);

  // generates an array of numbers from 0-49 for the dropdown list
  // (because the max number of images that the api will provide is 50)
  const numArr = Array.from(Array(50).keys());

  function handleSubmit(e) {
    e.preventDefault();

    setDogsToFetch({
      breed: selectedBreed,
      subBreed: selectedSubBreed,
      imageNum
    });
  }

  if (loading)
    return (
      <MainContainer>
        <p>loading...</p>
      </MainContainer>
    );

  if (error)
    return (
      <MainContainer>
        <Error>Oh no, something went wrong! 🐶</Error>
      </MainContainer>
    );

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <label htmlFor="breed">Breed:</label>
          <select
            name="breed"
            onChange={(e) => setSelectedBreed(e.target.value)}
            value={selectedBreed}
          >
            <option>Select</option>
            {Object.keys(breeds).map((breed) => (
              <option key={`breed${breed}`}>{breed}</option>
            ))}
          </select>
        </FormControl>
        {selectedBreed && subBreeds && subBreeds.length > 0 && (
          <FormControl>
            <label htmlFor="sub-breed">Sub Breed:</label>
            <select
              name="sub-breed"
              onChange={(e) => setSelectedSubBreed(e.target.value)}
              value={selectedSubBreed}
            >
              <option>Select</option>
              {breeds[selectedBreed].map((subBreed, index) => (
                <option key={`sub${index}`}>{subBreed}</option>
              ))}
            </select>
          </FormControl>
        )}
        <FormControl>
          <label htmlFor="image-no">No. of Images:</label>
          <select
            name="image-no"
            onChange={(e) => setImageNum(e.target.value)}
            value={imageNum}
          >
            <option>Select</option>
            {numArr.map((num) => (
              <option key={num}>{num + 1}</option>
            ))}
          </select>
        </FormControl>

        <Button type="submit">View Images</Button>
      </Form>
      <Images>
        {imageError && <Error>Oh no, something went wrong! 🐶</Error>}
        {imageLoading && <p>loading... 🐶</p>}
        {images?.map((imageUrl, index) => (
          <img
            src={imageUrl}
            width={200}
            height={200}
            key={`img${index}`}
            alt={`${selectedBreed}${index}`}
            onClick={() =>
              setSelectedImage({
                alt: `${selectedBreed}${index}`,
                src: imageUrl
              })
            }
          />
        ))}
      </Images>
      <Modal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding: 3rem;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  max-width: 500px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 3rem 0;

  img {
    object-fit: cover;
    margin-bottom: 0;
    cursor: pointer;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;

  @media (max-width: 500px) {
    align-items: center;
    margin: 0;
    margin-bottom: 1rem;
  }

  select {
    border-radius: 5px;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
  }

  label {
    margin-bottom: 0.875rem;
  }
`;

const Button = styled.button`
  margin-right: 1rem;
  padding: 0.375rem 0.5rem;
  border-radius: 5px;
  border: 1px solid #a5aaa3;
  background-color: #812f33;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 500px) {
    margin-right: 0;
    margin-top: 1rem;
  }
`;

const Error = styled.p`
  color: firebrick;
`;

export default App;
