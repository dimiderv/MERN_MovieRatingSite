import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faLinkedin,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
export default function Social() {
  return (
    <div className="social-container text-center">

      <a
        href="https://www.youtube.com/"
        className="youtube social"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a href="https://www.twitter.com/" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.linkedin.com/"
        className="linkedin social"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a
        href="https://www.github.com/dimiderv"
        className="instagram social"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a> 
        © 2023 Copyright:
            <a href="https://google/"> MovieDB.com</a>
        
    </div>
  );
}
