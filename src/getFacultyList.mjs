import cheerio from 'cheerio';

export default function getFacultyList(html) {
  const $ = cheerio.load(html);
  // static course list for each faculty
  const courseList = $('#kurs > option + option');
  let courseArray = [];
  courseList.each(function() {
    courseArray = [...courseArray, { value: $(this).text() }];
  });
  // parse faculty
  const facultyList = $('#faculty > option + option');
  let facultyArray = [];
  facultyList.each(function() {
    facultyArray = [
      ...facultyArray,
      {
        name: $(this).text(),
        id: $(this).val(),
        courseList: courseArray
      }
    ];
  });
  return facultyArray;
}