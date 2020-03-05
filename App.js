import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback,Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [text, setText] = useState('Haaga-Helia UAS');
  const [map, setMap] = useState({
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
});
  const [location, setLocation] = useState({
          latitude: 60.201373,
          longitude: 24.934041,
})
  const getLocation = () => {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=PYgVpcqfrzY0sjRhOwzMBRzCOAPANQ1c&location=${text}`)
  .then(res => res.json())
  .then(res=>
        {
          setMap({...map,
            latitude:res.results[0].locations[0].latLng.lat,
            longitude:res.results[0].locations[0].latLng.lng,
});
    console.log(map)

})}
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }} region={map}>
        <Marker
        coordinate={{latitude:map.latitude, longitude:map.longitude}}
        title={text} />
      </MapView>
      <TextInput
        style={{width: '100%', height: 30, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button onPress={getLocation} title="Search" />
    </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
