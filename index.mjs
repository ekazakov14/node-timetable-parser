import rp from 'request-promise';
import getFacultyList from './src/getFacultyList.mjs';
import getGroupsList from './src/getGroupsList.mjs';
import parseGroups from './src/parseGroups.mjs';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

rp(url)
  .then(getFacultyList)
  .then(getGroupsList)
  .then(parseGroups)
  .catch(e => console.error(e));