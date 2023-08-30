import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Callout,
} from 'react-native-maps';
import Loading from '../components/Loading/Loading';

import Geolocation from '@react-native-community/geolocation';
import routeService from '../services/route-service';
import electricStationService from '../services/electric-station-service';

const Home = () => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState([]);
  const [region, setRegion] = useState();
  const [data, setData] = useState([]);
  const [followLocation, setFollowLocation] = useState(false);
  const [distance, setDistance] = useState(0);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDrMiBcs9yb5wQ0EJZaUZJ0RgIqrOYLKe0';
  const mapRef = useRef();

  useEffect(() => {
    getOneTimeLocation();
    getStations();
  }, []);

  const getStations = () => {
    setLoading(true);
    electricStationService
      .getStations()
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLocation({lat: currentLatitude, long: currentLongitude});
        setRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      },
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const getRoute = item => {
    console.log(item);
    routeService
      .getRoute(location, item)
      .then(res => {
        setDistance(res?.data?.features[0]?.properties?.summary?.distance);
        let coords = [];
        res?.data?.features?.[0]?.geometry?.coordinates?.map(x => {
          coords.push({latitude: x[1], longitude: x[0]});
        });
        setRoute(coords);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onUserLocationChange = value => {
    const {latitude, longitude, heading} = value.nativeEvent.coordinate;

    setLocation({lat: latitude, long: longitude});
    if (followLocation) {
      mapRef?.current?.animateCamera(
        {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          heading,
          pitch: 90,
          zoom: 18,
        },
        {duration: 1000},
      );
    }
  };

  const renderMarkers = () => {
    return data.map(x => {
      return (
        <Marker
          key={Math.random()}
          coordinate={{
            latitude: x?.latitude,
            longitude: x?.longitude,
          }}>
          <Image source={require('./station.png')} />
          <Callout
            tooltip
            onPress={() => getRoute({lat: x?.latitude, lng: x?.longitude})}>
            <Pressable
              style={{padding: 10, backgroundColor: 'white', width: 250}}>
              <Text>{x?.name}</Text>
              <Text>{x?.phone}</Text>
              <Text>{x?.street}</Text>
            </Pressable>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'white',
          padding: 10,
          zIndex: 99,
        }}>
        <Text>Mesafe</Text>
        <Text>{distance / 1000} km</Text>
      </View>
      <Pressable
        onPress={() => setFollowLocation(!followLocation)}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: 'white',
          padding: 10,
          zIndex: 99,
        }}>
        <Text>{followLocation ? 'Durdur' : 'Başlat'}</Text>
      </Pressable>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        loadingEnabled
        apikey={GOOGLE_MAPS_APIKEY}
        showsUserLocation={true}
        region={region}
        onUserLocationChange={onUserLocationChange}>
        {data && renderMarkers()}
        <Polyline coordinates={route} strokeColor="blue" strokeWidth={5} />
      </MapView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default Home;
