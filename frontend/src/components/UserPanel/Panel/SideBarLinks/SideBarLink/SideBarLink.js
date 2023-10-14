// import styles of this component
import styles from './SideBarLink.module.css'

// import other pkg to use
import { ArrowRight2 } from 'iconsax-react'

const SideBarLink = ({ id, border, text, icon, href, active, onActive }) => {
    return (
        <>
            <li className={`${styles['sidebar-link']} d-flex justify-content-between align-items-center px-4`} onClick={() => onActive(id)}>
                {href ? (
                    <a href={href} className='d-flex justify-content-between w-100 align-items-center text-decoration-none text-black'>
                        {icon}
                        <span>{text}</span>
                        <ArrowRight2 className={`${styles['right-arrow-icon']}`} size='20' color="black" />
                    </a>
                ) : (
                    <>
                        {icon}
                        <span className={active ? 'text-primary' : 'text-black'}>{text}</span>
                        <ArrowRight2 className={`${styles['right-arrow-icon']} ${active && styles.active}`} size='20' color="black" />
                    </>
                )}
            </li>
            {border && <div className={styles['sidebar-link-border']}><div></div></div>}
        </>
    )
}



export default SideBarLink