import { useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import type {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import type { Region } from "react-native-maps";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Close } from "@/components/icons/close";
import { colors } from "@/design-system/color/palettes";
import { Box } from "@/design-system/components/atoms/box";
import { Chip } from "@/design-system/components/atoms/chip";
import { Spacer } from "@/design-system/components/atoms/spacer";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Row } from "@/design-system/components/layouts/row";
import DebugLayout from "@/design-system/lib/debug-layout";
import { useActiveValue } from "@/hooks/useActiveValue";
import { useEffectIgnoreDeps } from "@/hooks/useEffectIgnoreDeps";
import { hitSlopLarge } from "@/lib/hitSlop";
import { convertMinutes, formatKms } from "@/lib/units";

const activeChallenges = [];

type NewChallengeScreenProps = {};

type FilterItems = "Distance" | "Flights";
const chipOptions: Array<{ id: number; label: string; view: FilterItems }> = [
  { id: 1, label: "Distance", view: "Distance" },
  { id: 2, label: "Flights", view: "Flights" },
];

type Location = Pick<Region, "latitude" | "longitude">;

type ChallengeSearchProps = {
  direction: "from" | "to";
  handleSetDistance: ({ latitude, longitude }: Location) => void;
};
export function ChallengeSearch({
  direction,
  handleSetDistance,
}: ChallengeSearchProps) {
  /**
   * Requirements:
   * - there should be 2 search bars
   * - only once both are populated
   *   should the search button appear
   * - when pressing search, there should
   *   be logic that takes the two
   *   coordinates and works out the
   *   distance between the two
   */

  function handleInvokeSearch(
    _: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) {
    if (details === null) return;
    const { lat, lng } = details.geometry.location;
    handleSetDistance({
      latitude: lat,
      longitude: lng,
    });
  }

  return (
    <Box>
      <Text style={styles.searchText}>{direction}:</Text>
      <GooglePlacesAutocomplete
        placeholder={`Search ${direction}:`}
        fetchDetails
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        onPress={handleInvokeSearch}
      />
    </Box>
  );
}

function calculateMidPoint(
  latA: number,
  lngA: number,
  latB: number,
  lngB: number,
  margin = 0.01,
): {
  midpoint: [number, number];
  latDelta: number;
  lngDelta: number;
} {
  const midPointLat = (latA + latB) / 2;
  const midPointLng = (lngA + lngB) / 2;
  const latDelta = Math.abs(latA - latB) + margin;
  const lngDelta = Math.abs(lngA - lngB) + margin;

  return {
    midpoint: [midPointLat, midPointLng],
    latDelta,
    lngDelta,
  };
}

const { width, height } = Dimensions.get("window");

export default function NewChallengeScreen({}: NewChallengeScreenProps) {
  const [distanceFrom, setDistanceFrom] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [distanceTo, setDistanceTo] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  function handleSetDistanceFrom({ latitude, longitude }: Location) {
    setDistanceFrom({ latitude, longitude });
  }
  function handleSetDistanceTo({ latitude, longitude }: Location) {
    setDistanceTo({ latitude, longitude });
  }

  // this is what should add the challenge to global/persisted state
  function handleSetDistanceChallenge() {}

  const mapRef = useRef<MapView>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const { t } = useTranslation();
  const { params } = useRoute();
  const { value, handleActiveValue } = useActiveValue();
  const [currentFilter, setCurrentFilter] = useState<FilterItems | string>(
    // if user comes through deep link, use the params
    params?.filter || "Distance",
  );

  const isDistanceSet =
    distanceFrom.latitude !== 0 &&
    distanceFrom.longitude !== 0 &&
    distanceTo.latitude !== 0 &&
    distanceTo.longitude !== 0;

  const mapLoading = useSharedValue(0);
  const textLoading = useSharedValue(1);

  const mapLoadingStyles = useAnimatedStyle(() => ({
    opacity: mapLoading.value,
  }));
  const textLoadingStyles = useAnimatedStyle(() => ({
    opacity: textLoading.value,
  }));

  useEffectIgnoreDeps(() => {
    if (isDistanceSet) {
      mapLoading.value = withTiming(1);
      textLoading.value = withTiming(0);
    } else {
      mapLoading.value = withTiming(0);
      textLoading.value = withTiming(1);
    }
  }, [isDistanceSet]);

  return (
    <>
      <Box position="absolute" top="15px" right="15px" zIndex="10px">
        <Close />
      </Box>
      <MainScreenLayout>
        <Box alignItems="center" paddingTop="30px">
          <Text level="heading" size="23px" color="black">
            Choose a measurement
          </Text>
        </Box>
        <Box alignItems="center">
          <Row
            marginHorizontal="15px"
            marginTop="12px"
            marginBottom="10px"
            gutter="5px"
            a11yRole="tablist"
            scroll
          >
            {chipOptions.map(({ id, label, view }, index) => {
              return (
                <Chip
                  key={id}
                  label={label}
                  onPress={() => {
                    handleActiveValue(index);
                    setCurrentFilter(view);
                  }}
                  a11yLabel={t("screen.stats.tabs.a11yLabel")}
                  a11yRole="menu"
                  hitSlop={hitSlopLarge}
                  isSelected={index === value}
                  size="16px"
                  height="36px"
                />
              );
            })}
          </Row>
        </Box>

        <Box>
          {currentFilter === "Distance" && (
            <Box>
              <Box>
                <ChallengeSearch
                  direction="from"
                  handleSetDistance={handleSetDistanceFrom}
                />
              </Box>
              <Spacer height="20px" />
              <Box>
                <ChallengeSearch
                  direction="to"
                  handleSetDistance={handleSetDistanceTo}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Box>{currentFilter === "Flights" && <Text>Flights</Text>}</Box>

        <DebugLayout>
          <Text>Distance: {formatKms(distance)}</Text>
          <Text>Duration: {convertMinutes(duration)}</Text>
        </DebugLayout>

        <DebugLayout>
          <Animated.View style={textLoadingStyles}>
            <Text>Loading...</Text>
          </Animated.View>
          <Animated.View style={mapLoadingStyles}>
            <Box styles={{ height: height / 2 }}>
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: distanceFrom.latitude,
                  longitude: distanceFrom.longitude,
                  latitudeDelta: distanceTo.latitude,
                  longitudeDelta: distanceTo.longitude,
                }}
                style={StyleSheet.absoluteFill}
              >
                {isDistanceSet && (
                  <MapViewDirections
                    // @ts-expect-error
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
                    origin={{
                      latitude: distanceFrom.latitude,
                      longitude: distanceFrom.longitude,
                    }}
                    destination={{
                      latitude: distanceTo.latitude,
                      longitude: distanceTo.longitude,
                    }}
                    mode="WALKING"
                    onReady={(result) => {
                      setDistance(result.distance);
                      setDuration(result.duration);
                      mapRef.current?.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                          right: width / 20,
                          bottom: height / 20,
                          left: width / 20,
                          top: height / 20,
                        },
                      });
                    }}
                    strokeColor={colors.primary}
                    strokeWidth={6}
                  />
                )}
              </MapView>
            </Box>
          </Animated.View>
        </DebugLayout>
      </MainScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
  searchText: {
    textTransform: "capitalize",
  },
});
