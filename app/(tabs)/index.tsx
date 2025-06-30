import { routeConfig } from "@/config/routeConfig";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-semibold text-accent text-5xl">Welcome.</Text>
      <Link href={routeConfig.onboarding}>Proceed to onboarding</Link>
    </View>
  );
}
