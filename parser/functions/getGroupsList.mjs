import rp from 'request-promise';
const cabinet = 'https://cabinet.sut.ru/raspisanie_all_new.php';

export const getGroupsList = info => {
  const p = info.map(faculty => {
    var promise = faculty.courseList.map(course => {
      let options = {
        method: 'POST',
        uri: cabinet,
        form: {
          faculty: faculty.id,
          choice: '1',
          type_z: '1',
          kurs: course
        }
      };
      return rp(options)
        .then(response => {
          let groupsInfo = response
            .split(';')
            .filter(item => item !== '')
            .map(item => {
              let split = item.split(',');
              return {
                groupName: split[1],
                groupCode: split[0]
              };
            });
          return {
            ...course,
            groupsInfo
          };
        })
        .catch(error => console.error(error));
    });
    return Promise.all(promise).then(courseList => ({
      ...faculty,
      courseList
    }));
  });
  return Promise.all(p);
};