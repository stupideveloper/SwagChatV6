export default function ButtonGhost({icon=null, children, ...props}) {

	return (
		<div className="">
			<button
				type="button"
				className={`${props.className} inline-flex justify-center px-4 py-2 text-sm text-blue-100 transition border  border-blue-100 rounded-md hover:bg-blue-100 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600`}				
				{...props}
			>
				<div className="flex gap-x-2 content-center items-center">
					{icon}
					<span >{children}</span>
				</div>
			</button>
		</div>
	)
}