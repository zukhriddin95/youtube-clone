import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import SearchCard from '../components/searchCard'
import Sidebar from '../components/sidebar'
import { clearVideo } from '../redux'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { HomePageVideos } from '../types'
import Spinner from './spiner'
import { useMediaQuery } from 'react-responsive'
import { getSearchPageVideos } from '../redux/reducer/getSearchPageVideo'

const Search = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const videos = useAppSelector((state) => state.youtubeApp.videos)
	const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
	const [isToggle, setIsToggle] = useState(false)


	const handleClick = () => {
		setIsToggle(!isToggle)
	}

	useEffect(() => {
		dispatch(clearVideo())
		if (searchTerm === '') navigate('/')
		else {
			dispatch(getSearchPageVideos(false))
		}
	}, [dispatch, navigate, searchTerm])

	

	return (
		<div className='max-h-screen overflow-hidden'>
			<div style={{ height: '7.5vh' }}>
				<Navbar  handleClick={handleClick} />
			</div>
			<div className='flex  mb-[200px]' style={{ height: '92.5vh' }}>
				<Sidebar isMobile={isMobile} isToggle={isToggle}  />
				{videos.length ? (
					<div className='py-8 pl-8 flex flex-col gap-5 w-full '>
						<InfiniteScroll
							dataLength={videos.length}
							next={() => dispatch(getSearchPageVideos(true))}
							hasMore={videos.length < 500}
							loader={<Spinner />}
							height={600}
						>
							{videos.map((item: HomePageVideos) => {
								return (
									<div className='my-5 '>
										<SearchCard data={item} key={item.videoId} />
									</div>
								)
							})}
						</InfiniteScroll>
					</div>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	)
}

export default Search
