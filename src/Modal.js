import React from 'react';
import styled from 'styled-components';

export default function Modal({ selectedImage, setSelectedImage }) {
  const { src, alt } = selectedImage ?? {};

  const closeModal = (event) => {
    if (event.target.classList.contains('modal-container')) {
      setSelectedImage({});
    }
  };

  if (!selectedImage.src) return <div></div>;

  return (
    <ModalContainer onClick={closeModal} className="modal-container">
      <img src={src} alt={alt} />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #11111155;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: relative;
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
`;
