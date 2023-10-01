import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext.js';
import { useParams } from 'react-router-dom';
import './PostPage.css';

function PostPage() {
  const { authToken } = useAuth();
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();
  const { postId } = useParams();
  const [images, setImages] = useState([]);
  const [base64Image, setBase64Image] = useState(null); // Mueve el estado al nivel superior

  const [zoomed, setZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (base64Image) => {
    setSelectedImage(base64Image);
    setZoomed(true);
  }

  const handleZoomClose = () => {
    setZoomed(false);
  }

  const HandleImageUpload = (event, postId) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('post_id', postId);
  
    fetch(`http://localhost:3000/api/v1/posts`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(data => setImages(prevImages => [...prevImages, { base64_image: data.base64_image }]))
    .catch(error => {
      console.error('Error al subir la imagen', error);
    });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/posts/send_media?post_id=${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setImages(data)})
    .catch((error) => {
      console.error('Error al obtener las imágenes', error);
    });
  }, [authToken]);

  console.log(images);
  console.log("hola")

  return (
    <div>
      <h1>Imágenes del Post {postId}</h1>
      <input
        style={{ marginLeft: "85px" }}
        type="file"
        onChange={(event) => HandleImageUpload(event, postId)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={`data:image/png;base64,${image.base64_image}`}
              alt={`Imagen ${index}`}
              onClick={() => handleImageClick(`data:image/png;base64,${image.base64_image}`)}
            />
          </div>
        ))}
      </div>

      {zoomed && (
        <div className="zoomed-image-container" onClick={handleZoomClose}>
          <img src={selectedImage} alt="Zoomed Image" className="zoomed-image" />
        </div>
      )}
    </div>
  );
}

export default PostPage;