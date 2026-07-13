<?php
/**
 * Single Post Template
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<main style="padding-top: calc(var(--nav-h) + 40px); min-height: 70vh;">
  <div class="container container--narrow">
    <?php while (have_posts()) : the_post(); ?>
      <article>
        <div style="margin-bottom: var(--sp-6);">
          <span class="section-label"><?php echo get_the_date('d/m/Y'); ?></span>
        </div>
        <h1 class="section-title" style="margin-bottom: var(--sp-8);"><?php the_title(); ?></h1>
        
        <?php if (has_post_thumbnail()) : ?>
          <div style="border-radius: var(--r-lg); overflow: hidden; margin-bottom: var(--sp-10); border: 1px solid var(--glass-border);">
            <?php the_post_thumbnail('large', array('style' => 'width:100%; height:auto;')); ?>
          </div>
        <?php endif; ?>
        
        <div style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
          <?php the_content(); ?>
        </div>

        <div style="margin-top: var(--sp-12); padding-top: var(--sp-8); border-top: 1px solid var(--glass-border);">
          <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--secondary">
            ← Quay về Trang Chủ
          </a>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>

<?php get_footer(); ?>
