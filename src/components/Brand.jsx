import { Link } from 'react-router-dom'

export default function Brand({ footer = false, theme = 'dark' }) {
  return (
    <Link className={`brand${footer ? ' brand-footer' : ''}`} to="/" aria-label="tekxone home">
      <img className="brand-logo" src={`${import.meta.env.BASE_URL}${theme === 'light' ? 'logod.png' : 'logol.png'}`} alt="" />
    </Link>
  )
}
