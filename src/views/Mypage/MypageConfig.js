import React from 'react'
// import axios from 'axios'
import './MypageConfig.scss'
import { PageHeader, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { getUserInfo, getUserBadges, updateUser } from '../../api/userInfo'
import PropTypes from 'prop-types'
class UcenterConfigBadgeCard extends React.Component {
  handleBadgeClick = () => {
    this.props.handleBadgeChange(this.props.id)
  }

  render () {
    return (
      <div className={`badge-card ${this.props.id === this.props.currentId ? 'sele' : ''}`}>
        <div className='avatar' onClick={this.handleBadgeClick}>
          <img className='avatar-img' src={this.props.avatar} />
          <img className='avatar-ripon' src={this.props.badgeUrl} />
        </div>
        <div className='badge-card-name'>{this.props.badgeName}</div>
      </div>
    )
  }
}

UcenterConfigBadgeCard.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  badgeUrl: PropTypes.string,
  currentId: PropTypes.string,
  badgeName: PropTypes.string,
  handleBadgeChange: PropTypes.func
}
class UcenterConfig extends React.Component {
  constructor (props) {
    super(props)
    this.state = { avatar: '', badgeSet: '', badges: [], currentId: '', loading: true }
  }

  componentDidMount () {
    this.fetchUserAvatar()
    this.fetchUserBadges()
  }

  fetchUserAvatar () {
    getUserInfo({
    })
      .then((response) => {
        let data = response.data
        if (!data.success) { return }
        data = data.data
        this.setState({ avatar: data.avatar, badgeSet: data.badgeurl, currentId: data.badgeItem._id })
      })
      .catch((error) => {
        let data = localStorage.getItem('myInfo')
        if (!data) { return }
        data = JSON.parse(data)
        data && this.setState({ avatar: data.avatar, badgeSet: data.badgeurl, currentId: data.badgeItem?._id })
        console.log(error)
      })
  }

  fetchUserBadges () {
    getUserBadges({
    })
      .then((response) => {
        let data = response.data
        if (!data.success) { return }
        data = data.data
        this.setState({ badges: data })
        localStorage.setItem('myBadges', JSON.stringify(data))
      })
      .catch((error) => {
        const data = localStorage.getItem('myBadges')
        data && this.setState({ badges: JSON.parse(data) })
        console.error(error)
        message.warning('????????????????????????,?????????????????????????????????', 5)
      }).finally(() => { this.setState({ loading: false }) })
  }

  changeUserBadges = (id) => {
    this.setState({ loading: true })
    updateUser({
      badge: id
    })
      .then((response) => {
        let data = response.data
        if (!data.success) { return }
        data = data.data
        this.setState({ currentId: id })
        message.success('?????????????????????')
      })
      .catch(function (error) {
        message.error('????????????????????????')
        console.log(error)
      }).finally(() => {
        this.setState({ loading: false })
      })
  }

  render () {
    return (
      <div>
        <PageHeader
          className='site-page-header'
          title='????????????'
          onBack={() => {}}
          subTitle={this.state.loading ? <div><LoadingOutlined />?????????</div> : '???????????????'}
        />
        <div className='badge-wrapper'>
          {this.state.badges.length <= 0
            ? (<UcenterConfigBadgeCard key={0} id={0} avatar={this.state.avatar} badgeUrl='https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/1fecdbf7a45a5e0e_1614224449021.png' badgeName='??????????????????' currentId={this.state.currentId} handleBadgeChange={this.changeUserBadges} />)
            : this.state.badges.map(badge => {
              return (
                <UcenterConfigBadgeCard key={badge._id} id={badge._id} avatar={this.state.avatar} badgeUrl={badge.badgeItem.badgeUrl} badgeName={badge.badgeItem.badgeName} currentId={this.state.currentId} handleBadgeChange={this.changeUserBadges} />
              )
            })}
        </div>
      </div>
    )
  }
}
export default UcenterConfig
