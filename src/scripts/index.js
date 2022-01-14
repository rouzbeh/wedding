import '../styles/index.scss';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Modal } from 'bootstrap';

// stupid hack so that leaflet's images work after going through webpack
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Internationalisation
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import 'youtube-background';
delete L.Icon.Default.prototype._getIconUrl;

import logo from '../assets/logo.svg';
import logo_fa from '../assets/logo-fa.svg';
import logo_small from '../assets/small-logo.svg';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// alert_markup
function alert_markup(alert_type, msg) {
  return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '</div>';
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

function find_get_parameter(parameter_name) {
  var result = null,
    tmp = [];
  location.search
    .substring(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameter_name) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

$(function () {
  document.getElementById('logoSmall').src = logo_small;
  const code = find_get_parameter('code');
  if (code !== null) {
    document.getElementById('inviteCode').value = code;
    document.getElementById('inviteCodeDiv').hidden = "true";
    document.getElementById('commentDiv').classList.remove("col-md-6");
    document.getElementById('commentDiv').classList.add("col-md-12");
    document.getElementById('commentDiv').classList.remove("col-sm-6");
    document.getElementById('commentDiv').classList.add("col-sm-12");
    document.getElementById('langEN').href = '?lng=en&code=' + code;
    document.getElementById('langFR').href = '?lng=fr&code=' + code;
    document.getElementById('langFA').href = '?lng=fa&code=' + code;
  }
  i18next.use(LanguageDetector).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          "pageTitle": "Ali &#x1F492 Émeline",
          "hitched": "We are getting hitched",
          "dates": "It is happening on the 19<sup>th</sup> of July 2022 and we would love for you to be a part of it.",
          "getThere": "How do I get there?",
          "easier": "It's way easier than you think!",
          "manorName": "Manoir de la Fresnaye",
          "manorCity": "Réminiac, Brittany",
          "thanks": "Thank you!",
          "glad": "We are glad to see you join us on our big day.",
          "waiting": "What are you waiting for?",
          "appreciate": "We would greatly appreciate if you could RSVP before 1st of June 2022",
          "yourName": "Your name",
          "yourEmail": "Your email",
          "notes": "Comments",
          "inviteCode": "Invite code",
          "itsMe": "Yes, that's me!",
          "saving": "<strong>Just a sec!</strong> We are saving your details.",
          "wrongCode": "<strong>Sorry!</strong> Your invite code is incorrect."
        }
      },
      fr: {
        translation: {
          "pageTitle": "Ali &#x1F492 Émeline",
          "hitched": "Nous allons nous marier !",
          "dates": "La fête aura lieu le 19 juillet 2022 et nous serions ravis de votre présence",
          "getThere": "Comment y aller ?",
          "easier": "Rien de plus simple !",
          "manorName": "Manoir de la Fresnaye",
          "manorCity": "Réminiac, Bretagne",
          "thanks": "Merci !",
          "glad": "Nous sommes heureux de votre présence le jour J.",
          "waiting": "Qu'attendez-vous ?",
          "appreciate": "Nous vous remercions de bien vouloir nous faire parvenir votre réponse avant le premier juin 2022",
          "yourName": "Votre nom",
          "yourEmail": "Votre courriel",
          "notes": "Commentaires",
          "inviteCode": "Code d'invitation",
          "itsMe": "Oui, c'est moi !",
          "saving": "<strong>Une petite seconde !</strong> On note.",
          "wrongCode": "<strong>Désolé !</strong> Le code est incorrect."
        }
      },
      fa: {
        translation: {
          "logo": logo_fa,
          "pageTitle": "امیرحسن &#x1F492 املین",
          "hitched": "عروسی می‌کنیم!",
          "dates": "۲۸ تیر ۱۴۰۱ در فرانسه جشنی می‌گیریم، و از دیدنتان خوشحال می‌شویم",
          "getThere": "چطور به مکان برسیم؟",
          "easier": "بسیار ساده است!",
          "manorName": "Manoir de la Fresnaye",
          "manorCity": "Réminiac, Bretagne",
          "thanks": "سپاسگزاریم!",
          "glad": "از حضور شما خوشوقتیم.",
          "waiting": "منتظر چه هستید؟",
          "appreciate": "لطفا جواب دعوتنامه را تا اول خرداد ۱۴۰۱ به ما برسانید",
          "yourName": "نام",
          "yourEmail": "ایمیل",
          "notes": "یاد داشت",
          "inviteCode": "رمز",
          "itsMe": "می آییم",
          "dir": "rtl",
          "saving": "<strong>یک لحظه</strong> یاد داشت می‌کنیم.",
          "wrongCode": "<strong>Sorry!</strong> Wrong code."
        }
      }
    }
  }).then(function (t) {
    document.getElementById('pageTitle').innerHTML = t('pageTitle');
    document.getElementById('logo').src = t('logo', logo);
    document.getElementById('hitched').innerHTML = t('hitched');
    document.getElementById('dates').innerHTML = t('dates');
    document.getElementById('getThere').innerHTML = t('getThere');
    document.getElementById('easier').innerHTML = t('easier');
    document.getElementById('manorName').innerHTML = t('manorName');
    document.getElementById('manorCity').innerHTML = t('manorCity');
    document.getElementById('thanks').innerHTML = t('thanks');
    document.getElementById('glad').innerHTML = t('glad');
    document.getElementById('waiting').innerHTML = t('waiting');
    document.getElementById('appreciate').innerHTML = t('appreciate');
    document.getElementById('yourName').placeholder = t('yourName');
    document.getElementById('yourEmail').placeholder = t('yourEmail');
    document.getElementById('notes').placeholder = t('notes');
    document.getElementById('inviteCode').placeholder = t('inviteCode');
    document.getElementById('itsMe').innerHTML = t('itsMe');
    document.getElementById('body').dir = t('dir', 'ltr');
  });

  // Video
  jQuery('[data-youtube]').youtube_background();

  // Map
  var map = L.map('map-canvas', {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([47.8561764, -2.2697361], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker([47.8561764, -2.2697361], {
    title: "Manoir de la Fresnaye"
  });

  marker.on('click', () => window.location = "https://www.google.com/maps/dir//Manoir+de+la+Fresnaye,+56140+R%C3%A9miniac/@47.8562038,-2.2695998,17z/data=!4m16!1m6!3m5!1s0x480fbbcbec90e429:0x90c35356d193253!2sManoir+de+la+Fresnaye!8m2!3d47.8562002!4d-2.2674111!4m8!1m0!1m5!1m1!1s0x480fbbcbec90e429:0x90c35356d193253!2m2!1d-2.2674111!2d47.8562002!3e3");
  marker.addTo(map);

  // RSVP

  const myModal = new Modal($('#rsvp-modal'), {
    keyboard: true,
  });

  $('#rsvp-form').on('submit', async function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $('#alert-wrapper').html(alert_markup('info',
      i18next.t('saving')));

    const buf = new TextEncoder('utf-8').encode('2rTdpdXqXwkPCD6j' + document.getElementById('inviteCode').value);
    const hash_buffer = await window.crypto.subtle.digest('SHA-256', buf);
    const hash = buf2hex(hash_buffer);
    if (hash !== '6d16f5bf968fad8cf353f4f45f1c155620d0438233e853239c70d2fb81d2b8a6') {
      $('#alert-wrapper').html(alert_markup('danger', i18next.t('wrongCode')));
    } else {
      $.post('https://script.google.com/macros/s/AKfycbzFouecG2X4STE4PTd1U5G1ah814GDOD7_scFaoCH2TekAQi83Hi3M26YOXg5GjM__w3Q/exec', data)
        .done(function (data) {
          if (data.result === "error") {
            $('#alert-wrapper').html(alert_markup('danger', data.message));
          } else {
            $('#alert-wrapper').html('');
            myModal.show();
          }
        })
        .fail(function (data) {
          console.log(data);
          $('#alert-wrapper').html(alert_markup('danger',
            '<strong>Sorry!</strong> There is some issue with the server. '));
        });
    }
  });
});
