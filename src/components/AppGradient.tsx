import { StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Content from "./Content";

const AppGradient = ({
  children,
  colors,
}: {
  children: any;
  colors: readonly [string, string, ...string[]];
}) => {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <Content>{children}</Content>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppGradient;
