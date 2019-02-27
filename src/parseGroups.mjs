import rp from 'request-promise';
import cheerio from 'cheerio';
import { parseType, parseWeeks, parseRoom } from './regExpressions.mjs';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

export default function parseGroups(facultys) {
  let promises = [];
  facultys.forEach(faculty => {
    faculty.courseList.forEach(course => {
      course.groupsInfo.forEach(group => {
        const options = {
          method: 'POST',
          uri: url,
          form: {
            faculty: faculty.id,
            group: group.id
          }
        };
        const groupPromise = rp(options).then(response => {
          let pairs = [];
          const $ = cheerio.load(response);
          $('.pair').each(function() {
            const name = $(this)
              .find('.subect')
              .text();
            const type = parseType(
              $(this)
                .find('.type')
                .text()
            );
            const weeks = parseWeeks(
              $(this)
                .find('.weeks')
                .text()
            );
            const teacher = $(this)
              .find('.teacher')
              .text();
            const room = parseRoom(
              $(this)
                .find('.aud')
                .text()
                .trim()
            );
            pairs = [
              ...pairs,
              {
                faculty: faculty.name,
                group: group.name,
                name,
                type,
                weeks,
                teacher,
                room
              }
            ];
          });
          return pairs;
        });
        promises = [...promises, groupPromise];
        return groupPromise;
      });
    });
  });
  return Promise.all(promises);
}