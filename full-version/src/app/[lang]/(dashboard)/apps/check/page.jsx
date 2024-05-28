'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image"

// MUI Imports
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'


import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useTheme } from '@mui/material/styles'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Switch from '@mui/material/Switch'
import { Button } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import { useDebounce, useMedia } from 'react-use'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Icon Imports
import SkinDefault from '@core/svg/SkinDefault'
import SkinBordered from '@core/svg/SkinBordered'
import LayoutVertical from '@core/svg/LayoutVertical'
import LayoutCollapsed from '@core/svg/LayoutCollapsed'
import LayoutHorizontal from '@core/svg/LayoutHorizontal'
import ContentCompact from '@core/svg/ContentCompact'
import ContentWide from '@core/svg/ContentWide'
import DirectionLtr from '@core/svg/DirectionLtr'
import DirectionRtl from '@core/svg/DirectionRtl'

// Config Imports
import primaryColorConfig from '@configs/primaryColorConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Style Imports
import styles from './styles.module.css'

const getLocalePath = (pathName, locale) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')

  segments[1] = locale

  return segments.join('/')
}

const DebouncedColorPicker = props => {
  // Props
  const { settings, isColorFromPrimaryConfig, handleChange } = props

  // States
  const [debouncedColor, setDebouncedColor] = useState(settings.primaryColor ?? primaryColorConfig[0].main)

  // Hooks
  useDebounce(() => handleChange('primaryColor', debouncedColor), 200, [debouncedColor])

  return (
    <>
      <HexColorPicker
        color={!isColorFromPrimaryConfig ? settings.primaryColor ?? primaryColorConfig[0].main : '#eee'}
        onChange={setDebouncedColor}
      />
      <HexColorInput
        className={styles.colorInput}
        color={!isColorFromPrimaryConfig ? settings.primaryColor ?? primaryColorConfig[0].main : '#eee'}
        onChange={setDebouncedColor}
        prefixed
        placeholder='Type a color'
      />
    </>
  )
}

const Customizer = ({ breakpoint = 'lg', dir = 'ltr', disableDirection = false }) => {
  // States
  const [isOpen, setIsOpen] = useState(false)
  const [direction, setDirection] = useState(dir)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [fileInput, setFileInput] = useState("")

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const theme = useTheme()
  const pathName = usePathname()
  const { settings, updateSettings, resetSettings, isSettingsChanged } = useSettings()

  const breakpointMap = {
    xxl: '1920px',
    xl: `${theme.breakpoints.values.xl}px`,
    lg: `${theme.breakpoints.values.lg}px`,
    md: `${theme.breakpoints.values.md}px`,
    sm: `${theme.breakpoints.values.sm}px`,
    xs: `${theme.breakpoints.values.xs}px`,
  }

  const breakpointValue = breakpointMap[breakpoint] || breakpoint;
  

  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)
  const isColorFromPrimaryConfig = primaryColorConfig.find(item => item.main === settings.primaryColor)
  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  const handleToggle = () => {
    setIsOpen(!isOpen)
    console.log('handle toggle')
  }

  // Update Settings
  const handleChange = (field, value) => {
    // Update direction state
    if (field === 'direction') {
      setDirection(value)
      console.log('setdirection change')
    } else {
      // Update settings in cookie
      updateSettings({ [field]: value })
      console.log('update settings')
    }
  }

  const handleMenuClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setIsMenuOpen(false)
    console.log('setmenu close')
  }

