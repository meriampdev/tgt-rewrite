import getAbsoluteURL from '../firebase/getAbsoluteURL'

export default function fetchData(url, AuthUser) {
    const fetch = useCallback(async () => {
        const token = await AuthUser.getIdToken()
        const endpoint = getAbsoluteURL(url)
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        })
        const data = await response.json()
        if (!response.ok) {
          // eslint-disable-next-line no-console
          console.error(
            `Data fetching failed with status ${response.status}: ${JSON.stringify(
              data
            )}`
          )
          return null
        }
        //console.log('data=>',JSON.stringify(data.Products))
        return data
      }, [AuthUser])

    fetch()
}
