import rp from 'request-promise';
import cheerio from 'cheerio';
import { parseType, parseWeeks, parseRoom } from './regExpressions.mjs';

const url = 'https://cabinet.sut.ru/raspisanie_all_new?type_z=1';

export default function parseGroup(group) {
  const options = {
    method: 'POST',
    uri: url,
    form: {
      faculty: group.faculty.id,
      group: group.group.id
    }
  };
  return rp(options).then(response => {
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
          name,
          type,
          weeks,
          teacher,
          room
        }
      ];
    });
    return {
      faculty: group.faculty.name,
      group: group.group.name,
      pairs
    };
  });
}