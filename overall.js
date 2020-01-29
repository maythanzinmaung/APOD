import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Video,
} from 'react-native';

import {WebView} from 'react-native-webview';

export default class Overall extends Component {
  static navigationOptions = {
    title: 'Galacticon',
    headerStyle: {
      backgroundColor: '#53bbb4',
    },
    headerTintColor: '#fff',
    headerLayoutPreset: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      isLoading: true,
      output: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      'https://api.nasa.gov/planetary/apod?&api_key=d3XnbOryRhiUEWQMpSqASXTZnEzpCtYYQwPbWwbb&start_date=2020-1-20&end_date',
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoading: false,
          // refreshing:false,
          output: res,
          media: res.media_type,
        });
      })
      .catch(error => {
        console.log('error =', error);
      });
  }

  renderSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#b7c0c7',
          gradient: 0.5,
        }}
      />
    );
  };

  render() {
    const apod = this.state.output;
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.output}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeperator}
            renderItem={({item}) => (
              <View>
                <Text style={styles.text}>{item.date}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {
                      date: item.date,
                      name: item.title,
                    })
                  }>
                  {this.state.media === 'image' ? (
                    <Image
                      source={{uri: item.url}}
                      style={{width: 370, height: 250, paddingVertical: 20}}
                    />
                  ) : (
                    <WebView
                      javaScriptEnabled={true}
                      source={{uri: item.url}}
                      style={{width: 370, height: 250}}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.titletext}>{item.title}</Text>
                <Text />
              </View>
            )}
          />
        </View>
      );
    }
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
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
