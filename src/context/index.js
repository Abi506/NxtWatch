import React from 'react'

import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'

const sections = [
  {
    font: <AiFillHome />,
    text: 'Home',
    id: 'home',
    path: '/',
  },
  {
    font: <AiFillFire />,
    text: 'Trending',
    path: '/trending',
    id: 'trending',
  },
  {
    font: <SiYoutubegaming />,
    text: 'Gaming',
    path: '/gaming',
    id: 'gaming',
  },
  {
    font: <RiPlayListAddLine />,
    text: 'Saved videos',
    path: '/saved-videos',
    id: 'savedVideos',
  },
]

const NxtWatchContext = React.createContext({
  isDarkMode: false,
  changeMode: () => {},
  activeState: sections[0].id,
  changeState: () => {},
  savedVideos: () => {},
})

export default NxtWatchContext
