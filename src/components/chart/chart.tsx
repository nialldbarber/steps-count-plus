import { StyleSheet, useWindowDimensions } from "react-native";
import * as haptics from "expo-haptics";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LineChart } from "react-native-wagmi-charts";

type ChartProps = {
  data: any;
};

export default function Chart({ data }: ChartProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Medium);
  }

  const { width } = useWindowDimensions();

  return (
    <GestureHandlerRootView style={styles.container}>
      <LineChart.Provider data={data}>
        <LineChart width={width - 40} height={300}>
          <LineChart.Path color="#ef4444">
            <LineChart.Gradient />
          </LineChart.Path>
          <LineChart.CursorCrosshair
            onActivated={invokeHaptic}
            onEnded={invokeHaptic}
          >
            <LineChart.Tooltip />
          </LineChart.CursorCrosshair>
        </LineChart>
        <LineChart.PriceText />
        <LineChart.DatetimeText />
      </LineChart.Provider>
    </GestureHandlerRootView>
  );
}
