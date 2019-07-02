import React from "react";
import styled from "styled-components";
import { default as BaseSplash } from "components/Splash";
import { default as BaseIcon } from "react-simple-icons";

interface Props {
  text: string;
  url: string;
}
function SharePost({ text, url }: Props) {
  function handleShare(e, social) {
    e.preventDefault();
    const articleUrl = url || window.location.href;

    switch (social) {
      case "twitter":
        window.open(
          "http://twitter.com/share?url=" +
            encodeURIComponent(articleUrl) +
            "&text=" +
            encodeURIComponent(text),
          "",
          "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
        break;
      case "linkedin":
        window.open(
          "http://www.linkedin.com/shareArticle?mini=true&url=" +
            encodeURIComponent(articleUrl),
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
      case "facebook":
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" + articleUrl,
          "facebook-popup",
          "height=350,width=600"
        );
        break;
      default:
        break;
    }
  }
  return (
    <Socials>
      {[
        { title: "twitter", link: "/", iconHandle: "twitter" },
        { title: "linkedin", link: "/", iconHandle: "linkedin" },
        { title: "facebook", link: "/", iconHandle: "facebook" }
      ].map(social => (
        <SocialLink
          key={social.title}
          href={social.link}
          aria-label={`Share article on ${social.title}`}
          onClick={e => handleShare(e, social.title)}
        >
          <Splash className={social.iconHandle} size="60px">
            <Icon name={social.iconHandle} />
          </Splash>
        </SocialLink>
      ))}
    </Socials>
  );
}

const SocialLink = styled.a`
  display: inline-block;
  margin: 5px;
`;

const Icon = styled(BaseIcon)`
  fill: #fff;
`;

const Splash = styled(BaseSplash)`
  transition: 0.3s all;
  &.twitter {
    background-color: rgba(29, 161, 242, 0.7);
    &:hover {
      background-color: rgba(29, 161, 242, 1);
    }
  }
  &.facebook {
    background-color: rgba(59, 89, 152, 0.7);
    &:hover {
      background-color: rgba(59, 89, 152, 1);
    }
  }

  &.github {
    background-color: rgba(24, 23, 23, 0.7);
    &:hover {
      background-color: rgba(24, 23, 23, 1);
    }
  }
  &.linkedin {
    background-color: rgba(72, 117, 180, 0.7);
    &:hover {
      background-color: rgba(72, 117, 180, 1);
    }
  }
`;
const Socials = styled.div`
  display: flex;
  margin-top: 20px;
`;
export default SharePost;
