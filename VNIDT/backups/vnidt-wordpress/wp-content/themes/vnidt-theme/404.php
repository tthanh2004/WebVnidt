<?php
/**
 * 404 Page Template
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<main style="padding-top: calc(var(--nav-h) + 80px); min-height: 70vh; display: flex; align-items: center;">
  <div class="container" style="text-align: center;">
    <div style="font-size: clamp(6rem, 15vw, 12rem); font-weight: 800; color: var(--color-accent); opacity: 0.15; line-height: 1;">404</div>
    <h1 class="section-title" style="margin-top: -2rem;">Không tìm thấy trang</h1>
    <p class="section-subtitle" style="margin: 0 auto var(--sp-10);">Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Hãy quay lại trang chủ.</p>
    <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--primary btn--lg">
      Về Trang Chủ
      <span class="btn__arrow">→</span>
    </a>
  </div>
</main>

<?php get_footer(); ?>
