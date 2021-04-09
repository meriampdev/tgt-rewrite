import { useEffect, useState } from 'react'
import { signIn, signOut } from 'next-auth/client'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface IProps {
  session: any
}
export default function Customer(props) {
  const [ session, setSession ] = useState(null)

  useEffect(() => {
    setSession(props.session)
  }, [props.session])

  return (
    <div className="flex flex-col gap-5">
      {
        !session ?
        <>
          <span className="font-bold text-red-500 text-lg">Please Sign in to continue.</span>
          <div className="flex flex-row gap-3">
            <Button className="round-sm" color="primary" onClick={signIn}>Sign In</Button>
          </div>
        </>
        : 
          <div className="flex flex-col">
            <span className="font-bold text-lg">Customer Information</span>
            <div className="flex flex-row items-center gap-3">
              <div className="h-12">
                <img className="rounded" src={session.image} alt="" />
              </div>
              <div className="flex flex-col gap-3 items-start justify-end pt-5">
                <span className="flex-1 text-base">{`${session.name} (${session.email})`}</span>
                <Button endIcon={<ExitToAppIcon />} color="primary" onClick={signOut}>
                  <span className="text-base">Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
      }
    </div>
  )
}