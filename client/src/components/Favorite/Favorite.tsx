import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { FAVORITE_SERVER } from '../Config';
import { Typography, Icon } from 'antd';
const { Text } = Typography;

function Favorite(props: any) {

  const postId = props.movieId
  const userFrom = props.userFrom
  const title = props.postInfo.title
  const thumbnail = props.postInfo.thumbnail
  const createdAt = props.postInfo.createdAt;

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    movieId: postId,
    userFrom: userFrom,
    movieTitle: title,
    movieImage: thumbnail,
    movieRunTime: createdAt
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

    axios.post(`${FAVORITE_SERVER}/favorited`, variables)
      .then(response => {
        if(response.data.success) {
          setFavorited(response.data.favorited)
        } else {
          alert('Failed to get Favorite Info')
        }
      })
  }, [variables])

  const onClickFavorite = () => {
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
      // When Not adding yey

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
  }


  return (
    <div style={{ cursor: 'pointer'}} onClick={onClickFavorite}>
      <Text style={{ color: 'white', float: 'right'}}>
        {Favorited ? 
          <Icon  theme="filled" style={{ color: '#1990FF'}}type="like" />   
          : 
          <Icon style={{ color: '#1990FF'}}type="like" /> 
        } Likes {FavoriteNumber} </Text>
    </div>
  )
}

export default Favorite
