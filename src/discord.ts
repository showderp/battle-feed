import { Client, MessageEmbed, TextChannel } from 'discord.js';
import { Post } from './yotsuba';

// eslint-disable-next-line import/prefer-default-export
export const notifyBattle = async (
  botToken: string,
  channelId: string,
  thread: Post,
  post: Post,
  battleLink: string,
) => {
  const discordClient = new Client();
  await discordClient.login(botToken);

  const embed = new MessageEmbed()
    .setDescription(battleLink)
    .setURL(battleLink)
    .setThumbnail('http://play.pokemonshowdown.com/favicon-128.png')
    .setTimestamp(post.time * 1000)
    .setAuthor(
      `${post.name || ''} ${post.trip || ''}`,
      'https://i.imgur.com/3Ak7F4e.png',
      `https://boards.4channel.org/vp/thread/${thread.no}#p${post.no}`,
    );

  const channel = await discordClient.channels.fetch(channelId);

  if (channel && channel.isText()) {
    const textChannel = channel as TextChannel;

    const message = await textChannel.send(embed);
    await message.crosspost();

    return true;
  }

  return false;
};
