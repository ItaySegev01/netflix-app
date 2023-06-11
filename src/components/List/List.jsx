import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './List.scss';
import {responsive } from '../../Utils'
import ListItem from '../ListItem/ListItem';

function List({ list }) {

  return (
    <div className="list">
      <span className="list-title">{list?.title}</span>
      <Carousel
        className="carousel"
        responsive={responsive}
        infinite={true}
        centerMode={true}
        swipeable={false}
        draggable={false}
      >
        {list.contents.map((item, i) => (
          <ListItem item={item} key={i}></ListItem>
        ))}
      </Carousel>
    </div>
  );
}

export default List;
