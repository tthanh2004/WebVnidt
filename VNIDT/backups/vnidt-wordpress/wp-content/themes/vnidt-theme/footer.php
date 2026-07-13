<?php
/**
 * Theme Footer
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;

$footer_brand     = vnidt_field('footer_brand', 'CTCP Đổi mới Sáng tạo và Chuyển đổi số VN. Kiến tạo hệ sinh thái số toàn diện cho chính phủ và doanh nghiệp Việt Nam.');
$footer_copyright = vnidt_field('footer_copyright', '© 2026 VNiDT. Bảo lưu mọi quyền.');
?>

  <!-- ===== FOOTER ===== -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <!-- Brand -->
        <div>
          <a href="<?php echo esc_url(home_url('/')); ?>" class="navbar__logo" style="margin-bottom:var(--sp-4); display:inline-flex">
            <?php if (has_custom_logo()) : ?>
              <?php 
                $logo_id = get_theme_mod('custom_logo');
                $logo_url = wp_get_attachment_image_url($logo_id, 'full');
              ?>
              <img src="<?php echo esc_url($logo_url); ?>" alt="<?php bloginfo('name'); ?>" style="height: 62px; width: auto; object-fit: contain;">
            <?php else : ?>
              <img src="<?php echo esc_url(vnidt_asset('Logo_transparent.png')); ?>" alt="VNiDT Logo" style="height: 62px; width: auto; object-fit: contain;">
            <?php endif; ?>
          </a>
          <p class="footer__brand-text"><?php echo esc_html($footer_brand); ?></p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="footer__heading">Điều hướng</h4>
          <div class="footer__links">
            <a href="<?php echo esc_url(home_url('/#home')); ?>">Trang Chủ</a>
            <a href="<?php echo esc_url(home_url('/#about')); ?>">Giới Thiệu</a>
            <a href="<?php echo esc_url(home_url('/#solutions')); ?>">Giải Pháp</a>
            <a href="<?php echo esc_url(home_url('/#projects')); ?>">Dự Án</a>
            <a href="<?php echo esc_url(home_url('/#news')); ?>">Tin Tức</a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>">Liên Hệ</a>
          </div>
        </div>

        <!-- Solutions -->
        <div>
          <h4 class="footer__heading">Giải pháp</h4>
          <div class="footer__links">
            <a href="<?php echo esc_url(home_url('/#solutions')); ?>">CSDL Tài nguyên MT</a>
            <a href="<?php echo esc_url(home_url('/#solutions')); ?>">Quản lý Thủy sản</a>
            <a href="<?php echo esc_url(home_url('/#solutions')); ?>">Quản lý Nguồn thải</a>
            <a href="<?php echo esc_url(home_url('/#solutions')); ?>">Cảnh báo Thiên tai</a>
            <a href="<?php echo esc_url(home_url('/#solutions')); ?>">Tư vấn CĐS</a>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="footer__heading">Liên hệ</h4>
          <div class="footer__links">
            <a href="tel:+84989026438">+84 98 902 6438</a>
            <a href="mailto:vnidt.jsc@gmail.com">vnidt.jsc@gmail.com</a>
            <a>95 Chùa Bộc, Hà Nội</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright"><?php echo esc_html($footer_copyright); ?></p>
        <div class="footer__socials">
          <a href="#" class="footer__social" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="footer__social" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:vnidt.jsc@gmail.com" class="footer__social" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
      }, 500);
    });
  </script>

  <?php wp_footer(); ?>
</body>
</html>
