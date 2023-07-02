import React, { useContext, useState, useEffect } from 'react';
import { getError } from '../../Utils';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { AuthContext } from '../../auth/authContext';
import {toast} from 'react-toastify';
import axios from 'axios';
import './WatchPage.scss';

function WatchPage() {
  const params = useParams();
  const { _id } = params;
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/');
    }
  }, [user, navigate]);
  useEffect(() => {
    async function GetContent() {
      try {
        const response = await axios.get(`contents/get/${_id}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });

        setContent(response.data);
      } catch (err) {
        toast.error(getError(err));
      }
    }

    GetContent();
  }, [_id, navigate, user.token]);
  return (
    <div className="watch">
      <Link className="back" to="/">
        <ArrowBackIosNewOutlinedIcon />
        home
      </Link>
      <br />
      <br />
      <ReactPlayer
        controls={true}
        className="video"
        height="100%"
        width="100%"
        url={content ? content.movie : ''}
        playing={true}
        
      ></ReactPlayer>
    </div>
  );
}

export default WatchPage;
