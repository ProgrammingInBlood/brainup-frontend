import Link from "next/link";
import styles from "./Navigation.module.scss";
function Navigation() {
  return (
    <div className={styles.conatiner}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Link href="/">
            <span
              className={styles.svg}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                id="SvgjsSvg1001"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs id="SvgjsDefs1002"></defs>
                <g id="SvgjsG1008" transform="matrix(1,0,0,1,0,0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="24"
                    height="24"
                    fill="black"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <circle
                      cx="128.001"
                      cy="128"
                      r="96"
                      fill="none"
                      stroke="#000" //here
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></circle>
                    <circle
                      cx="128"
                      cy="176"
                      r="16"
                      fill="#000" //here
                    ></circle>
                    <path
                      fill="none"
                      stroke="#000" //here
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      d="M128.001,136.0045a28,28,0,1,0-28-28"
                    ></path>
                  </svg>
                </g>
              </svg>
              <a>Ask</a>
            </span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/give-answer">
            <span
              className={styles.svg}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                id="SvgjsSvg1014"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs id="SvgjsDefs1015"></defs>
                <g id="SvgjsG1016" transform="matrix(1,0,0,1,0,0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 512 512"
                    viewBox="0 0 512 512"
                    width="24"
                    height="24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0,37.069v183.458c0,16.958,13.789,30.753,30.743,30.753h29.711c4.71,0,8.53,3.817,8.53,8.533v68l71.047-73.921
	c1.61-1.675,3.83-2.612,6.155-2.612h15.157v-38.348c0-26.506,21.559-48.064,48.059-48.064h121.948V37.069
	c0-16.951-13.794-30.74-30.743-30.74H30.743C13.789,6.33,0,20.118,0,37.069L0,37.069z M209.401,181.934h271.6
	c17.1,0,30.999,13.9,30.999,30.997v184.642c0,17.088-13.899,30.986-30.999,30.986h-29.897c-4.715,0-8.535,3.82-8.535,8.533v68.577
	l-71.59-74.486c-1.615-1.675-3.834-2.625-6.159-2.625H209.401c-17.09,0-30.989-13.897-30.989-30.986V212.931
	C178.411,195.833,192.311,181.934,209.401,181.934L209.401,181.934z M261.842,244.431h166.721c4.715,0,8.535,3.819,8.535,8.533
	c0,4.713-3.819,8.533-8.535,8.533H261.842c-4.715,0-8.535-3.82-8.535-8.533C253.308,248.25,257.127,244.431,261.842,244.431
	L261.842,244.431z M261.842,296.719h166.721c4.715,0,8.535,3.819,8.535,8.533c0,4.704-3.819,8.533-8.535,8.533H261.842
	c-4.715,0-8.535-3.83-8.535-8.533C253.308,300.537,257.127,296.719,261.842,296.719L261.842,296.719z M261.842,348.997
	c-4.715,0-8.535,3.818-8.535,8.533c0,4.714,3.82,8.533,8.535,8.533h166.721c4.715,0,8.535-3.82,8.535-8.533
	c0-4.716-3.819-8.533-8.535-8.533H261.842L261.842,348.997z M113.278,210.169c0,7.681-6.275,13.952-13.965,13.952
	c-7.685,0-13.96-6.271-13.96-13.952c0-7.692,6.275-13.963,13.96-13.963C107.003,196.207,113.278,202.478,113.278,210.169
	L113.278,210.169z M153.864,92.621c0,21.024-12.304,40.406-31.341,49.376c-9.189,4.321-14.674,12.96-14.674,23.116v9.227
	c0,4.704-3.82,8.533-8.535,8.533c-4.71,0-8.53-3.829-8.53-8.533v-9.227c0-16.939,9.149-31.35,24.472-38.56
	c13.084-6.164,21.539-19.476,21.539-33.931c0-20.672-16.813-37.483-37.481-37.483c-20.663,0-37.476,16.811-37.476,37.483
	c0,4.704-3.819,8.533-8.535,8.533c-4.71,0-8.53-3.829-8.53-8.533c0-30.08,24.468-54.549,54.541-54.549
	C129.391,38.072,153.864,62.542,153.864,92.621L153.864,92.621z M207.357,117.891c0-4.714,3.819-8.533,8.535-8.533h64.64
	c4.71,0,8.535,3.82,8.535,8.533c0,4.716-3.825,8.533-8.535,8.533h-64.64C211.177,126.424,207.357,122.607,207.357,117.891
	L207.357,117.891z M207.357,65.614c0-4.716,3.819-8.533,8.535-8.533h64.64c4.71,0,8.535,3.817,8.535,8.533
	c0,4.704-3.825,8.533-8.535,8.533h-64.64C211.177,74.147,207.357,70.318,207.357,65.614z"
                      clipRule="evenodd"
                      fill="#000" //here
                    ></path>
                  </svg>
                </g>
              </svg>
              <a>Answer</a>
            </span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/users/search">
            <span
              className={styles.svg}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 29 29"
                xmlSpace="preserve"
                width={24}
                height={24}
                fill="#687b8c"
              >
                <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
                <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
              </svg>

              <a>Search</a>
            </span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/profile">
            <span
              className={styles.svg}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                id="SvgjsSvg1019"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs id="SvgjsDefs1020"></defs>
                <g id="SvgjsG1021" transform="matrix(1,0,0,1,0,0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"
                      fill="#000" //here
                    ></path>
                  </svg>
                </g>
              </svg>
              <a>Me</a>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