const handleImgReset = () =>{
    setImgSrc('/images/avatars/1.png')
    setFileInput('')

    console.log("reset photo");
  }

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const {files} = file.target

    if (files && files.length !== 0) {
      reader.onload =() => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result)
      }
    }

    console.log("file input");
  }

  return (
    <ScrollWrapper>
      <div
        className={classnames('customizer-toggler flex items-center justify-center cursor-pointer', styles.toggler)}
        onClick={handleToggle}
      >
        <i className='tabler-settings text-[22px]' />
      </div>
      <div className={classnames('customizer-header flex items-center justify-between', styles.header)}>
        <div className='flex flex-col'>
          <h4 className={styles.customizerTitle}>Theme Customizer</h4>
          <p className={styles.customizerSubtitle}>Customize & Preview in Real Time</p>
        </div>
        <div className='flex gap-4'>
          <div onClick={resetSettings} className='relative flex cursor-pointer'>
            <i className={classnames('tabler-refresh', styles.textPrimaryColor)} />
            <div className={classnames(styles.dotStyles, { [styles.show]: isSettingsChanged })} />
          </div>
        </div>
      </div>

      <div className={classnames('customizer-body flex flex-col', styles.customizerBody)}>
        <div className='theming-section flex flex-col gap-6'>
          <Chip
            label='Theming'
            size='small'
            color='primary'
            variant='tonal'
            className={classnames('self-start', styles.chip)}
          />
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Primary Color</p>
            <div className='flex items-center justify-between'>
              {primaryColorConfig.map(item => (
                <div
                  key={item.main}
                  className={classnames(styles.primaryColorWrapper, {
                    [styles.active]: settings.primaryColor === item.main
                  })}
                  onClick={() => handleChange('primaryColor', item.main)}
                >
                  <div className={styles.primaryColor} style={{ backgroundColor: item.main }} />
                </div>
              ))}
              <div
                ref={anchorRef}
                className={classnames(styles.primaryColorWrapper, {
                  [styles.active]: !isColorFromPrimaryConfig
                })}
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                <div
                  className={classnames(styles.primaryColor, 'flex items-center justify-center')}
                  style={{
                    backgroundColor: !isColorFromPrimaryConfig
                      ? settings.primaryColor
                      : 'var(--mui-palette-action-selected)',
                    color: isColorFromPrimaryConfig
                      ? 'var(--mui-palette-text-primary)'
                      : 'var(--mui-palette-primary-contrastText)'
                  }}
                >
                  <i className='tabler-color-picker text-xl' />
                </div>
              </div>
              <Popper
                transition
                open={isMenuOpen}
                disablePortal
                anchorEl={anchorRef.current}
                placement='bottom-end'
                className='z-[1]'
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                    <Paper elevation={6} className={styles.colorPopup}>
                      <ClickAwayListener onClickAway={handleMenuClose}>
                        <div>
                          <DebouncedColorPicker
                            settings={settings}
                            isColorFromPrimaryConfig={isColorFromPrimaryConfig}
                            handleChange={handleChange}
                          />
                        </div>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Secondary Color</p>
            <div className='flex items-center justify-between'>
              {primaryColorConfig.map(item => (
                <div
                  key={item.main}
                  className={classnames(styles.primaryColorWrapper, {
                    [styles.active]: settings.primaryColor === item.main
                  })}
                  onClick={() => handleChange('primaryColor', item.main)}
                >
                  <div className={styles.primaryColor} style={{ backgroundColor: item.main }} />
                </div>
              ))}
              <div
                ref={anchorRef}
                className={classnames(styles.primaryColorWrapper, {
                  [styles.active]: !isColorFromPrimaryConfig
                })}
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                <div
                  className={classnames(styles.primaryColor, 'flex items-center justify-center')}
                  style={{
                    backgroundColor: !isColorFromPrimaryConfig
                      ? settings.primaryColor
                      : 'var(--mui-palette-action-selected)',
                    color: isColorFromPrimaryConfig
                      ? 'var(--mui-palette-text-primary)'
                      : 'var(--mui-palette-primary-contrastText)'
                  }}
                >
                  <i className='tabler-color-picker text-xl' />
                </div>
              </div>
              <Popper
                transition
                open={isMenuOpen}
                disablePortal
                anchorEl={anchorRef.current}
                placement='bottom-end'
                className='z-[1]'
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                    <Paper elevation={6} className={styles.colorPopup}>
                      <ClickAwayListener onClickAway={handleMenuClose}>
                        <div>
                          <DebouncedColorPicker
                            settings={settings}
                            isColorFromPrimaryConfig={isColorFromPrimaryConfig}
                            handleChange={handleChange}
                          />
                        </div>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Tertiary Color</p>
            <div className='flex items-center justify-between'>
              {primaryColorConfig.map(item => (
                <div
                  key={item.main}
                  className={classnames(styles.primaryColorWrapper, {
                    [styles.active]: settings.primaryColor === item.main
                  })}
                  onClick={() => handleChange('primaryColor', item.main)}
                >
                  <div className={styles.primaryColor} style={{ backgroundColor: item.main }} />
                </div>
              ))}
              <div
                ref={anchorRef}
                className={classnames(styles.primaryColorWrapper, {
                  [styles.active]: !isColorFromPrimaryConfig
                })}
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                <div
                  className={classnames(styles.primaryColor, 'flex items-center justify-center')}
                  style={{
                    backgroundColor: !isColorFromPrimaryConfig
                      ? settings.primaryColor
                      : 'var(--mui-palette-action-selected)',
                    color: isColorFromPrimaryConfig
                      ? 'var(--mui-palette-text-primary)'
                      : 'var(--mui-palette-primary-contrastText)'
                  }}
                >
                  <i className='tabler-color-picker text-xl' />
                </div>
              </div>
              <Popper
                transition
                open={isMenuOpen}
                disablePortal
                anchorEl={anchorRef.current}
                placement='bottom-end'
                className='z-[1]'
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                    <Paper elevation={6} className={styles.colorPopup}>
                      <ClickAwayListener onClickAway={handleMenuClose}>
                        <div>
                          <DebouncedColorPicker
                            settings={settings}
                            isColorFromPrimaryConfig={isColorFromPrimaryConfig}
                            handleChange={handleChange}
                          />
                        </div>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='font-medium'>Mode</p>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start gap-0.5'>
            <div
              className={classnames(styles.itemWrapper, styles.modeWrapper, {
                [styles.active]: settings.mode === 'light'
              })}
              onClick={() => handleChange('mode', 'light')}
            >
              <i className='tabler-sun text-[30px]' />
            </div>
            <p className={styles.itemLabel} onClick={() => handleChange('mode', 'light')}>
              Light
            </p>
          </div>
          <div className='flex flex-col items-start gap-0.5'>
            <div
              className={classnames(styles.itemWrapper, styles.modeWrapper, {
                [styles.active]: settings.mode === 'dark'
              })}
              onClick={() => handleChange('mode', 'dark')}
            >
              <i className='tabler-moon-stars text-[30px]' />
            </div>
            <p className={styles.itemLabel} onClick={() => handleChange('mode', 'dark')}>
              Dark
            </p>
          </div>
          <div className='flex flex-col items-start gap-0.5'>
            <div
              className={classnames(styles.itemWrapper, styles.modeWrapper, {
                [styles.active]: settings.mode === 'system'
              })}
              onClick={() => handleChange('mode', 'system')}
            >
              <i className='tabler-device-laptop text-[30px]' />
            </div>
            <p className={styles.itemLabel} onClick={() => handleChange('mode', 'system')}>
              System
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='font-medium'>Skin</p>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-start gap-0.5'>
            <div
              className={classnames(styles.itemWrapper, { [styles.active]: settings.skin === 'default' })}
              onClick={() => handleChange('skin', 'default')}
            >
              <SkinDefault />
            </div>
            <p className={styles.itemLabel} onClick={() => handleChange('skin', 'default')}>
              Default
            </p>
          </div>
          <div className='flex flex-col items-start gap-0.5'>
            <div
              className={classnames(styles.itemWrapper, { [styles.active]: settings.skin === 'bordered' })}
              onClick={() => handleChange('skin', 'bordered')}
            >
              <SkinBordered />
            </div>
            <p className={styles.itemLabel} onClick={() => handleChange('skin', 'bordered')}>
              Bordered
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <label className='font-medium cursor-pointer' htmlFor='customizer-semi-dark'>
          Semi Dark
        </label>
        <Switch
          id='customizer-semi-dark'
          checked={settings.semiDark === true}
          onChange={() => handleChange('semiDark', !settings.semiDark)}
        />
      </div>
      <div className='layout-section flex flex-col gap-6'>
        <Chip
          label='Layout'
          variant='tonal'
          size='small'
          color='primary'
          className={classnames('self-start', styles.chip)}
        />
        <div className='flex flex-col gap-2'>
          <p className='font-medium'>Layouts</p>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start gap-0.5'>
              <div
                className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'vertical' })}
                onClick={() => handleChange('layout', 'vertical')}
              >
                <LayoutVertical />
              </div>
              <p className={styles.itemLabel} onClick={() => handleChange('layout', 'vertical')}>
                Vertical
              </p>
            </div>
            <div className='flex flex-col items-start gap-0.5'>
              <div
                className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'collapsed' })}
                onClick={() => handleChange('layout', 'collapsed')}
              >
                <LayoutCollapsed />
              </div>
              <p className={styles.itemLabel} onClick={() => handleChange('layout', 'collapsed')}>
                Collapsed
              </p>
            </div>
            <div className='flex flex-col items-start gap-0.5'>
              <div
                className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'horizontal' })}
                onClick={() => handleChange('layout', 'horizontal')}
              >
                <LayoutHorizontal />
              </div>
              <p className={styles.itemLabel} onClick={() => handleChange('layout', 'horizontal')}>
                Horizontal
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-medium'>Content</p>
          <div className='flex items-center gap-4'>
            <div className='flex flex-col items-start gap-0.5'>
              <div
                className={classnames(styles.itemWrapper, {
                  [styles.active]: settings.contentWidth === 'compact'
                })}
                onClick={() =>
                  updateSettings({
                    navbarContentWidth: 'compact',
                    contentWidth: 'compact',
                    footerContentWidth: 'compact'
                  })
                }
              >
                <ContentCompact />
              </div>
              <p
                className={styles.itemLabel}
                onClick={() =>
                  updateSettings({
                    navbarContentWidth: 'compact',
                    contentWidth: 'compact',
                    footerContentWidth: 'compact'
                  })
                }
              >
                Compact
              </p>
            </div>
            <div className='flex flex-col items-start gap-0.5'>
              <div
                className={classnames(styles.itemWrapper, { [styles.active]: settings.contentWidth === 'wide' })}
                onClick={() =>
                  updateSettings({ navbarContentWidth: 'wide', contentWidth: 'wide', footerContentWidth: 'wide' })
                }
              >
                <ContentWide />
              </div>
              <p
                className={styles.itemLabel}
                onClick={() =>
                  updateSettings({ navbarContentWidth: 'wide', contentWidth: 'wide', footerContentWidth: 'wide' })
                }
              >
                Wide
              </p>
            </div>
          </div>
        </div>
        {!disableDirection && (
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Direction</p>
            <div className='flex items-center gap-4'>
              <Link href={getLocalePath(pathName, 'en')}>
                <div className='flex flex-col items-start gap-0.5'>
                  <div
                    className={classnames(styles.itemWrapper, {
                      [styles.active]: direction === 'ltr'
                    })}
                  >
                    <DirectionLtr />
                  </div>
                  <p className={styles.itemLabel}>
                    Left to Right <br />
                    (English)
                  </p>
                </div>
              </Link>
              <Link href={getLocalePath(pathName, 'ar')}>
                <div className='flex flex-col items-start gap-0.5'>
                  <div
                    className={classnames(styles.itemWrapper, {
                      [styles.active]: direction === 'rtl'
                    })}
                  >
                    <DirectionRtl />
                  </div>
                  <p className={styles.itemLabel}>
                    Right to Left <br />
                    (Arabic)
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div>

  <Image className="rounded" height={100} width={100} alt={"Logo"} src={imgSrc}/>

      <div>
      <Button component='label' variant='contained' htmlFor='website-logo-upload'>
    Upload New Logo
                <input
                  hidden
                  type='file'   
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='website-logo-upload'
                />
           </Button>
        <Button onClick={handleImgReset} variant='tonal' color='secondary'>Reset</Button>
     </div>
      </div>
    </ScrollWrapper>
  )
}

export default Customizer
