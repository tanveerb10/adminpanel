"use client"
import { useRef, useState } from 'react'

import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import classnames from 'classnames'

import DebouncedColorPicker from './DebouncedColorPicker'

import styles from './styles.module.css'

const ColorPickerSection = ({ color, setColor, title }) => {
    const [isMenuOpen, setIsMenuOpen] = useState( false);
    const anchorRef = useRef(null);
  
    const handleMenuClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setIsMenuOpen(false);
    };
  
    const handleMenuOpen = () => {
      setIsMenuOpen(true);
    };

    return (
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>{title}</p>
        <div className="flex gap-3">
          <div
            
            className={classnames(styles.primaryColorWrapper)}
            
          >
            <div
              className={classnames(styles.primaryColor, 'flex items-center justify-center')}
              style={{ backgroundColor: color }}
           ></div>
              
          </div>

          <div
            ref={anchorRef}
            className={classnames(styles.primaryColorWrapper)}
            onClick={handleMenuOpen}
          >
            <div
              className={classnames(styles.primaryColor, 'flex items-center justify-center')}
              
            >
              <i className='tabler-color-picker text-xl' />
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
                  <Paper elevation={6} style={{ padding: '16px', marginTop: '1px' }}>
                    <ClickAwayListener onClickAway={handleMenuClose}>
                      <div>
                        <DebouncedColorPicker color={color} onChange={setColor} />
                      </div>
                    </ClickAwayListener>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </div>





  
        <p>{color}</p>
      </div>
    );
  };

  export default ColorPickerSection
