import rp from 'request-promise';
import getFacultyList from './src/getFacultyList.mjs';
import getGroupsList from './src/getGroupsList.mjs';
import parseFacultys from './src/parseFacultys.mjs';
import filterEmpty from './src/filterEmpty.mjs';
import parseGroupList from './src/parseGroupList.mjs';
import insertDatabase from './src/insertDatabase.mjs';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

const main = async () => {
  try {
    const page = await rp(url);
    let facultys = getFacultyList(page);
    facultys = await getGroupsList(facultys);
    facultys = filterEmpty(facultys);
    const groups = parseFacultys(facultys);
    const groupsData = await parseGroupList(groups);
    insertDatabase(groupsData);
  } catch (e) {
    console.error(e);
  }
};

main();
