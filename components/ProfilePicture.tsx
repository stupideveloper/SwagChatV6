import gravatar from 'gravatar';
import UserContext from '../lib/UserContext'
import { useContext } from 'react';
import getProfilePictureUrl from '../lib/getProfilePictureUrl';
// https://avatars.dicebear.com/api/open-peeps/${username}.svg?mood[]=happy&maskProbability=100&mask[]=medicalMask
export default function ProfilePicture({size, ...props}) {
	const { user } = useContext(UserContext)
	const className = props.className ? props.className : ''
	const username = props.username ? props.username : user?.email;

	const url = getProfilePictureUrl(username, size * 2)
	return (
		<img src={url} width={size} height={size} alt={`${username}'s profile picure`} className={`overflow-hidden rounded-full border border-slate-600 ${className}`} {...props} />
	)
}