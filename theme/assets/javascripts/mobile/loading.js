function setEvents() {

    // const path = document.querySelector('#wave');
    // const animation = document.querySelector('#moveTheWave');
    // const m = 0.512286623256592433;

    // function buildWave(w, h) {

    //   const a = h / 4;
    //   const y = h / 2;

    //   const pathData = [
    //     'M', w * 0, y + a / 2,
    //     'c',
    //       a * m, 0,
    //       -(1 - a) * m, -a,
    //       a, -a,
    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a,
    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a,

    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a,
    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a,
    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a,
    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a,
    //     's',
    //       -(1 - a) * m, a,
    //       a, a,
    //     's',
    //       -(1 - a) * m, -a,
    //       a, -a
    //   ].join(' ');

    //   path.setAttribute('d', pathData);
    // }

    // buildWave(90, 60);
    var loading_icon = 'elastic_rotation';
    var loading_path = './snippets/loading/' + loading_icon + '.njk';
    var loading = require('./snippets/loading/elastic_rotation.njk');
    $('.mobile_loading .js-loading').html(loading);
}

module.exports = {
    setEvents: setEvents
};
