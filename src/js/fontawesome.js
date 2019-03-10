// config 各種挙動の設定用コンフィギュレーションオブジェクト
// dom DOM関連のユーティリティ
// libray 取り込みたいアイコンを追加できるユーティリティ
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faDog, faCat} from '@fortawesome/free-solid-svg-icons';
import {faComments} from '@fortawesome/free-regular-svg-icons';
config.showMissingIcons = false;
library.add(faDog,faComments,faCat);
dom.i2svg();
//dom.watch();
