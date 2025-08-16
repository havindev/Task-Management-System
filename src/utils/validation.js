
export const TRIM = v => (typeof v === 'string' ? v.trim() : v);
export const isEmpty = v =>
  v === undefined || v === null || String(v).trim() === '';

// Trim all strings in object
export const trimStrings = (obj = {}) => {
  const out = {};
  for (const k in obj) {
    const val = obj[k];
    out[k] = typeof val === 'string' ? val.trim() : val;
  }
  return out;
};


export const normalizeDate = value => {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(n => parseInt(n, 10));
  if ([y, m, d].some(isNaN)) return null;
  return new Date(y, m - 1, d);
};

export const isPastDate = yyyy_mm_dd => {
  const d = normalizeDate(yyyy_mm_dd);
  if (!d) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

export const isValid = errorsObj => Object.keys(errorsObj).length === 0;


export const getFirstErrorKey = (errorsObj = {}) => {
  const preferred = [
    'username',
    'password',
    'title',
    'description',
    'status',
    'priority',
    'dueDate',
  ];
  for (const k of preferred) if (errorsObj[k]) return k;
  return Object.keys(errorsObj)[0] || null;
};


export const LOGIN_RULES = {
  username: { min: 3, max: 50 },
  password: { min: 6, max: 256 },
};

export const TASK_RULES = {
  title: { min: 5, max: 100 },
  description: { min: 0, max: 500 },
  status: ['todo', 'in-progress', 'completed'],
  priority: ['low', 'medium', 'high'],
};


export const validateUsername = v => {
  const val = TRIM(v || '');
  if (!val) return 'Username là bắt buộc';
  if (val.length < LOGIN_RULES.username.min)
    return `Username phải có ít nhất ${LOGIN_RULES.username.min} ký tự`;
  if (val.length > LOGIN_RULES.username.max)
    return `Username không được quá ${LOGIN_RULES.username.max} ký tự`;
  return null;
};

export const validatePassword = v => {
  const val = v || '';
  if (!val) return 'Password là bắt buộc';
  if (val.length < LOGIN_RULES.password.min)
    return `Password phải có ít nhất ${LOGIN_RULES.password.min} ký tự`;
  if (val.length > LOGIN_RULES.password.max)
    return `Password không được quá ${LOGIN_RULES.password.max} ký tự`;
  return null;
};

export const validateTitle = v => {
  const val = TRIM(v || '');
  if (!val) return 'Tiêu đề là bắt buộc';
  if (val.length < TASK_RULES.title.min)
    return `Tiêu đề phải có ít nhất ${TASK_RULES.title.min} ký tự`;
  if (val.length > TASK_RULES.title.max)
    return `Tiêu đề không được vượt quá ${TASK_RULES.title.max} ký tự`;
  return null;
};

export const validateDescription = v => {
  const val = v || '';
  if (!val) return null; // optional
  if (val.length > TASK_RULES.description.max)
    return `Mô tả không được vượt quá ${TASK_RULES.description.max} ký tự`;
  return null;
};

export const validateStatus = v => {
  if (!TASK_RULES.status.includes(v)) return 'Trạng thái không hợp lệ';
  return null;
};

export const validatePriority = v => {
  if (!TASK_RULES.priority.includes(v)) return 'Độ ưu tiên không hợp lệ';
  return null;
};

export const validateDueDate = v => {
  if (!v) return 'Ngày hạn là bắt buộc';
  const d = normalizeDate(v);
  if (!d) return 'Ngày hạn không hợp lệ';
  if (isPastDate(v)) return 'Ngày hạn không được là ngày trong quá khứ';
  return null;
};


export const validateLogin = form => {
  const errors = {};
  const u = validateUsername(form?.username);
  const p = validatePassword(form?.password);
  if (u) errors.username = u;
  if (p) errors.password = p;
  return errors;
};

export const validateTask = form => {
  const errors = {};
  const t = validateTitle(form?.title);
  const d = validateDescription(form?.description);
  const s = validateStatus(form?.status);
  const p = validatePriority(form?.priority);
  const dd = validateDueDate(form?.dueDate);
  if (t) errors.title = t;
  if (d) errors.description = d;
  if (s) errors.status = s;
  if (p) errors.priority = p;
  if (dd) errors.dueDate = dd;
  return errors;
};


export const validateLoginPayload = payload => {
  const data = trimStrings(payload || {});
  const errors = validateLogin(data);
  return { isValid: isValid(errors), errors, data };
};

export const validateTaskPayload = payload => {
  const data = trimStrings(payload || {});
  const errors = validateTask(data);
  return { isValid: isValid(errors), errors, data };
};


export const validateField = (name, value) => {
  switch (name) {
    case 'username':
      return validateUsername(value);
    case 'password':
      return validatePassword(value);
    case 'title':
      return validateTitle(value);
    case 'description':
      return validateDescription(value);
    case 'status':
      return validateStatus(value);
    case 'priority':
      return validatePriority(value);
    case 'dueDate':
      return validateDueDate(value);
    default:
      return null;
  }
};
