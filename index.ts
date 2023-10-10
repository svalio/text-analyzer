import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const vocabulary = {
  noun: new Set(["cat", "book", "table", "house", "dog", "car", "tree", "bird", "friend", "city", "computer", "chair", "sun", "flower", "music", "child", "parent", "food", "water", "phone", "time", "money", "job", "world", "love", "school", "student", "teacher", "doctor", "hospital"]),
  verb: new Set(["run", "eat", "sleep", "dance", "sing", "swim", "write", "read", "play", "talk", "work", "study", "drive", "think", "create", "listen", "watch", "buy", "help", "cook", "travel", "exercise", "paint", "draw", "explore", "solve", "smile", "laugh", "dream", "relax"]),
  adjective: new Set(["happy", "big", "beautiful", "small", "tall", "smart", "funny", "kind", "loud", "quiet", "clever", "brave", "friendly", "patient", "colorful", "exciting", "delicious", "strong", "soft", "hard", "young", "old", "busy", "calm", "careful", "curious", "energetic", "happy", "peaceful"]),
  adverb: new Set(["quickly", "eagerly", "silently", "happily", "slowly", "carefully", "loudly", "sharply", "softly", "quietly", "easily", "kindly", "politely", "vigorously", "gently", "anxiously", "honestly", "enthusiastically", "generously", "responsibly", "boldly", "joyfully", "patiently", "faithfully", "freely", "gracefully", "intensely", "safely", "wisely"]),
  preposition: new Set(["in", "on", "at", "above", "below", "behind", "beside", "between", "under", "over", "across", "through", "into", "onto", "towards", "from", "within", "without", "among", "beyond", "with", "except", "until", "around", "past", "off", "up", "down", "onto", "inside"]),
  conjunction: new Set(["and", "but", "or", "nor", "so", "yet", "for", "while", "although", "because", "if", "unless", "since", "when", "where", "as", "that", "whether", "while", "once", "though", "even", "provided", "whereas", "so", "thus", "therefore", "hence", "nevertheless"]),
  pronoun: new Set(["he", "she", "they", "we", "it", "I", "you", "me", "him", "her", "us", "them", "myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves", "everyone", "everything", "somebody", "nobody", "anyone", "everything", "no one", "each", "both", "few", "many"]),
  interjection: new Set(["wow", "ouch", "oops", "yay", "hurray", "bravo", "oh", "ah", "uh", "yikes", "yeah", "yes", "no", "uh-huh", "hmm", "oh", "well", "alas", "phew", "oops", "ow", "oh no", "wow", "ahem", "hush", "hey", "hello", "goodbye", "oh dear", "congratulations"]),
  determiner: new Set(["the", "a", "this", "that", "these", "those", "my", "your", "his", "her", "its", "our", "their", "an", "any", "some", "all", "every", "each", "either", "neither", "both", "much", "many", "few", "several", "enough", "other", "such", "what", "which"]),
  numeral: new Set(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million"])
};

type WordTypes = {
  noun: number;
  verb: number;
  adjective: number;
  adverb: number;
  preposition: number;
  conjunction: number;
  pronoun: number;
  interjection: number;
  determiner: number;
  numeral: number;
};

function analyzeText(text: string): WordTypes {
  const wordTypes: WordTypes = {
    noun: 0,
    verb: 0,
    adjective: 0,
    adverb: 0,
    preposition: 0,
    conjunction: 0,
    pronoun: 0,
    interjection: 0,
    determiner: 0,
    numeral: 0,
  };

  const words = text.split(" ");

  words.forEach((word) => {
    word = word.toLowerCase();
    for (const type in vocabulary) {
      if (vocabulary[type].has(word)) {
        wordTypes[type]++;
        break;
      }
    }
  });

  return wordTypes;
}

export const handler = async(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;
    const parsedBody = JSON.parse(body as string);
    const input = parsedBody.input;

    if (!input || typeof input !== "string") {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(
          {
            message: "Bad Request",
          },
          null,
          2,
        ),
      };
    }

    const result = analyzeText(input);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        {
          result,
        },
        null,
        2,
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        {
          message: "Something went wrong!",
          input: event,
        },
        null,
        2,
      ),
    };
  }
};
