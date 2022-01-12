export default function ButtonSolid({icon=null, children=null, ...props}) {
	return (
		<button
		type="button"
		className={`${props.className} inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 transition border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600`}
		{...props}
	>
		<div className="flex gap-x-2 content-center items-center">
			{icon}
			<span className="-translate-y-px">{children}</span>
		</div>
		
	</button>
)
}