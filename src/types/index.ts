
export interface InitialState {
	videos: HomePageVideos[];
	currentPlaying: CurrentPlaying | null;
	searchTerm: string;
	searchResults: [];
	nextPageToken: string | null;
	recommendedVideos: RecommendedVideos[];
  }
  
  export interface HomePageVideos {
	map(arg0: (item: HomePageVideos) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
	videoId: string;



	videoTitle: string;
	videoDescription: string;
	videoLink: string;
  
	videoThumbnail: string;
	videoDuration: string;
	videoViews: string;
	videoAge: string;
	channelInfo: {
	  id: string;
	  image: string;
	  name: string;
	};
  }
  
  export interface CurrentPlaying {
	videoId: string;
	
	videoTitle: string;
	videoDescription: string;
	videoViews: string;
	videoLikes: string;
	videoAge: string;
	channelInfo: {
	  id: string;
	  image: string;
	  name: string;
	  subscribers: string;
	};
  }
  
  export interface RecommendedVideos {
	videoId: string;
	videoTitle: string;
	videoThumbnail: string;
	videoDuration: string;
	videoViews: string;
	videoAge: string;
	channelInfo: {
	  id: string;
	  name: string;
	};
  }
  
  export interface Item {
	channelId: any
	snippet: {
	  title: string;
	  thumbnails: { medium: { url: string } };
	  publishedAt: Date;
	  channelTitle: string;
	  channelId: string;
	  
	};
	contentDetails: { upload: { videoId: string } };
  }

  export interface CommitsProps {
	videoId: string;
	commit:string;
	videoTitle: string;
	videoDescription: string;
	videoViews: string;
	videoLikes: string;
	videoAge: string;
	channelInfo: {
	  id: string;
	  image: string;
	  name: string;
	  subscribers: string;
	};
  }