import "@/global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { ErrorBoundary } from "@/components/error-boundary";
import { COLORS } from "@/constants/theme";
import { AppQueryProvider } from "@/providers/query-provider";

/** Custom Paper theme using our primary color */
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.primaryDark,
  },
};

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AppQueryProvider>
        <PaperProvider theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="pokemon/[id]" />
          </Stack>
          <StatusBar style="auto" />
        </PaperProvider>
      </AppQueryProvider>
    </ErrorBoundary>
  );
}
