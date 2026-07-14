CREATE TABLE "applications" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"career_id" varchar(36) NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(256),
	"resume" text,
	"status" varchar(50) DEFAULT 'received' NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "careers" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"department" varchar(256),
	"location" varchar(256),
	"employment_type" varchar(100),
	"experience" varchar(100),
	"description" text,
	"status" varchar(50) DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_inquiries" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"department" varchar(256),
	"name" varchar(256) NOT NULL,
	"company" varchar(256),
	"email" varchar(256) NOT NULL,
	"phone" varchar(256),
	"subject" varchar(256),
	"message" text NOT NULL,
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "divisions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"hero_image" text,
	"overview" text,
	CONSTRAINT "divisions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leaders" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"designation" varchar(256) NOT NULL,
	"department" varchar(256),
	"photo" text,
	"biography" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"summary" text,
	"content" text,
	"author" varchar(256),
	"category" varchar(256),
	"featured_image" text,
	"publish_date" timestamp,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "project_images" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"project_id" varchar(36) NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"alt_text" text
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"short_description" text,
	"overview" text,
	"division_id" varchar(36),
	"status" varchar(50) DEFAULT 'published' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"hero_image" text,
	"thumbnail" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" varchar(36) NOT NULL,
	"permission_id" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password_hash" varchar(256),
	"phone" varchar(256),
	"avatar" text,
	"role_id" varchar(36) NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
