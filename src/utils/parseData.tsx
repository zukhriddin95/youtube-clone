import axios from 'axios'
import { YOUTUBE__API__URL } from '../server'
import { HomePageVideos } from '../types'
import { parseVideoDuration } from './parseVideoDuration'
import { convertRawViewstoString } from './convertRawViewsToString'
import { timeSince } from './timeSince'
import { ReactNode } from 'react'
import { JSX } from 'react/jsx-runtime'



const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseData = async (items: any[]) => {
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    items.forEach(
      (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
        channelIds.push(item.snippet.channelId);
        videoIds.push(item.id.videoId);
      }
    );

    const {
      data: { items: channelsData },
    } = await axios.get(
      `${YOUTUBE__API__URL}/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData: { id: string; image: string }[] = [];
    channelsData.forEach(
      (channel: {
        id: string;
        snippet: { thumbnails: { default: { url: string } } };
      }) =>
        parsedChannelsData.push({
          id: channel.id,
          image: channel.snippet.thumbnails.default.url,
        })
    );

    const {
      data: { items: videosData },
    } = await axios.get(
      `${YOUTUBE__API__URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    const parsedData: HomePageVideos[] = [];
    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number
      ) => {
        const { image: channelImage } = parsedChannelsData.find(
          (data) => data.id === item.snippet.channelId
        )!;
        if (channelImage)
          parsedData.push({
			  videoId: item.id.videoId,
			  videoTitle: item.snippet.title,
			  videoDescription: item.snippet.description,
			  videoThumbnail: item.snippet.thumbnails.medium.url,
			  videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
			  videoDuration: parseVideoDuration(
				  videosData[index].contentDetails.duration
			  ),
			  videoViews: convertRawViewstoString(
				  videosData[index].statistics.viewCount
			  ),
			  videoAge: timeSince(new Date(item.snippet.publishedAt)),
			  channelInfo: {
				  id: item.snippet.channelId,
				  image: channelImage,
				  name: item.snippet.channelTitle,
			  },
			  map: function (arg0: (item: HomePageVideos) => JSX.Element): ReactNode {
				  throw new Error('Function not implemented.')
			  }
		  });
      }
    );

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};