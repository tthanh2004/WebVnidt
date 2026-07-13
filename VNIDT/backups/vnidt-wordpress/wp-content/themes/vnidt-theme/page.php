<?php
/**
 * Page Template
 * @package vnidt-theme
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<main style="padding-top: calc(var(--nav-h) + 40px); min-height: 70vh;">
  <div class="container">
    <?php while (have_posts()) : the_post(); ?>
      <article>
        <h1 class="section-title" style="margin-bottom: var(--sp-8);"><?php the_title(); ?></h1>
        <div style="color: var(--text-secondary); line-height: 1.8;">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>

<?php get_footer(); ?>
