import rp from 'request-promise';
import getFacultyList from './src/getFacultyList.js';
import getGroupsList from './src/getGroupsList.js';
import parseFacultys from './src/parseFacultys.js';
import parseGroup from './src/parseGroup.js';
import insertDatabase from './src/insertDatabase.js';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

rp(url)
  .then(getFacultyList)
  .then(getGroupsList)
  .then(parseFacultys)
  .then(groups => {
    const groupsPairs = groups.map(group => parseGroup(group));
    return Promise.all(groupsPairs);
  })
  .then(groups => insertDatabase(groups))
  .catch(e => {
    throw new Error(e);
  });