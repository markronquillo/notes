import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => {
        this.setState({ albums: response.data });
      });
  } 

  render() {
    const rows = this.state.albums.map(album => {
      return <AlbumDetail key={album.title} album={album} />;
    })  
    return (
      <ScrollView>
        {rows}
      </ScrollView>
    );
  }
};

export default AlbumList;
