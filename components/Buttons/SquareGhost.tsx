export default function SquareGhost({children, ...props}) {
	return (
		<div className="">
			<button
				type="button"
				className={`${props.className} inline-flex justify-center px-1 py-1 text-sm text-blue-100 transition border  border-blue-100 rounded-md hover:bg-blue-100 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600`}				
				{...props}
			>
				{children}
			</button>
		</div>
	)
}