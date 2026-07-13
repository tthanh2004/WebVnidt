<?php
/**
 * Index Template (fallback)
 * WordPress requires index.php in every theme
 * 
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<main style="padding-top: calc(var(--nav-h) + 40px); min-height: 70vh;">
  <div class="container">
    <?php if (have_posts()) : ?>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: var(--sp-8); margin-top: var(--sp-8);">
        <?php while (have_posts()) : the_post(); ?>
          <article class="glass-card" style="cursor: pointer;" onclick="window.location='<?php the_permalink(); ?>'">
            <?php if (has_post_thumbnail()) : ?>
              <div style="border-radius: var(--r-md); overflow: hidden; margin: calc(-1 * var(--sp-8)); margin-bottom: var(--sp-6);">
                <?php the_post_thumbnail('vnidt-news', array('style' => 'width:100%; height:auto; display:block;')); ?>
              </div>
            <?php endif; ?>
            <div class="news-card__date" style="margin-bottom: var(--sp-3);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
              <span><?php echo get_the_date('d/m/Y'); ?></span>
            </div>
            <h3 class="glass-card__title" style="margin-bottom: var(--sp-3);">
              <a href="<?php the_permalink(); ?>" style="color: inherit;"><?php the_title(); ?></a>
            </h3>
            <p class="glass-card__text"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
          </article>
        <?php endwhile; ?>
      </div>

      <div style="margin-top: var(--sp-12); text-align: center;">
        <?php
          the_posts_pagination(array(
            'prev_text' => '← Trước',
            'next_text' => 'Sau →',
            'class'     => 'vnidt-pagination',
          ));
        ?>
      </div>
    <?php else : ?>
      <div style="text-align: center; padding: var(--sp-20) 0;">
        <h2 class="section-title">Chưa có nội dung</h2>
        <p class="section-subtitle">Hãy quay lại sau để xem các cập nhật mới nhất.</p>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--primary" style="margin-top: var(--sp-6);">
          Về Trang Chủ <span class="btn__arrow">→</span>
        </a>
      </div>
    <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
