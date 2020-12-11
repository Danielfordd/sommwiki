import React from 'react'
import { Icon } from '@iconify/react';
import linkedin2Icon from '@iconify-icons/icomoon-free/linkedin2';
import githubOutlined from '@iconify-icons/ant-design/github-outlined';
import angellistIcon from '@iconify-icons/fa/angellist';

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-inner">
                <span>Created by: Daniel Ford</span>
                <a href="https://github.com/Danielfordd/sommwiki" className="github-a" alt="github"><Icon icon={githubOutlined} className="github" /></a>
                <a href="https://www.linkedin.com/in/daniel-ford-29970a5a/" alt="linkedin"><Icon icon={linkedin2Icon} className="linkedin" /></a>
                <a href="https://angel.co/u/daniel-ford-14" className="angel" alt="angellist" ><Icon icon={angellistIcon} className="angels" /></a>
            </div>
        </div>
    )
}

export default Footer
