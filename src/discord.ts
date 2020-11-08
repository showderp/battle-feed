import { MessageEmbed, WebhookClient } from 'discord.js';
import { Post } from './yotsuba';

export const notifyBattle = async (webhookId: string, webhookToken: string, thread: Post, post: Post, battleLink: string) => {
  const webhookClient = new WebhookClient(webhookId, webhookToken);

  const embed = new MessageEmbed()
    .setDescription(battleLink)
    .setURL(battleLink)
    .setThumbnail('http://play.pokemonshowdown.com/favicon-128.png')
    .setTimestamp(post.time * 1000)
    .setAuthor(`${post.name || ''} ${post.trip || ''}`, 'https://i.imgur.com/3Ak7F4e.png', `https://boards.4channel.org/vp/thread/${thread.no}#p${post.no}`);
  
  await webhookClient.send({
    nonce: `${post.no}`,
    embeds: [embed]
  });
};
