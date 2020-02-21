import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { current_location, locations }
  } = useContext(LocationContext);

  if (!current_location) {
    return <ActivityIndicator size="large" style={{ marginTop: 2000 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...current_location.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle
        center={current_location.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />

      <Polyline coordinates={locations.map(location => location.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
