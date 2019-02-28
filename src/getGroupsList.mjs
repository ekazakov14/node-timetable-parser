import rp from 'request-promise';
const cabinet = 'https://cabinet.sut.ru/raspisanie_all_new.php';

export default function getGroupsList(info) {
  const p = info.map(faculty => {
    const promise = faculty.courseList.map(course => {
      const options = {
        method: 'POST',
        uri: cabinet,
        form: {
          faculty: faculty.id,
          choice: '1',
          type_z: '1',
          kurs: course.value
        }
      };
      return rp(options)
        .then(response => {
          const groupsInfo = response
            .split(';')
            .filter(item => item !== '')
            .map(item => {
              const split = item.split(',');
              return {
                name: split[1],
                id: split[0]
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
}