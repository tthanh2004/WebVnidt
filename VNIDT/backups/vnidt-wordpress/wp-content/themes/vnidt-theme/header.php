<?php
/**
 * Theme Header
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?php echo esc_attr(get_bloginfo('description')); ?>">
  <meta name="keywords" content="VNiDT, chuyển đổi số, GIS, WebGIS, cơ sở dữ liệu, quản lý tài nguyên môi trường, Việt Nam">
  <meta name="author" content="VNiDT">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="<?php echo esc_attr(get_bloginfo('name')); ?>">
  <meta property="og:description" content="<?php echo esc_attr(get_bloginfo('description')); ?>">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%237C3AED'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='800' font-size='16' fill='%23FFFFF0'%3EV%3C/text%3E%3C/svg%3E">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- ===== LOADER ===== -->
  <div id="loader">
    <div class="loader__spinner"></div>
    <div class="loader__text">Khởi tạo nền tảng số...</div>
  </div>

  <!-- ===== NAVIGATION ===== -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main Navigation">
    <div class="navbar__inner">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="navbar__logo" aria-label="VNiDT Home">
        <?php if (has_custom_logo()) : ?>
          <?php 
            $logo_id = get_theme_mod('custom_logo');
            $logo_url = wp_get_attachment_image_url($logo_id, 'full');
          ?>
          <img src="<?php echo esc_url($logo_url); ?>" alt="<?php bloginfo('name'); ?> Logo" style="height: 47px; width: auto; object-fit: contain;">
        <?php else : ?>
          <img src="<?php echo esc_url(vnidt_asset('Logo_transparent.png')); ?>" alt="VNiDT Logo" style="height: 47px; width: auto; object-fit: contain;">
        <?php endif; ?>
      </a>

      <div class="navbar__links" id="navLinks">
        <a href="<?php echo esc_url(home_url('/#home')); ?>" class="navbar__link active" data-section="home">Trang Chủ</a>
        <a href="<?php echo esc_url(home_url('/#about')); ?>" class="navbar__link" data-section="about">Giới Thiệu</a>
        <a href="<?php echo esc_url(home_url('/#solutions')); ?>" class="navbar__link" data-section="solutions">Giải Pháp</a>
        <a href="<?php echo esc_url(home_url('/#projects')); ?>" class="navbar__link" data-section="projects">Dự Án</a>
        <a href="<?php echo esc_url(home_url('/#news')); ?>" class="navbar__link" data-section="news">Tin Tức</a>
        <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="navbar__link" data-section="contact">Liên Hệ</a>
      </div>

      <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="btn btn--primary navbar__cta">
        Tư Vấn Miễn Phí
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>

      <button class="navbar__toggle" id="navToggle" aria-label="Toggle Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile Navigation">
    <a href="<?php echo esc_url(home_url('/#home')); ?>" class="mobile-menu__link">Trang Chủ</a>
    <a href="<?php echo esc_url(home_url('/#about')); ?>" class="mobile-menu__link">Giới Thiệu</a>
    <a href="<?php echo esc_url(home_url('/#solutions')); ?>" class="mobile-menu__link">Giải Pháp</a>
    <a href="<?php echo esc_url(home_url('/#projects')); ?>" class="mobile-menu__link">Dự Án</a>
    <a href="<?php echo esc_url(home_url('/#news')); ?>" class="mobile-menu__link">Tin Tức</a>
    <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="mobile-menu__link">Liên Hệ</a>
    <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="btn btn--primary" style="margin-top:1rem">Tư Vấn Miễn Phí</a>
  </div>
