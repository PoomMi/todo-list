import { Tooltip } from 'antd'
import { useMemo, useState } from 'react'
import styles from '../Styles/Login.module.scss'
import user from '../utils/user'

interface IComponentProps {
  isAuthen: boolean
}

export default function Login({ isAuthen }: IComponentProps) {
  const [content, tooltip] = useMemo(() => {
    if (isAuthen) {
      return [user.username, 'Click to logout']
    }

    return ['Login', 'Login to save your data!']
  }, [isAuthen])

  const onClick = async () => {
    const handler = isAuthen ? user.logout : user.login
    return await handler()
  }

  return (
    <Tooltip placement="bottomRight" title={tooltip} arrowPointAtCenter>
      <div className={styles.loginContainer} onClick={onClick}>
        {content}
      </div>
    </Tooltip>
  )
}
