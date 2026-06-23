import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditation-data";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { TimerContext } from "@/context/TimerContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAudioPlayer } from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
  const player = useAudioPlayer(AUDIO_FILES[audioFileName]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (secondsRemaining === 0) {
      if (isPlayingAudio) player.pause();
      setMeditating(false);
      setPlayingAudio(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating, isPlayingAudio, player, setDuration]);

  useEffect(() => {
    return () => {
      setDuration(10);
    };
  }, []);

  const togglePlayPause = () => {
    if (!isPlayingAudio) {
      player.play();
      setPlayingAudio(true);
    } else {
      player.pause();
      setPlayingAudio(false);
    }
  };

  async function toggleMeditationSessionStatus() {
    if (secondsRemaining === 0) setDuration(10);
    setMeditating(!isMeditating);
    togglePlayPause();
  }
  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration");
  };

  // Format the timeLeft to ensure two digits are displayed
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60),
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="left-circle" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200/50 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;
