import React from 'react'
import { Form, Input, Button, Checkbox, Avatar, Select, Tooltip, DatePicker, Divider, Upload, message, Alert, notification } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, QrcodeOutlined, AntDesignOutlined, LoadingOutlined, PlusOutlined, EnvironmentFilled, ContactsFilled } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'
import './Ucenter.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setToken, setUserId } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
const { Option } = Select

class UserCenterCardLogin extends React.Component {
  handleTriggerQR () {
    console.log('QRCode is unavaliable now')
  }

  render () {
    return (
      <div className={`usercenter-card -front ${this.props.mode === 'login' ? 'show' : 'hide'} `}>
        <div className='usercenter-card-focus' />
        <div className='usercenter-card-background'>
          <img
            src={this.props.bg} className='usercenter-card__bg'
          />
        </div>
        <div className='usercenter-card-wrapper'>
          <div className='usercenter-card-login-header'>
            <div className='usercenter-card-login-header_qrbtn' onClick={this.handleTriggerQR}>
              <QrcodeOutlined />
            </div>
            <img className='usercenter-card-login-header_logo' src='//sf3-ttcdn-tos.pstatp.com/obj/ttfe/passport/sso/douyin/douyin-logo_1576745941218.png' alt='logo' />

          </div>
          <div className='usercenter-card-login-content'>
            <Avatar
              size={{ xs: 70, sm: 70, md: 70, lg: 80, xl: 80, xxl: 80 }}
              src={this.props.avatar}
              icon={<AntDesignOutlined />}
            />
            <div className='usercenter-card-login-content_user'>{this.props.uname}</div>
          </div>
        </div>
      </div>
    )
  }
}
UserCenterCardLogin.propTypes = {
  mode: PropTypes.string,
  bg: PropTypes.string,
  avatar: PropTypes.string,
  uname: PropTypes.string
}
class UserCenterCardLoginSucess extends React.Component {
  render () {
    return (
      <div className={`usercenter-card -back ${this.props.mode === 'loginSucs' || this.props.mode === 'regiSucs' ? 'show' : 'hide'}`}>
        <div className='usercenter-card-focus' />
        <div className='usercenter-card-background'>
          <img
            src={this.props.bg} className='usercenter-card__bg'
          />
        </div>
        <div className='usercenter-card-wrapper'>
          <div className='usercenter-card-login-header'>
            <div className='usercenter-card-login-header_info'>
              {/* <div style={{"color":"white"}}>????????????</div> */}
            </div>
            <img className='usercenter-card-login-header_logo' src='//sf3-ttcdn-tos.pstatp.com/obj/ttfe/passport/sso/douyin/douyin-logo_1576745941218.png' alt='logo' />

          </div>
          <div className='usercenter-card-login-content'>
            <Avatar
              size={{ xs: 70, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={this.props.avatar}
              icon={<AntDesignOutlined />}
            />
            <div className='usercenter-card-login-content_user'>{this.props.uname}</div>
            <div className='usercenter-card-login-content_info'>???????????????????????????...</div>
          </div>
        </div>
      </div>
    )
  }
}
UserCenterCardLoginSucess.propTypes = {
  mode: PropTypes.string,
  bg: PropTypes.string,
  avatar: PropTypes.string,
  uname: PropTypes.string
}
class UserCenterCardRegi extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  hadleTriggerQR () {
    console.log('QRCode is unavaliable now')
  }

  render () {
    return (
      <div className={classNames('usercenter-card', '-register', '-front', { hide: this.props.mode !== 'regi' })}>
        <div className='usercenter-card-background'>
          <img
            src={this.props.bg} className='usercenter-card__bg'
          />
        </div>
        <div className='usercenter-card-wrapper'>
          <div className='usercenter-card-regi-header'>
            <div className='usercenter-card-regi-header-info' onClick={this.handleTriggerQR}>
              <div className='item'><ContactsFilled />{this.props.ages}</div>
              <div className='item'><EnvironmentFilled />{this.props.regin}</div>
            </div>
            <img className='usercenter-card-login-header_logo' src='//sf3-ttcdn-tos.pstatp.com/obj/ttfe/passport/sso/douyin/douyin-logo_1576745941218.png' alt='logo' />

          </div>
          <div className='usercenter-card-login-content'>
            <Avatar
              size={{ xs: 70, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={this.props.avatar}
              icon={<AntDesignOutlined />}
            />
            <div className='usercenter-card-login-content_user'>{this.props.uname}</div>
          </div>
        </div>
      </div>
    )
  }
}
UserCenterCardRegi.propTypes = {
  mode: PropTypes.string,
  bg: PropTypes.string,
  avatar: PropTypes.string,
  ages: PropTypes.string,
  regin: PropTypes.string,
  uname: PropTypes.string
}
class UserCenterFormRegi extends React.Component {
  regiFormRef = React.createRef();
  constructor (props) {
    super(props)
    this.state = { loaingAvatar: false, avatarUrl: '', avatarLoading: false, bgImgUrl: '', bgImgLoading: false, emailUnvali: false, unameUnvali: false, formSubmiting: false }
  }

  notiNetworkErr = () => {
    notification.error({
      message: '??????????????????',
      description:
        '????????????????????????????????????????????????????????????????????????'
    })
  }

  handleOnRegiSubmit = (values) => {
    delete values.agreement
    this.setState({ formSubmiting: true })
    axios.post('https://qcmt57.fn.thelarkcloud.com/register', values).then(response => {
      if (response.data.success) {
        setUserId(response.data.userId)//  save token/Uid to local
        setToken(response.data.token)
        this.props.onModechange('regiSucs')
        this.props.onRegisterSuccess()
      } else {
        const errors = { emailUnvali: response.data.isEmailExist, unameUnvali: response.data.isUnameExist }
        this.setState(errors)
      }
    }).catch(err => {
      console.log(err)
      this.notiNetworkErr()
    })
  }

  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  handleAvatarChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.success) {
        this.setState({ avatarUrl: info.file.response.url })
        this.regiFormRef.current.setFieldsValue({ avatar: info.file.response.url })
        this.props.onCardUpdate({ avatar: info.file.response.url })
      }
    }
  };

  handleBgImgChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ bgImgLoading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.success) {
        this.setState({ bgImgUrl: info.file.response.url, bgImgLoading: false })
        this.regiFormRef.current.setFieldsValue({ bgImg: info.file.response.url })
        this.props.onCardUpdate({ cardBg: info.file.response.url })
      }
    }
  }

  handleUnameChange = e => {
    this.props.onCardUpdate({ uname: e.target.value || '??????' })
  }

  handleReginChange = e => {
    this.props.onCardUpdate({ regin: e.target.value || '?????????' })
  }

  uploadButtonAvatar= () => (
    <div>
      {this.state.avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>????????????</div>
    </div>
  );

  uploadButtonBgImg= () => (
    <div>
      {this.state.bgImgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>???????????????</div>
    </div>
  );

  handleChange = () => {
    (this.state.unameUnvali || this.state.emailUnvali) && this.setState({ emailUnvali: false, unameUnvali: false })
  }

  render () {
    return (
      <div className='usercenter-form-card'>
        <Form
          ref={this.regiFormRef} name='control-ref' onFinish={this.handleOnRegiSubmit}
          scrollToFirstError
          // onChange={this.handleChange}
        >
          <Form.Item
            name='email'
            label='??????'
            hasFeedback
            {...this.state.emailUnvali
              ? {
                  validateStatus: 'error',
                  help: '?????????????????????????????????'
                }
              : {}}
            rules={[{ required: true, type: 'email', message: '??????????????????????????????' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='password'
            label='??????'
            rules={[
              {
                required: true,
                message: '???????????????'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm'
            label='????????????'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '?????????????????????'
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('?????????????????????'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='userName'
            label={
              <span>
                ??????&nbsp;
                <Tooltip title='?????????????????????????????????????????????'>
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
        }
            hasFeedback
            {...this.state.unameUnvali
              ? {
                  validateStatus: 'error',
                  help: '?????????????????????????????????????????????'
                }
              : {}}
            rules={[{ required: true, message: '????????????????????????????????????????????????', whitespace: true }]}
          >
            <Input onChange={this.handleUnameChange} />
          </Form.Item>
          <Divider orientation='left'>????????????</Divider>
          <Form.Item
            label='??????'
          >
            <ImgCrop rotate shape='round' modalTitle='????????????'>
              <Upload
                name='file'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action='https://qcmt57.fn.thelarkcloud.com/fileUpload'
                beforeUpload={this.beforeUpload}
                onChange={this.handleAvatarChange}
              >
                {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt='avatar' style={{ width: '100%' }} /> : this.uploadButtonAvatar()}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item
            name='avatar'
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='?????????'
          >
            <ImgCrop rotate modalTitle='??????????????????' aspect={16 / 9}>
              <Upload
                name='file'
                listType='picture-card'
                showUploadList={false}
                action='https://qcmt57.fn.thelarkcloud.com/fileUpload'
                beforeUpload={this.beforeUpload}
                onChange={this.handleBgImgChange}
                style={{ width: '50px', height: '28px' }}
              >
                {this.state.bgImgUrl ? <img src={this.state.bgImgUrl} alt='avatar' style={{ width: '100%' }} /> : this.uploadButtonBgImg()}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item
            name='bgImg'
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='birthDay'
            label='??????'
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name='regin'
            label='?????????'
          >
            <Input style={{ width: '100%' }} onChange={this.handleReginChange} />
          </Form.Item>
          <Form.Item
            name='bio'
            label='????????????'
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='gender'
            label='??????'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              placeholder='???????????????'
              allowClear
              style={{ width: '50%' }}
            >
              <Option value='male'>???</Option>
              <Option value='female'>???</Option>
              <Option value='other'>??????</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('???????????????????????????????????????'))
              }
            ]}
            {...(this.tailFormItemLayout)}
          >
            <Checkbox>
              ????????????????????? <a href='#'>????????????</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...(this.tailFormItemLayout)}>
            <Button type='primary' htmlType='submit' loading={this.state.formSubmiting}>
              ????????????
            </Button>
          </Form.Item>
          <span>
            ??????????????? <a href='#' onClick={() => this.props.onModechange('login')}>??????</a>
          </span>
        </Form>
      </div>
    )
  }
}

UserCenterFormRegi.propTypes = {
  mode: PropTypes.string,
  onCardUpdate: PropTypes.func,
  onModechange: PropTypes.func,
  onRegisterSuccess: PropTypes.func
}
class UserCenterFormLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = { loading: false, disabled: false, showMsg: false, previewTimer: null }
  }

  previewGet= (user) => {
    axios.post('https://qcmt57.fn.thelarkcloud.com/userIconPreview', {
      user: user
    })
      .then(function (response) {
        if (!response.data.success) { throw (new Error()) }
        this.props.onCardUpdate(response.data)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
        this.props.onCardReset()
      }.bind(this))
  }

  handlePreview=(e) => {
    if (this.state.previewTimer) { clearTimeout(this.state.previewTimer) }
    const newTimer = setTimeout(function () {
      this.previewGet(e.target.value)
    }.bind(this), 400)
    this.setState({ previewTimer: newTimer })
  }

  handleLogin = (loginData) => {
    this.setState({ loading: true, showMsg: false })
    axios.post('https://qcmt57.fn.thelarkcloud.com/login', {
      userName: loginData.username,
      password: loginData.password
    })
      .then(function (response) {
        this.setState({ loading: false, disabled: true })
        if (!response.data.success) { throw (new Error('login failed')) }
        setToken(response.data.token) // save token to local
        setUserId(response.data.userId)
        this.props.onModechange('loginSucs')
        this.props.onLoginSuccess()
      }.bind(this))
      .catch(function (error) {
        this.setState({ loading: false, showMsg: true })
        console.log(error)
      }.bind(this))
  }

  render () {
    return (
      <div className='usercenter-form-card usercenter-form-login'>
        {this.state.showMsg ? (<Alert message='??????/?????????????????????????????????' type='error' showIcon />) : ''}
        <Form
          name='normal_login'
          id='usercenter-form-card-content'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={this.handleLogin}
          requiredMark={false}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: '??????????????????' }]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='??????/?????????' onChange={this.handlePreview} />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '???????????????' }]}
          >
            <Input.Password
              className='input'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='????????????'
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item style=''>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>????????????</Checkbox>
            </Form.Item>
            <a className='login-form-forgot' href='#'>
              ?????????????
            </a>
          </Form.Item>
          <div className='login-form-btn'>
            <Form.Item className='login-btn' noStyle>
              <Button type='primary' htmlType='submit' loading={this.state.loading} disabled={this.props.mode !== 'login'}>
                ??????
              </Button>
            </Form.Item>
          </div>
          <div className='login-form-footer'>
            <Form.Item>
              ??? <a href='#' onClick={() => this.props.onModechange('regi')}>????????????</a>
            </Form.Item>
          </div>
        </Form>
      </div>
    )
  }
}
UserCenterFormLogin.propTypes = {
  onCardUpdate: PropTypes.func,
  onCardReset: PropTypes.func,
  onModechange: PropTypes.func,
  mode: PropTypes.string,
  onLoginSuccess: PropTypes.func
}

