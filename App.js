import React, { useEffect, useState } from "react";

import {
  NativeBaseProvider,
  Box,
  Text,
  Icon,
  HStack,
  Center,
  Pressable,
  StatusBar,
} from "native-base";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import VideoCard from "./components/VideoCard";
import {API_KEY, GetAllVideos_URI } from "./apiConfig";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};
export default function App() {
  const [selected, setSelected] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [favList, setfavList] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [edgeWorks, setEdgeWorks] = useState(false);

  const getVideos = async() => {
    let allVideos = await fetch(GetAllVideos_URI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY,
      },
    }).then(resp => resp.json());
    setVideoList(allVideos.filter(video => video.id >= 2085));
  }
 
  const checkEdgeWorks = async (url) => {
    const result = await fetch(url + `&api_key=${API_KEY}`, {
      method: 'GET',
    })
    if(result.status === 200) {
      setEdgeWorks(true);
    }else {
      setEdgeWorks(false);
    }
  }

  useEffect(() =>{
    getVideos();
  },[]);
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
        { selected === 1 ? "Favorites" : selected === 2 ? "Watch Later" : "Home" }
        </Text>
      </HStack>
      
      <Box flex={1} bg="white">
        <Text alignSelf="center" fontSize={26} color="indigo.700" p={2}>
          { selected === 1 ? "Your Favorites" : selected === 2 ? "Your Bookmark" : "Videos for You" }
        </Text>
        <ScrollView>
          {selected === 0 && (videoList.length > 0 ? videoList.map(video => {
            checkEdgeWorks(video.content_url);
            if(edgeWorks){
              return <VideoCard key={video.id} videoItem={video} favList={favList} watchLaterList={watchLaterList} setfavList={setfavList} setWatchLaterList={setWatchLaterList} videoURL={video.content_url} />
            }else {
              return  <VideoCard key={video.id} videoItem={video} favList={favList} watchLaterList={watchLaterList} setfavList={setfavList} setWatchLaterList={setWatchLaterList} videoURL={video.partner_content_url } />
            }
          }) : <Text style={{textAlign: 'center', paddingTop: 10 }}>No videos at the moment. Please check back later</Text> )}

          {selected === 1 && (favList.length > 0 ? favList.map(video => {
            checkEdgeWorks(video.content_url);
            if(edgeWorks){
              return <VideoCard key={video.id} videoItem={video} favList={favList} watchLaterList={watchLaterList} setfavList={setfavList} setWatchLaterList={setWatchLaterList} videoURL={video.content_url} />
            }else {
              return  <VideoCard key={video.id} videoItem={video} favList={favList} watchLaterList={watchLaterList} setfavList={setfavList} setWatchLaterList={setWatchLaterList} videoURL={video.partner_content_url} />
            }
          }) : <View>
          <Text style={{textAlign: 'center', paddingTop: 10 }}>Please favorite some videos </Text>
          <Text style={{textAlign: 'center', paddingTop: 10 }}>ʕ•́ᴥ•̀ʔっ♡</Text></View> )}

          {selected === 2 && (watchLaterList.length > 0 ? watchLaterList.map(video => {
            checkEdgeWorks(video.content_url);
            if(edgeWorks){
              return <VideoCard key={video.id} videoItem={video} favList={favList} watchLaterList={watchLaterList} setfavList={setfavList} setWatchLaterList={setWatchLaterList} videoURL={video.content_url} />
            }else {
              return  <VideoCard key={video.id} videoItem={video} favList={favList} watchLaterList={watchLaterList} setfavList={setfavList} setWatchLaterList={setWatchLaterList} videoURL={video.partner_content_url} />
            }
          }) : <View>
          <Text style={{textAlign: 'center', paddingTop: 10 }}>Videos marked as Waͣᴛⷮcͨhͪ Laͣᴛⷮeͤrͬ</Text>
          <Text style={{textAlign: 'center', paddingTop: 10 }}>will appear here</Text></View> )}

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
