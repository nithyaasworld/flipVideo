import React from "react";
import { Center, HStack, Icon, VStack } from "native-base"
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function VideoCard({uri}){
  const [selected, setSelected] = React.useState(0);
  return (
    <VStack
    mx={3}
    px={3}
    pt={3}
    borderRadius="lg"
    alignItems="center"
    shadow={6}
    bg={{
      linearGradient: {
        colors: ["lightBlue.300", "indigo.700"],
        start: [0, 0],
        end: [1, 0],
      },
    }}
  >
    <VideoPlayer
      videoProps={{
        resizeMode: Video.RESIZE_MODE_COVER,
        source: {
          uri: uri,
        },
      }}
      style={{ height: 200 }}
    />
    <HStack m={3}>
      <Pressable
        opacity={selected === 1 ? 1 : 0.5}
        py={2}
        flex={1}
        onPress={() => setSelected(1)}
      >
        <Center>
          <Icon
            mb={1}
            as={<MaterialCommunityIcons name="heart" />}
            color="white"
            size="md"
          />
        </Center>
      </Pressable>
      <Pressable
        opacity={selected === 2 ? 1 : 0.6}
        py={2}
        flex={1}
        onPress={() => setSelected(2)}
      >
        <Center>
          <Icon
            as={<MaterialIcons name="watch-later" />}
            color="white"
            size="md"
          />
        </Center>
      </Pressable>
    </HStack>
    </VStack>
  )
}