import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/Post.model';

export interface PostsState extends EntityState<Post> {
  compteurTest: number;
}
export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: sortById,
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

export function sortById(a: Post, b: Post): number {
  //-1;  a <  b : plus petit au plus grand
  // 1;  a >  b : plus grand au plus petit
  // 0;  a == b
  const compare = b.id - a.id;

  return compare;
}
