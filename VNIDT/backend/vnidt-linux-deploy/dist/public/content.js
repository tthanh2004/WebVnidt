/* ============================================================
   VNiDT — content.js
   Content Management Data Layer
   Shared between admin.html and index.html
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'vnidt_content';

  /* ── Section Definitions ── */
  var SECTIONS = [
    { id: 'hero',         label: 'Hero Section',      icon: 'H'  },
    { id: 'intro',        label: 'Giới Thiệu',        icon: 'GT' },
    { id: 'values',       label: 'Giá Trị Cốt Lõi',   icon: 'GI' },
    { id: 'stats',        label: 'Thống Kê',          icon: 'TK' },
    { id: 'about',        label: 'Về Chúng Tôi',      icon: 'VE' },
    { id: 'solutions',    label: 'Giải Pháp',         icon: 'GP' },
    { id: 'dashboard',    label: 'GIS Dashboard',     icon: 'DB' },
    { id: 'projects',     label: 'Dự Án',             icon: 'DA' },
    { id: 'testimonials', label: 'Khách Hàng',        icon: 'KH' },
    { id: 'news',         label: 'Tin Tức',           icon: 'TT' },
    { id: 'cta',          label: 'CTA Banner',        icon: 'CT' },
    { id: 'contact',      label: 'Liên Hệ',           icon: 'LH' },
    { id: 'footer',       label: 'Footer',            icon: 'FT' },
    { id: 'typography',   label: 'Cỡ Chữ',            icon: 'Aa' },
  ];

  /* ── Field Schema ──
     key      : unique content key (maps to data-edit="key" in HTML)
     section  : section id
     label    : human-readable Vietnamese label
     type     : 'text' | 'textarea' | 'html'
     default  : default value
  */
  var FIELDS = [
    // ─── HERO ───
    { key: 'hero_badge',    section: 'hero', label: 'Badge / Tagline',        type: 'text',     default: 'GIS & Digital Transformation Platform' },
    { key: 'hero_title',    section: 'hero', label: 'Tiêu đề chính (HTML)',   type: 'html',     default: 'VNiDT —<br><span class="gradient-text">Tài nguyên số</span> của bạn.' },
    { key: 'hero_subtitle', section: 'hero', label: 'Mô tả ngắn',            type: 'textarea', default: 'Kiến tạo tầm nhìn chiến lược từ dữ liệu. Chúng tôi đồng hành cùng chính phủ và doanh nghiệp trong kỷ nguyên số hóa, biến thách thức thành lợi thế cạnh tranh thông qua các giải pháp công nghệ đột phá.' },
    { key: 'hero_cta1',     section: 'hero', label: 'Nút CTA chính',          type: 'text',     default: 'Yêu Cầu Tư Vấn Chuyển Đổi Số' },
    { key: 'hero_cta2',     section: 'hero', label: 'Nút CTA phụ',            type: 'text',     default: 'Khám Phá Giải Pháp' },

    // ─── INTRO ───
    { key: 'intro_label',       section: 'intro', label: 'Nhãn section',      type: 'text',     default: 'Giới thiệu' },
    { key: 'intro_title',       section: 'intro', label: 'Tiêu đề (HTML)',    type: 'html',     default: 'Kiến tạo hệ sinh thái <span class="accent-text">số toàn diện</span>' },
    { key: 'intro_p1',          section: 'intro', label: 'Đoạn văn 1',        type: 'textarea', default: 'Chào mừng bạn đến với CTCP Đổi mới Sáng tạo và Chuyển đổi số VN (VN Innovation & Digital Transformation Joint Stock Company – VNiDT).' },
    { key: 'intro_p2',          section: 'intro', label: 'Đoạn văn 2 (HTML)', type: 'html',     default: 'Chúng tôi không chỉ cung cấp công nghệ, chúng tôi <span class="highlight">kiến tạo hệ sinh thái số toàn diện</span>. Với định hướng phát triển bền vững, VNiDT tự hào là đối tác chiến lược, cung cấp các nền tảng thông minh giúp khai thác tối đa sức mạnh của dữ liệu không gian và quản trị vận hành.' },
    { key: 'intro_cta',         section: 'intro', label: 'Nút CTA',           type: 'text',     default: 'Tìm hiểu giải pháp' },
    { key: 'intro_stat_label',  section: 'intro', label: 'Nhãn thống kê',     type: 'text',     default: 'Dự án đã triển khai' },

    // ─── VALUES ───
    { key: 'values_label',       section: 'values', label: 'Nhãn section',      type: 'text',     default: 'Giá trị cốt lõi' },
    { key: 'values_title',       section: 'values', label: 'Tiêu đề (HTML)',    type: 'html',     default: 'Nền tảng của <span class="accent-text">sự khác biệt</span>' },
    { key: 'values_subtitle',    section: 'values', label: 'Mô tả',             type: 'textarea', default: 'Mọi giải pháp của chúng tôi đều xoay quanh các triết lý cốt lõi, tạo nên sự khác biệt vượt trội trong mỗi dự án.' },
    { key: 'values_c1_title',    section: 'values', label: 'Card 1 — Tiêu đề',  type: 'text',     default: 'Kết nối – Chia sẻ' },
    { key: 'values_c1_text',     section: 'values', label: 'Card 1 — Mô tả',    type: 'textarea', default: 'Tạo ra sự liên kết xuyên suốt giữa các phòng ban, hệ thống và con người, giúp tối ưu hóa chi phí và thời gian vận hành.' },
    { key: 'values_c2_title',    section: 'values', label: 'Card 2 — Tiêu đề',  type: 'text',     default: 'Văn hóa CĐS' },
    { key: 'values_c2_text',     section: 'values', label: 'Card 2 — Mô tả',    type: 'textarea', default: 'Lan tỏa tư duy đổi mới trong từng tổ chức, biến chuyển đổi số thành văn hóa vận hành bền vững và hiệu quả.' },
    { key: 'values_c3_title',    section: 'values', label: 'Card 3 — Tiêu đề',  type: 'text',     default: 'Trải nghiệm CĐS' },
    { key: 'values_c3_text',     section: 'values', label: 'Card 3 — Mô tả',    type: 'textarea', default: 'Biến các khái niệm công nghệ phức tạp thành công cụ quản lý dữ liệu linh hoạt, thân thiện và hiệu quả cho người dùng.' },
    { key: 'values_c4_title',    section: 'values', label: 'Card 4 — Tiêu đề',  type: 'text',     default: 'Tầm nhìn CĐS' },
    { key: 'values_c4_text',     section: 'values', label: 'Card 4 — Mô tả',    type: 'textarea', default: 'Hiện thực hóa tầm nhìn chiến lược, giúp doanh nghiệp nắm quyền chủ động trong mọi quyết định nhờ dữ liệu minh bạch.' },

    // ─── STATS ───
    { key: 'stats_1_number', section: 'stats', label: 'Số 1 — Giá trị',  type: 'text', default: '50' },
    { key: 'stats_1_suffix', section: 'stats', label: 'Số 1 — Hậu tố',   type: 'text', default: '+' },
    { key: 'stats_1_label',  section: 'stats', label: 'Số 1 — Nhãn',     type: 'text', default: 'Dự án hoàn thành' },
    { key: 'stats_2_number', section: 'stats', label: 'Số 2 — Giá trị',  type: 'text', default: '30' },
    { key: 'stats_2_suffix', section: 'stats', label: 'Số 2 — Hậu tố',   type: 'text', default: '+' },
    { key: 'stats_2_label',  section: 'stats', label: 'Số 2 — Nhãn',     type: 'text', default: 'Đối tác chiến lược' },
    { key: 'stats_3_number', section: 'stats', label: 'Số 3 — Giá trị',  type: 'text', default: '4' },
    { key: 'stats_3_suffix', section: 'stats', label: 'Số 3 — Hậu tố',   type: 'text', default: '' },
    { key: 'stats_3_label',  section: 'stats', label: 'Số 3 — Nhãn',     type: 'text', default: 'Nền tảng WebGIS' },
    { key: 'stats_4_number', section: 'stats', label: 'Số 4 — Giá trị',  type: 'text', default: '10' },
    { key: 'stats_4_suffix', section: 'stats', label: 'Số 4 — Hậu tố',   type: 'text', default: '+' },
    { key: 'stats_4_label',  section: 'stats', label: 'Số 4 — Nhãn',     type: 'text', default: 'Năm kinh nghiệm' },

    // ─── ABOUT ───
    { key: 'about_label',       section: 'about', label: 'Nhãn section',          type: 'text',     default: 'Về chúng tôi' },
    { key: 'about_title',       section: 'about', label: 'Tiêu đề (HTML)',        type: 'html',     default: 'Đơn vị tiên phong <span class="accent-text">Đổi Mới Sáng Tạo</span>' },
    { key: 'about_p1',          section: 'about', label: 'Đoạn văn 1',            type: 'textarea', default: 'CTCP Đổi mới Sáng tạo và Chuyển đổi số VN ra đời với khát vọng biến mọi tài nguyên thông tin trở thành tài sản vô giá. Chúng tôi định vị mình là người dẫn đường đáng tin cậy trong hành trình chuyển đổi số đầy thách thức.' },
    { key: 'about_p2',          section: 'about', label: 'Đoạn văn 2 (HTML)',     type: 'html',     default: 'Sự am hiểu sâu sắc về kiến trúc hệ thống và nhu cầu thực tiễn giúp VNiDT luôn đưa ra những giải pháp <span class="highlight">"may đo" hoàn hảo nhất</span> cho từng ngành nghề trọng điểm.' },
    { key: 'about_f1_title',    section: 'about', label: 'Năng lực 1 — Tiêu đề',  type: 'text',     default: 'Cơ sở dữ liệu GIS' },
    { key: 'about_f1_text',     section: 'about', label: 'Năng lực 1 — Mô tả',    type: 'text',     default: 'Linh hoạt, chuyên sâu, tối ưu hóa quản lý dữ liệu không gian' },
    { key: 'about_f2_title',    section: 'about', label: 'Năng lực 2 — Tiêu đề',  type: 'text',     default: 'Nền tảng WebGIS' },
    { key: 'about_f2_text',     section: 'about', label: 'Năng lực 2 — Mô tả',    type: 'text',     default: 'Cung cấp và khai thác thông tin không gian số toàn diện' },
    { key: 'about_f3_title',    section: 'about', label: 'Năng lực 3 — Tiêu đề',  type: 'text',     default: 'Ứng dụng phân tích' },
    { key: 'about_f3_text',     section: 'about', label: 'Năng lực 3 — Mô tả',    type: 'text',     default: 'App phân tích dữ liệu trực quan, hỗ trợ ra quyết định thông minh' },
    { key: 'about_quote',       section: 'about', label: 'Trích dẫn',             type: 'textarea', default: '"Chúng tôi mang đến trải nghiệm chuyển đổi số toàn diện, biến các khái niệm công nghệ phức tạp thành công cụ quản lý dữ liệu linh hoạt, thân thiện và hiệu quả."' },

    // ─── SOLUTIONS ───
    { key: 'sol_label',         section: 'solutions', label: 'Nhãn section',              type: 'text',     default: 'Giải pháp' },
    { key: 'sol_title',         section: 'solutions', label: 'Tiêu đề (HTML)',            type: 'html',     default: 'Giải Pháp Công Nghệ — <span class="accent-text">Linh Hoạt, Chuyên Sâu</span>' },
    { key: 'sol_subtitle',      section: 'solutions', label: 'Mô tả',                     type: 'textarea', default: 'Từ số hóa tài liệu vật lý đến xây dựng cơ sở dữ liệu không gian đa lớp trên nền tảng đám mây.' },
    { key: 'sol_p1_num',        section: 'solutions', label: 'Trụ cột 1 — Số',            type: 'text',     default: 'TRỤC 01' },
    { key: 'sol_p1_title',      section: 'solutions', label: 'Trụ cột 1 — Tiêu đề',      type: 'text',     default: 'Dịch vụ chuyển đổi số lõi' },
    { key: 'sol_p1_text',       section: 'solutions', label: 'Trụ cột 1 — Mô tả',        type: 'textarea', default: 'Số hóa dữ liệu và quy trình — chuyển đổi hoàn toàn thông tin từ định dạng vật lý sang kỹ thuật số, tạo nền tảng cho mọi hoạt động quản trị thông minh.' },
    { key: 'sol_p2_num',        section: 'solutions', label: 'Trụ cột 2 — Số',            type: 'text',     default: 'TRỤC 02' },
    { key: 'sol_p2_title',      section: 'solutions', label: 'Trụ cột 2 — Tiêu đề',      type: 'text',     default: 'Hệ thống nền tảng thông minh' },
    { key: 'sol_p2_text',       section: 'solutions', label: 'Trụ cột 2 — Mô tả',        type: 'textarea', default: 'GIS, WebGIS và ứng dụng di động — bộ công cụ phân tích dữ liệu trực quan, hỗ trợ ra quyết định theo thời gian thực trên mọi thiết bị.' },
    { key: 'prod_1_tag',        section: 'solutions', label: 'Sản phẩm 1 — Tag',          type: 'text',     default: 'WebGIS · CSDL' },
    { key: 'prod_1_title',      section: 'solutions', label: 'Sản phẩm 1 — Tiêu đề',     type: 'text',     default: 'Cơ sở dữ liệu TNMT' },
    { key: 'prod_1_text',       section: 'solutions', label: 'Sản phẩm 1 — Mô tả',       type: 'textarea', default: 'Xây dựng cơ sở dữ liệu tài nguyên môi trường và ứng dụng khai thác trên nền tảng web/app. Tích hợp dữ liệu đa ngành theo chuẩn quốc gia và quốc tế.' },
    { key: 'prod_2_tag',        section: 'solutions', label: 'Sản phẩm 2 — Tag',          type: 'text',     default: 'Smart Management' },
    { key: 'prod_2_title',      section: 'solutions', label: 'Sản phẩm 2 — Tiêu đề',     type: 'text',     default: 'Quản lý thông minh thủy sản' },
    { key: 'prod_2_text',       section: 'solutions', label: 'Sản phẩm 2 — Mô tả',       type: 'textarea', default: 'Hệ thống quản lý thông minh phục vụ phát triển bền vững nuôi thủy sản. Theo dõi 4,820 tọa độ lồng bè thời gian thực trên bản đồ GIS.' },
    { key: 'prod_3_tag',        section: 'solutions', label: 'Sản phẩm 3 — Tag',          type: 'text',     default: 'Môi trường' },
    { key: 'prod_3_title',      section: 'solutions', label: 'Sản phẩm 3 — Tiêu đề',     type: 'text',     default: 'Quản lý nguồn thải' },
    { key: 'prod_3_text',       section: 'solutions', label: 'Sản phẩm 3 — Mô tả',       type: 'textarea', default: 'Hệ thống quản lý thông minh giám sát nguồn thải trên nền tảng web/app. Phân quyền chi tiết, đảm bảo an toàn thông tin và tuân thủ quy chuẩn.' },
    { key: 'prod_4_tag',        section: 'solutions', label: 'Sản phẩm 4 — Tag',          type: 'text',     default: 'AI · Mobile' },
    { key: 'prod_4_title',      section: 'solutions', label: 'Sản phẩm 4 — Tiêu đề',     type: 'text',     default: 'Cảnh báo thiên tai & ngư trường' },
    { key: 'prod_4_text',       section: 'solutions', label: 'Sản phẩm 4 — Mô tả',       type: 'textarea', default: 'Hệ thống cảnh báo thiên tai và hỗ trợ ngư trường thông minh. Dự báo AI, theo dõi bão thời gian thực, cung cấp thông tin ngư trường trên mobile.' },

    // ─── DASHBOARD ───
    { key: 'dash_label',        section: 'dashboard', label: 'Nhãn section',              type: 'text',     default: 'Nền tảng' },
    { key: 'dash_title',        section: 'dashboard', label: 'Tiêu đề (HTML)',            type: 'html',     default: 'Trung tâm Chỉ huy <span class="accent-text">GIS thời gian thực</span>' },
    { key: 'dash_desc',         section: 'dashboard', label: 'Mô tả',                     type: 'textarea', default: 'Theo dõi, phân tích và quản lý toàn bộ hệ sinh thái của bạn thông qua một giao diện tổng quan duy nhất với dữ liệu cập nhật theo từng giây.' },
    { key: 'dash_f1',           section: 'dashboard', label: 'Tính năng 1',               type: 'text',     default: 'Dữ liệu vệ tinh AI' },
    { key: 'dash_f2',           section: 'dashboard', label: 'Tính năng 2',               type: 'text',     default: 'Cảnh báo tự động' },
    { key: 'dash_f3',           section: 'dashboard', label: 'Tính năng 3',               type: 'text',     default: 'Báo cáo đa chiều' },

    // ─── PROJECTS ───
    { key: 'proj_label',        section: 'projects', label: 'Nhãn section',              type: 'text',     default: 'Dự án tiêu biểu' },
    { key: 'proj_title',        section: 'projects', label: 'Tiêu đề (HTML)',            type: 'html',     default: 'Dấu ấn <span class="accent-text">trên khắp Việt Nam</span>' },
    { key: 'proj_subtitle',     section: 'projects', label: 'Mô tả',                     type: 'textarea', default: 'Xây dựng thành công các hệ thống CSDL tuân thủ nghiêm ngặt theo chuẩn quốc gia & quốc tế, đáp ứng tích hợp dữ liệu đa ngành cho các dự án quy mô lớn.' },
    { key: 'proj_1_tag',        section: 'projects', label: 'Dự án 1 — Tag',             type: 'text',     default: 'CSDL · GIS' },
    { key: 'proj_1_title',      section: 'projects', label: 'Dự án 1 — Tiêu đề',        type: 'text',     default: 'CSDL Tài Nguyên Môi Trường' },
    { key: 'proj_1_desc',       section: 'projects', label: 'Dự án 1 — Mô tả',          type: 'textarea', default: 'Số hóa và xây dựng cơ sở dữ liệu tài nguyên môi trường theo chuẩn quốc gia, phục vụ quản lý đa ngành trên nền tảng WebGIS.' },
    { key: 'proj_2_tag',        section: 'projects', label: 'Dự án 2 — Tag',             type: 'text',     default: 'Thủy sản · Quảng Ninh' },
    { key: 'proj_2_title',      section: 'projects', label: 'Dự án 2 — Tiêu đề',        type: 'text',     default: 'Quản Lý Thủy Sản Vịnh Bắc Bộ' },
    { key: 'proj_2_desc',       section: 'projects', label: 'Dự án 2 — Mô tả',          type: 'textarea', default: 'Triển khai hệ thống giám sát 1,245 cơ sở giống, 4,820 ha mặt biển nuôi cấp phép với 158 vùng nuôi chuẩn VietGAP.' },
    { key: 'proj_3_tag',        section: 'projects', label: 'Dự án 3 — Tag',             type: 'text',     default: 'Môi trường · Web/App' },
    { key: 'proj_3_title',      section: 'projects', label: 'Dự án 3 — Tiêu đề',        type: 'text',     default: 'Giám Sát Nguồn Thải Quốc Gia' },
    { key: 'proj_3_desc',       section: 'projects', label: 'Dự án 3 — Mô tả',          type: 'textarea', default: 'Xây dựng nền tảng web/app quản lý nguồn thải với hệ thống cảnh báo ô nhiễm vượt giới hạn và báo cáo tự động.' },
    { key: 'proj_4_tag',        section: 'projects', label: 'Dự án 4 — Tag',             type: 'text',     default: 'AI · Biển Đông' },
    { key: 'proj_4_title',      section: 'projects', label: 'Dự án 4 — Tiêu đề',        type: 'text',     default: 'Cảnh Báo Thiên Tai Biển Đông' },
    { key: 'proj_4_desc',       section: 'projects', label: 'Dự án 4 — Mô tả',          type: 'textarea', default: 'Ứng dụng AI dự báo bão, theo dõi thời tiết thời gian thực và hỗ trợ thông tin ngư trường cho ngư dân trên Biển Đông.' },

    // ─── TESTIMONIALS ───
    { key: 'testi_label',       section: 'testimonials', label: 'Nhãn section',              type: 'text',     default: 'Khách hàng nói gì' },
    { key: 'testi_title',       section: 'testimonials', label: 'Tiêu đề (HTML)',            type: 'html',     default: 'Sự tin tưởng từ các <span class="accent-text">Đối tác chiến lược</span>' },
    { key: 'testi_1_quote',     section: 'testimonials', label: 'Khách 1 — Nội dung',        type: 'textarea', default: 'Giải pháp WebGIS của VNiDT đã thay đổi hoàn toàn cách chúng tôi quản lý tài nguyên. Dữ liệu trực quan, chính xác và hệ thống vận hành cực kỳ trơn tru.' },
    { key: 'testi_1_name',      section: 'testimonials', label: 'Khách 1 — Tên',             type: 'text',     default: 'Ông Nguyễn Hải Đăng' },
    { key: 'testi_1_role',      section: 'testimonials', label: 'Khách 1 — Chức vụ',         type: 'text',     default: 'Giám đốc Sở TN&MT' },
    { key: 'testi_2_quote',     section: 'testimonials', label: 'Khách 2 — Nội dung',        type: 'textarea', default: 'Hệ thống cảnh báo thiên tai và theo dõi tàu cá qua AI giúp giảm thiểu tối đa rủi ro trên biển. Đây là một bước tiến công nghệ đột phá cho ngành thủy sản.' },
    { key: 'testi_2_name',      section: 'testimonials', label: 'Khách 2 — Tên',             type: 'text',     default: 'Bà Trần Thu Hà' },
    { key: 'testi_2_role',      section: 'testimonials', label: 'Khách 2 — Chức vụ',         type: 'text',     default: 'Trưởng ban Quản lý Cảng' },
    { key: 'testi_3_quote',     section: 'testimonials', label: 'Khách 3 — Nội dung',        type: 'textarea', default: 'Đội ngũ chuyên gia của VNiDT không chỉ cung cấp phần mềm mà còn định hướng cho chúng tôi xây dựng một văn hóa số minh bạch và hiện đại.' },
    { key: 'testi_3_name',      section: 'testimonials', label: 'Khách 3 — Tên',             type: 'text',     default: 'Ông Lê Minh Tuấn' },
    { key: 'testi_3_role',      section: 'testimonials', label: 'Khách 3 — Chức vụ',         type: 'text',     default: 'CEO Tập đoàn Nam Phương' },

    // ─── NEWS ───
    { key: 'news_label',        section: 'news', label: 'Nhãn section',          type: 'text', default: 'Tin tức & Sự kiện' },
    { key: 'news_title',        section: 'news', label: 'Tiêu đề (HTML)',        type: 'html', default: 'Cập nhật <span class="accent-text">mới nhất</span>' },
    { key: 'news_1_date',       section: 'news', label: 'Tin 1 — Ngày',          type: 'text',     default: '15/05/2026' },
    { key: 'news_1_title',      section: 'news', label: 'Tin 1 — Tiêu đề',      type: 'text',     default: 'VNiDT triển khai thành công hệ thống CSDL Tài nguyên Môi trường' },
    { key: 'news_1_excerpt',    section: 'news', label: 'Tin 1 — Tóm tắt',      type: 'textarea', default: 'Hệ thống cơ sở dữ liệu tài nguyên môi trường trên nền GIS đã được triển khai thành công, đáp ứng tiêu chuẩn quốc tế về tích hợp dữ liệu đa ngành.' },
    { key: 'news_2_date',       section: 'news', label: 'Tin 2 — Ngày',          type: 'text',     default: '02/04/2026' },
    { key: 'news_2_title',      section: 'news', label: 'Tin 2 — Tiêu đề',      type: 'text',     default: 'Ra mắt ứng dụng cảnh báo thiên tai và hỗ trợ ngư trường AI' },
    { key: 'news_2_excerpt',    section: 'news', label: 'Tin 2 — Tóm tắt',      type: 'textarea', default: 'Ứng dụng mobile tích hợp AI dự báo bão, theo dõi thời tiết thời gian thực đã chính thức ra mắt, hỗ trợ hàng nghìn ngư dân trên Biển Đông.' },
    { key: 'news_3_date',       section: 'news', label: 'Tin 3 — Ngày',          type: 'text',     default: '18/03/2026' },
    { key: 'news_3_title',      section: 'news', label: 'Tin 3 — Tiêu đề',      type: 'text',     default: 'Ký kết hợp tác chiến lược chuyển đổi số với các Sở ban ngành' },
    { key: 'news_3_excerpt',    section: 'news', label: 'Tin 3 — Tóm tắt',      type: 'textarea', default: 'VNiDT chính thức trở thành đối tác chiến lược cung cấp giải pháp chuyển đổi số toàn diện cho nhiều Sở ban ngành trên toàn quốc.' },

    // ─── CTA ───
    { key: 'cta_title',   section: 'cta', label: 'Tiêu đề (HTML)',  type: 'html',     default: 'Sẵn sàng bước vào kỷ nguyên số cùng <span class="accent-text">VNiDT</span>?' },
    { key: 'cta_text',    section: 'cta', label: 'Mô tả',           type: 'textarea', default: 'Hãy để chúng tôi trở thành "Tài nguyên số của bạn", cùng nhau chia sẻ, kết nối và hiện thực hóa các tầm nhìn chiến lược.' },
    { key: 'cta_button',  section: 'cta', label: 'Nút CTA',         type: 'text',     default: 'Kết Nối Với Chúng Tôi Ngay' },

    // ─── CONTACT ───
    { key: 'contact_label',      section: 'contact', label: 'Nhãn section',        type: 'text',     default: 'Liên hệ' },
    { key: 'contact_title',      section: 'contact', label: 'Tiêu đề (HTML)',      type: 'html',     default: 'Kết nối <span class="accent-text">không giới hạn</span>' },
    { key: 'contact_subtitle',   section: 'contact', label: 'Mô tả',               type: 'textarea', default: 'Bắt đầu hành trình chuyển đổi số của bạn cùng các chuyên gia hàng đầu từ VNiDT. Mọi sự thay đổi lớn đều bắt đầu từ một cuộc trò chuyện.' },
    { key: 'contact_form_title', section: 'contact', label: 'Tiêu đề form',        type: 'text',     default: 'Gửi yêu cầu tư vấn' },
    { key: 'contact_form_note',  section: 'contact', label: 'Ghi chú form',        type: 'text',     default: 'Chúng tôi sẽ gọi lại cho bạn trong 30 phút.' },
    { key: 'contact_address',    section: 'contact', label: 'Địa chỉ',             type: 'text',     default: '95 Chùa Bộc, Kim Liên, Đống Đa, Hà Nội, Việt Nam' },
    { key: 'contact_phone',      section: 'contact', label: 'Số điện thoại',       type: 'text',     default: '+84 98 902 6438' },
    { key: 'contact_email',      section: 'contact', label: 'Email',               type: 'text',     default: 'vnidt.jsc@gmail.com' },
    { key: 'contact_hours',      section: 'contact', label: 'Giờ làm việc',        type: 'text',     default: 'Thứ 2 – Thứ 6: 8:00 – 17:30' },

    // ─── FOOTER ───
    { key: 'footer_brand',     section: 'footer', label: 'Mô tả thương hiệu',  type: 'textarea', default: 'CTCP Đổi mới Sáng tạo và Chuyển đổi số VN. Kiến tạo hệ sinh thái số toàn diện cho chính phủ và doanh nghiệp Việt Nam.' },
    { key: 'footer_copyright', section: 'footer', label: 'Bản quyền',           type: 'text',     default: '© 2026 VNiDT. Bảo lưu mọi quyền.' },

    // ─── TYPOGRAPHY ───
    { key: 'fs_hero', section: 'typography', label: 'Cỡ chữ Hero (Chính)', type: 'text', default: 'clamp(2.6rem, 5.5vw, 4.8rem)' },
    { key: 'fs_h1',   section: 'typography', label: 'Cỡ chữ Tiêu đề (H1)', type: 'text', default: 'clamp(2rem, 4vw, 3.2rem)' },
    { key: 'fs_h2',   section: 'typography', label: 'Cỡ chữ Tiêu đề phụ (H2)', type: 'text', default: 'clamp(1.6rem, 3vw, 2.4rem)' },
    { key: 'fs_h3',   section: 'typography', label: 'Cỡ chữ Card (H3)',    type: 'text', default: 'clamp(1.15rem, 2vw, 1.45rem)' },
    { key: 'fs_body', section: 'typography', label: 'Cỡ chữ nội dung thường', type: 'text', default: '1rem' },
  ];

  /* ── Build defaults map ── */
  var defaults = {};
  FIELDS.forEach(function (f) { defaults[f.key] = f.default; });

  /* ── Public API ── */
  window.VNiDTCMS = {
    SECTIONS: SECTIONS,
    FIELDS: FIELDS,

    getContent: function () {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          var parsed = JSON.parse(saved);
          // Merge with defaults so new fields are always included
          var merged = {};
          for (var k in defaults) { merged[k] = defaults[k]; }
          for (var k2 in parsed) { merged[k2] = parsed[k2]; }
          return merged;
        } catch (e) {
          return JSON.parse(JSON.stringify(defaults));
        }
      }
      return JSON.parse(JSON.stringify(defaults));
    },

    getDefaults: function () {
      return JSON.parse(JSON.stringify(defaults));
    },

    saveContent: function (content) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    },

    resetContent: function () {
      localStorage.removeItem(STORAGE_KEY);
    },

    exportJSON: function () {
      return JSON.stringify(this.getContent(), null, 2);
    },

    importJSON: function (jsonStr) {
      var parsed = JSON.parse(jsonStr);
      this.saveContent(parsed);
      return parsed;
    },

    hasCustomContent: function () {
      return localStorage.getItem(STORAGE_KEY) !== null;
    },

    /* ── ASYNC API METHODS ── */
    getContentAsync: async function () {
      try {
        var res = await fetch('/api/pages/home?t=' + new Date().getTime(), { cache: 'no-store' });
        var json = await res.json();
        if (json.success && json.data) {
          var merged = {};
          for (var k in defaults) { merged[k] = defaults[k]; }
          for (var k2 in json.data) { merged[k2] = json.data[k2]; }
          return merged;
        }
      } catch (e) {
        console.error('Lỗi khi tải nội dung từ server:', e);
      }
      return this.getDefaults();
    },

    saveContentAsync: async function (content) {
      var token = localStorage.getItem('vnidt_cms_token');
      try {
        var res = await fetch('/api/pages/home', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ content: content })
        });
        if (res.status === 401) {
          window.location.href = 'login.html';
          return { success: false, message: 'Hết phiên đăng nhập' };
        }
        return await res.json();
      } catch (e) {
        console.error('Lỗi khi lưu lên server:', e);
        throw e;
      }
    },

    applyToPageAsync: async function () {
      var content = await this.getContentAsync();
      var fieldMap = {};
      FIELDS.forEach(function (f) { fieldMap[f.key] = f; });

      // Cập nhật biến CSS cỡ chữ
      if (content.fs_hero) document.documentElement.style.setProperty('--fs-hero', content.fs_hero);
      if (content.fs_h1) document.documentElement.style.setProperty('--fs-h1', content.fs_h1);
      if (content.fs_h2) document.documentElement.style.setProperty('--fs-h2', content.fs_h2);
      if (content.fs_h3) document.documentElement.style.setProperty('--fs-h3', content.fs_h3);
      if (content.fs_body) document.documentElement.style.setProperty('--fs-body', content.fs_body);

      document.querySelectorAll('[data-edit]').forEach(function (el) {
        var key = el.getAttribute('data-edit');
        if (content[key] === undefined) return;
        var field = fieldMap[key];
        if (field && field.type === 'html') {
          el.innerHTML = content[key];
        } else {
          el.textContent = content[key];
        }
      });
    }
  };

})();
