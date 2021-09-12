import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/Post.model';

export interface PostsState extends EntityState<Post> {
  compteurTest: number;
}
export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: sortByTitle,
});
export const initialState: PostsState = postsAdapter.getInitialState({
  compteurTest: 0,
});
{
}

export function sortByTitle(a: Post, b: Post): number {
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) return 1;
  if (compare < 0) return -1;
  return compare;
}
