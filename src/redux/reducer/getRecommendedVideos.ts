import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { YOUTUBE__API__URL } from '../../server'
import { RecommendedVideos } from '../../types'
import { parseRecommendedData } from '../../utils/parseRecommended'


const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "yotubeApp/getRecommendedVideos",
  async (videoId: string, { getState }) => {
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState() as RootState;

    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE__API__URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );

    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    );

    return { parsedData };
  }
);