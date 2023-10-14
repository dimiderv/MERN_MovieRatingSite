// import styles of this component
import styles from './Titles.module.css'
// import other pkg

const Titles = ({ title, text }) => {
    return (
        <>
            <h1 className={`${styles['information-heading']} mt-1`}>{title}</h1>
            <h3 className={`${styles['information-heading-text']} text-muted p-0`}>{text}</h3>
        </>
    )
}


export default Titles