import axios from 'axios';
import { AuthContext } from '../../auth/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import React, { useContext, useEffect, useState } from 'react';
import './DetailsPage.scss';
import { Button } from '@mui/material';

function DetailsPage() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getContent = async () => {
      try {
        const fetchedContent = await axios.get(`/contents/get/${id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setContent(fetchedContent.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContent();
  }, [id]);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/');
    }
  }, [user,navigate]);


  return (
    <div className="main">
      <Navbar />
      <div className="centered">
        <div className="details">
          <Button className='back' onClick={() => {
            navigate(-1)
          }}>
            <ArrowBackIosNewOutlinedIcon/>
            <span>Back</span>
          </Button>
          <br/>
          <img
            className="picture"
            src={content ? content.imgVertical : ''}
            alt="img"
          />
          <div className="info">
            <h1>{content ? content.title : ''}</h1>
            <p>{content ? content.description : ''}</p>
            <p>
              Type: {content ? (content.isSeries ? 'Series' : 'Movie') : ''}
            </p>
            <p>Year: {content ? content.year : ''}</p>
            <p>Duration: {content ? content.duration : ''}</p>
            <p>Age restriction: {content ? content.limit : ''}+</p>
            <p>Genre: {content ? content.genre : ''}</p>
            <div className="buttons">
              <button
                className="play"
                onClick={() => navigate(`/watch/${content ? content._id : ''}`)}
              >
                <PlayArrowIcon />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
