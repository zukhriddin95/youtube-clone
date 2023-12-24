import { Link } from 'react-router-dom'
import { HomePageVideos } from '../types'

const Card = ({ data }: { data: HomePageVideos }) => {
	return <div className=' sm:max-w-64 sm:max-h-60 flex gap-3 flex-col '>
		<div className='relative'>
			<span className='absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10'>
				{data.videoDuration}
			</span>
			<Link to={`/watch/${data.videoId}`}>
				<img src={data.videoThumbnail} alt='video-image' className='w-full'  />
			</Link>
		</div>
		<div className='flex gap-2'>
			<div className='min-w-fit'>
				<a href='#' className=''>
					<img src={data.channelInfo.image} className='h-9 w-9 rounded-full' alt='channel' />
				</a>
			</div>
			<div>
          <h3>
            <a href="#" className="line-clamp-2">
              {data.videoTitle}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <a href="#" className="hover:text-white">
                {data.channelInfo.name}
              </a>
            </div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
		</div>
		
 
	</div>
}

export default Card
