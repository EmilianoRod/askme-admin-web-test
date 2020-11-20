import { createGlobalStyle } from 'styled-components';

import NexaLight from './Nexa-Light.otf';
import Nexa from './Nexa-Regular.otf';
import NexaBold from './Nexa-Bold.otf';
import Helvetica from './Helvetica.ttf';
import HelveticaBold from './Helvetica-Bold.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'NexaLight';
    src: local('NexaLight'), url(${NexaLight}) format('opentype');
  }

  @font-face {
    font-family: 'Nexa';
    src: local('Nexa'), url(${Nexa}) format('opentype');
  }

  @font-face {
    font-family: 'NexaBold';
    src: local('NexaBold'), url(${NexaBold}) format('opentype');
  }

  @font-face {
    font-family: 'Helvetica';
    src: local('Helvetica'), url(${Helvetica}) format('truetype');
  }

  @font-face {
    font-family: 'HelveticaBold';
    src: local('HelveticaBold'), url(${HelveticaBold}) format('truetype');
  }
`;
