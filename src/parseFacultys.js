export default function parseGroup(facultys) {
  let groups = [];
  facultys.forEach(faculty => {
    faculty.courseList.forEach(course => {
      course.groupsInfo.forEach(group => {
        groups = [
          ...groups,
          {
            group,
            faculty: {
              id: faculty.id,
              name: faculty.name
            }
          }
        ];
      });
    });
  });
  return groups;
}