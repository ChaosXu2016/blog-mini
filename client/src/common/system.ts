import Taro from '@tarojs/taro'
import { NAVIGATION_BODY_HEIGHT } from '@/constants/system'

const {
  statusBarHeight,
  screenHeight,
  screenWidth,
  windowHeight,
  windowWidth,
  model,
  platform: platformString
} = Taro.getSystemInfoSync()

const rpx2pxRate = 750 / screenWidth

function rpx2px(rpx: number): number {
  return rpx / rpx2pxRate
}

function px2rpx(px: number): number {
  return px * rpx2pxRate
}

const statusBarHeightRpx = px2rpx(statusBarHeight)
const screenWidthRpx = px2rpx(screenWidth)
const screenHeightRpx = px2rpx(screenHeight)
const windowHeightRpx = px2rpx(windowHeight)
const windowWidthRpx = px2rpx(windowWidth)

const platform = platformString === "ios" ? "ios" : "devtools-android"
const isX = model.includes('iPhone X')
const isMI8 = model.includes('MI 8')
const isAndroid = platform === 'devtools-android'

const navigationHeight = NAVIGATION_BODY_HEIGHT + statusBarHeight
const navigationHeightRpx = px2rpx(navigationHeight)
const navigationBodyHeightRpx = px2rpx(NAVIGATION_BODY_HEIGHT)

export {
  isX,
  isMI8,
  isAndroid,
  statusBarHeight,
  statusBarHeightRpx,
  screenHeight,
  screenHeightRpx,
  screenWidth,
  screenWidthRpx,
  windowHeight,
  windowHeightRpx,
  windowWidth,
  windowWidthRpx,
  navigationHeight,
  navigationHeightRpx,
  navigationBodyHeightRpx,
  rpx2px,
  px2rpx,
}
