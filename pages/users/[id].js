import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { getUserById, getUserDetails } from "../../redux/actions/User";
import styles from "../../styles/Profile.module.scss";

function profile() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  //REDUX FOR USER
  const userDetails = useSelector((state) => state.user);
  const { loading, data, error } = userDetails;

  const [followed, setFollowed] = useState(false);

  const auth = useSelector((state) => state.authentication);
  const { user } = auth;

  if (id == user.userId) {
    router.push("/profile");
  }

  console.log(data);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    if (data?.isFollowed) {
      setFollowed(true);
    }
  }, [data]);

  const handleConversation = async () => {
    router.push(`/messages/${id}`);
  };

  const handleFollow = async () => {
    if (followed) {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update/unfollow/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            setFollowed(false);
          } else {
            console.log(res.data);
          }
        });
    } else {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update/follow/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            setFollowed(true);
          } else {
            console.log(res.data);
          }
        });
    }
  };

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
              <span>
                <h2 className={styles.user__name}>{data?.name}</h2>
                <p
                  className={styles.user__name}
                  style={{ color: "grey", fontFamily: "proxima-regular" }}
                >
                  @{data?.username}
                </p>
              </span>
            </div>
          </div>
        </div>
        <div style={styles.userDescription}>
          <p className={styles.user__bio}>{data?.description}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stats__item} onClick={handleFollow}>
            <div className={styles.stats__item__icon}>
              {!followed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                >
                  <g data-name="Layer 2">
                    <g data-name="person-add">
                      <rect width="24" height="24" opacity="0" />
                      <path d="M21 6h-1V5a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 0 0 0-2zM10 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM16 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1" />
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 50 50"
                  viewBox="0 0 50 50"
                  width={24}
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
              )}
            </div>
            <p>{followed ? "Following" : "Follow user"}</p>
          </div>
          <div className={styles.stats__item} onClick={handleConversation}>
            <div className={styles.stats__item__icon}>
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
                      fill="#000"
                    ></path>
                  </svg>
                </g>
              </svg>
            </div>
            <p>Send message</p>
          </div>
        </div>
        <div className={styles.stats}>
          <div
            className={styles.stats__item}
            onClick={() => router.push(`/users/followings/${id}`)}
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
              <h2>{data?.following}</h2>
            </div>
            <p>Followings</p>
          </div>

          <div
            className={styles.stats__item}
            onClick={() => router.push(`/users/followers/${id}`)}
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
              <h2>{data?.followers}</h2>
            </div>
            <p>Followers</p>
          </div>
        </div>
        <div className={styles.options}>
          <div
            className={styles.userOptions__item}
            onClick={() => router.push(`/users/answer/${data.userId}`)}
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
              <p className={styles.mainOption}>Answers</p>
            </div>
          </div>
          <div
            className={styles.userOptions__item}
            onClick={() => router.push(`/users/question/${data.userId}`)}
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
              <p className={styles.mainOption}>Questions</p>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default profile;
