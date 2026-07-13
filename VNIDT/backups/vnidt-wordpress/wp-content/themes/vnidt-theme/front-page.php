<?php
/**
 * Template Name: Trang Chủ VNiDT
 * Front Page Template
 * 
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;

get_header();

// ─── Default values (fallback khi chưa có ACF) ──────────────
$hero_badge    = vnidt_field('hero_badge', 'GIS & Digital Transformation Platform');
$hero_title    = vnidt_field('hero_title', 'VNiDT —<br><span class="gradient-text">Tài nguyên số</span> của bạn.');
$hero_subtitle = vnidt_field('hero_subtitle', 'Kiến tạo tầm nhìn chiến lược từ dữ liệu. Chúng tôi đồng hành cùng chính phủ và doanh nghiệp trong kỷ nguyên số hóa, biến thách thức thành lợi thế cạnh tranh thông qua các giải pháp công nghệ đột phá.');
$hero_cta1     = vnidt_field('hero_cta1', 'Yêu Cầu Tư Vấn Chuyển Đổi Số');
$hero_cta2     = vnidt_field('hero_cta2', 'Khám Phá Giải Pháp');
$hero_video    = vnidt_field('hero_video', 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-glowing-nodes-92040-large.mp4');
?>

  <!-- ===== HERO ===== -->
  <section class="hero" id="home">
    <video autoplay loop muted playsinline class="hero__video-bg">
      <source src="<?php echo esc_url($hero_video); ?>" type="video/mp4">
    </video>
    <div class="hero__video-overlay"></div>
    <div class="hero__grid-bg" aria-hidden="true"></div>

    <div class="container">
      <div class="hero__content">
        <div class="hero__label">
          <span class="pulse"></span>
          <span><?php echo esc_html($hero_badge); ?></span>
        </div>

        <h1 class="hero__title"><?php echo wp_kses_post($hero_title); ?></h1>

        <p class="hero__subtitle"><?php echo esc_html($hero_subtitle); ?></p>

        <div class="hero__actions">
          <a href="#contact" class="btn btn--primary btn--lg">
            <span><?php echo esc_html($hero_cta1); ?></span>
            <span class="btn__arrow">→</span>
          </a>
          <a href="#solutions" class="btn btn--secondary btn--lg">
            <?php echo esc_html($hero_cta2); ?>
          </a>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>Cuộn xuống</span>
      <span class="hero__scroll-line"></span>
    </div>
  </section>


  <!-- ===== INTRODUCTION ===== -->
  <?php
  $intro_label      = vnidt_field('intro_label', 'Giới thiệu');
  $intro_title      = vnidt_field('intro_title', 'Kiến tạo hệ sinh thái <span class="accent-text">số toàn diện</span>');
  $intro_p1         = vnidt_field('intro_p1', 'Chào mừng bạn đến với CTCP Đổi mới Sáng tạo và Chuyển đổi số VN (VN Innovation & Digital Transformation Joint Stock Company – VNiDT).');
  $intro_p2         = vnidt_field('intro_p2', 'Chúng tôi không chỉ cung cấp công nghệ, chúng tôi <span class="highlight">kiến tạo hệ sinh thái số toàn diện</span>. Với định hướng phát triển bền vững, VNiDT tự hào là đối tác chiến lược, cung cấp các nền tảng thông minh giúp khai thác tối đa sức mạnh của dữ liệu không gian và quản trị vận hành.');
  $intro_cta        = vnidt_field('intro_cta', 'Tìm hiểu giải pháp');
  $intro_image      = vnidt_field('intro_image', vnidt_asset('images/he-thong-quan-ly-thong-minh.jpg'));
  $intro_stat_number = vnidt_field('intro_stat_number', 50);
  $intro_stat_label = vnidt_field('intro_stat_label', 'Dự án đã triển khai');
  ?>
  <section class="intro section--surface" id="intro">
    <div class="container">
      <div class="intro__grid">
        <div class="intro__text reveal--left">
          <span class="section-label"><?php echo esc_html($intro_label); ?></span>
          <h2 class="section-title"><?php echo wp_kses_post($intro_title); ?></h2>
          <p><?php echo esc_html($intro_p1); ?></p>
          <p><?php echo wp_kses_post($intro_p2); ?></p>
          <a href="#solutions" class="btn btn--secondary" style="margin-top:var(--sp-6)">
            <span><?php echo esc_html($intro_cta); ?></span>
            <span class="btn__arrow">→</span>
          </a>
        </div>

        <div class="intro__visual reveal--right">
          <div class="intro__image-wrap">
            <img src="<?php echo esc_url($intro_image); ?>" alt="Hệ thống quản lý thông minh VNiDT" loading="lazy">
          </div>
          <div class="intro__float-card">
            <div class="stat-number" data-count="<?php echo esc_attr($intro_stat_number); ?>" data-suffix="+">0</div>
            <div class="stat-label"><?php echo esc_html($intro_stat_label); ?></div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ===== CORE VALUES ===== -->
  <?php
  $values_label    = vnidt_field('values_label', 'Giá trị cốt lõi');
  $values_title    = vnidt_field('values_title', 'Nền tảng của <span class="accent-text">sự khác biệt</span>');
  $values_subtitle = vnidt_field('values_subtitle', 'Mọi giải pháp của chúng tôi đều xoay quanh các triết lý cốt lõi, tạo nên sự khác biệt vượt trội trong mỗi dự án.');
  
  // Default values data
  $default_values = array(
    array('title' => 'Kết nối – Chia sẻ', 'text' => 'Tạo ra sự liên kết xuyên suốt giữa các phòng ban, hệ thống và con người, giúp tối ưu hóa chi phí và thời gian vận hành.', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'),
    array('title' => 'Văn hóa CĐS', 'text' => 'Lan tỏa tư duy đổi mới trong từng tổ chức, biến chuyển đổi số thành văn hóa vận hành bền vững và hiệu quả.', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'),
    array('title' => 'Trải nghiệm CĐS', 'text' => 'Biến các khái niệm công nghệ phức tạp thành công cụ quản lý dữ liệu linh hoạt, thân thiện và hiệu quả cho người dùng.', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.24 7.76-2.12 2.12"/><path d="M20 12h-4"/><path d="m16.24 16.24-2.12-2.12"/><path d="M12 20v-4"/><path d="m7.76 16.24 2.12-2.12"/><path d="M4 12h4"/><path d="m7.76 7.76 2.12 2.12"/></svg>'),
    array('title' => 'Tầm nhìn CĐS', 'text' => 'Hiện thực hóa tầm nhìn chiến lược, giúp doanh nghiệp nắm quyền chủ động trong mọi quyết định nhờ dữ liệu minh bạch.', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>'),
  );
  $values_items = function_exists('have_rows') && have_rows('values_items') ? array() : $default_values;
  if (function_exists('have_rows') && have_rows('values_items')) {
    while (have_rows('values_items')) { the_row();
      $values_items[] = array('title' => get_sub_field('title'), 'text' => get_sub_field('text'), 'icon' => get_sub_field('icon'));
    }
  }
  if (empty($values_items)) $values_items = $default_values;
  ?>
  <section class="values section--base" id="values">
    <div class="container">
      <div class="text-center reveal">
        <span class="section-label" style="justify-content:center"><?php echo esc_html($values_label); ?></span>
        <h2 class="section-title"><?php echo wp_kses_post($values_title); ?></h2>
        <p class="section-subtitle" style="margin:0 auto"><?php echo esc_html($values_subtitle); ?></p>
      </div>

      <div class="values__grid stagger">
        <?php foreach ($values_items as $i => $val) : ?>
        <div class="glass-card reveal" style="--i:<?php echo $i; ?>">
          <div class="glass-card__icon"><?php echo $val['icon']; ?></div>
          <h3 class="glass-card__title"><?php echo esc_html($val['title']); ?></h3>
          <p class="glass-card__text"><?php echo esc_html($val['text']); ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- ===== STATS ===== -->
  <?php
  $default_stats = array(
    array('number' => 50, 'suffix' => '+', 'label' => 'Dự án hoàn thành'),
    array('number' => 30, 'suffix' => '+', 'label' => 'Đối tác chiến lược'),
    array('number' => 4,  'suffix' => '',  'label' => 'Nền tảng WebGIS'),
    array('number' => 10, 'suffix' => '+', 'label' => 'Năm kinh nghiệm'),
  );
  $stats_items = function_exists('have_rows') && have_rows('stats_items') ? array() : $default_stats;
  if (function_exists('have_rows') && have_rows('stats_items')) {
    while (have_rows('stats_items')) { the_row();
      $stats_items[] = array('number' => get_sub_field('number'), 'suffix' => get_sub_field('suffix'), 'label' => get_sub_field('label'));
    }
  }
  if (empty($stats_items)) $stats_items = $default_stats;
  ?>
  <section class="stats" id="stats">
    <div class="container">
      <div class="stats__grid">
        <?php foreach ($stats_items as $i => $stat) : ?>
        <div class="stat-item reveal" style="--i:<?php echo $i; ?>">
          <div class="stat-item__number"><span data-count="<?php echo esc_attr($stat['number']); ?>">0</span><span class="suffix"><?php echo esc_html($stat['suffix']); ?></span></div>
          <div class="stat-item__divider"></div>
          <div class="stat-item__label"><?php echo esc_html($stat['label']); ?></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- ===== ABOUT ===== -->
  <?php
  $about_label = vnidt_field('about_label', 'Về chúng tôi');
  $about_title = vnidt_field('about_title', 'Đơn vị tiên phong <span class="accent-text">Đổi Mới Sáng Tạo</span>');
  $about_p1    = vnidt_field('about_p1', 'CTCP Đổi mới Sáng tạo và Chuyển đổi số VN ra đời với khát vọng biến mọi tài nguyên thông tin trở thành tài sản vô giá. Chúng tôi định vị mình là người dẫn đường đáng tin cậy trong hành trình chuyển đổi số đầy thách thức.');
  $about_p2    = vnidt_field('about_p2', 'Sự am hiểu sâu sắc về kiến trúc hệ thống và nhu cầu thực tiễn giúp VNiDT luôn đưa ra những giải pháp <span class="highlight">"may đo" hoàn hảo nhất</span> cho từng ngành nghề trọng điểm.');
  $about_quote = vnidt_field('about_quote', '"Chúng tôi mang đến trải nghiệm chuyển đổi số toàn diện, biến các khái niệm công nghệ phức tạp thành công cụ quản lý dữ liệu linh hoạt, thân thiện và hiệu quả."');
  
  $default_about_features = array(
    array('title' => 'Cơ sở dữ liệu GIS', 'text' => 'Linh hoạt, chuyên sâu, tối ưu hóa quản lý dữ liệu không gian', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>'),
    array('title' => 'Nền tảng WebGIS', 'text' => 'Cung cấp và khai thác thông tin không gian số toàn diện', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'),
    array('title' => 'Ứng dụng phân tích', 'text' => 'App phân tích dữ liệu trực quan, hỗ trợ ra quyết định thông minh', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>'),
  );
  $about_features = function_exists('have_rows') && have_rows('about_features') ? array() : $default_about_features;
  if (function_exists('have_rows') && have_rows('about_features')) {
    while (have_rows('about_features')) { the_row();
      $about_features[] = array('title' => get_sub_field('title'), 'text' => get_sub_field('text'), 'icon' => get_sub_field('icon'));
    }
  }
  if (empty($about_features)) $about_features = $default_about_features;
  ?>
  <section class="about section--surface" id="about">
    <div class="container">
      <div class="about__grid">
        <div class="about__text reveal--left">
          <span class="section-label"><?php echo esc_html($about_label); ?></span>
          <h2 class="section-title"><?php echo wp_kses_post($about_title); ?></h2>
          <p><?php echo esc_html($about_p1); ?></p>
          <p><?php echo wp_kses_post($about_p2); ?></p>

          <div class="about__features">
            <?php foreach ($about_features as $feat) : ?>
            <div class="about__feature">
              <div class="about__feature-icon"><?php echo $feat['icon']; ?></div>
              <div>
                <h4><?php echo esc_html($feat['title']); ?></h4>
                <p><?php echo esc_html($feat['text']); ?></p>
              </div>
            </div>
            <?php endforeach; ?>
          </div>

          <a href="#contact" class="btn btn--accent" style="margin-top:var(--sp-8)">
            Tải Hồ Sơ Năng Lực
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </div>

        <div class="about__visual reveal--right">
          <div class="about__visual-card">
            <blockquote class="about__quote"><?php echo esc_html($about_quote); ?></blockquote>
            <div style="margin-top:var(--sp-8); display:flex; gap:var(--sp-6); flex-wrap:wrap">
              <div>
                <div class="stat-number" style="font-size:1.5rem; font-weight:800; color:var(--text-primary)">ISO 9001</div>
                <div class="stat-label" style="font-size:var(--fs-xs); color:var(--text-muted)">Tiêu chuẩn quốc tế</div>
              </div>
              <div>
                <div class="stat-number" style="font-size:1.5rem; font-weight:800; color:var(--text-primary)">VN-2000</div>
                <div class="stat-label" style="font-size:var(--fs-xs); color:var(--text-muted)">Hệ quy chiếu quốc gia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ===== SOLUTIONS ===== -->
  <?php
  $sol_label    = vnidt_field('sol_label', 'Giải pháp');
  $sol_title    = vnidt_field('sol_title', 'Giải Pháp Công Nghệ — <span class="accent-text">Linh Hoạt, Chuyên Sâu</span>');
  $sol_subtitle = vnidt_field('sol_subtitle', 'Từ số hóa tài liệu vật lý đến xây dựng cơ sở dữ liệu không gian đa lớp trên nền tảng đám mây.');
  
  $default_pillars = array(
    array('num' => 'TRỤC 01', 'title' => 'Dịch vụ chuyển đổi số lõi', 'text' => 'Số hóa dữ liệu và quy trình — chuyển đổi hoàn toàn thông tin từ định dạng vật lý sang kỹ thuật số, tạo nền tảng cho mọi hoạt động quản trị thông minh.'),
    array('num' => 'TRỤC 02', 'title' => 'Hệ thống nền tảng thông minh', 'text' => 'GIS, WebGIS và ứng dụng di động — bộ công cụ phân tích dữ liệu trực quan, hỗ trợ ra quyết định theo thời gian thực trên mọi thiết bị.'),
  );
  $sol_pillars = function_exists('have_rows') && have_rows('sol_pillars') ? array() : $default_pillars;
  if (function_exists('have_rows') && have_rows('sol_pillars')) {
    while (have_rows('sol_pillars')) { the_row();
      $sol_pillars[] = array('num' => get_sub_field('num'), 'title' => get_sub_field('title'), 'text' => get_sub_field('text'));
    }
  }
  if (empty($sol_pillars)) $sol_pillars = $default_pillars;
  
  $default_products = array(
    array('tag' => 'WebGIS · CSDL', 'title' => 'Cơ sở dữ liệu TNMT', 'text' => 'Xây dựng cơ sở dữ liệu tài nguyên môi trường và ứng dụng khai thác trên nền tảng web/app. Tích hợp dữ liệu đa ngành theo chuẩn quốc gia và quốc tế.', 'image' => vnidt_asset('images/xay-dung-co-so-du-lieu-tnmt.jpg')),
    array('tag' => 'Smart Management', 'title' => 'Quản lý thông minh thủy sản', 'text' => 'Hệ thống quản lý thông minh phục vụ phát triển bền vững nuôi thủy sản. Theo dõi 4,820 tọa độ lồng bè thời gian thực trên bản đồ GIS.', 'image' => vnidt_asset('images/he-thong-quan-ly-thong-minh.jpg')),
    array('tag' => 'Môi trường', 'title' => 'Quản lý nguồn thải', 'text' => 'Hệ thống quản lý thông minh giám sát nguồn thải trên nền tảng web/app. Phân quyền chi tiết, đảm bảo an toàn thông tin và tuân thủ quy chuẩn.', 'image' => vnidt_asset('images/quan-ly-nguon-thai.jpg')),
    array('tag' => 'AI · Mobile', 'title' => 'Cảnh báo thiên tai & ngư trường', 'text' => 'Hệ thống cảnh báo thiên tai và hỗ trợ ngư trường thông minh. Dự báo AI, theo dõi bão thời gian thực, cung cấp thông tin ngư trường trên mobile.', 'image' => vnidt_asset('images/canh-bao-thien-tai.jpg')),
  );
  $sol_products = function_exists('have_rows') && have_rows('sol_products') ? array() : $default_products;
  if (function_exists('have_rows') && have_rows('sol_products')) {
    while (have_rows('sol_products')) { the_row();
      $sol_products[] = array('tag' => get_sub_field('tag'), 'title' => get_sub_field('title'), 'text' => get_sub_field('text'), 'image' => get_sub_field('image'));
    }
  }
  if (empty($sol_products)) $sol_products = $default_products;
  ?>
  <section class="solutions section--base" id="solutions">
    <div class="container">
      <div class="text-center reveal">
        <span class="section-label" style="justify-content:center"><?php echo esc_html($sol_label); ?></span>
        <h2 class="section-title"><?php echo wp_kses_post($sol_title); ?></h2>
        <p class="section-subtitle" style="margin:0 auto"><?php echo esc_html($sol_subtitle); ?></p>
      </div>

      <div class="solutions__pillars">
        <?php foreach ($sol_pillars as $i => $pillar) : ?>
        <div class="pillar-card reveal--<?php echo $i === 0 ? 'left' : 'right'; ?>">
          <div class="pillar-card__num"><?php echo esc_html($pillar['num']); ?></div>
          <h3 class="pillar-card__title"><?php echo esc_html($pillar['title']); ?></h3>
          <p class="pillar-card__text"><?php echo esc_html($pillar['text']); ?></p>
        </div>
        <?php endforeach; ?>
      </div>

      <div class="products-grid stagger">
        <?php foreach ($sol_products as $i => $prod) : ?>
        <div class="product-card reveal" style="--i:<?php echo $i; ?>">
          <?php if (!empty($prod['image'])) : ?>
          <div class="product-card__image">
            <img src="<?php echo esc_url($prod['image']); ?>" alt="<?php echo esc_attr($prod['title']); ?>" loading="lazy">
          </div>
          <?php endif; ?>
          <div class="product-card__body">
            <span class="product-card__tag"><?php echo esc_html($prod['tag']); ?></span>
            <h3 class="product-card__title"><?php echo esc_html($prod['title']); ?></h3>
            <p class="product-card__text"><?php echo esc_html($prod['text']); ?></p>
            <a href="#contact" class="product-card__link">Tìm hiểu thêm <span>→</span></a>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- ===== GIS DASHBOARD ===== -->
  <?php
  $dash_label = vnidt_field('dash_label', 'Nền tảng');
  $dash_title = vnidt_field('dash_title', 'Trung tâm Chỉ huy <span class="accent-text">GIS thời gian thực</span>');
  $dash_desc  = vnidt_field('dash_desc', 'Theo dõi, phân tích và quản lý toàn bộ hệ sinh thái của bạn thông qua một giao diện tổng quan duy nhất với dữ liệu cập nhật theo từng giây.');
  $dash_image = vnidt_field('dash_image', vnidt_asset('images/quan-ly-nguon-thai.jpg'));
  
  $default_dash_features = array(
    array('title' => 'Dữ liệu vệ tinh AI', 'icon' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'),
    array('title' => 'Cảnh báo tự động', 'icon' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10.00 10.00 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'),
    array('title' => 'Báo cáo đa chiều', 'icon' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>'),
  );
  $dash_features = function_exists('have_rows') && have_rows('dash_features') ? array() : $default_dash_features;
  if (function_exists('have_rows') && have_rows('dash_features')) {
    while (have_rows('dash_features')) { the_row();
      $dash_features[] = array('title' => get_sub_field('title'), 'icon' => get_sub_field('icon'));
    }
  }
  if (empty($dash_features)) $dash_features = $default_dash_features;
  ?>
  <section class="dashboard" id="dashboard">
    <div class="container">
      <div class="dashboard__grid">
        <div class="dashboard__text reveal--left">
          <span class="section-label"><?php echo esc_html($dash_label); ?></span>
          <h2 class="section-title"><?php echo wp_kses_post($dash_title); ?></h2>
          <p style="margin-bottom:var(--sp-6)"><?php echo esc_html($dash_desc); ?></p>
          <div class="dashboard__features">
            <?php foreach ($dash_features as $feat) : ?>
            <div class="dashboard__feature">
              <div class="dashboard__feature-icon"><?php echo $feat['icon']; ?></div>
              <h4><?php echo esc_html($feat['title']); ?></h4>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <div class="dashboard__mockup reveal--right">
          <img src="<?php echo esc_url($dash_image); ?>" alt="VNiDT GIS Dashboard UI">
        </div>
      </div>
    </div>
  </section>


  <!-- ===== PROJECTS ===== -->
  <?php
  $proj_label    = vnidt_field('proj_label', 'Dự án tiêu biểu');
  $proj_title    = vnidt_field('proj_title', 'Dấu ấn <span class="accent-text">trên khắp Việt Nam</span>');
  $proj_subtitle = vnidt_field('proj_subtitle', 'Xây dựng thành công các hệ thống CSDL tuân thủ nghiêm ngặt theo chuẩn quốc gia & quốc tế, đáp ứng tích hợp dữ liệu đa ngành cho các dự án quy mô lớn.');
  
  $default_projects = array(
    array('tag' => 'CSDL · GIS', 'title' => 'CSDL Tài Nguyên Môi Trường', 'desc' => 'Số hóa và xây dựng cơ sở dữ liệu tài nguyên môi trường theo chuẩn quốc gia, phục vụ quản lý đa ngành trên nền tảng WebGIS.', 'image' => vnidt_asset('images/xay-dung-co-so-du-lieu-tnmt.jpg')),
    array('tag' => 'Thủy sản · Quảng Ninh', 'title' => 'Quản Lý Thủy Sản Vịnh Bắc Bộ', 'desc' => 'Triển khai hệ thống giám sát 1,245 cơ sở giống, 4,820 ha mặt biển nuôi cấp phép với 158 vùng nuôi chuẩn VietGAP.', 'image' => vnidt_asset('images/he-thong-quan-ly-thong-minh.jpg')),
    array('tag' => 'Môi trường · Web/App', 'title' => 'Giám Sát Nguồn Thải Quốc Gia', 'desc' => 'Xây dựng nền tảng web/app quản lý nguồn thải với hệ thống cảnh báo ô nhiễm vượt giới hạn và báo cáo tự động.', 'image' => vnidt_asset('images/quan-ly-nguon-thai.jpg')),
    array('tag' => 'AI · Biển Đông', 'title' => 'Cảnh Báo Thiên Tai Biển Đông', 'desc' => 'Ứng dụng AI dự báo bão, theo dõi thời tiết thời gian thực và hỗ trợ thông tin ngư trường cho ngư dân trên Biển Đông.', 'image' => vnidt_asset('images/canh-bao-thien-tai.jpg')),
  );
  $proj_items = function_exists('have_rows') && have_rows('proj_items') ? array() : $default_projects;
  if (function_exists('have_rows') && have_rows('proj_items')) {
    while (have_rows('proj_items')) { the_row();
      $proj_items[] = array('tag' => get_sub_field('tag'), 'title' => get_sub_field('title'), 'desc' => get_sub_field('desc'), 'image' => get_sub_field('image'));
    }
  }
  if (empty($proj_items)) $proj_items = $default_projects;
  ?>
  <section class="projects section--surface" id="projects">
    <div class="container">
      <div class="text-center reveal">
        <span class="section-label" style="justify-content:center"><?php echo esc_html($proj_label); ?></span>
        <h2 class="section-title"><?php echo wp_kses_post($proj_title); ?></h2>
        <p class="section-subtitle" style="margin:0 auto"><?php echo esc_html($proj_subtitle); ?></p>
      </div>

      <div class="projects__grid stagger">
        <?php foreach ($proj_items as $i => $proj) : ?>
        <div class="project-card reveal" style="--i:<?php echo $i; ?>">
          <img src="<?php echo esc_url($proj['image']); ?>" alt="<?php echo esc_attr($proj['title']); ?>" loading="lazy">
          <div class="project-card__overlay">
            <span class="project-card__tag"><?php echo esc_html($proj['tag']); ?></span>
            <h3 class="project-card__title"><?php echo esc_html($proj['title']); ?></h3>
            <p class="project-card__desc"><?php echo esc_html($proj['desc']); ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- ===== TESTIMONIALS ===== -->
  <?php
  $testi_label = vnidt_field('testi_label', 'Khách hàng nói gì');
  $testi_title = vnidt_field('testi_title', 'Sự tin tưởng từ các <span class="accent-text">Đối tác chiến lược</span>');
  
  $default_testimonials = array(
    array('quote' => 'Giải pháp WebGIS của VNiDT đã thay đổi hoàn toàn cách chúng tôi quản lý tài nguyên. Dữ liệu trực quan, chính xác và hệ thống vận hành cực kỳ trơn tru.', 'name' => 'Ông Nguyễn Hải Đăng', 'role' => 'Giám đốc Sở TN&MT'),
    array('quote' => 'Hệ thống cảnh báo thiên tai và theo dõi tàu cá qua AI giúp giảm thiểu tối đa rủi ro trên biển. Đây là một bước tiến công nghệ đột phá cho ngành thủy sản.', 'name' => 'Bà Trần Thu Hà', 'role' => 'Trưởng ban Quản lý Cảng'),
    array('quote' => 'Đội ngũ chuyên gia của VNiDT không chỉ cung cấp phần mềm mà còn định hướng cho chúng tôi xây dựng một văn hóa số minh bạch và hiện đại.', 'name' => 'Ông Lê Minh Tuấn', 'role' => 'CEO Tập đoàn Nam Phương'),
  );
  $testi_items = function_exists('have_rows') && have_rows('testi_items') ? array() : $default_testimonials;
  if (function_exists('have_rows') && have_rows('testi_items')) {
    while (have_rows('testi_items')) { the_row();
      $testi_items[] = array('quote' => get_sub_field('quote'), 'name' => get_sub_field('name'), 'role' => get_sub_field('role'));
    }
  }
  if (empty($testi_items)) $testi_items = $default_testimonials;
  ?>
  <section class="testimonials" id="testimonials">
    <div class="container">
      <div class="text-center reveal">
        <span class="section-label" style="justify-content:center"><?php echo esc_html($testi_label); ?></span>
        <h2 class="section-title"><?php echo wp_kses_post($testi_title); ?></h2>
      </div>

      <div class="testimonials__grid stagger">
        <?php foreach ($testi_items as $i => $testi) : 
          $initial = mb_substr($testi['name'], mb_strpos($testi['name'], ' ') !== false ? mb_strrpos($testi['name'], ' ') + 1 : 0, 1, 'UTF-8');
        ?>
        <div class="testimonial-card reveal" style="--i:<?php echo $i; ?>">
          <svg class="testimonial__quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p class="testimonial__text"><?php echo esc_html($testi['quote']); ?></p>
          <div class="testimonial__author">
            <div class="testimonial__avatar"><?php echo esc_html($initial); ?></div>
            <div class="testimonial__info">
              <h4><?php echo esc_html($testi['name']); ?></h4>
              <p><?php echo esc_html($testi['role']); ?></p>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- ===== NEWS ===== -->
  <?php
  $news_label = vnidt_field('news_label', 'Tin tức & Sự kiện');
  $news_title = vnidt_field('news_title', 'Cập nhật <span class="accent-text">mới nhất</span>');
  
  $default_news_icons = array(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  );
  $default_news = array(
    array('date' => '15/05/2026', 'title' => 'VNiDT triển khai thành công hệ thống CSDL Tài nguyên Môi trường', 'excerpt' => 'Hệ thống cơ sở dữ liệu tài nguyên môi trường trên nền GIS đã được triển khai thành công, đáp ứng tiêu chuẩn quốc tế về tích hợp dữ liệu đa ngành.', 'icon' => $default_news_icons[0]),
    array('date' => '02/04/2026', 'title' => 'Ra mắt ứng dụng cảnh báo thiên tai và hỗ trợ ngư trường AI', 'excerpt' => 'Ứng dụng mobile tích hợp AI dự báo bão, theo dõi thời tiết thời gian thực đã chính thức ra mắt, hỗ trợ hàng nghìn ngư dân trên Biển Đông.', 'icon' => $default_news_icons[1]),
    array('date' => '18/03/2026', 'title' => 'Ký kết hợp tác chiến lược chuyển đổi số với các Sở ban ngành', 'excerpt' => 'VNiDT chính thức trở thành đối tác chiến lược cung cấp giải pháp chuyển đổi số toàn diện cho nhiều Sở ban ngành trên toàn quốc.', 'icon' => $default_news_icons[2]),
  );
  $news_items = function_exists('have_rows') && have_rows('news_items') ? array() : $default_news;
  if (function_exists('have_rows') && have_rows('news_items')) {
    while (have_rows('news_items')) { the_row();
      $news_items[] = array('date' => get_sub_field('date'), 'title' => get_sub_field('title'), 'excerpt' => get_sub_field('excerpt'), 'icon' => get_sub_field('icon'));
    }
  }
  if (empty($news_items)) $news_items = $default_news;
  ?>
  <section class="news section--base" id="news">
    <div class="container">
      <div class="flex--between reveal" style="display:flex; align-items:flex-end; flex-wrap:wrap; gap:var(--sp-6); margin-bottom:var(--sp-4)">
        <div>
          <span class="section-label"><?php echo esc_html($news_label); ?></span>
          <h2 class="section-title" style="margin-bottom:0"><?php echo wp_kses_post($news_title); ?></h2>
        </div>
      </div>

      <div class="news__grid stagger">
        <?php foreach ($news_items as $i => $news_item) : ?>
        <div class="news-card reveal" style="--i:<?php echo $i; ?>">
          <div class="news-card__image"><?php echo $news_item['icon']; ?></div>
          <div class="news-card__body">
            <div class="news-card__date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
              <span><?php echo esc_html($news_item['date']); ?></span>
            </div>
            <h3 class="news-card__title"><?php echo esc_html($news_item['title']); ?></h3>
            <p class="news-card__excerpt"><?php echo esc_html($news_item['excerpt']); ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- ===== CTA BAND ===== -->
  <?php
  $cta_title  = vnidt_field('cta_title', 'Sẵn sàng bước vào kỷ nguyên số cùng <span class="accent-text">VNiDT</span>?');
  $cta_text   = vnidt_field('cta_text', 'Hãy để chúng tôi trở thành "Tài nguyên số của bạn", cùng nhau chia sẻ, kết nối và hiện thực hóa các tầm nhìn chiến lược.');
  $cta_button = vnidt_field('cta_button', 'Kết Nối Với Chúng Tôi Ngay');
  ?>
  <section class="cta-band" id="cta-band">
    <div class="cta-band__glow cta-band__glow--1" aria-hidden="true"></div>
    <div class="cta-band__glow cta-band__glow--2" aria-hidden="true"></div>
    <div class="container" style="position:relative; z-index:1">
      <div class="reveal">
        <h2 class="cta-band__title"><?php echo wp_kses_post($cta_title); ?></h2>
        <p class="cta-band__text"><?php echo esc_html($cta_text); ?></p>
        <a href="#contact" class="btn btn--primary btn--lg">
          <span><?php echo esc_html($cta_button); ?></span>
          <span class="btn__arrow">→</span>
        </a>
      </div>
    </div>
  </section>


  <!-- ===== CONTACT ===== -->
  <?php
  $contact_label      = vnidt_field('contact_label', 'Liên hệ');
  $contact_title      = vnidt_field('contact_title', 'Kết nối <span class="accent-text">không giới hạn</span>');
  $contact_subtitle   = vnidt_field('contact_subtitle', 'Bắt đầu hành trình chuyển đổi số của bạn cùng các chuyên gia hàng đầu từ VNiDT. Mọi sự thay đổi lớn đều bắt đầu từ một cuộc trò chuyện.');
  $contact_form_title = vnidt_field('contact_form_title', 'Gửi yêu cầu tư vấn');
  $contact_form_note  = vnidt_field('contact_form_note', 'Chúng tôi sẽ gọi lại cho bạn trong 30 phút.');
  $contact_address    = vnidt_field('contact_address', '95 Chùa Bộc, Kim Liên, Đống Đa, Hà Nội, Việt Nam');
  $contact_phone      = vnidt_field('contact_phone', '+84 98 902 6438');
  $contact_email      = vnidt_field('contact_email', 'vnidt.jsc@gmail.com');
  $contact_hours      = vnidt_field('contact_hours', 'Thứ 2 – Thứ 6: 8:00 – 17:30');
  $contact_map_embed  = vnidt_field('contact_map_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.828!3d21.008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z4oCcOTUgQ2jDuWEgQuG7mWMsIEtpbSBMacOqbiI!5e0!3m2!1svi!2svn!4v1');
  ?>
  <section class="contact section--surface" id="contact">
    <div class="container">
      <div class="text-center reveal">
        <span class="section-label" style="justify-content:center"><?php echo esc_html($contact_label); ?></span>
        <h2 class="section-title"><?php echo wp_kses_post($contact_title); ?></h2>
        <p class="section-subtitle" style="margin:0 auto"><?php echo esc_html($contact_subtitle); ?></p>
      </div>

      <div class="contact__grid">
        <!-- Form -->
        <div class="contact__form-wrap reveal--left">
          <h3 style="font-size:var(--fs-h3); margin-bottom:var(--sp-6)"><?php echo esc_html($contact_form_title); ?></h3>
          <form id="contactForm" novalidate>
            <div class="form__row">
              <div class="form__group">
                <label class="form__label" for="contact-name">Họ và Tên *</label>
                <input type="text" class="form__input" id="contact-name" name="name" placeholder="Nguyễn Văn A" required>
              </div>
              <div class="form__group">
                <label class="form__label" for="contact-email">Email *</label>
                <input type="email" class="form__input" id="contact-email" name="email" placeholder="email@donvi.gov.vn" required>
              </div>
            </div>

            <div class="form__row">
              <div class="form__group">
                <label class="form__label" for="contact-phone">Số điện thoại</label>
                <input type="tel" class="form__input" id="contact-phone" name="phone" placeholder="09x xxx xxxx">
              </div>
              <div class="form__group">
                <label class="form__label" for="contact-org">Đơn vị / Tổ chức</label>
                <input type="text" class="form__input" id="contact-org" name="organization" placeholder="Tên cơ quan, doanh nghiệp">
              </div>
            </div>

            <div class="form__row">
              <div class="form__group form__group--full">
                <label class="form__label" for="contact-interest">Lĩnh vực quan tâm</label>
                <select class="form__select" id="contact-interest" name="interest">
                  <option value="" disabled selected>Chọn lĩnh vực</option>
                  <option value="gis">Cơ sở dữ liệu GIS</option>
                  <option value="webgis">Nền tảng WebGIS</option>
                  <option value="aquaculture">Quản lý thủy sản</option>
                  <option value="environment">Quản lý nguồn thải / Môi trường</option>
                  <option value="disaster">Cảnh báo thiên tai</option>
                  <option value="digital">Tư vấn chuyển đổi số</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div class="form__row">
              <div class="form__group form__group--full">
                <label class="form__label" for="contact-message">Nội dung yêu cầu *</label>
                <textarea class="form__textarea" id="contact-message" name="message" placeholder="Mô tả ngắn gọn nhu cầu của bạn..." required></textarea>
              </div>
            </div>

            <button type="submit" class="btn btn--accent btn--lg form__submit" id="submitBtn">
              Gửi Yêu Cầu Tư Vấn
              <span class="btn__arrow">→</span>
            </button>
            <p class="form__note"><?php echo esc_html($contact_form_note); ?></p>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="contact__info reveal--right">
          <div class="contact-info-card">
            <div class="contact-info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h4>Trụ sở chính</h4>
              <p><?php echo esc_html($contact_address); ?></p>
            </div>
          </div>

          <div class="contact-info-card">
            <div class="contact-info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h4>Hotline</h4>
              <p><?php echo esc_html($contact_phone); ?></p>
            </div>
          </div>

          <div class="contact-info-card">
            <div class="contact-info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <h4>Email</h4>
              <p><?php echo esc_html($contact_email); ?></p>
            </div>
          </div>

          <div class="contact-info-card">
            <div class="contact-info-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <h4>Giờ làm việc</h4>
              <p><?php echo esc_html($contact_hours); ?></p>
            </div>
          </div>

          <!-- Map -->
          <div class="contact__map">
            <iframe src="<?php echo esc_url($contact_map_embed); ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="VNiDT office location on Google Maps"></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php get_footer(); ?>
