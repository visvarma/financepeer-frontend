import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PostCard from '../PostCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    ApiStatus: apiStatus.initial,
    postData: [],
  }

  componentDidMount() {
    this.getPostData()
  }

  getPostData = async () => {
    this.setState({ApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://financepeer-vrv-backend.herokuapp.com/posts/'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)

    if (response.ok) {
      const data = await response.json()

      this.setState({
        postData: data.data,
        ApiStatus: apiStatus.success,
      })
    } else {
      this.setState({ApiStatus: apiStatus.failure})
    }
  }

  renderPostCard = () => {
    const {postData} = this.state
    console.log(postData)
    return (
      <>
        <ul className="blogs-ul-container">
          {postData.map(eachPost => (
            <PostCard itemData={eachPost} key={eachPost.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickpostsRetry = () => {
    this.getPostData()
  }

  renderFailureView = () => (
    <div className="no-post-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-post-img"
      />
      <h1 className="no-post-heading">Oops! Something Went Wrong</h1>
      <p className="no-post-description">
        We cannot seem to find the post you are looking for.
      </p>
      <button
        type="button"
        className="profile-fail-retry-btn"
        onClick={this.onClickpostsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderFinalView = () => {
    const {ApiStatus} = this.state
    switch (ApiStatus) {
      case apiStatus.success:
        return this.renderPostCard()
      case apiStatus.inProgress:
        return this.renderLoaderView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-post-container">
          <h1 className="post-container-heading">Posts</h1>
          {this.renderFinalView()}
        </div>
      </>
    )
  }
}

export default Home
