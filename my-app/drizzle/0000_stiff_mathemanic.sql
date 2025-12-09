CREATE TABLE "ada_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"github_url" text NOT NULL,
	"demo_url" text,
	"promotion_id" integer,
	"ada_project_id" integer,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "students_projects" ADD CONSTRAINT "students_projects_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students_projects" ADD CONSTRAINT "students_projects_ada_project_id_ada_projects_id_fk" FOREIGN KEY ("ada_project_id") REFERENCES "public"."ada_projects"("id") ON DELETE no action ON UPDATE no action;