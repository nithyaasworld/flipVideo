import React, { useEffect, useRef, useState } from "react";
import { Center, HStack, Icon, VStack } from "native-base";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { Image, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as VideoThumbnails from "expo-video-thumbnails";

export default function VideoCard({ videoURL, video, favList, watchLaterList, setfavList, setWatchLaterList }) {
  const [selected, setSelected] = useState(0);
  const [image, setImage] = useState(null);
  const [addToWatch, setAddToWatch] = useState(false);
  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoURL, {
        time: 5000,
      });
      setImage(uri);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    generateThumbnail();
  }, []);

  const checkIfFavorited = (video) => {
    return favList.some(item => item.id === video.id);
  }
  const checkIfAddedToWatchLater = (video) => {
    return watchLaterList.some(item => item.id === video.id);
  }

  return (
    <VStack
      m={3}
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
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: videoURL,
          }
        }}
        style={{ height: 250 }}
        defaultControlsVisible
        activityIndicator
      />
    
      <HStack m={3}>
        <Pressable
          opacity={checkIfFavorited ? 1 : 0.5}
          py={2}
          flex={1}
          onPress={() => setfavList(prev => prev.push(video))}
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
          opacity={addToWatch ? 1 : 0.6}
          py={2}
          flex={1}
          onPress={() => setAddToWatch(true)}
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
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
    </VStack>
  );
}
// const styles = StyleSheet.create({
//   image: {
//     width: "100%",
//     height: 250,
//   },
// });
