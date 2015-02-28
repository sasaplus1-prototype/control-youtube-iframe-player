(function(){

  'use strict';

  var youtubeScript, firstScript;

  function onReady(event) {
    this.ready('ready');
  }

  function onStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        this.state('unstarted');
        break;
      case YT.PlayerState.ENDED:
        this.state('ended');
        break;
      case YT.PlayerState.PLAYING:
        this.state('playing');
        break;
      case YT.PlayerState.PAUSED:
        this.state('paused');
        break;
      case YT.PlayerState.BUFFERING:
        this.state('buffering');
        break;
      case YT.PlayerState.CUED:
        this.state('cued');
        break;
    }
  }

  function ViewModel() {
    this.ready = ko.observable('');
    this.state = ko.observable('');
    this.onReady = onReady.bind(this);
    this.onStateChange = onStateChange.bind(this);
  }

  window.onYouTubeIframeAPIReady = function() {
    var player,
        vm = new ViewModel;

    player = new YT.Player('iframe-player', {
      events: {
        onReady: vm.onReady,
        onStateChange: vm.onStateChange
      }
    });

    ko.applyBindings(vm);
  };

  youtubeScript = document.createElement('script');
  youtubeScript.src = 'https://www.youtube.com/iframe_api';

  firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(youtubeScript, firstScript);

}());
