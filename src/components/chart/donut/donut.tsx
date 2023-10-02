import { StyleSheet } from "react-native";
import { Canvas, Path, Skia, Text } from "@shopify/react-native-skia";
import type { SkFont } from "@shopify/react-native-skia";
import { colors } from "@/design-system/color/palettes";
import { Box } from "@/design-system/components/atoms/box";

type DonutChartProps = {
  strokeWidth: number;
  radius: number;
  font: SkFont;
  smallerFont: SkFont;
  targetPercentage: number;
  amount: number;
  message: string;
};

export default function DonutChart({
  strokeWidth,
  radius,
  font,
  smallerFont,
  targetPercentage,
  amount,
  message,
}: DonutChartProps) {
  const innerRadius = radius - strokeWidth / 2;
  const endAngle = 2 * Math.PI * targetPercentage - Math.PI / 2;
  const backgroundPath = Skia.Path.Make();
  const path = Skia.Path.Make();

  backgroundPath.addCircle(radius, radius, innerRadius);

  path.moveTo(radius, 0);
  for (let angle = -Math.PI / 2; angle <= endAngle; angle += 0.01) {
    path.lineTo(
      radius + innerRadius * Math.cos(angle),
      radius + innerRadius * Math.sin(angle),
    );
  }
  const textWidth = font.measureText(amount.toString()).width;
  const textHeight = font.measureText(amount.toString()).height;
  const messageTextWidth = smallerFont.measureText(message.toString()).width;
  const messageTextCenterX = radius - messageTextWidth / 2;
  const centerX = radius - textWidth / 2;
  const centerY = radius;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <Box flex={1}>
      <Canvas style={styles.container}>
        <Path
          path={backgroundPath}
          color={colors.secondary}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
        />
        <Path
          path={path}
          color={colors.primary}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
        />
        <Text
          x={centerX}
          y={centerY}
          text={amount.toString()}
          font={font}
          color={colors.primary}
        />
        <Text
          x={messageTextCenterX}
          y={centerY + textHeight}
          text={message.toString()}
          font={smallerFont}
          color={colors.primary}
        />
      </Canvas>
    </Box>
  );
}
