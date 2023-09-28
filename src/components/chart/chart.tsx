import { memo } from "react";
import { useWindowDimensions } from "react-native";
import * as haptics from "expo-haptics";
import { LineChart } from "react-native-wagmi-charts";

type ChartProps = {
  data: any;
};

function Chart({ data }: ChartProps) {
  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Medium);
  }

  const { width } = useWindowDimensions();

  return (
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
  );
}

export default memo(Chart);
