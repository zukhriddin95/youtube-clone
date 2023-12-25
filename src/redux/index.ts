import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { InitialState } from '../types/index'
import { getHomePageVideos } from './reducer/getHomePage'
import { getVideoDetails } from './reducer/getVideoDetail'
import { getRecommendedVideos } from './reducer/getRecommendedVideos'
import { getSearchPageVideos } from './reducer/getSearchPageVideo'

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
  searchTerm: ''
}

const YoutubeSlice = createSlice({
	name: 'youtubeApp',
	initialState,
	reducers: {
		clearVideo: (state) => {
			state.videos = [];
			state.nextPageToken = null;
		},
		changeSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload
		} ,
		clearSearchTerm: (state) => {
			state.searchTerm = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getHomePageVideos.fulfilled,(state,action) => {
			state.videos = action.payload.parsedData
			state.nextPageToken = action.payload.nextPageToken
		})
		
		
		builder.addCase(getSearchPageVideos.fulfilled,(state,action) => {
			state.videos = action.payload.parsedData
			state.nextPageToken = action.payload.nextPageToken
		})
		builder.addCase(getVideoDetails.fulfilled, (state, action) => {
			state.currentPlaying = action.payload;
		  });
		  builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
			state.recommendedVideos = action.payload.parsedData;
		  });
	},
})

export const store = configureStore({
	reducer: {
		youtubeApp: YoutubeSlice.reducer,
	},
})

export const {clearVideo, changeSearchTerm, clearSearchTerm} = YoutubeSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch