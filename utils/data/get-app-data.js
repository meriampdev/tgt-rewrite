import { useCallback, useEffect } from 'react'
import { useAuthUser } from 'next-firebase-auth'
import getAbsoluteURL from '../firebase/getAbsoluteURL'

const appData = (url, setData, setError, body, method='GET') => {
  const AuthUser = useAuthUser()
  const fetchData = useCallback(async () => {
    const token = await AuthUser.getIdToken()
    const endpoint = getAbsoluteURL(url)
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: body
    })
    const data = await response.json()
    if (!response.ok) {
      console.error(
        `Data fetching failed with status ${response.status}:${JSON.stringify(data)}`
      )
      //return { error : `(${response.status}) ${JSON.stringify(data)}`  }
      return { error : { code: response.status,  message: JSON.stringify(data) }  }
    }
    return data
  }, [AuthUser])
  useEffect(() => {
    const fetchAppData = async () => {
        const data = await fetchData()
        setError(data && data.error ? data.error : null)
        setData(data)
    }
    fetchAppData()
  }, [])
  
}
export default appData