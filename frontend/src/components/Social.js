import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "react-bootstrap-icons";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
export default function Social() {
  return (
    <div class="social-container text-center">

      <a
        href="https://www.youtube.com/"
        className="youtube social"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a
        href="https://www.facebook.com/"
        className="facebook social"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://www.twitter.com/" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
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
