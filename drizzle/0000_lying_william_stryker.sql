CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`location` text NOT NULL,
	`service` text NOT NULL,
	`stage` text NOT NULL,
	`description` text NOT NULL,
	`budget` text NOT NULL,
	`target` text NOT NULL
);
