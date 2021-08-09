import React from 'react'
import Config from '../../../config'

const Copyright = () => {
  return (
    <div
      id='copyright'
      className='uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index'
    >
      <span className='uk-text-small uk-text-muted'>
        © 2020 {Config.brand || 'Zaions'}
      </span>
    </div>
  )
}

export default Copyright
