import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';
import { Button } from '@mui/material';
import {toast} from'react-toastify';
import { getError } from '../../Utils';
import './ListItem.scss';


function ListItem({ item }) {
  const [deleted, setDeleted] = useState(false);
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

  return (
    <Link to={{ pathname: `/details/${item._id}` }} className="link">
      <div
        className="listItem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={item?.imgThumb} alt="" />
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
                <Button>
                  <ThumbUpOutlinedIcon className="icon" />
                </Button>
                <Button>
                  <ThumbDownOffAltOutlinedIcon className="icon" />
                </Button>
              </div>
              <div className="itemInfoTop">
                <span>{item.duration}</span>
                <span className="limit">+{item.limit}</span>
                <span>{item.year}</span>
              </div>
              <div className="desc">{item.desc}</div>
              <div className="genre">{item.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default ListItem;
