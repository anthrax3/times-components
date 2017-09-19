/* eslint-env browser */
/* globals videojs, bc */

import React, { Component } from "react";
import { Image } from "react-native";

import propTypes from "./brightcove-player.proptypes";
import defaults from "./brightcove-player.defaults";

let index = 0;

class BrightcoveVideo extends Component {
  static handlePlayerReady(context) {
    context.setPlayer(this);

    this.on("play", context.onPlay.bind(context, this));
    this.on("pause", context.onPause.bind(context, this));
    this.on("seeked", context.onSeeked.bind(context, this));

    this.contextmenu({ disabled: true });
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static getScriptUrl(accountId, playerId) {
    return `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
  }

  constructor(props) {
    super(props);

    index += 1;

    BrightcoveVideo.globalErrors.forEach(this.props.onError);

    this.state = {
      id: `${props.videoId}-${props.accountId}-${index}`,
      accountId: props.accountId,
      videoId: props.videoId,
      playerId: props.playerId,
      errors: [].concat(BrightcoveVideo.globalErrors),
      playerStatus: "paused",
      finished: false,
      playheadPosition: 0
    };
  }

  componentDidMount() {
    if (this.state.errors.length) {
      return;
    }

    // only ever append script once
    if (!BrightcoveVideo.players) {
      BrightcoveVideo.players = [];

      const s = this.createScript();

      s.onload = () => {
        BrightcoveVideo.players.forEach(player =>
          player.initVideoJS(player.state.id)
        );
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: "",
          message: `The script ${err.target.src} is not accessible.`
        };

        BrightcoveVideo.globalErrors.push(uriErr);

        this.props.onError(uriErr);
      };

      BrightcoveVideo.appendScript(s);
    }

    this.init();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onError(player) {
    this.props.onError(player.error());
  }

  onPlay(player) {
    this.setState({
      playerStatus: "playing",
      playheadPosition: player.currentTime(),
      finished: false
    });

    this.emitState();
  }

  onPause(player) {
    const playheadPosition = player.currentTime();

    this.setState({
      playerStatus: "paused",
      playheadPosition,
      finished: playheadPosition === player.duration()
    });

    this.emitState();
  }

  onSeeked(player) {
    this.setState({
      playheadPosition: player.currentTime(),
      finished: false
    });

    this.emitState();
  }

  setPlayer(player) {
    this.player = player;
  }

  createScript() {
    const s = document.createElement("script");
    s.src = BrightcoveVideo.getScriptUrl(
      this.props.accountId,
      this.props.playerId
    );

    return s;
  }

  emitState() {
    this.props.onChange(this.state);
  }

  initVideoJS(id) {
    const player = videojs(id);
    const handler = BrightcoveVideo.handlePlayerReady.bind(player, this);

    player.ready(handler);
    player.on("error", this.onError.bind(this, player));
  }

  initVideo(id) {
    bc(document.getElementById(id), {
      controlBar: {
        fullscreenToggle: !this.props.hideFullScreenButton
      }
    });

    this.initVideoJS(id);
  }

  init() {
    if (window.bc && window.videojs) {
      this.initVideo(this.state.id);
    } else {
      BrightcoveVideo.players.push(this);
    }
  }

  play() {
    if (this.player) {
      this.player.play();
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  render() {
    /* eslint jsx-a11y/media-has-caption: "off" */
    // Added a wrapping div as brightcove adds siblings to the video tag
    return (
      <div>
        <video
          id={this.state.id}
          style={{ width: this.props.width, height: this.props.height }}
          {...(this.props.poster ? { poster: this.props.poster.uri } : {})}
          data-embed="default"
          data-video-id={this.props.videoId}
          data-account={this.props.accountId}
          data-player={this.props.playerId}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={this.props.autoplay}
          data-application-id
          className="video-js"
          controls
        />
      </div>
    );
  }
}

BrightcoveVideo.globalErrors = [];

BrightcoveVideo.defaultProps = defaults;

BrightcoveVideo.propTypes = Object.assign(
  { poster: Image.propTypes.source },
  propTypes
);

export default BrightcoveVideo;
