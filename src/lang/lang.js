import _ from 'lodash';
import config from '../app/config';
import en from './en'
import japan from './japan'

export default function(lang_en, key) {
  let languages = {};

  switch (lang_en) {
    case 'en':
      languages = en;
      break;
    case 'japan':
      languages = japan;
      break;
    default:
      languages = {};
  }
  return _.get(languages, key) || '';
}
