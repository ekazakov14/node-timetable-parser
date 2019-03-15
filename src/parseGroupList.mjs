import parseGroup from './parseGroup.mjs';

export default function parseGroupList(groups) {
  const groupsPairs = groups.map(group => parseGroup(group));
  return Promise.all(groupsPairs);
}
