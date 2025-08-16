export const validateField = (name, value) => {
  switch (name) {
    case 'username':
      if (!value.trim()) return 'Username không được để trống';
      return '';
    case 'password':
      if (!value) return 'Password không được để trống';
      if (value.length < 3) return 'Password phải có ít nhất 3 ký tự';
      return '';
    case 'title':
      if (!value.trim()) return 'Tiêu đề không được để trống';
      return '';
    default:
      return '';
  }
};

export const validateLoginPayload = (data) => {
  const errors = {};
  
  errors.username = validateField('username', data.username);
  errors.password = validateField('password', data.password);
  
  // Remove empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) delete errors[key];
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data
  };
};

export const getFirstErrorKey = (errors) => {
  return Object.keys(errors)[0];
};

export const trimStrings = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string') {
      result[key] = result[key].trim();
    }
  });
  return result;
};

export const validateTaskPayload = (data) => {
  const errors = {};
  
  errors.title = validateField('title', data.title);
  
  // Remove empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) delete errors[key];
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: trimStrings(data)
  };
};