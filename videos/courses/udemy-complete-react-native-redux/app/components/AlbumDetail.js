import React from 'react';
import { View, Text, Image, Linking } from 'react-native'
import Card from './Card'
import CardSection from './CardSection'
import Button from './Button'


const AlbumDetail = ({ album }) => (
  <Card key={album.title}>
    <CardSection>
      <View style={styles.thumbnailContainerStyle}>
        <Image 
          style={styles.thumbnailStyle}
          source={{ uri: album.thumbnail_image }} />
      </View>
      <View>
        <Text style={styles.headerTextStyle} >{album.title}</Text>
        <Text> {album.artist} </Text>
      </View>
    </CardSection>
    <CardSection>
      <Image style={styles.imageStyle} source={{ uri: album.image}} />
    </CardSection>
    <CardSection>
      <Button onPress={() => Linking.openURL(album.url)}>
        Buy now
      </Button>
    </CardSection>
  </Card>
);

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
}

export default AlbumDetail;
