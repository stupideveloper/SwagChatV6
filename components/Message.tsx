import { useContext } from 'react'
import { useState } from 'react'
import UserContext from '../lib/UserContext'
import { deleteMessage } from '../lib/Store'
import { BsTrashFill } from 'react-icons/bs'
import Spinner from './Spinner'
import ProfilePicture from './ProfilePicture'
import getShortname from '../lib/GetShortname'
const Message = ({ message, key }) => {
  const { user, userRoles } = useContext(UserContext)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className="py-1 flex items-center space-x-2" key={key}>
      <ProfilePicture username={message.author.username} size={50} className={'rounded-xl'} />
      <div>
        <div>
          <p className="text-slate-400 font-bold flex">{getShortname(message.author.username)}{(user?.id === message.user_id ||
            userRoles.some((role) => ['admin', 'moderator'].includes(role))) && (
            <button aria-label="Delete Message" onClick={() => {deleteMessage(message.id); setIsDeleting(true)}}>
              {!isDeleting && (
                <BsTrashFill />
              )}
              {isDeleting && (
                <Spinner />
              )}
            </button>
          )}</p>
          <p className="text-white">{message.message}</p>
        </div>
      </div>

    </div>
  )
}

export default Message
