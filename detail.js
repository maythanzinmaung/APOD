import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import {Paragraph} from 'react-native-paper';
export default class DetailData extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('name', '{item.title}'),
    headerStyle: {
      backgroundColor: '#53bbb4',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      output: [],
      media: '',
    };
  }

  fetchData = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?&api_key=d3XnbOryRhiUEWQMpSqASXTZnEzpCtYYQwPbWwbb&date=' +
        params.date,
    );
    const products = await response.json(); // products have array data
    this.setState({
      output: products,
      media: products.media_type,
    });
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    let apod = this.state.output;
    const DATA = [
      {
        date: apod.date,
        explanation: apod.explanation,
        title: apod.title,
        url: apod.url,
      },
    ];

    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              {this.state.media === 'image' ? (
                <Image
                  style={{width: 370, height: 250, paddingVertical: 20}}
                  source={{uri: item.url}}
                />
              ) : (
                <WebView
                  javaScriptEnabled={true}
                  style={{width: 370, height: 250}}
                  source={{uri: item.url}}
                />
              )}

              <Text style={styles.text}>{item.date}</Text>
              <Text />
              <Paragraph style={styles.explanation}>
                {' '}
                {item.explanation}
              </Paragraph>
            </View>
          )}
        />

        <Button
          title="back"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titletext: {
    color: '#fff',
    fontSize: 20,
    color: 'white',
    fontStyle: 'italic',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  explanation: {
    flex: 1,
    bottom: 0,
    fontSize: 18,
    color: 'white',
    textAlign: 'justify',
  },
});
