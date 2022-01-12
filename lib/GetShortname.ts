export default function getShortname(email: string): string {
	const name = email.match(/^([^@]*)@/)[1];
	return name
}