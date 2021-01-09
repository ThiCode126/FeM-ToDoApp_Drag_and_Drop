import React from 'react'
import SvgIconSun from './IconSun';
import SvgIconMoon from './IconMoon';
import SvgLogo from './Logo';

const Header = ({handleTheme, isDark}) => {

    return (
        <header>
            <div className="logo"  > 
                { <SvgLogo />  } 
            </div>
            <div className="theme" onClick={handleTheme} > 
                { isDark ? <SvgIconSun /> : <SvgIconMoon /> } 
            </div>
        </header>
    )
}

export default Header