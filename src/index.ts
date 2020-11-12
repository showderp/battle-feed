import DynamoDB from 'aws-sdk/clients/dynamodb';
import { notifyBattle } from './discord';
import { getCurrentThread, getCurrentBattlePost } from './showderp';

const botToken = process.env.BOT_TOKEN || '';
const channelId = process.env.CHANNEL_ID || '';
const battleNotifierKeyValueTableName = process.env.BATTLE_NOTIFIER_KEY_VALUE_TABLE_NAME || '';

// eslint-disable-next-line import/prefer-default-export
export const handler = async (): Promise<void> => {
  const dynamoClient = new DynamoDB.DocumentClient();
  const response = await dynamoClient.get({
    TableName: battleNotifierKeyValueTableName,
    Key: { key: 'lastExecutedTime' },
  }).promise();

  let lastExecutedTime: number | undefined;
  if (response.Item) {
    lastExecutedTime = response.Item.value as number;
  }

  const thread = await getCurrentThread();

  if (thread) {
    const battlePost = await getCurrentBattlePost(thread, lastExecutedTime);

    if (battlePost) {
      const [post, battleLink] = battlePost;

      const isSuccessful = await notifyBattle(botToken, channelId, thread, post, battleLink);

      if (isSuccessful) {
        await dynamoClient.put({
          TableName: battleNotifierKeyValueTableName,
          Item: { key: 'lastExecutedTime', value: post.time },
        }).promise();
      }
    }
  }
};
