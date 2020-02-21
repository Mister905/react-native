import React, { useContext } from "react";
import { SafeAreaView } from "react-navigation";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { navigate } from "../navigation_ref";

const TrackForm = props => {

  const {
    state: { recording, locations },
    start_recording,
    stop_recording,
    reset_location
  } = useContext(LocationContext);

  const {
    state: { track_name },
    save_track,
    update_track_name,
    reset_track_name
  } = useContext(TrackContext);

  return (
    <SafeAreaView>
      <Spacer>
        <Input
          placeholder="Enter Track Name"
          value={track_name}
          onChangeText={update_track_name}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title="Stop Recording" onPress={stop_recording} />
        ) : (
          <Button title="Start Recording" onPress={start_recording} />
        )}
      </Spacer>

      <Spacer>
        {!recording && locations.length ? (
          <Button
            title="Save Recording"
            onPress={async () => {
              await save_track(track_name, locations);
              reset_track_name();
              reset_location();
              navigate("TrackList");
            }}
          />
        ) : null}
      </Spacer>
    </SafeAreaView>
  );
};

export default TrackForm;