class UserCenterForm extends React.Component {
  constructor (props) {
    super(props)
    const defaultAvatar = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/0bb96d4c05cc0a53_1612876378525.jpeg'
    const defaultBg = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/34d55516367c98c2_1612876325199.png'
    this.state = { mode: 'login', cardBg: defaultBg, avatar: defaultAvatar, uname: '??????', ages: '?????????', regin: '?????????' }
  }

  handleChangeMode = (mode) => {
    this.setState({ mode: mode })
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values)
  };

  handleResetLoginCard=() => {
    const defaultAvatar = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/0bb96d4c05cc0a53_1612876378525.jpeg'
    const defaultBg = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/34d55516367c98c2_1612876325199.png'
    this.setState({ cardBg: defaultBg, avatar: defaultAvatar })
  }

  handleSetLoginCard = (props) => {
    this.setState({ cardBg: props.data.bgImg, uname: props.data.uname, avatar: props.data.avatar })
  }

  handleSetRegiCard = (props) => {
    this.setState({ ...this.state, ...props })
  }

  handleLoginSuccess = () => {
    setTimeout(() => {
      this.props.history.push('/')
    }, 1000)
  }

  render () {
    let formItem = {}
    switch (this.state.mode) {
      case 'login':
      case 'loginSucs':
        formItem = <UserCenterFormLogin onLoginSuccess={this.handleLoginSuccess} mode={this.state.mode} onCardUpdate={this.handleSetLoginCard} onCardReset={this.handleResetLoginCard} onModechange={this.handleChangeMode} />
        break
      case 'regi':
      case 'regiSucs':
        formItem = <UserCenterFormRegi onRegisterSuccess={this.handleLoginSuccess} mode={this.state.mode} onCardUpdate={this.handleSetRegiCard} onModechange={this.handleChangeMode} />
    }
    return (
      <div className='usercenter-wrapper'>
        <div className='card-item'>
          <UserCenterCardLogin mode={this.state.mode} avatar={this.state.avatar} uname={this.state.uname} bg={this.state.cardBg} />
          <UserCenterCardLoginSucess mode={this.state.mode} bg={this.state.cardBg} avatar={this.state.avatar} uname={this.state.uname} />
          <UserCenterCardRegi mode={this.state.mode} bg={this.state.cardBg} avatar={this.state.avatar} uname={this.state.uname} ages={this.state.ages} regin={this.state.regin} />
        </div>
        {formItem}
      </div>
    )
  }
}

UserCenterForm.propTypes = {
  history: PropTypes.object
}

class UserCenter extends React.Component {
  render () {
    return (
      <>
        <UserCenterForm history={this.props.history} />
      </>
    )
  }
}
UserCenter.propTypes = {
  history: PropTypes.object
}

const ucenter = () => {
  const history = useHistory()
  return (
    <>
      <video id='ucenterBgVedio' playsInline autoPlay muted loop x5-video-player-type='h5' src='https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/cbbf7b1a02c400d6_1612887218358.mp4' data-object-fit='true' type='video/mp4' poster='https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/imgs/1.9e1ce889.jpg'>?????????????????????????????????????????????</video>
      <div className='wrapper'>
        <UserCenter history={history} />
      </div>
    </>
  )
}

export default ucenter
