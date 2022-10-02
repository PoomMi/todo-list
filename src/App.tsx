import 'antd/dist/antd.css'
import styles from './App.module.css'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Workspace from './Components/Workspace'
import { BackTop, Button } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import Login from './Components/Login'
import user from './utils/user'
import { auth } from './firebase/config'
import { onAuthStateChanged } from '@firebase/auth'

function App() {
  const [shouldDisplay, setShouldDisplay] = useState(false)
  const [isAuthen, setIsAuthen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.id = currentUser.uid
        user.username = currentUser.displayName
        setIsAuthen(true)
      }

      setShouldDisplay(true)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      {shouldDisplay && (
        <div className={styles.App}>
          <Login isAuthen={isAuthen} />
          <div className={styles.AppContainer}>
            <Header />
            <Workspace />
          </div>

          <BackTop visibilityHeight={100}>
            <Button
              type="primary"
              icon={<ArrowUpOutlined />}
              shape="circle"
              size="large"
            ></Button>
          </BackTop>
        </div>
      )}
    </>
  )
}

export default App
