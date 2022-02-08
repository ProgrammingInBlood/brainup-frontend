import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../.././components/Loading";
import Navigation from "../../components/Navigation";
import { getUserDetails } from "../.././redux/actions/User";
import styles from "../../styles/Profile.module.scss";

function profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  //REDUX FOR USER
  const user = useSelector((state) => state.user);
  const { loading, data, error } = user;

  const auth = useSelector((state) => state.authentication);

  console.log(auth);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.user}>
          <Image
            src={data?.avatar ? data?.avatar : "/images/no-avatar.png"}
            alt="avatar"
            width={100}
            height={100}
            objectFit="contain"
            className={styles.user__avatar}
          />
          <div className={styles.user__info}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className={styles.user__name}>{data?.username}</h2>
              <svg
                onClick={() => router.push("/profile/edit")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                style={{ cursor: "pointer" }}
              >
                <path
                  fill="#000"
                  d="M17.864 3.60051C17.4735 3.20999 16.8403 3.20999 16.4498 3.60051L15.0356 5.01472 19.2782 9.25736 20.6924 7.84315C21.0829 7.45263 21.0829 6.81946 20.6924 6.42894L17.864 3.60051zM17.864 10.6716L13.6213 6.42894 4.72185 15.3284C4.53431 15.516 4.42896 15.7703 4.42896 16.0355L4.42896 18.864C4.42895 19.4163 4.87667 19.864 5.42896 19.864H8.25738C8.5226 19.864 8.77695 19.7586 8.96449 19.5711L17.864 10.6716z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div style={styles.userDescription}>
          <p className={styles.user__bio}>{data?.description}</p>
        </div>
        <div className={styles.stats}>
          <div
            className={styles.stats__item}
            onClick={() => router.push("/profile/followings")}
          >
            <div className={styles.stats__item__icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 50 50"
                viewBox="0 0 55 55"
                widths={24}
                height={24}
              >
                <path d="M18.82012 24.33997c5.57007 0 10.3501-7.1499 10.3501-13.01001C29.17022 5.64001 24.52007 1 18.82012 1 13.11016 1 8.46026 5.64001 8.46026 11.32996 8.46026 17.19006 13.24029 24.33997 18.82012 24.33997zM24.69024 34.93005c0-2.64001.78003-5.09009 2.12988-7.15002-1.72998-.70007-3.59009-1.05994-5.48999-1.05994h-5.56982c-8.01025 0-14.49023 6.23999-14.76025 14.23999V48c0 .54993.4502 1 1 1h33.09009c.56006 0 1-.45007 1-1v-.05994C29.66021 47.07996 24.69024 41.56995 24.69024 34.93005z" />
                <path
                  d="M37.85015,23.79993c-6.1499,0-11.15991,5-11.15991,11.13013c0,6.13989,5.01001,11.12988,11.15991,11.12988
		s11.1499-4.98999,11.1499-11.12988C49.00005,28.79993,44.00005,23.79993,37.85015,23.79993z M43.10162,32.44006L36.39068,39.151
		c-0.19531,0.19531-0.45117,0.29297-0.70703,0.29297s-0.51172-0.09766-0.70703-0.29297l-2.38281-2.38281
		c-0.39063-0.39063-0.39063-1.02344,0-1.41406s1.02344-0.39063,1.41406,0l1.67578,1.67578l6.00391-6.00391
		c0.39063-0.39063,1.02344-0.39063,1.41406,0S43.49224,32.04944,43.10162,32.44006z"
                />
              </svg>
              <h2>{data?.following?.length}</h2>
            </div>
            <p>Following</p>
          </div>

          <div
            className={styles.stats__item}
            onClick={() => router.push("/profile/followers")}
          >
            <div className={styles.stats__item__icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 14 14"
              >
                <path
                  fill="#212121"
                  d="M8.49578666,8 C9.32421378,8 9.99578666,8.67157288 9.99578666,9.5 L9.99500413,10.2483651 C10.0978758,12.0849239 8.68333886,13.0008101 6.06019361,13.0008101 C3.44551926,13.0008101 2,12.0969079 2,10.2745741 L2,9.5 C2,8.67157288 2.67157288,8 3.5,8 L8.49578666,8 Z M12.4963886,8 C13.3248157,8 13.9963886,8.67157288 13.9963886,9.5 L13.9956373,10.0265728 C14.0860521,11.6740351 12.8361745,12.5 10.5515945,12.5 C10.2414712,12.5 9.94992668,12.4848914 9.67765519,12.4546597 C10.2143644,11.9590361 10.5014697,11.2864584 10.5004904,10.4365689 L10.4942216,10.2204023 L10.4957867,9.5 C10.4957867,8.90242987 10.2337129,8.36607035 9.81823197,7.99958804 L12.4963886,8 Z M6,2 C7.38093559,2 8.50040506,3.11946948 8.50040506,4.50040506 C8.50040506,5.88134065 7.38093559,7.00081013 6,7.00081013 C4.61906441,7.00081013 3.49959494,5.88134065 3.49959494,4.50040506 C3.49959494,3.11946948 4.61906441,2 6,2 Z M11,3 C12.1045695,3 13,3.8954305 13,5 C13,6.1045695 12.1045695,7 11,7 C9.8954305,7 9,6.1045695 9,5 C9,3.8954305 9.8954305,3 11,3 Z"
                />
              </svg>
              <h2>{data?.followers?.length}</h2>
            </div>
            <p>Followers</p>
          </div>
        </div>
        <div className={styles.options}>
          <div
            className={styles.userOptions__item}
            onClick={() => router.push("/messages")}
          >
            <div className={styles.userOptions__item__icon}>
              <svg
                id="SvgjsSvg1041"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs id="SvgjsDefs1042"></defs>
                <g id="SvgjsG1043" transform="matrix(1,0,0,1,0,0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                      d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z"
                      fill="#c3d1dc"
                    ></path>
                  </svg>
                </g>
              </svg>
            </div>
            <div className={styles.userOptions__item__text}>
              <p className={styles.mainOption}>Messages</p>
            </div>
          </div>

          <div
            className={styles.userOptions__item}
            onClick={() => router.push("/answer")}
          >
            <div className={styles.userOptions__item__icon}>
              <svg
                id="SvgjsSvg1036"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs id="SvgjsDefs1037"></defs>
                <g id="SvgjsG1038" transform="matrix(1,0,0,1,0,0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 12h2c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1zm8 6H5c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm6 0h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1zm0-4h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
                      fill="#c3d1dc"
                    ></path>
                  </svg>
                </g>
              </svg>
            </div>
            <div className={styles.userOptions__item__text}>
              <p className={styles.mainOption}>My answers</p>
              <p className={styles.subOption}>{data?.answerCount} answers</p>
            </div>
          </div>
          <div
            className={styles.userOptions__item}
            onClick={() => router.push("/question")}
          >
            <div className={styles.userOptions__item__icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 64 64"
                width={24}
                height={24}
                fill="#c3d1dc"
              >
                <path
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M30.73,13H9.27A4.27,4.27,0,0,0,5,17.27V32.73A4.27,4.27,0,0,0,9.27,37H17v8l6.4-8h7.33A4.27,4.27,0,0,0,35,32.73V17.27A4.27,4.27,0,0,0,30.73,13Z"
                />
                <path
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M29 41v1.73A4.27 4.27 0 0 0 33.27 47H42.6L49 55V47h5.73A4.27 4.27 0 0 0 59 42.73V27.27A4.27 4.27 0 0 0 55 23H39M16 22a4 4 0 1 1 5.54 3.69A2.51 2.51 0 0 0 20 28h0"
                />
                <circle cx="20" cy="32" r="1" />
                <line
                  x1="39"
                  x2="55"
                  y1="29"
                  y2="29"
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <line
                  x1="39"
                  x2="55"
                  y1="33"
                  y2="33"
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <line
                  x1="39"
                  x2="55"
                  y1="37"
                  y2="37"
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <line
                  x1="39"
                  x2="44"
                  y1="41"
                  y2="41"
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <rect
                  width="3.54"
                  height="3.54"
                  x="44.73"
                  y="9.23"
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  transform="rotate(-45 46.497 11)"
                />
                <circle cx="53" cy="17" r="1" />
                <circle cx="39" cy="5" r="1" />
                <circle
                  cx="14"
                  cy="56"
                  r="2"
                  fill="#c3d1dc"
                  stroke="#000"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <circle cx="27" cy="51" r="1" />
                <circle cx="7" cy="47" r="1" />
              </svg>
            </div>
            <div className={styles.userOptions__item__text}>
              <p className={styles.mainOption}>My questions</p>
              <p className={styles.subOption}>
                {data?.questionCount} questions
              </p>
            </div>
          </div>
          <div
            className={styles.userOptions__item}
            onClick={() => router.push("/settings")}
          >
            <div className={styles.userOptions__item__icon}>
              <svg
                id="SvgjsSvg1047"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <defs id="SvgjsDefs1048"></defs>
                <g id="SvgjsG1049" transform="matrix(1,0,0,1,0,0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                      d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                      fill="#c3d1dc"
                    ></path>
                  </svg>
                </g>
              </svg>
            </div>
            <div className={styles.userOptions__item__text}>
              <p className={styles.mainOption}>Settings</p>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default profile;
