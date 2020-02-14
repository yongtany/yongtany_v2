import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FAVORITE_SERVER } from '../Config';
import { Typography, Icon } from 'antd';
import { hasPrefixSuffix } from 'antd/lib/input/ClearableLabeledInput';
const { Text } = Typography;

function Favorite(props: any) {

  const postId = props.postId
  const userFrom = props.userFrom
  const title = props.postInfo.title
  const thumbnail = props.postInfo.thumbnail
  const createdAt = props.postInfo.createdAt;

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    postId: postId,
    userFrom: userFrom,
    title: title,
    thumbnail: thumbnail,
    createdAt: createdAt
  }

  useEffect(() => {
    axios.post(`${FAVORITE_SERVER}/favoriteNumber`, variables)
      .then(response => {
        if(response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('Failed to get favoriteNumber')
        }
      })
    if(userFrom) {   
      axios.post(`${FAVORITE_SERVER}/favorited`, variables)
        .then(response => {
          if(response.data.success) {
            setFavorited(response.data.favorited)
          } else {
            alert('Failed to get Favorite Info')
          }
        })
    }
  }, [variables])

  const onClickFavorite = () => {
    if(userFrom) {
      if(Favorited) {
        // When already added
        axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables)
          .then(response => {
            if(response.data.success) {
              setFavoriteNumber(FavoriteNumber - 1);
              setFavorited(!Favorited);
            } else {
              alert(' Falied to remove from favorites')
            }
          })
      } else {
        // When Not adding yet
        axios.post(`${FAVORITE_SERVER}/addToFavorite`, variables)
          .then(response => {
            if(response.data.success) {
              setFavoriteNumber(FavoriteNumber + 1);
              setFavorited(!Favorited);
            } else {
              alert(' Falied to add to favorites')
            }
          })
      }
    } else {
      setTimeout(() => {
        props.history.push('/login');
      }, 500)
    }
    
  }

  return (
    <div style={{ cursor: 'pointer'}} onClick={onClickFavorite}>
      <Text style={{ color: 'white', float: 'right'}}>
        <span>
          {Favorited ? <Icon style={{ color: '#1990FF', marginRight: '5px' }} theme='filled' type="like" /> 
          : <Icon style={{ color: '#1990FF', marginRight: '5px'}} type="like" /> }
           {FavoriteNumber < 2 ? 'Like' : 'Likes' } 
        </span> {FavoriteNumber} </Text>
    </div>
  )
}

export default Favorite;
