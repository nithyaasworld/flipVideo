import React from "react";

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
  IconButton,
  StatusBar,
} from "native-base";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import VideoCard from "./components/VideoCard";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};
export default function App() {
  const [selected, setSelected] = React.useState(0);
  return (
    <NativeBaseProvider config={config}>
      <StatusBar bg="indigo.700" barStyle="light-content" />
      <Box safeAreaTop bg="indigo.700" />
      <HStack
        bg="indigo.700"
        px={1}
        py={1}
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontSize={26} fontWeight="bold">
          Home
        </Text>
      </HStack>
      <Box flex={1} bg="white">
        <Text alignSelf="center" color="indigo.700" p={2}>
          Your videos for today
        </Text>
        <ScrollView>
         <VideoCard uri="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></VideoCard>
         
        </ScrollView>
        <HStack bg="indigo.700" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            opacity={selected === 0 ? 1 : 0.5}
            py={2}
            flex={1}
            onPress={() => setSelected(0)}
          >
            <Center>
              <Icon
                mb={1}
                as={<MaterialCommunityIcons name="home" />}
                color="white"
                size="xs"
              />
              <Text color="white" fontSize={14}>
                Home
              </Text>
            </Center>
          </Pressable>
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
                size="xs"
              />
              <Text color="white" fontSize={14}>
                Favorites
              </Text>
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
                mb={1}
                as={<MaterialIcons name="watch-later" />}
                color="white"
                size="xs"
              />
              <Text color="white" fontSize={14}>
                Watch Later
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
