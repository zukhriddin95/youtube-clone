import { Box, Button, Modal } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { FaArrowDownShortWide } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { MdRemoveCircle } from 'react-icons/md'
import { toast } from 'react-toastify'
import { CommitsProps, CurrentPlaying } from '../types'
import { CART } from './../constants/data';
const style = {
	position: 'relative' as 'relative',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}
interface commitProps {
	currentPlaying: CurrentPlaying
}
const CommitPage = ({ currentPlaying }: commitProps) => {
	const [commit, setCommit] = useState('')
	const [commitEdit, setCommitEdit] = useState('')
	const [selected, setSelected] = useState('')
	const [result, setResult] = useState<CommitsProps[]>([])
	const [isToggle, setIsToggle] = useState(true)

	const handleCommit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(commit) {
			const result: CommitsProps[] =
			JSON.parse(localStorage.getItem(CART) as string) || []
		const data = [...result, { ...currentPlaying, commit }]
		localStorage.setItem(CART, JSON.stringify(data))
		setResult(data)

		toast('your comment has been added ✅', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		})
		setCommit('')
		}else {
			toast.error('Your comment empty')
		}
	}

	const removeCommit = (com: string) => {
		const updatedcart = result.filter((res) => res.commit !== com)
		localStorage.setItem(CART, JSON.stringify(updatedcart))
		setResult(updatedcart)
	}

	

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		
		const { value } = e.target
		setCommit(value)
		
	}
	const handleChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
		
		const { value } = e.target
		
		setCommitEdit(value)
	}

	useEffect(() => {
		if (typeof localStorage !== 'undefined') {
			const storedCarts = JSON.parse(localStorage.getItem(CART) as string) || []
			setResult(storedCarts)
		}
	}, [])

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem(CART) || '[]')
		setResult(storedCart)
	}, [])

	const handleToggle = () => {
		setIsToggle(!isToggle)
	}

	const [open, setOpen] = useState(false)

	const handleOpen = (com: string) => {
		setOpen(true)
		setSelected(com)
		setCommitEdit(com)
	}
	const handleClose = () => setOpen(false)

	const editCommit = (e: React.FormEvent<HTMLFormElement>) => {
		
		const results: CommitsProps[] =
		JSON.parse(localStorage.getItem(CART) as string) || [];
	  const isExestProducts = results.find((el) => el.commit === selected);
	  if (isExestProducts) {
		const updatedData = results.map((el) => {
		  if (el.commit === selected) {
			return {
			  ...el,
			  commit: commitEdit,
			};
		  }
  
		  return el;
		});
		localStorage.setItem("commits", JSON.stringify(updatedData));
	  } 
	  toast(" ✅ Edit Completed!", {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	  });

	  
	}

	return (
		<div className={'bg-gray-600 p-10 rounded relative'}>
			{isToggle ? (
				<IoClose
					onClick={handleToggle}
					className='text-[30px] cursor-pointer absolute top-[10px] right-[10px] duration-500'
				/>
			) : (
				<FaArrowDownShortWide
					onClick={handleToggle}
					className='text-[30px] cursor-pointer absolute top-[10px] right-[10px] duration-500'
				/>
			)}
			<h1 className='text-lg'> Your Commit ({result.length})</h1>

			<form
				onSubmit={(e) => handleCommit(e)}
				className='flex items-center gap-2 mb-[30px]'
			>
				<input
					id='commit'
					value={commit}
					onChange={(e) => handleChange(e)}
					className=' mt-10 outline-none bg-transparent pl-4 pb-2 border-b w-full font-semibold'
					placeholder='your Commit'
				/>
				<button type='submit' className='px-10 py-2 mt-6  bg-black'>
					Add
				</button>
			</form>

			{isToggle ? (
				<div className='flex flex-col'>
					{result.map((commit) => (
						<div
							key={commit.videoId}
							className='flex justify-between items-center'
						>
							<p className='py-5 border-b w-full'>{commit?.commit}</p>
							<div className='flex items-center gap-4'>
								<Button onClick={() => handleOpen(commit.commit)}>
									<BiEditAlt className='h-6 w-6 cursor-pointer hover:scale-110 duration-300' />
								</Button>
								<MdRemoveCircle
									onClick={() => removeCommit(commit.commit)}
									className='text-red-500 h-6 w-6 cursor-pointer hover:scale-110 duration-300'
								/>
							</div>
						</div>
					))}
				</div>
			) : null}

			{/* modal */}

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<IoClose
						onClick={handleClose}
						className='text-[30px] text-black cursor-pointer absolute top-[10px] right-[10px] duration-500'
					/>
					<div className='p-10'>
						<form onSubmit={(e) => editCommit(e)} className=''>
							<input
								value={commitEdit}
								className='text-black outline-none border-b border-black'
								placeholder='edit'
								onChange={(e) => handleChangeEdit(e)}
							/>
							<button type='submit' className='text-black'>
								Edit
							</button>
						</form>
					</div>
				</Box>
			</Modal>

			{/* modal */}

			{result.length === 0 && (
				<div>
					<h1 className='text-xl font-semibold'>not Commit</h1>
				</div>
			)}
		</div>
	)
}

export default CommitPage
