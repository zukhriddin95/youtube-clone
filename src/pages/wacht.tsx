/* eslint-disable @typescript-eslint/no-use-before-define */
import {  useEffect, useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import { HiScissors } from 'react-icons/hi'
import { MdOutlinePlaylistAdd } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import WatchCard from '../components/watchCard'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getRecommendedVideos } from '../redux/reducer/getRecommendedVideos'
import { getVideoDetails } from '../redux/reducer/getVideoDetail'
import CommitPage from '../components/commit-page'


function Watch() {
	const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false)
	const { id } = useParams()
	const dispatch = useAppDispatch()

	
	

	const navigate = useNavigate()
	const currentPlaying = useAppSelector(
		(state) => state.youtubeApp.currentPlaying
	)
	const recommendedVideos = useAppSelector(
		(state) => state.youtubeApp.recommendedVideos
	)
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
	const [isToggle, setIsToggle] = useState(false)

	useEffect(() => {
		if (id) {
			dispatch(getVideoDetails(id))
			setShowMoreStatus(false)
		} else {
			navigate('/')
		}
	}, [id, navigate, dispatch])

	useEffect(() => {
		if (currentPlaying && id) dispatch(getRecommendedVideos(id))
	}, [currentPlaying, dispatch, id])
	const handleClick = () => {
		setIsToggle(!isToggle)
	}
	
	return (
		<>
			{currentPlaying && currentPlaying?.videoId === id && (
				<div className='max-h-screen overflow-hidden'>
					<div style={{ height: '7.5vh' }}>
						<Navbar handleClick={handleClick} />
					</div>
					<div className='flex xl:w-full' style={{ height: '92.5vh' }}>
						<div className='flex flex-col xl:flex-row gap-y-10 gap-x-5 p-7  mr-0 w-full overflow-auto'>
							<div className='w-full' style={{ maxWidth: '800px' }}>
								<div className=''>
									<iframe
										className='relative top-0 left-0 bottom-0 right-0 w-full h-[350px]'
										src={`https://www.youtube.com/embed/${id}?autoplay=1`}
										title='YouTube video player'
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
									></iframe>
									<div className='mt-5'>
										<p className='text-xl'>{currentPlaying.videoTitle}</p>
										<div className='flex flex-col md:justify-between  mt-1'>
											<div className='text-sm text-gray-400'>
												<span className="after:content-['•'] after:mx-1">
													{currentPlaying.videoViews} views
												</span>
												<span> {currentPlaying.videoAge} ago</span>
											</div>

											<div className='flex items-center flex-wrap gap-4 uppercase'>
												<div className='flex items-center gap-1 cursor-pointer'>
													<BiLike className='text-xl' />
													<strong>{currentPlaying.videoLikes}</strong>
												</div>
												<div className='flex items-center gap-1 cursor-pointer'>
													<BiDislike className='text-xl' />
													<strong>dislike</strong>
												</div>
												<div className='flex items-center gap-1 cursor-pointer'>
													<FaShare className='text-xl' />
													<strong>share</strong>
												</div>
												<div className='flex items-center gap-1 cursor-pointer'>
													<HiScissors className='text-xl' />
													<strong>clip</strong>
												</div>
												<div className='flex items-center gap-1 cursor-pointer'>
													<MdOutlinePlaylistAdd className='text-xl' />
													<strong>save</strong>
												</div>
												<div className='flex items-center gap-1 cursor-pointer'>
													<BsThreeDots className='text-xl' />
												</div>
											</div>
										</div>
										<div className='flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent'>
											<div className='flex items-center gap-5 mr-5 mt-4'>
												<div>
													<img
														src={currentPlaying.channelInfo.image}
														alt=''
														className='rounded-full h-12 w-12'
													/>
												</div>
												<div className='w-5/6'>
													<h5 className='text-sm'>
														<strong>{currentPlaying.channelInfo.name}</strong>
													</h5>
													<h6 className='text-gray-400 text-xs'>
														{currentPlaying.channelInfo.subscribers} subscribers
													</h6>
												</div>
												<div>
													<button className='uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider'>
														subscribe
													</button>
												</div>
											</div>
											<div
												className={` p-1 bg-slate-500 ${
													!showMoreStatus ? 'max-h-16 overflow-hidden' : ''
												} text-sm w-11/12 rounded-lg`}
											>
												<pre
													style={{
														fontFamily: `"Roboto", sans-serif`,
													}}
													className='whitespace-pre-wrap'
												>
													{currentPlaying.videoDescription}
												</pre>
											</div>
											<div>
												<button
													className='uppercase text-sm cursor-pointer'
													onClick={() => setShowMoreStatus(!showMoreStatus)}
												>
													Show {showMoreStatus ? 'less' : 'more'}
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* commit */}

							<CommitPage  currentPlaying={currentPlaying}   />
							
								{/* {commit.map(items => <p className='text-semibold'>{items.commit}</p>)} */}
								{/* commit */}
							</div>

							<div className='mr-24 flex flex-col gap-3'>
								{getRecommendedVideos.length &&
									recommendedVideos.map((item) => {
										return <WatchCard data={item} key={item.videoId} />
									})}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Watch
