import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { BsBell, BsCameraVideo, BsYoutube } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoAppsSharp } from 'react-icons/io5'
import { getSearchPageVideos } from '../redux/reducer/getSearchPageVideo'
import { TiMicrophone } from 'react-icons/ti'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { changeSearchTerm, clearSearchTerm, clearVideo } from '../redux'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

interface NavbarProps {
	handleClick: () => void
}
const Navbar = ({ handleClick }: NavbarProps) => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)

	const handleSearch = () => {
		if (location.pathname !== '/search') navigate('/search')
		else {
			dispatch(clearVideo())
			dispatch(getSearchPageVideos(false))
		}
	}
  
	
	
	return (
		<div className='flex justify-between items-center  px-14 h-14 bg-[#212121] opacity-95 fixed w-full  left-0 top-0 z-50 '>
			<div className='flex gap-8 items-center justify-between w-full text-2xl'>
				<div onClick={handleClick} role='button'>
					<GiHamburgerMenu />
				</div>
				<Link className='hidden xl:block' to='/'>
					<div className='flex gap-1 items-center justify-center'>
						<BsYoutube className='text-3xl text-red-600' />
						<span className='text-xl font-medium'>YouTube</span>
					</div>
				</Link>
				<div className='flex items-center justify-center gap-5'>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleSearch()
						}}
					>
						<div className='flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-xl'>
							<div className='flex gap-4 items-center pr-5 '>
								<div>
									<AiOutlineSearch className='text-xl' />
								</div>
								<input
									type='text'
									className='w-full md:w-96 bg-zinc-900 focus:outline-none border-none '
									value={searchTerm}
									onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
								/>
								<AiOutlineClose
									className={`text-xl cursor-pointer ${
										!searchTerm ? 'invisible' : 'visible'
									}`}
									onClick={() => dispatch(clearSearchTerm())}
								/>
							</div>
							<button className='h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-e-xl'>
								<AiOutlineSearch className='text-xl' />
							</button>
						</div>
					</form>
					<div className='hidden xl:block text-xl p-3 bg-zinc-900 rounded-full'>
						<TiMicrophone />
					</div>
				</div>

				<div className='hidden sm:flex gap-5 items-center text-xl'>
					<BsCameraVideo className='hidden xl:block' />
					<IoAppsSharp className='hidden xl:block' />
					<div className='relative'>
						<BsBell className='hidden xl:block' />
						<span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1 hidden xl:block'>
							9+
						</span>
					</div>
					<img
						src='https://yt3.ggpht.com/wgnEbc2Ec2JYkeyzUbiHzDlAFObI2Btwo2YRCEF1aCMBiRc5E_zWy8-URBQS3EMQ1yzzaGFR=s88-c-k-c0x00ffffff-no-rj-mo'
						className='w-9 h-9 rounded-full '
						alt='logo'
					/>
				</div>
			</div>
		</div>
	)
}

export default Navbar
function getSearchPageVideo(arg0: boolean): any {
	throw new Error('Function not implemented.')
}
