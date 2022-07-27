
export const isObject = (obj) => typeof obj === 'object' && obj !== null;
export const isNumeric = (id) => /^\d+$/.test(id)

/**
 * @function isEqualObjects
 * copied this from:
 *    https://raphacmartin.medium.com/deep-equality-in-javascript-objects-1eea8abb3649
 * Note I added checks for Date objects
 *
 * @param a Object
 * @param b Object
 * @returns {boolean}
 */
export function isEqualObjects (a, b) {
  // return false if a or b are not objects
  if ( !isObject(a) || !isObject(b) ) {
    return false
  }

  // null objects with no keys
  if ( !Object.keys(a).length || !Object.keys(b).length ) {
    return true
  }
  // if the number of keys is different, they are different
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  let rtn = true
  for (const key in a) {
    const a_value = a[key]
    const b_value = b[key]
    if ( !(key in b) ) {
      rtn = false
    }
    // If the value is an object, check if they're different objects
    // If it isn't, uses !== to check
    if ( a_value instanceof Date ) {
      rtn = rtn ? a_value.getTime() === b_value.getTime() : false
    } else if ((a_value instanceof Object && !isEqualObjects(a_value, b_value)) || (!(a_value instanceof Object) && a_value !== b_value)) {
      rtn = false
    }
    if ( !rtn ) {
      return false
    }
  }
  return true
}
