import { getCatalog, getThread, Post } from './yotsuba';

const showderpKeywords: string[] = ['showderp', 'dogars.ml', 'dogars.ga'];
const showdownBattleLinkPattern: RegExp = /(https?:\/\/)?play.pokemonshowdown.com\/battle-([^\s]*)/gi;

const isShowderpThread = (post: Post) => {
  const doesCommentContainKeyword = showderpKeywords.some((keyword) => post.com && post.com.includes(keyword));
  const doesSubjectContainKeyword = showderpKeywords.some((keyword) => post.sub && post.sub.includes(keyword));

  return doesCommentContainKeyword || doesSubjectContainKeyword;
};

export const getCurrentThread = async (): Promise<Post | undefined> => {
  const catalog = await getCatalog('vp');

  return catalog.reduce((currentThread: Post | undefined, thread) => {
    if (isShowderpThread(thread)) {
      if (!currentThread) {
        return thread;
      } else if (thread.no > currentThread.no) {
        return thread;
      }
    }

    return currentThread;
  }, undefined);
};

export const getCurrentBattlePost = async (thread: Post, lastExecutedTime?: number): Promise<[Post, string] | undefined> => {
  const posts = await getThread('vp',  thread.no);

  const battlePost: Post | undefined = posts.reverse()
    .find((post) => {
      if (post.trip && post.com && (!lastExecutedTime || post.time > lastExecutedTime)) {
        const comment = post.com
          .replace(/<wbr>/gm, '')
          .replace(/<(?:.|\n)*?>/gm, ' ');

        const matches = comment.match(showdownBattleLinkPattern);

        if (matches) {
          return matches.length > 0;
        }
      }

      return false;
    });

  if (battlePost) {
    if (battlePost.com) {
      const comment = battlePost.com
          .replace(/<wbr>/gm, '')
          .replace(/<(?:.|\n)*?>/gm, ' ');
          
      const matches = comment.match(showdownBattleLinkPattern);

      if (matches && matches.length > 0) {
        const link = matches.pop() as string;
        return [battlePost, link[0] === 'h' ? link : `https://${link}`];
      }
    }
  }

  return undefined;
};
