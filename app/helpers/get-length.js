import Helper from '@ember/component/helper';

export function getLength([ model, arrayName ]) {
  return model.get(`${arrayName}.length`);
}

export default Helper.helper(getLength);
