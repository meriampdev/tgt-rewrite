import { useCallback, useEffect } from 'react'
//import { useAuthUser } from 'next-firebase-auth'
import getAbsoluteURL from '../firebase/getAbsoluteURL'

const submitAPIData = (url, body, method='GET', token) => {
    console.log(method, url)
    //const AuthUser = useAuthUser()
    console.log('1')
    const submitData = async () => {
        console.log('here...')
        //const token = await AuthUser.getIdToken()
        //console.log('token', token)
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
        //setAPIError({ code: response.status,  message: JSON.stringify(data) }  )
        //return
        return { error : { code: response.status,  message: JSON.stringify(data) }  }
        }
        //setAPIData(data)
        return data
    }
    console.log('2')
    submitData()
    
    
 
    /*
    const fetchAppData = async () => {
        const data = await fetchData()
        setAPIError(data && data.error ? data.error : null)
        setAPIData(data)
    }
    fetchAppData()
    */
 
  
}
export default submitAPIData