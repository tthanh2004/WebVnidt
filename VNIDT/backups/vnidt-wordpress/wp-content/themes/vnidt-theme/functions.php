<?php
/**
 * VNiDT Theme Functions
 * 
 * @package vnidt-theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) exit;

define('VNIDT_THEME_VERSION', '1.0.0');
define('VNIDT_THEME_DIR', get_template_directory());
define('VNIDT_THEME_URI', get_template_directory_uri());

/* ═══════════════════════════════════════════════════════════
   1. ENQUEUE STYLES & SCRIPTS
   ═══════════════════════════════════════════════════════════ */

function vnidt_enqueue_assets() {
    // Google Fonts
    wp_enqueue_style(
        'vnidt-google-fonts',
        'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
        array(),
        null
    );

    // Main stylesheet (contains style.css + styles_enterprise.css merged)
    wp_enqueue_style(
        'vnidt-main-style',
        VNIDT_THEME_URI . '/style.css',
        array('vnidt-google-fonts'),
        VNIDT_THEME_VERSION
    );

    // Enterprise add-on styles
    wp_enqueue_style(
        'vnidt-enterprise-style',
        VNIDT_THEME_URI . '/styles_enterprise.css',
        array('vnidt-main-style'),
        VNIDT_THEME_VERSION
    );

    // Main script (animations, interactions)
    wp_enqueue_script(
        'vnidt-main-script',
        VNIDT_THEME_URI . '/js/script.js',
        array(),
        VNIDT_THEME_VERSION,
        true // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'vnidt_enqueue_assets');


/* ═══════════════════════════════════════════════════════════
   2. THEME SETUP
   ═══════════════════════════════════════════════════════════ */

function vnidt_theme_setup() {
    // Title tag support
    add_theme_support('title-tag');

    // Custom logo
    add_theme_support('custom-logo', array(
        'height'      => 62,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Post thumbnails
    add_theme_support('post-thumbnails');

    // HTML5 support
    add_theme_support('html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary'  => __('Menu Chính', 'vnidt'),
        'footer'   => __('Menu Footer', 'vnidt'),
    ));

    // Custom image sizes
    add_image_size('vnidt-product', 800, 450, true);    // 16:9 product cards
    add_image_size('vnidt-project', 800, 500, true);    // 16:10 project cards
    add_image_size('vnidt-news', 600, 338, true);       // 16:9 news cards
}
add_action('after_setup_theme', 'vnidt_theme_setup');


/* ═══════════════════════════════════════════════════════════
   3. ACF FIELD GROUPS (Homepage Content)
   ═══════════════════════════════════════════════════════════ */

/**
 * Register ACF field groups for Homepage sections
 * These replace the content.js key-value system from NestJS
 */
function vnidt_register_acf_fields() {
    if (!function_exists('acf_add_local_field_group')) return;

    // ─── HERO Section ────────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_hero',
        'title'    => 'Hero Section',
        'fields'   => array(
            array('key' => 'field_hero_badge',    'label' => 'Badge / Tagline',       'name' => 'hero_badge',    'type' => 'text', 'default_value' => 'GIS & Digital Transformation Platform'),
            array('key' => 'field_hero_title',    'label' => 'Tiêu đề chính (HTML)',  'name' => 'hero_title',    'type' => 'wysiwyg', 'default_value' => 'VNiDT —<br><span class="gradient-text">Tài nguyên số</span> của bạn.', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_hero_subtitle', 'label' => 'Mô tả ngắn',           'name' => 'hero_subtitle', 'type' => 'textarea', 'default_value' => 'Kiến tạo tầm nhìn chiến lược từ dữ liệu. Chúng tôi đồng hành cùng chính phủ và doanh nghiệp trong kỷ nguyên số hóa, biến thách thức thành lợi thế cạnh tranh thông qua các giải pháp công nghệ đột phá.'),
            array('key' => 'field_hero_cta1',     'label' => 'Nút CTA chính',         'name' => 'hero_cta1',     'type' => 'text', 'default_value' => 'Yêu Cầu Tư Vấn Chuyển Đổi Số'),
            array('key' => 'field_hero_cta2',     'label' => 'Nút CTA phụ',           'name' => 'hero_cta2',     'type' => 'text', 'default_value' => 'Khám Phá Giải Pháp'),
            array('key' => 'field_hero_video',    'label' => 'Video Background URL',  'name' => 'hero_video',    'type' => 'url', 'default_value' => 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-glowing-nodes-92040-large.mp4'),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 0,
    ));

    // ─── INTRO Section ───────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_intro',
        'title'    => 'Giới Thiệu',
        'fields'   => array(
            array('key' => 'field_intro_label',      'label' => 'Nhãn section',     'name' => 'intro_label',      'type' => 'text', 'default_value' => 'Giới thiệu'),
            array('key' => 'field_intro_title',      'label' => 'Tiêu đề (HTML)',   'name' => 'intro_title',      'type' => 'wysiwyg', 'default_value' => 'Kiến tạo hệ sinh thái <span class="accent-text">số toàn diện</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_intro_p1',         'label' => 'Đoạn văn 1',       'name' => 'intro_p1',         'type' => 'textarea', 'default_value' => 'Chào mừng bạn đến với CTCP Đổi mới Sáng tạo và Chuyển đổi số VN (VN Innovation & Digital Transformation Joint Stock Company – VNiDT).'),
            array('key' => 'field_intro_p2',         'label' => 'Đoạn văn 2 (HTML)', 'name' => 'intro_p2',        'type' => 'wysiwyg', 'default_value' => 'Chúng tôi không chỉ cung cấp công nghệ, chúng tôi <span class="highlight">kiến tạo hệ sinh thái số toàn diện</span>. Với định hướng phát triển bền vững, VNiDT tự hào là đối tác chiến lược, cung cấp các nền tảng thông minh giúp khai thác tối đa sức mạnh của dữ liệu không gian và quản trị vận hành.', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_intro_cta',        'label' => 'Nút CTA',          'name' => 'intro_cta',        'type' => 'text', 'default_value' => 'Tìm hiểu giải pháp'),
            array('key' => 'field_intro_image',      'label' => 'Ảnh giới thiệu',   'name' => 'intro_image',      'type' => 'image', 'return_format' => 'url'),
            array('key' => 'field_intro_stat_number', 'label' => 'Số thống kê',     'name' => 'intro_stat_number', 'type' => 'number', 'default_value' => 50),
            array('key' => 'field_intro_stat_label', 'label' => 'Nhãn thống kê',    'name' => 'intro_stat_label', 'type' => 'text', 'default_value' => 'Dự án đã triển khai'),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 1,
    ));

    // ─── VALUES Section ──────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_values',
        'title'    => 'Giá Trị Cốt Lõi',
        'fields'   => array(
            array('key' => 'field_values_label',    'label' => 'Nhãn section',     'name' => 'values_label',    'type' => 'text', 'default_value' => 'Giá trị cốt lõi'),
            array('key' => 'field_values_title',    'label' => 'Tiêu đề (HTML)',   'name' => 'values_title',    'type' => 'wysiwyg', 'default_value' => 'Nền tảng của <span class="accent-text">sự khác biệt</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_values_subtitle', 'label' => 'Mô tả',           'name' => 'values_subtitle', 'type' => 'textarea', 'default_value' => 'Mọi giải pháp của chúng tôi đều xoay quanh các triết lý cốt lõi, tạo nên sự khác biệt vượt trội trong mỗi dự án.'),
            // Values repeater
            array(
                'key'        => 'field_values_items',
                'label'      => 'Các giá trị',
                'name'       => 'values_items',
                'type'       => 'repeater',
                'layout'     => 'block',
                'min'        => 1,
                'max'        => 6,
                'sub_fields' => array(
                    array('key' => 'field_value_title', 'label' => 'Tiêu đề', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_value_text',  'label' => 'Mô tả',   'name' => 'text',  'type' => 'textarea'),
                    array('key' => 'field_value_icon',  'label' => 'Icon SVG', 'name' => 'icon',  'type' => 'textarea', 'instructions' => 'Paste SVG code'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 2,
    ));

    // ─── STATS Section ───────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_stats',
        'title'    => 'Thống Kê',
        'fields'   => array(
            array(
                'key'        => 'field_stats_items',
                'label'      => 'Các chỉ số',
                'name'       => 'stats_items',
                'type'       => 'repeater',
                'layout'     => 'table',
                'min'        => 1,
                'max'        => 6,
                'sub_fields' => array(
                    array('key' => 'field_stat_number', 'label' => 'Số', 'name' => 'number', 'type' => 'number'),
                    array('key' => 'field_stat_suffix', 'label' => 'Hậu tố', 'name' => 'suffix', 'type' => 'text'),
                    array('key' => 'field_stat_label',  'label' => 'Nhãn', 'name' => 'label', 'type' => 'text'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 3,
    ));

    // ─── ABOUT Section ───────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_about',
        'title'    => 'Về Chúng Tôi',
        'fields'   => array(
            array('key' => 'field_about_label',  'label' => 'Nhãn section',     'name' => 'about_label',  'type' => 'text', 'default_value' => 'Về chúng tôi'),
            array('key' => 'field_about_title',  'label' => 'Tiêu đề (HTML)',   'name' => 'about_title',  'type' => 'wysiwyg', 'default_value' => 'Đơn vị tiên phong <span class="accent-text">Đổi Mới Sáng Tạo</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_about_p1',     'label' => 'Đoạn văn 1',       'name' => 'about_p1',     'type' => 'textarea', 'default_value' => 'CTCP Đổi mới Sáng tạo và Chuyển đổi số VN ra đời với khát vọng biến mọi tài nguyên thông tin trở thành tài sản vô giá. Chúng tôi định vị mình là người dẫn đường đáng tin cậy trong hành trình chuyển đổi số đầy thách thức.'),
            array('key' => 'field_about_p2',     'label' => 'Đoạn văn 2 (HTML)', 'name' => 'about_p2',    'type' => 'wysiwyg', 'default_value' => 'Sự am hiểu sâu sắc về kiến trúc hệ thống và nhu cầu thực tiễn giúp VNiDT luôn đưa ra những giải pháp <span class="highlight">"may đo" hoàn hảo nhất</span> cho từng ngành nghề trọng điểm.', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_about_quote',  'label' => 'Trích dẫn',        'name' => 'about_quote',  'type' => 'textarea', 'default_value' => '"Chúng tôi mang đến trải nghiệm chuyển đổi số toàn diện, biến các khái niệm công nghệ phức tạp thành công cụ quản lý dữ liệu linh hoạt, thân thiện và hiệu quả."'),
            // Features repeater
            array(
                'key'        => 'field_about_features',
                'label'      => 'Năng lực',
                'name'       => 'about_features',
                'type'       => 'repeater',
                'layout'     => 'block',
                'min'        => 1,
                'max'        => 5,
                'sub_fields' => array(
                    array('key' => 'field_about_f_title', 'label' => 'Tiêu đề', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_about_f_text',  'label' => 'Mô tả',   'name' => 'text',  'type' => 'text'),
                    array('key' => 'field_about_f_icon',  'label' => 'Icon SVG', 'name' => 'icon',  'type' => 'textarea'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 4,
    ));

    // ─── SOLUTIONS Section ───────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_solutions',
        'title'    => 'Giải Pháp',
        'fields'   => array(
            array('key' => 'field_sol_label',    'label' => 'Nhãn section', 'name' => 'sol_label',    'type' => 'text', 'default_value' => 'Giải pháp'),
            array('key' => 'field_sol_title',    'label' => 'Tiêu đề',     'name' => 'sol_title',    'type' => 'wysiwyg', 'default_value' => 'Giải Pháp Công Nghệ — <span class="accent-text">Linh Hoạt, Chuyên Sâu</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_sol_subtitle', 'label' => 'Mô tả',       'name' => 'sol_subtitle', 'type' => 'textarea', 'default_value' => 'Từ số hóa tài liệu vật lý đến xây dựng cơ sở dữ liệu không gian đa lớp trên nền tảng đám mây.'),
            // Pillars
            array(
                'key'        => 'field_sol_pillars',
                'label'      => 'Trụ cột',
                'name'       => 'sol_pillars',
                'type'       => 'repeater',
                'layout'     => 'block',
                'min'        => 1,
                'max'        => 4,
                'sub_fields' => array(
                    array('key' => 'field_pillar_num',   'label' => 'Số', 'name' => 'num', 'type' => 'text'),
                    array('key' => 'field_pillar_title', 'label' => 'Tiêu đề', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_pillar_text',  'label' => 'Mô tả', 'name' => 'text', 'type' => 'textarea'),
                ),
            ),
            // Products
            array(
                'key'        => 'field_sol_products',
                'label'      => 'Sản phẩm',
                'name'       => 'sol_products',
                'type'       => 'repeater',
                'layout'     => 'block',
                'min'        => 1,
                'max'        => 8,
                'sub_fields' => array(
                    array('key' => 'field_prod_tag',   'label' => 'Tag',      'name' => 'tag',   'type' => 'text'),
                    array('key' => 'field_prod_title', 'label' => 'Tiêu đề', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_prod_text',  'label' => 'Mô tả',   'name' => 'text',  'type' => 'textarea'),
                    array('key' => 'field_prod_image', 'label' => 'Ảnh',     'name' => 'image', 'type' => 'image', 'return_format' => 'url'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 5,
    ));

    // ─── DASHBOARD Section ───────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_dashboard',
        'title'    => 'GIS Dashboard',
        'fields'   => array(
            array('key' => 'field_dash_label', 'label' => 'Nhãn section', 'name' => 'dash_label', 'type' => 'text', 'default_value' => 'Nền tảng'),
            array('key' => 'field_dash_title', 'label' => 'Tiêu đề',     'name' => 'dash_title', 'type' => 'wysiwyg', 'default_value' => 'Trung tâm Chỉ huy <span class="accent-text">GIS thời gian thực</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_dash_desc',  'label' => 'Mô tả',       'name' => 'dash_desc',  'type' => 'textarea', 'default_value' => 'Theo dõi, phân tích và quản lý toàn bộ hệ sinh thái của bạn thông qua một giao diện tổng quan duy nhất với dữ liệu cập nhật theo từng giây.'),
            array('key' => 'field_dash_image', 'label' => 'Ảnh mockup',  'name' => 'dash_image', 'type' => 'image', 'return_format' => 'url'),
            array(
                'key'        => 'field_dash_features',
                'label'      => 'Tính năng',
                'name'       => 'dash_features',
                'type'       => 'repeater',
                'layout'     => 'table',
                'sub_fields' => array(
                    array('key' => 'field_dash_f_title', 'label' => 'Tên', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_dash_f_icon',  'label' => 'Icon SVG', 'name' => 'icon', 'type' => 'textarea'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 6,
    ));

    // ─── TESTIMONIALS Section ────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_testimonials',
        'title'    => 'Khách Hàng Nói Gì',
        'fields'   => array(
            array('key' => 'field_testi_label', 'label' => 'Nhãn section', 'name' => 'testi_label', 'type' => 'text', 'default_value' => 'Khách hàng nói gì'),
            array('key' => 'field_testi_title', 'label' => 'Tiêu đề',     'name' => 'testi_title', 'type' => 'wysiwyg', 'default_value' => 'Sự tin tưởng từ các <span class="accent-text">Đối tác chiến lược</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array(
                'key'        => 'field_testi_items',
                'label'      => 'Testimonials',
                'name'       => 'testi_items',
                'type'       => 'repeater',
                'layout'     => 'block',
                'sub_fields' => array(
                    array('key' => 'field_testi_quote', 'label' => 'Nội dung', 'name' => 'quote', 'type' => 'textarea'),
                    array('key' => 'field_testi_name',  'label' => 'Tên',      'name' => 'name',  'type' => 'text'),
                    array('key' => 'field_testi_role',  'label' => 'Chức vụ',  'name' => 'role',  'type' => 'text'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 7,
    ));

    // ─── CTA & CONTACT Section ───────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_cta_contact',
        'title'    => 'CTA & Liên Hệ',
        'fields'   => array(
            // CTA
            array('key' => 'field_cta_title',   'label' => 'CTA — Tiêu đề', 'name' => 'cta_title',  'type' => 'wysiwyg', 'default_value' => 'Sẵn sàng bước vào kỷ nguyên số cùng <span class="accent-text">VNiDT</span>?', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_cta_text',    'label' => 'CTA — Mô tả',   'name' => 'cta_text',   'type' => 'textarea', 'default_value' => 'Hãy để chúng tôi trở thành "Tài nguyên số của bạn", cùng nhau chia sẻ, kết nối và hiện thực hóa các tầm nhìn chiến lược.'),
            array('key' => 'field_cta_button',  'label' => 'CTA — Nút',     'name' => 'cta_button', 'type' => 'text', 'default_value' => 'Kết Nối Với Chúng Tôi Ngay'),
            // Contact
            array('key' => 'field_contact_label',      'label' => 'Contact — Nhãn',         'name' => 'contact_label',      'type' => 'text', 'default_value' => 'Liên hệ'),
            array('key' => 'field_contact_title',      'label' => 'Contact — Tiêu đề',     'name' => 'contact_title',      'type' => 'wysiwyg', 'default_value' => 'Kết nối <span class="accent-text">không giới hạn</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_contact_subtitle',   'label' => 'Contact — Mô tả',       'name' => 'contact_subtitle',   'type' => 'textarea', 'default_value' => 'Bắt đầu hành trình chuyển đổi số của bạn cùng các chuyên gia hàng đầu từ VNiDT. Mọi sự thay đổi lớn đều bắt đầu từ một cuộc trò chuyện.'),
            array('key' => 'field_contact_form_title', 'label' => 'Tiêu đề form',          'name' => 'contact_form_title', 'type' => 'text', 'default_value' => 'Gửi yêu cầu tư vấn'),
            array('key' => 'field_contact_form_note',  'label' => 'Ghi chú form',          'name' => 'contact_form_note',  'type' => 'text', 'default_value' => 'Chúng tôi sẽ gọi lại cho bạn trong 30 phút.'),
            array('key' => 'field_contact_address',    'label' => 'Địa chỉ',               'name' => 'contact_address',    'type' => 'text', 'default_value' => '95 Chùa Bộc, Kim Liên, Đống Đa, Hà Nội, Việt Nam'),
            array('key' => 'field_contact_phone',      'label' => 'Số điện thoại',         'name' => 'contact_phone',      'type' => 'text', 'default_value' => '+84 98 902 6438'),
            array('key' => 'field_contact_email',      'label' => 'Email',                 'name' => 'contact_email',      'type' => 'text', 'default_value' => 'vnidt.jsc@gmail.com'),
            array('key' => 'field_contact_hours',      'label' => 'Giờ làm việc',          'name' => 'contact_hours',      'type' => 'text', 'default_value' => 'Thứ 2 – Thứ 6: 8:00 – 17:30'),
            array('key' => 'field_contact_map_embed',  'label' => 'Google Maps Embed URL', 'name' => 'contact_map_embed',  'type' => 'url', 'default_value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.828!3d21.008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z4oCcOTUgQ2jDuWEgQuG7mWMsIEtpbSBMacOqbiI!5e0!3m2!1svi!2svn!4v1'),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 8,
    ));

    // ─── FOOTER Section ──────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_footer',
        'title'    => 'Footer',
        'fields'   => array(
            array('key' => 'field_footer_brand',     'label' => 'Mô tả thương hiệu', 'name' => 'footer_brand',     'type' => 'textarea', 'default_value' => 'CTCP Đổi mới Sáng tạo và Chuyển đổi số VN. Kiến tạo hệ sinh thái số toàn diện cho chính phủ và doanh nghiệp Việt Nam.'),
            array('key' => 'field_footer_copyright', 'label' => 'Bản quyền',         'name' => 'footer_copyright', 'type' => 'text', 'default_value' => '© 2026 VNiDT. Bảo lưu mọi quyền.'),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 9,
    ));

    // ─── NEWS Section (on homepage) ──────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_news_section',
        'title'    => 'Tin Tức (Trang chủ)',
        'fields'   => array(
            array('key' => 'field_news_label', 'label' => 'Nhãn section', 'name' => 'news_label', 'type' => 'text', 'default_value' => 'Tin tức & Sự kiện'),
            array('key' => 'field_news_title', 'label' => 'Tiêu đề',     'name' => 'news_title', 'type' => 'wysiwyg', 'default_value' => 'Cập nhật <span class="accent-text">mới nhất</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array(
                'key'        => 'field_news_items',
                'label'      => 'Tin tức',
                'name'       => 'news_items',
                'type'       => 'repeater',
                'layout'     => 'block',
                'sub_fields' => array(
                    array('key' => 'field_news_date',    'label' => 'Ngày',     'name' => 'date',    'type' => 'text'),
                    array('key' => 'field_news_n_title', 'label' => 'Tiêu đề', 'name' => 'title',   'type' => 'text'),
                    array('key' => 'field_news_excerpt', 'label' => 'Tóm tắt', 'name' => 'excerpt', 'type' => 'textarea'),
                    array('key' => 'field_news_icon',    'label' => 'Icon SVG', 'name' => 'icon',    'type' => 'textarea'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 7,
    ));

    // ─── PROJECTS Section ────────────────────────────────────
    acf_add_local_field_group(array(
        'key'      => 'group_vnidt_projects',
        'title'    => 'Dự Án Tiêu Biểu',
        'fields'   => array(
            array('key' => 'field_proj_label',    'label' => 'Nhãn section', 'name' => 'proj_label',    'type' => 'text', 'default_value' => 'Dự án tiêu biểu'),
            array('key' => 'field_proj_title',    'label' => 'Tiêu đề',     'name' => 'proj_title',    'type' => 'wysiwyg', 'default_value' => 'Dấu ấn <span class="accent-text">trên khắp Việt Nam</span>', 'toolbar' => 'basic', 'tabs' => 'text'),
            array('key' => 'field_proj_subtitle', 'label' => 'Mô tả',       'name' => 'proj_subtitle', 'type' => 'textarea', 'default_value' => 'Xây dựng thành công các hệ thống CSDL tuân thủ nghiêm ngặt theo chuẩn quốc gia & quốc tế, đáp ứng tích hợp dữ liệu đa ngành cho các dự án quy mô lớn.'),
            array(
                'key'        => 'field_proj_items',
                'label'      => 'Dự án',
                'name'       => 'proj_items',
                'type'       => 'repeater',
                'layout'     => 'block',
                'sub_fields' => array(
                    array('key' => 'field_proj_tag',   'label' => 'Tag',      'name' => 'tag',   'type' => 'text'),
                    array('key' => 'field_proj_p_title', 'label' => 'Tiêu đề', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_proj_desc',  'label' => 'Mô tả',   'name' => 'desc',  'type' => 'textarea'),
                    array('key' => 'field_proj_image', 'label' => 'Ảnh',     'name' => 'image', 'type' => 'image', 'return_format' => 'url'),
                ),
            ),
        ),
        'location' => array(array(array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'front-page.php',
        ))),
        'menu_order' => 6,
    ));
}
add_action('acf/init', 'vnidt_register_acf_fields');


/* ═══════════════════════════════════════════════════════════
   4. HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Get ACF field with fallback default
 */
function vnidt_field($field_name, $default = '') {
    if (function_exists('get_field')) {
        $value = get_field($field_name);
        return $value ? $value : $default;
    }
    return $default;
}

/**
 * Get theme asset URL
 */
function vnidt_asset($path) {
    return VNIDT_THEME_URI . '/assets/' . ltrim($path, '/');
}


/* ═══════════════════════════════════════════════════════════
   5. CONTACT FORM HANDLER (REST API)
   ═══════════════════════════════════════════════════════════ */

function vnidt_register_contact_api() {
    register_rest_route('vnidt/v1', '/contact', array(
        'methods'             => 'POST',
        'callback'            => 'vnidt_handle_contact',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'vnidt_register_contact_api');

function vnidt_handle_contact($request) {
    $params = $request->get_json_params();
    
    $name         = sanitize_text_field($params['name'] ?? '');
    $email        = sanitize_email($params['email'] ?? '');
    $phone        = sanitize_text_field($params['phone'] ?? '');
    $organization = sanitize_text_field($params['organization'] ?? '');
    $interest     = sanitize_text_field($params['interest'] ?? '');
    $message      = sanitize_textarea_field($params['message'] ?? '');

    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Vui lòng điền đầy đủ các trường bắt buộc.'
        ), 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Email không hợp lệ.'
        ), 400);
    }

    // Interest labels
    $interest_labels = array(
        'gis'         => 'Cơ sở dữ liệu GIS',
        'webgis'      => 'Nền tảng WebGIS',
        'aquaculture' => 'Quản lý thủy sản',
        'environment' => 'Quản lý nguồn thải / Môi trường',
        'disaster'    => 'Cảnh báo thiên tai',
        'digital'     => 'Tư vấn chuyển đổi số',
        'other'       => 'Khác',
    );
    $interest_label = isset($interest_labels[$interest]) ? $interest_labels[$interest] : $interest;

    // Build email HTML
    $html = sprintf('
        <div style="font-family: \'Segoe UI\', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #fff;">
            <div style="background: linear-gradient(135deg, #4390C8, #670E7A); padding: 24px 30px; border-radius: 8px 8px 0 0;">
                <h2 style="color: #fff; margin: 0; font-size: 20px;">📩 Yêu cầu tư vấn mới từ Website VNiDT</h2>
            </div>
            <div style="padding: 24px 30px; border: 1px solid #e8e8e8; border-top: none; border-radius: 0 0 8px 8px;">
                <p style="margin-top: 0; color: #666;">Hệ thống vừa ghi nhận một yêu cầu tư vấn mới:</p>
                <table style="width: 100%%; border-collapse: collapse;">
                    <tr><td style="padding: 12px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600;">👤 Họ và tên</td><td style="padding: 12px; border: 1px solid #e8e8e8;">%s</td></tr>
                    <tr><td style="padding: 12px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600;">✉️ Email</td><td style="padding: 12px; border: 1px solid #e8e8e8;"><a href="mailto:%s" style="color: #4390C8;">%s</a></td></tr>
                    <tr><td style="padding: 12px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600;">📞 Điện thoại</td><td style="padding: 12px; border: 1px solid #e8e8e8;">%s</td></tr>
                    <tr><td style="padding: 12px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600;">🏢 Tổ chức</td><td style="padding: 12px; border: 1px solid #e8e8e8;">%s</td></tr>
                    <tr><td style="padding: 12px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600;">🎯 Lĩnh vực</td><td style="padding: 12px; border: 1px solid #e8e8e8;">%s</td></tr>
                </table>
                <h3 style="margin-top: 24px; color: #670E7A;">💬 Nội dung:</h3>
                <blockquote style="background: #f7f8fa; padding: 16px; border-left: 4px solid #670E7A; margin: 0; white-space: pre-wrap;">%s</blockquote>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                <p style="font-size: 12px; color: #999; text-align: center;">Email từ hệ thống WordPress VNiDT · %s</p>
            </div>
        </div>',
        esc_html($name), esc_attr($email), esc_html($email),
        $phone ? esc_html($phone) : '<em>Không cung cấp</em>',
        $organization ? esc_html($organization) : '<em>Không cung cấp</em>',
        $interest_label ?: '<em>Không cung cấp</em>',
        esc_html($message),
        wp_date('d/m/Y H:i', null, wp_timezone())
    );

    $to      = get_option('admin_email', 'vnidt.jsc@gmail.com');
    $subject = sprintf('[VNiDT] Yêu cầu tư vấn mới từ %s', $name);
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        sprintf('Reply-To: %s <%s>', $name, $email),
    );

    $sent = wp_mail($to, $subject, $html, $headers);

    if ($sent) {
        return new WP_REST_Response(array('success' => true, 'message' => 'Gửi thành công!'), 200);
    } else {
        return new WP_REST_Response(array('success' => false, 'message' => 'Lỗi gửi email. Vui lòng thử lại.'), 500);
    }
}


/* ═══════════════════════════════════════════════════════════
   6. WORDPRESS CLEANUP & SECURITY
   ═══════════════════════════════════════════════════════════ */

// Remove WordPress version from head
remove_action('wp_head', 'wp_generator');

// Disable XML-RPC for security
add_filter('xmlrpc_enabled', '__return_false');

// Remove emoji scripts
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// Allow SVG in ACF fields
function vnidt_acf_wysiwyg_allow_html($value, $post_id, $field) {
    return $value; // Don't strip HTML from WYSIWYG fields
}
add_filter('acf/format_value/type=wysiwyg', 'vnidt_acf_wysiwyg_allow_html', 10, 3);
