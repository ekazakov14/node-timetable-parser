import rp from 'request-promise';
import getFacultyList from './src/getFacultyList.mjs';
import getGroupsList from './src/getGroupsList.mjs';
import parseFacultys from './src/parseFacultys.mjs';
import parseGroup from './src/parseGroup.mjs';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

rp(url)
  .then(getFacultyList)
  .then(getGroupsList)
  .then(parseFacultys)
  .then(groups => {
    const groupsPairs = groups.map(group => (
      parseGroup(group)
    ));
    return Promise.all(groupsPairs);
  })
  .catch(e => console.error(e));
