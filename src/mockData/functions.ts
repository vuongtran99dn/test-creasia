const hashCode = 123212321;

const pepperPassword = passHash => {
  return 'a' + passHash + 'z';
};
const hashPasword = password => {
  return pepperPassword(hashCode + password);
};

export {hashPasword};
