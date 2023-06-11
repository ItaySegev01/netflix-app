import React from 'react';
import { useContext,useReducer } from 'react';
import { AuthContext } from '../../auth/authContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import Carousel from 'react-multi-carousel';
import Featured from '../../components/Featured/Featured';
import {responsive } from '../../Utils'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {reducerMyListPage,initialMyListPageReducer } from '../../reducerMyListPage';
import './MyListPage.scss';

export default function MyListPage() {
  const [{ loading, error, list }, dispatch] = useReducer(reducerMyListPage, initialMyListPageReducer);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserList() {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get(
          `/users/contentlist/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'GET_FAIL', payload: error.message });
      }
  }
  getUserList();
  }, [user]);


  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/');
    }
  })

  return (
    <div className="ListPage">
      <Navbar />
      <Featured />
      {loading ? (
        <Loading />
      )
      : error ? (<Error  error={error} />) : 
      (
        <div className="list">
        <span className="list-title">Your Content List:</span>
        <Carousel
          className="carousel"
          responsive={responsive}
          ssr={false}
          infinite={true}
          autoPlay={true}
        >
          {list.map((item, i) => (
            <ListItem item={item} key={i}></ListItem>
          ))}
        </Carousel>
      </div>
      )
    }
    </div>
  );
}
