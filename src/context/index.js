import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkMode: false,
  changeMode: () => {},
})

export default NxtWatchContext
