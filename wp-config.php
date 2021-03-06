<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+1uI%y.BD<1VO:ql.20rj>)c(H:C:Xil$9B0YM(lw9Y$)TTbm`y*jdA,t;1ppmMk' );
define( 'SECURE_AUTH_KEY',  'kP)%<G+1i0m!<#}{.)onDqg8zhF-T(JQ8rkblnDlV&JgMsbq|AemX?NxEYd&D2N5' );
define( 'LOGGED_IN_KEY',    '>7@OWgz^8s0lL6[%[`iv-ZiJd>.!Zp$^Jmx!(-S;HZ8_!5Ig>y=f%Bm`Z3!!x-^>' );
define( 'NONCE_KEY',        ' B]4ojy7%HWYJK+fvb]1*w]_+hxWqV,pV&B_7&7]l 1:SZ#iUp2E#m`%?c%Hm!tC' );
define( 'AUTH_SALT',        '0Mnaay[4}&i3j{3q+q$]MDeIH!Z3}LI28+l9n:Xw]oE,&e,?c|5lbu(6*y=reA75' );
define( 'SECURE_AUTH_SALT', 'YOrN[Bo-CrNX6+2]arJe&+uN)PBTm!hP,<ZzXsb)09 %[L^1wV#uLkRh<xN:Ew34' );
define( 'LOGGED_IN_SALT',   '@VqL+@|*ds8&TC/Kks=aO,|Z~bfUw-0T37g>^gl!%{>/Ph6#o;1q%?G$IxL)2Y+P' );
define( 'NONCE_SALT',       'Dd<.[)oWZa,VwT+bck;P_9*yu}8.}uG2_9,&I-UTBT= &:h(W]]],<f!/BEYxR|,' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
