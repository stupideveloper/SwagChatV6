import React from 'react';
function ClientOnly({ children, ...delegated }) {
	window.document.title = "Swagchat V:TOO_HIGH_NUMBER"
	const [hasMounted, setHasMounted] = React.useState(false);
	React.useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return null;
	}
	return (
		<div {...delegated}>
			{children}
		</div>
	);
}
export default ClientOnly;