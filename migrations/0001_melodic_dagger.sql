ALTER TABLE "workspaces" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "workspace_owner" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "icon_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "workspaces_owner";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "icon_ic";