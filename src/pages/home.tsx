import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMediaQuery } from 'react-responsive'
import Card from '../components/card'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import { clearVideo } from '../redux'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getHomePageVideos } from '../redux/reducer/getHomePage'
import Spinner from './spiner'

const Home = () => {
	const dispatch = useAppDispatch()
	const videos = useAppSelector((state) => state.youtubeApp.videos)
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
	const [isToggle, setIsToggle] = useState(true)


	const handleClick = () => {
		setIsToggle(!isToggle)
	}
	useEffect(() => {
		return () => {
			dispatch(clearVideo())
		}
	}, [dispatch])

	useEffect(() => {
		dispatch(getHomePageVideos(false))
	}, [dispatch])

	return (
		<div className='max-h-screen overflow-hidden '>
			<div style={{ height: '7.5vh' }}>
				<Navbar handleClick={handleClick} />
			</div>
			<div className='flex mt-3 mb-[200px]' style={{ height: '92.5vh' }}>
				<Sidebar isMobile={isMobile} isToggle={isToggle} />
				{videos.length ? (
					<InfiniteScroll
						dataLength={videos.length}
						next={() => dispatch(getHomePageVideos(true))}
						hasMore={videos.length < 500}
						loader={<Spinner />}
						height={650}
					>
						<div className='w-full grid gap-y-14 gap-x-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 p-8'>
							{videos.map((item) => {
								return <Card data={item} key={item.videoId} />
							})}
						</div>
					</InfiniteScroll>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	)
}

export default Home
