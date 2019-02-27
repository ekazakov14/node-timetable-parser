import rp from 'request-promise';
import { getFacultyList } from './functions/getFacultyList.mjs';
import { getGroupsList } from './functions/getGroupsList.mjs';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

rp(url)
  .then(getFacultyList)
  .then(getGroupsList)
  .then(result => console.log(result))
  .catch(error => console.error(error));