import { Tags } from "./Tags";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity({ name: "post_tags" })
export class PostTags {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (post) => post.tagsPost)
  @JoinColumn({ name: "post_id" })
  posts: Post;

  @ManyToOne(() => Tags, (tags) => tags.tagsPost)
  @JoinColumn({ name: "tags_id" })
  tags: Tags;

  @Column()
  isActive: boolean;
}
