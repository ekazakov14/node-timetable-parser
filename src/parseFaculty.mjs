// import cheerio from 'cheerio';

// export default function parseFaculty(facultys) {
// let pairs = [];
//   const $ = cheerio.load(r);
//   $('.pair').each(function () {
//     const name = $(this).find('.subect').text();
//     const type = parseType( $(this).find('.type').text() );
//     const weeks = parseWeeks( $(this).find('.weeks').text() );
//     const teacher = $(this).find('.teacher').text();
//     const room = parseRoom( $(this).find('.aud').text().trim() );
//     pairs = [
//       ...pairs,
//       {
//         name,
//         type,
//         weeks,
//         teacher,
//         room
//       }
//     ]
//   });
// }