import React, { useState, useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { getError } from '../../Utils';
import { reducerListItem, initialListItemReducer } from '../../reducerListItem';
import './ListItem.scss';

function ListItem({ item }) {
  const [{ loading, error }, dispatch] = useReducer(
    reducerListItem,
    initialListItemReducer
  );
  const [deleted, setDeleted] = useState(false);
  const [content, setContent] = useState(item);
  let inMyListPage = false;
  if (window.location.href === 'http://localhost:3000/mylist') {
    inMyListPage = true;
  }
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);

  if (deleted) {
    toast.dark(`${item.title} has been removed`);
    return null;
  }

  const handeleAddContent = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        '/users/addcontent',
        { user, item },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.dark(`${item.title} was added to your list`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handeleRemoveContent = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `users/removecontent/${user._id}`,
        { item },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDeleted(true);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const addlike = async () => {
    dispatch({ type: 'UPDATE_REQUEST' });
    try {
      const res = await axios.patch(
        `/contents/update/like/${item._id}`,
        {
          userId: user._id,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setContent(res.data);
      dispatch({ type: 'UPDATE_SUCCESS' });
      
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: error.message });
    }
  };

  const addDislike = async () => {
    dispatch({ type: 'UPDATE_REQUEST' });
    try {
      const res = await axios.patch(
        `/contents/update/dislike/${item._id}`,
        {
          userId: user._id,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setContent(res.data);
      dispatch({ type: 'UPDATE_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: error.message });
    }
  };

  const handleLikeContent = (event) => {
    event.preventDefault();
    addlike();
  };

  const handleDisLikeContent = (event) => {
    event.preventDefault();
    addDislike();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Link to={{ pathname: `/details/${content._id}` }} className="link">
          <div
            className="listItem"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={content.imgThumb} alt="" />
            {isHovered && (
              <>
                <ReactPlayer
                  className="video"
                  height={145}
                  width={300}
                  url={item.trailer}
                  playing={true}
                ></ReactPlayer>
                <div className="itemInfo">
                  <div className="icons">
                    <Button>
                      <PlayArrowIcon className="icon link" />
                    </Button>
                    {inMyListPage ? (
                      <Button onClick={(e) => handeleRemoveContent(e)}>
                        <CancelIcon className="icon" />
                      </Button>
                    ) : (
                      <Button onClick={(e) => handeleAddContent(e)}>
                        <AddIcon className="icon" />
                      </Button>
                    )}
                    <Button onClick={(e) => handleLikeContent(e)}>
                      <ThumbUpOutlinedIcon className="icon" />
                    </Button>
                    <Button onClick={(e) => handleDisLikeContent(e)}>
                      <ThumbDownOffAltOutlinedIcon className="icon" />
                    </Button>
                  </div>
                  <div className="itemInfoTop">
                    <span>{content.duration}</span>
                    <span className="limit">+{content.limit}</span>
                    <span>{content.year}</span>
                  </div>
                  <div className="desc">{content.desc}</div>
                  <div className="genre">{content.genre}</div>
                  <div className="likes">
                    likes amaout: {content.numberLikes}
                  </div>
                  <div className="dislikes">
                    dislikes amaout: {content.numberDisLikes}
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
      )}
    </>
  );
}

export default ListItem;
