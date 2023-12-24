import {
	DocLinks,
	NavNameLinks,
	NavNameLinks2,
	SubLinks,
	TitleLinks,
} from '../constants/data'

interface SidebarProps {
	isToggle: boolean
	isMobile: boolean
}

const Sidebar = ({ isToggle, isMobile }: SidebarProps) => {
	return (
		<div
			className={`absolute top-[60px] md:static bg-[#212121] pr-5 overflow-auto pb-8 sidebar z-50   ${
				isToggle
					? 'w-0 -translate-x-36 ease-in-out duration-300'
					: ' w-[250px] ease-in-out duration-300 translate-x-0 '
			} ${
				isMobile
					? ' w-0 -translate-x-36 ease-in-out duration-300'
					: 'w-[250px] ease-in-out duration-300 translate-x-0'
			}`}
		>
			<ul className='flex flex-col border-b-2 border-gray-700'>
				{NavNameLinks.map(({ icon, name }) => {
					return (
						<li
							key={name}
							className={`pl-6 py-3 hover:bg-zinc-600 ${
								name === 'Home' ? 'bg-slate-600' : ''
							}`}
						>
							<a href='#' className='flex items-center gap-5'>
								{icon}
								<span className='text-sm tracking-wider'>{name}</span>
							</a>
						</li>
					)
				})}
			</ul>
			<ul className='flex flex-col border-b-2 border-gray-700'>
				{NavNameLinks2.map(({ icon, name }) => {
					return (
						<li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
							<a href='#' className='flex items-center gap-5'>
								{icon}
								<span className='text-sm tracking-wider'>{name}</span>
							</a>
						</li>
					)
				})}
			</ul>
			<ul className='flex flex-col border-b-2 border-gray-700'>
				{SubLinks.map(({ icon, name }) => {
					return (
						<li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
							<a href='#' className='flex items-center gap-5'>
								{icon}
								<span className='text-sm tracking-wider'>{name}</span>
							</a>
						</li>
					)
				})}
			</ul>
			<ul className='flex flex-col border-b-2 border-gray-700'>
				{DocLinks.map(({ icon, name }) => {
					return (
						<li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
							<a href='#' className='flex items-center gap-5'>
								{icon}
								<span className='text-sm tracking-wider'>{name}</span>
							</a>
						</li>
					)
				})}
			</ul>
			<ul className='flex gap-2 flex-wrap text-sm p-4 text-zinc-400'>
				{TitleLinks[0].map((name) => {
					return <li key={name}>{name}</li>
				})}
			</ul>
			<ul className='flex gap-2 flex-wrap text-sm p-4 text-zinc-400'>
				{TitleLinks[1].map((name) => {
					return <li key={name}>{name}</li>
				})}
			</ul>
			<span className='px-4 text-sm text-zinc-400'>&copy; 2024  Google</span>
			<br />
			
		</div>
	)
}

export default Sidebar
