import AppGradient from "@/components/AppGradient";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AFFIRMATION_GALLERY from "@/constants/affirmation-galary";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <AppGradient
        // Background Linear Gradient
        colors={["#2e1f58", "#54426b", "#a790af"]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your thounght with affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((g) => (
              <GuidedAffirmationsGallery
                key={g.title}
                title={g.title}
                previews={g.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
};

export default Page;
