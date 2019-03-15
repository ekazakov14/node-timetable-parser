export default function filterEmpty(facultys) {
  const filterFacultys = facultys.map(faculty => {
    const filteredCourseList = faculty.courseList.filter(
      course => course.groupsInfo.length > 0
    );
    return {
      ...faculty,
      courseList: filteredCourseList
    };
  });
  return filterFacultys;
}
