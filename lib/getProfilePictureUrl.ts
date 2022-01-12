import gravatar from 'gravatar';
export default function getProfilePictureUrl(email: string, size: number): string {
	var url = gravatar.url(email, {s: size * 2, r: 'g', d: 'identicon'});
	return url
}