import { registerEnumType } from "type-graphql";

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED"
}

registerEnumType(PostStatus, {
  name: "PostStatus",
  description: "投稿のステータス"
})