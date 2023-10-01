import React, {useEffect, useState} from 'react';
import { useAuth } from '../AuthContext.js';
import { useParams , useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

function PostsPage (){
    const { authToken } = useAuth();
    const [trip, setTrip] = useState(null);
    const { tripId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:3000/api/v1/trips/${tripId}/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPosts(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

    return (
        <div>
          <h1>Posts de </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            {posts.map(post => (
              <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <Link to={`${post.id}`}>
                <h2>{post.title}</h2>
                </Link>
                <p>{post.body}</p>
                {/* Agrega cualquier otra información que quieras mostrar */}
              </div>
            ))}
          </div>
          <button style= {{marginTop: "16px", marginLeft: "65px", padding: "15px 25px", backgroundColor: "#00d02a",
            borderRadius: "7px" , border: "1px solid #00d02a", fontSize: "20px", color: "white"}}
            onClick> Nuevo Post </button>
        </div>
      );
    
}

export default PostsPage;