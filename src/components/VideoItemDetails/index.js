import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'

import {VideoMainContainer, VideoTitle} from './StyledComponent'

import Header from '../Header' // Moved Header outside of NxtWatchContext.Consumer
import NxtWatchContext from '../../context/index'

import './index.css'

const apiStatus = {
  initialize: 'INITIALIZE',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class VideoItemDetails extends Component {
  state = {apistatus: apiStatus.initialize, videoData: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params

    this.setState({apistatus: apiStatus.in_progress})

    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const {apistatus} = this.state

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      console.log(updatedData, 'sdfkjb')

      this.setState({videoData: updatedData, apistatus: apiStatus.success})
    } else {
      this.setState({apistatus: apiStatus.fail})
    }
  }

  render() {
    return (
      <>
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDarkMode} = value
            const {apistatus, videoData} = this.state
            const {videoUrl} = videoData

            return (
              <>
                {apistatus === apiStatus.in_progress && (
                  <div className="loader-container">
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="red"
                        height="50"
                        width="50"
                      />
                    </div>
                  </div>
                )}
                {apistatus === apiStatus.success && (
                  <VideoMainContainer>
                    <div className="video-container">
                      <ReactPlayer url={videoUrl} width="100%" controls />
                    </div>
                  </VideoMainContainer>
                )}
              </>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }
}
export default VideoItemDetails
