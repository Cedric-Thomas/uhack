import React, { useState } from 'react';
import { PermissionsAndroid, Button, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Our app needs access to your location to provide features.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      return true
    } else {
      console.log('Location permission denied');
      return false
    }
  } catch (err) {
    console.log(err);
    return false
  }
};

export const HomeScreen = () => {

  const [location, setLocation] = useState(false);

  const getLocation = async () => {
    const GpsPerm = await requestLocationPermission();
    if ( ! GpsPerm) {
      return false
    }
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        setLocation(position)
        return true
      },
      (error) => {
        console.log(error)
        return false
      },
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 10000 }
    )
  }

  const getAcceleration = async () => {

  }

  return (
    <View>
      <Text>Home</Text>
      <Button title="Get Location" onPress={getLocation} />
        <View>
          <Text>Latitude: {location ? location.coords.latitude : null}</Text>
          <Text>Longitude: {location ? location.coords.longitude : null}</Text>
        </View>
      <Button title="Get Acceleration" onPress={getAcceleration} />
    </View>
  );
};
