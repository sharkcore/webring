/* eslint-env browser */
import { LitElement, css, html } from "lit-element";

const sites = [
  "https://www.mulder.io/",
  "https://mark.larah.me/",
  "https://joebateson.com/",
];

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function currentSiteIndex(sites) {
  let index = sites.findIndex((site) => site.includes(window.location.host));
  if (index < 0) {
    index = randomInt(sites.length);
    console.warn(
      `Couldn't detect site based on window.location! Using random site: ${sites[index]}`
    );
  }
  return index;
}

class SharkcoreWebring extends LitElement {
  static get styles() {
    return css`
      table {
        background-image: url("https://sharkcore-webring.netlify.app/background.jpg");
        max-width: 600px;
        width: 100%;
        text-align: center;
        font-family: "Comic Sans MS";
        color: white;
        font-smooth: never;
        -webkit-font-smoothing: none;
        font-size: 1.3rem;
      }

      a {
        color: aqua;
        font-weight: bold;
      }

      video {
        width: 80px;
        height: 84.8px;
      }

      @media screen and (max-width: 390px) {
          .right-shark {
              display: none;
          }
      }
    `;
  }

  render() {
    const index = currentSiteIndex(sites);

    const nextHref = sites[(index + 1) % sites.length];
    const prevHref = sites[(index - 1 + sites.length) % sites.length];

    const sharkAnimation = "https://sharkcore-webring.netlify.app/shark.webm";

    return html`
      <table border="1">
        <tr>
          <td>
            <video alt="dancing left shark" disableRemotePlayback autoplay loop muted>
                <source src="${sharkAnimation}" type="video/mp4">
            </video>
          </td>
          <td>
            <b>OFFICIAL SITE</b>
            <br />

            SHARKCORE Developers Web Ring
          </td>
          <td class="right-shark">
            <video alt="dancing right shark" disableRemotePlayback autoplay loop muted>
                <source src="${sharkAnimation}" type="video/mp4">
            </video>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span>[<a href="${prevHref}">&laquo; Prev</a>]</span>
            <span>[<a href="${nextHref}">Next &raquo;</a>]</span>
          </td>
        </tr>
      </table>
    `;
  }
}

customElements.define("sharkcore-webring", SharkcoreWebring);
