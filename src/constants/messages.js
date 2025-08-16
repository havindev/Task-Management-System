// Text constants for the app

export const MESSAGES = {
  // Authentication
  AUTH: {
    LOGIN_TITLE: 'Đăng nhập',
    USERNAME_LABEL: 'Username *',
    PASSWORD_LABEL: 'Password *',
    USERNAME_PLACEHOLDER: 'Nhập username của bạn',
    PASSWORD_PLACEHOLDER: 'Nhập password của bạn',
    LOGIN_BUTTON: 'Đăng nhập',
    LOGGING_IN: 'Đang đăng nhập...',
    LOGIN_FAILED: 'Đăng nhập thất bại. Vui lòng thử lại.',
    LOGOUT_ERROR: 'Có lỗi khi đăng xuất. Vui lòng thử lại.',
    SESSION_CHECK: 'Đang kiểm tra phiên đăng nhập...'
  },

  // Tasks
  TASKS: {
    GREETING: 'Xin chào {username}! 👋',
    TASK_COUNT: '{filtered} / {total} tasks',
    SEARCH_HINT: 'Tìm kiếm: "{term}"',
    CREATE_TASK: '➕ Tạo Task Mới',
    SEARCH_PLACEHOLDER: 'Tìm kiếm tasks theo tiêu đề hoặc mô tả...',
    CLEAR_SEARCH: 'Xóa tìm kiếm',
    CLEAR_FILTERS: '🗑️ Xóa bộ lọc',
    
    // Status
    STATUS_ALL: 'Tất cả',
    STATUS_TODO: 'Todo',
    STATUS_IN_PROGRESS: 'Đang làm',
    STATUS_COMPLETED: 'Hoàn thành',
    
    // Priority
    PRIORITY_ALL: 'Tất cả',
    PRIORITY_HIGH: 'Cao',
    PRIORITY_MEDIUM: 'Trung bình',
    PRIORITY_LOW: 'Thấp',
    
    // Sort
    SORT_CREATED: 'Ngày tạo',
    SORT_UPDATED: 'Ngày cập nhật',
    SORT_DUE_DATE: 'Hạn hoàn thành',
    SORT_PRIORITY: 'Độ ưu tiên',
    SORT_TITLE: 'Tiêu đề',
    SORT_ASC: 'Tăng dần',
    SORT_DESC: 'Giảm dần',
    
    // Labels
    STATUS_LABEL: 'Trạng thái:',
    PRIORITY_LABEL: 'Độ ưu tiên:',
    SORT_BY_LABEL: 'Sắp xếp theo:',
    SORT_ORDER_LABEL: 'Thứ tự:',
    
    // Stats
    PROGRESS_LABEL: 'Tiến độ:',
    
    // Errors
    LOAD_ERROR: 'Không thể tải danh sách tasks.',
    CREATE_ERROR: 'Không thể tạo task. Vui lòng thử lại.',
    UPDATE_ERROR: 'Không thể cập nhật task. Vui lòng thử lại.',
    DELETE_ERROR: 'Không thể xóa task. Vui lòng thử lại.',
    STATUS_UPDATE_ERROR: 'Không thể cập nhật trạng thái task.',
    MISSING_ID_ERROR: 'Thiếu id của task cần cập nhật',
    TASK_NOT_FOUND: 'Task không tồn tại'
  },

  // Welcome
  WELCOME: {
    TITLE: 'Chào mừng đến với Task Manager',
    SUBTITLE: 'Quản lý công việc hiệu quả và dễ dàng',
    FEATURE_MANAGE: 'Tạo và quản lý tasks',
    FEATURE_PRIORITY: 'Ưu tiên và deadline',
    FEATURE_PROGRESS: 'Theo dõi tiến độ',
    FEATURE_SEARCH: 'Tìm kiếm và lọc'
  },

  // Common
  COMMON: {
    APP_TITLE: 'Task Manager',
    FOOTER_TEXT: '© Cảm ơn vì đã đến! :D',
    NETWORK_ERROR: 'Mất kết nối mạng. Vui lòng kiểm tra kết nối internet.'
  }
};