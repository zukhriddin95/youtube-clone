import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from '../../types'
import { parseData } from '../../utils/parseData'
import { YOUTUBE__API__URL } from '../../server'


const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVidoes",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE__API__URL}/search?maxResults=20&q="react Js projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    console.log(items);
    
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
	
  }
);